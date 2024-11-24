import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyToken } from '~/http/middleware/verify-token'
import { createUser, getUser, userFilterSchema } from './functions'

const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  externalId: z.string(),
  classroomId: z.string(),
})

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '',
    { schema: { body: createUserSchema } },
    async (request, reply) => {
      const response = await createUser(request.body)
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
