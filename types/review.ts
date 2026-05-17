export type Review = {
  slug: string
  reviewer_name: string
  country: string
  country_code: string
  flag_emoji: string
  city?: string
  treatment: string
  treatment_slug: string
  rating: number
  date: string
  year: number
  review_text_en: string
  review_text_it?: string
  review_text_ru?: string
  review_text_fr?: string
  review_text_es?: string
  review_text_tr?: string
  verified: boolean
  featured: boolean
}

export type Locale = 'en' | 'it' | 'ru' | 'fr' | 'es' | 'tr'

export const LOCALES: Locale[] = ['en', 'it', 'ru', 'fr', 'es', 'tr']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  ru: 'Русский',
  fr: 'Français',
  es: 'Español',
  tr: 'Türkçe',
}

export const FLAG_EMOJIS: Record<Locale, string> = {
  en: '🇬🇧',
  it: '🇮🇹',
  ru: '🇷🇺',
  fr: '🇫🇷',
  es: '🇪🇸',
  tr: '🇹🇷',
}
