import type { SQL } from 'drizzle-orm'
import { and, db, eq, tables } from '@database/index'
import z from 'zod'

export const findAllFiltersSchema = z.object({
  topicId: z.string(),
})

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  level: z.string(),
  options: z.any(),
  createAt: z.date(),
})

export type FindAllFilters = z.infer<typeof findAllFiltersSchema>
export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(filters: FindAllFilters): Promise<FindAllResponse[]> {
  const filtersSQL: SQL[] = [eq(tables.question.topicId, filters.topicId)]

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
    .where(and(...filtersSQL))
    .execute()

  return findAllResponseSchema.array().parse(questions)
}
