import type { SQL } from 'drizzle-orm'
import { and, eq } from 'drizzle-orm'
import z from 'zod'
import { db, tables } from '~/database'

export const findAllFiltersSchema = z.object({
  classroomId: z.string().optional(),
})

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.string(),
})

export type FindAllFilters = z.infer<typeof findAllFiltersSchema>
export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(filters: FindAllFilters): Promise<FindAllResponse[]> {
  const filtersSQL: SQL[] = []

  if (filters.classroomId) {
    filtersSQL.push(eq(tables.matter.classroomId, filters.classroomId))
  }

  const matters = await db
    .select({
      id: tables.matter.id,
      name: tables.matter.name,
      createdAt: tables.matter.createdAt,
    })
    .from(tables.matter)
    .where(and(...filtersSQL))
    .execute()

  return findAllResponseSchema.array().parse(matters)
}
