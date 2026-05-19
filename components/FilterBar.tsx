'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

type Treatment = { name: string; slug: string; count: number }

type Props = {
  treatments: Treatment[]
  currentTreatment: string
  currentRating: string
  currentSort: string
}

declare const gtag: (...args: unknown[]) => void

export default function FilterBar({ treatments, currentTreatment, currentRating, currentSort }: Props) {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) { params.set(key, value) } else { params.delete(key) }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  function handleTreatment(slug: string) {
    if (typeof gtag !== 'undefined') gtag('event', 'filter_used', { filter_type: 'treatment', value: slug || 'all' })
    updateFilter('treatment', slug)
  }

  function handleRating(rating: string) {
    if (typeof gtag !== 'undefined') gtag('event', 'filter_used', { filter_type: 'rating', value: rating || 'all' })
    updateFilter('rating', rating)
  }

  function handleSort(sort: string) {
    updateFilter('sort', sort === 'oldest' ? 'oldest' : '')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleTreatment('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !currentTreatment ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green'
          }`}
        >
          {t('filter_all_treatments')}
        </button>
        {treatments.map((tr) => (
          <button
            key={tr.slug}
            onClick={() => handleTreatment(tr.slug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              currentTreatment === tr.slug ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            {tr.name}<span className="ml-1.5 text-xs opacity-70">({tr.count})</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          value={currentRating}
          onChange={(e) => handleRating(e.target.value)}
          className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-brand-green focus:outline-none focus:border-brand-green cursor-pointer"
        >
          <option value="">{t('filter_all_ratings')}</option>
          <option value="5">5 ★★★★★</option>
          <option value="4">4 ★★★★☆</option>
          <option value="3">3 ★★★☆☆</option>
          <option value="2">2 ★★☆☆☆</option>
          <option value="1">1 ★☆☆☆☆</option>
        </select>

        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-brand-green focus:outline-none focus:border-brand-green cursor-pointer"
        >
          <option value="newest">{t('sort_newest')}</option>
          <option value="oldest">{t('sort_oldest')}</option>
        </select>
      </div>
    </div>
  )
}
