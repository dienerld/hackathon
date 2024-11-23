import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod'
import z from 'zod'

export const schemaBadRequest = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().default(400),
  issues: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
    })
  ),
})

export const schemaInternalError = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().default(500),
})

export const parseZodError = (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  console.error(err)

  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: 'Response Validation Error',
      message: "Request doesn't match the schema",
      statusCode: 400,
      issues: err.validation.map(issue => ({
        // @ts-expect-error - mismatch type
        path: issue.params.issue.path[0],
        message: issue.message,
      })),
    })
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: err.name,
      message: err.message,
      statusCode: 500,
    })
  }

  return reply.code(500).send({
    error: err.name,
    message: err.message,
    statusCode: 500,
  })
}
