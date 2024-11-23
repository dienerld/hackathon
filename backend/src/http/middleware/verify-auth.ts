import type { FastifyRequest, onRequestHookHandler } from 'fastify'
import { JsonWebTokenError, verify, TokenExpiredError } from 'jsonwebtoken'
import z from 'zod'
import { env } from '~/env'

function verifyVerb(allowedVerb: string | null, requestVerb?: string) {
  if (!allowedVerb || !requestVerb) return true
  return allowedVerb === requestVerb
}

function isRouteAllowed(_allowedRoute: string, request: FastifyRequest) {
  const currentRoute = request.url
  const requestVerb = request.method.toUpperCase()
  let allowedRoute = _allowedRoute
  let allowedRouteVerb: string | null = null
  if (
    ['GET', 'POST', 'PUT', 'DELETE'].includes(
      allowedRoute.split(' ')[0].toUpperCase()
    )
  ) {
    const [_allowedRouteVerb, _allowedRoute] = allowedRoute.split(' ')
    allowedRouteVerb = _allowedRouteVerb
    allowedRoute = _allowedRoute
  }

  if (allowedRoute.endsWith('*')) {
    let baseRoute = allowedRoute.slice(0, -1) // Remove o wildcard
    if (baseRoute.endsWith('/')) {
      baseRoute = baseRoute.slice(0, -1)
    }

    return (
      verifyVerb(allowedRouteVerb, requestVerb) &&
      currentRoute.startsWith(baseRoute)
    ) // Verifica se a rota atual começa com a baseRoute
  }

  const currentRouteWithoutEndSlash =
    currentRoute.length === 1 ? currentRoute : currentRoute.replace(/\/$/, '')

  // verifica se allowedRoute tem verbo

  // Verifica se a rota liberada é um wildcard

  // Para casos em que não é um wildcard
  return (
    allowedRoute === currentRouteWithoutEndSlash &&
    verifyVerb(allowedRouteVerb, requestVerb)
  )
}


export const verifyAuth: onRequestHookHandler = async (request, reply) => {
  const userSession = request.headers['x-user-session'] as string
  try {
    const session = verify(userSession, env.SESSION_SECRET) as unknown as {
      id: string
    }
    if (!session) {
      reply.code(401).send({
        error: 'Unauthorized',
        message: 'No session provided',
      })
      return
    }
    request.session.set('user_id', session.id)
    request.session.save()
    return
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return reply.code(401).send(
        schemaResponseUnauthorized.parse({
          error: 'Unauthorized',
          message: 'No user id provided',
          statusCode: 401,
        })
      )
    }
    if (e instanceof TokenExpiredError) {
      return reply.code(401).send(
        schemaResponseUnauthorized.parse({
          error: 'Unauthorized',
          message: 'Token expired',
          statusCode: 401,
        })
      )
    }

    return reply.code(401).send(
      schemaResponseUnauthorized.parse({
        error: 'Unauthorized',
        message: 'Invalid token',
        statusCode: 401,
      })
    )
  }
}

export const schemaResponseUnauthorized = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.literal(401),
})
