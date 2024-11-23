import fp from 'fastify-plugin'

import { routes } from './http-routes'

export default fp(async (fastify, options) => {
  fastify.register(routes, { prefix: '/topics' })
})
