import { db, eq, tables } from '~/database'

interface CreateUserRequest {

  firstName: string
  lastName: string
  email: string
  externalId: string
  classroomId: string
}

export async function createUser({
  firstName,
  lastName,
  email,
  externalId,
  classroomId,
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
    .values({ firstName, lastName, email, externalId, classroomId })
    .returning({ id: tables.user.id })
    .execute()

  return { newUser: true, id: userCreated.id }
}
