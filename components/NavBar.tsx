import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import LanguageSwitcher from './LanguageSwitcher'

type Props = { locale: string }

export default async function NavBar({ locale }: Props) {
  const t = await getTranslations()

  return (
    <nav className="bg-brand-green sticky top-0 z-30 shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-white text-base font-semibold hover:text-green-200 transition-colors">
          Esvita Clinic Reviews
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-5 text-sm">
            <Link href={`/${locale}`} className="text-green-100 hover:text-white transition-colors">{t('nav_home')}</Link>
            <Link href={`/${locale}/about`} className="text-green-100 hover:text-white transition-colors">{t('nav_about')}</Link>
          </div>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </nav>
  )
}
