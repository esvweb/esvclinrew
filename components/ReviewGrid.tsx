import { type Review } from '@/types/review'
import ReviewCard from './ReviewCard'

type Props = {
  reviews: Review[]
  locale: string
}

export default function ReviewGrid({ reviews, locale }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">No reviews found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <ReviewCard key={review.slug} review={review} locale={locale} />
      ))}
    </div>
  )
}
