import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'

type Props = {
  locale: string
}

export default function NavBar({ locale }: Props) {
  return (
    <nav className="bg-brand-green sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-display text-white text-lg font-semibold hover:text-green-200 transition-colors"
        >
          Esvita Clinic Reviews
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5 text-sm">
            <Link href={`/${locale}`} className="text-green-100 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link href={`/${locale}/about`} className="text-green-100 hover:text-white transition-colors">
              About
            </Link>
            <Link
              href={`/${locale}/submit-review`}
              className="bg-white text-brand-green px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-green-50 transition-colors"
            >
              + Write a Review
            </Link>
          </div>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </nav>
  )
}
