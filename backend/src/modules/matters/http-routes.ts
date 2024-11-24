import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { findAll, findAllFiltersSchema } from './functions'

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', {
    schema: {
      querystring: findAllFiltersSchema,
    },
  }, async (request, reply) => {
    const response = await findAll(request.query)
    return reply.status(200).send(response)
  })
}
