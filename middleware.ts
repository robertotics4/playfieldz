import { NextResponse } from 'next/server'
import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware'

const middleware = (request: NextRequestWithAuth) => {
  console.log('[MIDDLEWARE_NEXT_AUTH_TOKEN]: ', request.nextauth.token)

  const isPrivateRoutes = request.nextUrl.pathname.startsWith('/private')
  const isAdminUser = request.nextauth.token?.role === 'admin'

  if (isPrivateRoutes && !isAdminUser) {
    return NextResponse.rewrite(new URL('/denied', request.url))
  }
}
const callbackOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware, callbackOptions)
export const config = { matcher: '/private' }
