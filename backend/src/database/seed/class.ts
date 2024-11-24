import { db, tables } from '..'

export async function createClasse(name: string) {
  const [classe] = await db
    .insert(tables.classroom)
    .values({ name })
    .returning({ id: tables.classroom.id, name: tables.classroom.name })
    .execute()

  return classe
}
