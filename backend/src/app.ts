import { join } from 'node:path'
import { env } from '@env'
import fastifyAutoload, { type AutoloadPluginOptions } from '@fastify/autoload'

import fastifyCors from '@fastify/cors'
import fastify, { type FastifyServerOptions } from 'fastify'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { parseZodError } from '~/utils/parse-zod-error'

import { rootRouter } from './http/routes/root'

export interface AppOptions
  extends FastifyServerOptions,
  Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {}

export const fastifyInstance = fastify()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()
  .register(fastifyCors, { origin: env.CORS })
  .setErrorHandler(parseZodError)

fastifyInstance.register(rootRouter, { prefix: '/' })

// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application
// void app.register(fastifyAutoload, {
//   dir: join(__dirname, 'plugins'),
//   options: opts,
// })
void fastifyInstance.register(fastifyAutoload, {
  dir: join(__dirname, 'modules'),
  maxDepth: 1,
})
