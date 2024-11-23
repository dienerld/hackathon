import { createId } from '@paralleldrive/cuid2'
import { json, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  fullName: text('full_name').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  externalId: text('external_id').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const classroom = pgTable('classrooms', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const matter = pgTable('matters', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const question = pgTable('questions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  matterId: text('matter_id').notNull().references(() => matter.id),
  classroomId: text('classroom_id').notNull().references(() => classroom.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, table => ({
  uniqueByMatterAndClassroom: unique('questions_matter_id_classroom_id_unique')
    .on(table.matterId, table.classroomId),
}))

export const answer = pgTable('answers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  questionId: text('question_id').notNull().references(() => question.id),
  userId: text('user_id').notNull().references(() => user.id),
  selectedOption: json('selected_option').$type<{
    value: string
    label: string
  }>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
