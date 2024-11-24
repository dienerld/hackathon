import fp from 'fastify-plugin'
import { routes } from './http-routes'

export default fp(async (fastify) => {
  fastify.register(routes, { prefix: '/questions' })
})
