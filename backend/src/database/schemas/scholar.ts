import { createId } from '@paralleldrive/cuid2'
import { json, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

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
  classroomId: text('classroom_id').notNull().references(() => classroom.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const topic = pgTable('topics', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  matterId: text('matter_id').notNull().references(() => matter.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const questionLevel = pgEnum('question_level', [
  'easy',
  'medium',
  'hard',
])

export const questionType = pgEnum('question_type', [
  'multiple-choice',
  'true-or-false',
  'free-text',
])

export const question = pgTable('questions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  level: questionLevel('level').notNull(),
  type: questionType('type').notNull(),
  topicId: text('topic_id').notNull().references(() => topic.id),
  options: json('options').$type<{
    value: string
    label: string
    correct: boolean
  }[]>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

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
