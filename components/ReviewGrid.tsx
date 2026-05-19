import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { type Review } from '@/types/review'
import ReviewCard from './ReviewCard'

const PER_PAGE = 20

type Props = {
  reviews: Review[]
  locale: string
  currentPage: number
  currentTreatment?: string
  currentRating?: string
}

export default async function ReviewGrid({ reviews, locale, currentPage, currentTreatment, currentRating }: Props) {
  const t = await getTranslations()
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const page = Math.max(1, Math.min(currentPage, totalPages || 1))
  const paged = reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function pageUrl(p: number) {
    const params = new URLSearchParams()
    if (currentTreatment) params.set('treatment', currentTreatment)
    if (currentRating) params.set('rating', currentRating)
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/${locale}${qs ? `?${qs}` : ''}`
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No reviews found matching your filters.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-3">
        {paged.map((review) => (
          <ReviewCard key={review.slug} review={review} locale={locale} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-10">
          {page > 1 && (
            <Link href={pageUrl(page - 1)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors">
              {t('previous')}
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | '...')[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...')
              acc.push(p)
              return acc
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="px-3 py-2 text-sm text-gray-400">…</span>
              ) : (
                <Link
                  key={p}
                  href={pageUrl(p as number)}
                  className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                    p === page
                      ? 'bg-brand-green text-white border-brand-green'
                      : 'border-gray-200 hover:border-brand-green hover:text-brand-green'
                  }`}
                >
                  {p}
                </Link>
              )
            )}

          {page < totalPages && (
            <Link href={pageUrl(page + 1)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors">
              {t('next')}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
