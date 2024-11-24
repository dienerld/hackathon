import z from 'zod'
import { db, eq, tables } from '~/database'

export const answerRequestSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    selectedOption: z.any(),
  })),
  externalId: z.string(),
})

export const answerResponseSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  userId: z.string(),
  selectedOption: z.any(),
  createdAt: z.date(),
})

export type AnswerRequest = z.infer<typeof answerRequestSchema>
export type AnswerResponse = z.infer<typeof answerResponseSchema>

export async function createAnswer(request: AnswerRequest): Promise<AnswerResponse[]> {
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

  const answersCreated = await db
    .insert(tables.answer)
    .values(answers)
    .returning({
      id: tables.answer.id,
      questionId: tables.answer.questionId,
      userId: tables.answer.userId,
      selectedOption: tables.answer.selectedOption,
      createdAt: tables.answer.createdAt,
    })
    .execute()

  return answerResponseSchema.array().parse(answersCreated)
}
