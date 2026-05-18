import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { verifySession, COOKIE } from '@/lib/auth'

const intlMiddleware = createMiddleware({
  locales: ['en', 'it', 'ru', 'fr', 'es', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
})

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin routes — skip intl middleware entirely
  if (pathname === '/adminlogin' || pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin') && pathname !== '/adminlogin') {
      const token = req.cookies.get(COOKIE)?.value
      const valid = token ? await verifySession(token) : false
      if (!valid) {
        return NextResponse.redirect(new URL('/adminlogin', req.url))
      }
    }
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
