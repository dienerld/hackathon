import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import * as tables from './schemas'

export {
  and,
  asc,
  between,
  desc,
  eq,
  not,
  or,
  sql,
  type SQL,
} from 'drizzle-orm'

export { tables }
export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema: tables, logger: false })
