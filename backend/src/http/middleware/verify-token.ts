import type { FastifyRequest, onRequestHookHandler } from 'fastify'
import { env } from '~/env'

function verifyVerb(allowedVerb: string | null, requestVerb?: string) {
  if (!allowedVerb || !requestVerb)
    return true
  return allowedVerb === requestVerb
}
function isRouteAllowed(_allowedRoute: string, request: FastifyRequest) {
  const currentRoute = request.url
  const requestVerb = request.method.toUpperCase()
  let allowedRoute = _allowedRoute
  let allowedRouteVerb: string | null = null
  if (
    ['GET', 'POST', 'PUT', 'DELETE'].includes(
      allowedRoute.split(' ')[0].toUpperCase(),
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
      verifyVerb(allowedRouteVerb, requestVerb)
      && currentRoute.startsWith(baseRoute)
    ) // Verifica se a rota atual começa com a baseRoute
  }

  const currentRouteWithoutEndSlash
    = currentRoute.length === 1 ? currentRoute : currentRoute.replace(/\/$/, '')

  // verifica se allowedRoute tem verbo

  // Verifica se a rota liberada é um wildcard

  // Para casos em que não é um wildcard
  return (
    allowedRoute === currentRouteWithoutEndSlash
    && verifyVerb(allowedRouteVerb, requestVerb)
  )
}

/**
 * Middleware to verify the token
 * @param publicPaths - Array of public paths
 * @param requiredVerification - Array of path to force validation
 * @returns onRequestHookHandler
 * @example
 * app.addHook('onRequest', verifyToken(['/public-path']))
 * app.addHook('onRequest', verifyToken(['/public-path', '/another-public-path', '/public/*]))
 */

export const verifyToken: onRequestHookHandler = async (request, reply) => {
  const authHeader = request.headers['x-api-key']
  if (!authHeader) {
    reply.code(403).send({
      error: 'Forbidden',
      message: 'No token provided',
    })
    return
  }

  if (authHeader !== env.ACCESS_KEY) {
    reply.code(403).send({
      error: 'Forbidden',
      message: 'Invalid Token',
    })
  }
}
