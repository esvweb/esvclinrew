import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { type Review } from '@/types/review'
import { getReviewText } from '@/lib/dummy-reviews'
import StarRating from './StarRating'

type Props = {
  review: Review
  locale: string
}

const AVATAR_COLORS = [
  'bg-green-600', 'bg-blue-600', 'bg-purple-600', 'bg-rose-600',
  'bg-amber-600', 'bg-teal-600', 'bg-indigo-600', 'bg-cyan-600',
]

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function getColor(name: string) {
  let hash = 0
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function formatDate(dateStr: string, locale: string) {
  try {
    return new Date(dateStr).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale, {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default async function ReviewCard({ review, locale }: Props) {
  const t = await getTranslations()
  const text = getReviewText(review, locale)

  return (
    <article className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full ${getColor(review.reviewer_name)} flex items-center justify-center text-white text-sm font-semibold`}>
          {getInitials(review.reviewer_name)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span className="font-semibold text-gray-900 text-sm">{review.reviewer_name}</span>
              {review.verified && (
                <span className="ml-2 text-xs text-brand-green font-medium">
                  ✓ {t('verified_patient')}
                </span>
              )}
            </div>
            <time className="text-xs text-gray-400 shrink-0">{formatDate(review.date, locale)}</time>
          </div>

          {/* Location */}
          <p className="text-xs text-gray-500 mb-2">
            {review.flag_emoji} {review.city ? `${review.city}, ` : ''}{review.country}
          </p>

          {/* Stars + treatment */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs bg-green-50 text-brand-green px-2 py-0.5 rounded-full border border-green-100 font-medium">
              {review.treatment}
            </span>
            {review.featured && (
              <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full font-medium">
                {t('featured')}
              </span>
            )}
          </div>

          {/* Review text */}
          <p className="text-gray-700 text-sm leading-relaxed">{text}</p>

          {/* Read more link */}
          <Link
            href={`/${locale}/reviews/${review.slug}`}
            className="inline-block mt-2 text-xs text-brand-green hover:text-brand-green-light font-medium transition-colors"
          >
            {t('read_full_review')} →
          </Link>
        </div>
      </div>
    </article>
  )
}
