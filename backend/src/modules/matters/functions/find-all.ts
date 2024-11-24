import z from 'zod'
import { db, tables } from '~/database'

export const findAllFiltersSchema = z.object({
  id: z.string().optional(),
})

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.string(),
})

export type FindAllFilters = z.infer<typeof findAllFiltersSchema>
export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(): Promise<FindAllResponse[]> {
  // const filtersSQL: SQL[] = [];
  const matters = await db
    .select({
      id: tables.matter.id,
      name: tables.matter.name,
      createdAt: tables.matter.createdAt,
    })
    .from(tables.matter)
    .execute()

  return findAllResponseSchema.array().parse(matters)
}
