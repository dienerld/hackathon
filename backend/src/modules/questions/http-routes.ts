import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { findAll, findAllFiltersSchema } from './functions'

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {
      schema: {
        querystring: findAllFiltersSchema,
      },
    },
    async (_, reply) => {
      const response = await findAll()
      return reply.status(200).send(response)
    },
  )
}
