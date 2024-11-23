import { drizzle } from 'drizzle-orm/node-postgres'
import { seed } from 'drizzle-seed'
import { env } from '~/env'
import { tables } from '.'

async function main() {
  const db = drizzle(env.DATABASE_URL!)
  await seed(db, tables)
}

main()
