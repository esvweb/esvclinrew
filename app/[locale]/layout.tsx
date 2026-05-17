import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/types/review'
import NavBar from '@/components/NavBar'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://esvitaclinicreviews.com'),
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <NavBar locale={locale} />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-brand-green text-white mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm">
              <p className="font-display text-lg mb-2">Esvita Clinic Reviews</p>
              <p className="text-green-200">© 2025 Esvita Clinic Reviews</p>
              <p className="text-green-300 text-xs mt-2">
                This site displays verified patient reviews for informational purposes.
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-20GJGXLN26"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-20GJGXLN26');
        `}</Script>
      </body>
    </html>
  )
}
