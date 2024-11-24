import type { SQL } from 'drizzle-orm'
import { and, db, eq, sql, tables } from '@database/index'
import z from 'zod'
import { topic } from '~/database/schemas'

export const findAllFiltersSchema = z.object({
  topicId: z.string(),
})

export const findAllResponseSchema = z.object({
  topicName: z.string(),
  matterName: z.string(),
  className: z.string(),
  questions: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    level: z.string(),
    options: z.any(),
    createAt: z.date(),
  })),
})

export type FindAllFilters = z.infer<typeof findAllFiltersSchema>
export type FindAllResponse = z.infer<typeof findAllResponseSchema>

export async function findAll(filters: FindAllFilters): Promise<FindAllResponse> {
  const filtersSQL: SQL[] = [eq(tables.question.topicId, filters.topicId)]

  const queryQuestions = db
    .select({
      id: tables.question.id,
      name: tables.question.name,
      type: tables.question.type,
      level: tables.question.level,
      options: tables.question.options,
      createAt: tables.question.createdAt,
    })
    .from(tables.question)
    .where(and(...filtersSQL))
    .orderBy(sql`RANDOM()`)
    .limit(10)
    .execute()

  const queryTopics = db
    .select({
      name: tables.topic.name,
      matterName: tables.matter.name,
      className: tables.classroom.name,
    })
    .from(tables.topic)
    .innerJoin(tables.matter, eq(tables.matter.id, tables.topic.matterId))
    .innerJoin(tables.classroom, eq(tables.classroom.id, tables.matter.classroomId))
    .where(eq(tables.topic.id, filters.topicId))
    .limit(1)
    .execute()

  const [questions, topics] = await Promise.all([queryQuestions, queryTopics])

  return findAllResponseSchema.parse({
    topicName: topics[0].name,
    matterName: topics[0].matterName,
    className: topics[0].className,
    questions,
  })
}
