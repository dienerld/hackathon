import { createId, init } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { classroom } from './scholar'

const createCode = init({
  length: 6,
})

export const user = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  externalId: text('external_id').notNull().unique(),
  code: text('code').notNull().unique().$defaultFn(() => createCode()),
  classroomId: text('classroom_id').notNull().references(() => classroom.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
