'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Treatment = { name: string; slug: string; count: number }

type Props = {
  treatments: Treatment[]
  currentTreatment: string
  currentRating: string
}

declare const gtag: (...args: unknown[]) => void

export default function FilterBar({ treatments, currentTreatment, currentRating }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  function handleTreatment(slug: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'filter_used', { filter_type: 'treatment', value: slug || 'all' })
    }
    updateFilter('treatment', slug)
  }

  function handleRating(rating: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'filter_used', { filter_type: 'rating', value: rating || 'all' })
    }
    updateFilter('rating', rating)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      {/* Treatment pills */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleTreatment('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !currentTreatment
              ? 'bg-brand-green text-white border-brand-green'
              : 'bg-white text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green'
          }`}
        >
          All Treatments
        </button>
        {treatments.map((t) => (
          <button
            key={t.slug}
            onClick={() => handleTreatment(t.slug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              currentTreatment === t.slug
                ? 'bg-brand-green text-white border-brand-green'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            {t.name}
            <span className="ml-1.5 text-xs opacity-70">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Rating dropdown */}
      <select
        value={currentRating}
        onChange={(e) => handleRating(e.target.value)}
        className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-brand-green focus:outline-none focus:border-brand-green cursor-pointer"
      >
        <option value="">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
    </div>
  )
}
