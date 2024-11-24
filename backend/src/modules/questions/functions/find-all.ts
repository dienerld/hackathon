import { db, tables } from '@database/index'
import z from 'zod'

export const findAllFiltersSchema = z.object({
  questionId: z.string().optional(),
})

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  level: z.string(),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      correct: z.boolean(),
    }),
  ),
  createAt: z.date(),
})

export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(): Promise<FindAllResponse[]> {
  const questions = await db
    .select({
      id: tables.question.id,
      name: tables.question.name,
      type: tables.question.type,
      level: tables.question.level,
      options: tables.question.options,
      createAt: tables.question.createdAt,
    })
    .from(tables.question)
    .execute()

  return findAllResponseSchema.array().parse(questions)
}
