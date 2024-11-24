import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { AnswerRequest } from './functions'
import { createAnswer } from './functions'

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {},
    async (request, reply) => {
      const response = await createAnswer(request.body as AnswerRequest)
      return reply.status(200).send(response)
    },
  )
}
