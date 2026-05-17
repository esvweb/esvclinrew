import { getRequestConfig } from 'next-intl/server'
import { LOCALES } from '@/types/review'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !LOCALES.includes(locale as 'en' | 'it' | 'ru' | 'fr' | 'es' | 'tr')) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
