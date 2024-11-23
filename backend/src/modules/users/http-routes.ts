import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyToken } from '~/http/middleware/verify-token'
import { createUser, getUser, userFilterSchema } from './functions'

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

  app.get(
    '/:externalId',
    {
      schema: {
        params: userFilterSchema,
      },
    },
    async (request, reply) => {
      const { externalId } = request.params

      const response = await getUser(externalId)
      if (!response) {
        return reply.status(404).send({
          message: 'User not found',
          statusCode: 404,
          errorCode: 'USER_NOT_FOUND',
        })
      }

      return reply.status(200).send(response)
    },
  )
}
