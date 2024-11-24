import { join } from 'node:path'
import fastifyAutoload, { type AutoloadPluginOptions } from '@fastify/autoload'

import fastifyCors from '@fastify/cors'
import fastify, { type FastifyServerOptions } from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { parseZodError } from '~/utils/parse-zod-error'

import { rootRouter } from './http/routes/root'

export interface AppOptions
  extends FastifyServerOptions,
  Partial<AutoloadPluginOptions> {}

export const fastifyInstance = fastify()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()
  .register(fastifyCors, { origin: '*' })
  .setErrorHandler(parseZodError)

fastifyInstance.register(rootRouter, { prefix: '/' })

void fastifyInstance.register(fastifyAutoload, {
  dir: join(__dirname, 'modules'),
  maxDepth: 1,
})
