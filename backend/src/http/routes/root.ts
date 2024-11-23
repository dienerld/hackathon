import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const rootRouter: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '',
    {},
    async (req, reply) => {
      reply.send({
        status: 'ok',
        message: 'Welcome to the API',
      })
    },
  )
}
