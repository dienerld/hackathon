import z from 'zod'
import { db, eq, tables } from '~/database'

interface CreateUserRequest {
  firstName: string
  lastName: string
  email: string
  externalId: string
  classroomId: string
}

export const userResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  classroomId: z.string().nullable(),
  createdAt: z.date(),
})

export async function createUser({
  firstName,
  lastName,
  email,
  externalId,
  classroomId,
}: CreateUserRequest) {
  const returningFields = {
    id: tables.user.id,
    firstName: tables.user.firstName,
    lastName: tables.user.lastName,
    email: tables.user.email,
    externalId: tables.user.externalId,
    classroomId: tables.user.classroomId,
    createdAt: tables.user.createdAt,
  }

  const [userDb] = await db
    .select(returningFields)
    .from(tables.user)
    .where(eq(tables.user.externalId, externalId))
    .limit(1)
    .execute()

  if (userDb) {
    return userResponseSchema.parse(userDb)
  }

  const [userCreated] = await db
    .insert(tables.user)
    .values({ firstName, lastName, email, externalId, classroomId })
    .returning(returningFields)
    .execute()

  return userResponseSchema.parse(userCreated)
}
