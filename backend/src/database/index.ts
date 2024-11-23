import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'

export {
  eq,
  and,
  or,
  not,
  asc,
  desc,
  between,
  sql,
  type SQL,
} from 'drizzle-orm'
import * as tables from './schemas'

export { tables }
export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema: tables, logger: false })
