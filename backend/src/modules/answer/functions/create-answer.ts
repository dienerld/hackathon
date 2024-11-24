import { inArray } from 'drizzle-orm'
import z from 'zod'
import { db, eq, tables } from '~/database'

export const answerRequestSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    selectedOption: z.object({
      label: z.string(),
      value: z.string(),
      correct: z.coerce.boolean(),
    }),
  })),
  externalId: z.string(),
})

export const answerResponseSchema = z.object({
  total: z.number(),
  corrects: z.number(),
  score: z.number(),
})

export type AnswerRequest = z.infer<typeof answerRequestSchema>
export type AnswerResponse = z.infer<typeof answerResponseSchema>

const scoreValues = {
  easy: 3,
  medium: 5,
  hard: 8,
}

export async function createAnswer(request: AnswerRequest): Promise<AnswerResponse> {
  const [user] = await db
    .select({
      id: tables.user.id,
    })
    .from(tables.user)
    .where(eq(tables.user.externalId, request.externalId))
    .limit(1)
    .execute()

  const answers = request.answers.map(answer => ({
    ...answer,
    userId: user.id,
  }))

  await db
    .insert(tables.answer)
    .values(answers)
    .execute()

  const questions = await db
    .select({
      id: tables.question.id,
      level: tables.question.level,
    })
    .from(tables.question)
    .where(inArray(tables.question.id, answers.map(answer => answer.questionId)))
    .execute()

  const report = answers.reduce((acc, answer) => {
    const question = questions.find(question => question.id === answer.questionId && answer.selectedOption.correct)

    if (!question)
      return acc

    return {
      corrects: acc.corrects + 1,
      score: acc.score + scoreValues[question.level],
    }
  }, {
    corrects: 0,
    score: 0,
  })
  const [rankingUser] = await db
    .select({
      id: tables.ranking.userId,
      score: tables.ranking.score,
    })
    .from(tables.ranking)
    .where(eq(tables.ranking.userId, user.id))
    .execute()
  if (rankingUser) {
    await db
      .update(tables.ranking)
      .set({ score: rankingUser.score + report.score })
      .where(eq(tables.ranking.userId, user.id))
      .execute()
  }
  else {
    await db
      .insert(tables.ranking)
      .values({
        userId: user.id,
        score: report.score,
      })
      .execute()
  }

  return answerResponseSchema.parse({
    ...report,
    total: questions.length,
  })
}
