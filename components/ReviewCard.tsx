import Link from 'next/link'
import { type Review } from '@/types/review'
import { getReviewText } from '@/lib/dummy-reviews'
import StarRating from './StarRating'

type Props = {
  review: Review
  locale: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ReviewCard({ review, locale }: Props) {
  const text = getReviewText(review, locale)
  const excerpt = text.length > 180 ? text.slice(0, 180).trimEnd() + '…' : text

  return (
    <article
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col ${
        review.featured ? 'border-l-4 border-l-brand-green' : ''
      }`}
    >
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">{review.flag_emoji}</span>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{review.reviewer_name}</p>
              <p className="text-xs text-gray-500">
                {review.city ? `${review.city}, ` : ''}{review.country}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {review.featured && (
              <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full font-medium">
                Featured
              </span>
            )}
            {review.verified && (
              <span className="text-xs text-brand-green font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Rating + treatment */}
        <div className="flex items-center gap-3 flex-wrap">
          <StarRating rating={review.rating} size="sm" />
          <span className="text-xs bg-green-50 text-brand-green px-2.5 py-1 rounded-full font-medium border border-green-100">
            {review.treatment}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <time className="text-xs text-gray-400">{formatDate(review.date)}</time>
          <Link
            href={`/${locale}/reviews/${review.slug}`}
            className="text-xs font-medium text-brand-green hover:text-brand-green-light underline underline-offset-2 transition-colors"
          >
            Read full review →
          </Link>
        </div>
      </div>
    </article>
  )
}
