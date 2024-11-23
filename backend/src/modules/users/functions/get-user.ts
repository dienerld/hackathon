import { eq, or } from 'drizzle-orm'
import z from 'zod'
import { db, tables } from '~/database'

export const userResponseSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  externalId: z.string(),
  picture: z.string(),
  createdAt: z.coerce.date(),
})

export type UserResponse = z.infer<typeof userResponseSchema>

export async function getUser(externalId: string): Promise<UserResponse> {
  const [userDb] = await db
    .select({
      id: tables.user.id,
      fullName: tables.user.fullName,
      firstName: tables.user.firstName,
      lastName: tables.user.lastName,
      email: tables.user.email,
      externalId: tables.user.externalId,
      picture: tables.user.picture,
      createdAt: tables.user.createdAt,
    })
    .from(tables.user)
    .where(or(eq(tables.user.externalId, externalId), eq(tables.user.id, externalId)))
    .execute()

  return userResponseSchema.parse(userDb)
}
