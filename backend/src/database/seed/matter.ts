import { db, tables } from '..'

export async function createMatter(name: string, classroomId: string) {
  const [matter] = await db.insert(tables.matter)
    .values({ name, classroomId })
    .returning({ id: tables.matter.id })
    .execute()

  return matter
}
