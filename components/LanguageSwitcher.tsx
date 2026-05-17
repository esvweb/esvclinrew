'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { LOCALES, LOCALE_LABELS, FLAG_EMOJIS, type Locale } from '@/types/review'

type Props = {
  currentLocale: string
}

declare const gtag: (...args: unknown[]) => void

export default function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) { setOpen(false); return }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_switch', { from_lang: currentLocale, to_lang: newLocale })
    }

    // Replace the locale prefix in the current path
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setOpen(false)
  }

  const current = currentLocale as Locale

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-green-200 transition-colors px-2 py-1 rounded"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{FLAG_EMOJIS[current]}</span>
        <span className="hidden sm:inline">{current.toUpperCase()}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 mt-1 z-20 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[140px]"
          >
            {LOCALES.map((locale) => (
              <li key={locale}>
                <button
                  role="option"
                  aria-selected={locale === current}
                  onClick={() => switchLocale(locale)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-green-50 transition-colors ${
                    locale === current ? 'bg-green-50 font-semibold text-brand-green' : 'text-gray-700'
                  }`}
                >
                  <span>{FLAG_EMOJIS[locale]}</span>
                  <span>{LOCALE_LABELS[locale]}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
