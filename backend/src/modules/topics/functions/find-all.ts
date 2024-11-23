import { and, db, eq, type SQL, tables } from '@database/index'
import z from 'zod'

export const findAllFiltersSchema = z.object({
  name: z.string().optional(),
  matterId: z.string().optional(),
})

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  matterId: z.string(),
})
export type FindAllFilters = z.infer<typeof findAllFiltersSchema>
export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(filters: FindAllFilters): Promise<FindAllResponse[]> {
  const filtersSQL: SQL[] = []

  if (filters.name) {
    filtersSQL.push(eq(tables.topic.name, filters.name))
  }

  if (filters.matterId) {
    filtersSQL.push(eq(tables.topic.matterId, filters.matterId))
  }

  const topics = await db
    .select({
      id: tables.topic.id,
      name: tables.topic.name,
      matterId: tables.topic.matterId,
    })
    .from(tables.topic)
    .where(and(...filtersSQL))
    .execute()

  return findAllResponseSchema.array().parse(topics)
}
