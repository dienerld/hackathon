import { eq, or } from 'drizzle-orm'
import z from 'zod'
import { db, tables } from '~/database'

export const userFilterSchema = z.object({
  externalId: z.string(),
})

export type UserFilter = z.infer<typeof userFilterSchema>

export const userResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  classroomId: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type UserResponse = z.infer<typeof userResponseSchema>

export async function getUser(externalId: string): Promise<UserResponse | null> {
  const [userDb] = await db
    .select({
      id: tables.user.id,
      firstName: tables.user.firstName,
      lastName: tables.user.lastName,
      email: tables.user.email,
      externalId: tables.user.externalId,
      classroomId: tables.user.classroomId,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .where(or(
      eq(tables.user.externalId, externalId),
      eq(tables.user.id, externalId),
    ),
    )
    .execute()

  if (!userDb)
    return null

  return userResponseSchema.parse(userDb)
}
