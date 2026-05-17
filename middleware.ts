import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'it', 'ru', 'fr', 'es', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
