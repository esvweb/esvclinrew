import Link from 'next/link'
import StarRating from './StarRating'

type Props = {
  average: number
  count: number
  locale?: string
}

export default function AggregateRating({ average, count, locale }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-brand-cream border border-green-100 rounded-2xl px-8 py-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="text-center sm:text-left">
          <div className="font-display text-6xl font-bold text-brand-green leading-none">
            {average.toFixed(1)}
          </div>
          <div className="text-gray-500 text-sm mt-1">out of 5</div>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-2">
          <StarRating rating={Math.round(average)} size="lg" />
          <p className="text-gray-600 text-sm">
            Based on <span className="font-semibold text-brand-green">{count}</span> verified reviews
          </p>
        </div>
      </div>

      {locale && (
        <Link
          href={`/${locale}/submit-review`}
          className="shrink-0 inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-green-light transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Write a Review
        </Link>
      )}
    </div>
  )
}
