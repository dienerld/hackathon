import { and, db, eq, type SQL, tables } from '@database/index'
import z from 'zod'

export const findAllResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createAt: z.date(),
})

export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(): Promise<FindAllResponse[]> {
  const classrooms = await db
    .select({
      id: tables.classroom.id,
      name: tables.classroom.name,
      createAt: tables.classroom.createdAt,
    })
    .from(tables.classroom)
    .execute()

  return findAllResponseSchema.array().parse(classrooms)
}
