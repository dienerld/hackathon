import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyToken } from '~/http/middleware/verify-token'
import { createUser } from './functions'

const createUserSchema = z.object({
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  externalId: z.string(),
  picture: z.string().optional(),
})

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '',
    {
      onRequest: [verifyToken],
      schema: {
        body: createUserSchema,
      },
    },
    async (request, reply) => {
      const { fullName, firstName, externalId, email, lastName, picture }
        = request.body

      const response = await createUser({
        fullName,
        firstName,
        lastName,
        email,
        externalId,
        picture,
      })

      return reply.status(response.newUser ? 201 : 200).send(response)
    },
  )
}
