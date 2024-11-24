import { db, tables } from '..'

export async function createMatter(name: string, classId: string) {
  const [matter] = await db.insert(tables.matter)
    .values({ name, classId })
    .returning({ id: tables.matter.id })
    .execute()

  return matter
}
