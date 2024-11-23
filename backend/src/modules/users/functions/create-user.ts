import { eq } from 'drizzle-orm'
import { db, tables } from '~/database'

interface CreateUserRequest {
  fullName: string
  firstName: string
  lastName: string
  email: string
  externalId: string
  picture?: string
}

export async function createUser({
  fullName,
  firstName,
  lastName,
  email,
  externalId,
  picture,
}: CreateUserRequest) {
  const [userDb] = await db
    .select({ id: tables.user.id })
    .from(tables.user)
    .where(eq(tables.user.externalId, externalId))
    .limit(1)
    .execute()

  if (userDb) {
    return { newUser: false, id: userDb.id }
  }

  const [userCreated] = await db
    .insert(tables.user)
    .values({ fullName, firstName, lastName, email, externalId, picture })
    .returning({ id: tables.user.id })
    .execute()

  return { newUser: true, id: userCreated.id }
}
