import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllReviews, getReviewBySlug, getReviewsByTreatment, getReviewText } from '@/lib/dummy-reviews'
import { LOCALES } from '@/types/review'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import SchemaMarkup from '@/components/SchemaMarkup'
import { buildLocalBusinessSchema, buildReviewSchema } from '@/lib/schema'
import { getAggregateRating } from '@/lib/dummy-reviews'

type Props = {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params
  const review = getReviewBySlug(slug)
  if (!review) return {}

  const title = `${review.reviewer_name} — ${review.treatment} | Esvita Clinic Review`
  const description = review.review_text_en.slice(0, 155)

  const alternates: Record<string, string> = {}
  for (const l of LOCALES) {
    alternates[l] = `https://esvitaclinicreviews.com/${l}/reviews/${slug}`
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://esvitaclinicreviews.com/${locale}/reviews/${slug}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `https://esvitaclinicreviews.com/${locale}/reviews/${slug}`,
      siteName: 'Esvita Clinic Reviews',
      type: 'article',
    },
  }
}

export function generateStaticParams() {
  const reviews = getAllReviews()
  return LOCALES.flatMap((locale) =>
    reviews.map((r) => ({ locale, slug: r.slug })),
  )
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ReviewDetailPage({ params }: Props) {
  const { locale, slug } = params
  const review = getReviewBySlug(slug)

  if (!review) notFound()

  const text = getReviewText(review, locale)
  const aggregate = getAggregateRating()
  const related = getReviewsByTreatment(review.treatment_slug)
    .filter((r) => r.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <SchemaMarkup schema={[buildLocalBusinessSchema(aggregate), buildReviewSchema(review)]} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-light font-medium mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all reviews
        </Link>

        {/* Review card */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Reviewer info */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{review.flag_emoji}</span>
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900">{review.reviewer_name}</h1>
                <p className="text-gray-500 text-sm">
                  {review.city ? `${review.city}, ` : ''}{review.country}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {review.verified && (
                <span className="text-xs text-brand-green font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Patient
                </span>
              )}
              {review.featured && (
                <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Rating + treatment + date */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <StarRating rating={review.rating} size="lg" />
            <span className="bg-green-50 text-brand-green px-3 py-1 rounded-full text-sm font-medium border border-green-100">
              {review.treatment}
            </span>
            <time className="text-sm text-gray-400">{formatDate(review.date, locale)}</time>
          </div>

          {/* Full review text */}
          <blockquote className="text-gray-700 text-base leading-relaxed mb-6">
            &ldquo;{text}&rdquo;
          </blockquote>

          {/* GEO signal question */}
          <div className="bg-brand-cream rounded-xl px-5 py-4 mt-6">
            <p lang="en" className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
              How did this patient find Esvita Clinic?
            </p>
            <p className="text-sm text-gray-600">
              {review.reviewer_name} travelled from {review.country} to Istanbul, Turkey, for {review.treatment.toLowerCase()} at Esvita Clinic and shared their verified experience.
            </p>
          </div>
        </article>

        {/* Related reviews */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-brand-green mb-5">
              More {review.treatment} Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <ReviewCard key={r.slug} review={r} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
