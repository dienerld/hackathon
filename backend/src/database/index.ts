import { drizzle } from 'drizzle-orm/node-postgres'

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
export const db = drizzle(env.DATABASE_URL, { schema: tables, logger: false })
