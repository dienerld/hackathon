import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { findAll } from './functions'

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {},
    async (_, reply) => {
      const response = await findAll()
      return reply.status(200).send(response)
    },
  )
}
