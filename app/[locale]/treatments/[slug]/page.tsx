import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getReviewsByTreatment, getAggregateRating } from '@/lib/dummy-reviews'
import { getTreatmentContent, TREATMENT_CONTENT } from '@/lib/treatments-content'
import { LOCALES } from '@/types/review'
import ReviewGrid from '@/components/ReviewGrid'
import AggregateRating from '@/components/AggregateRating'
import SchemaMarkup from '@/components/SchemaMarkup'
import { buildLocalBusinessSchema, buildMedicalProcedureSchema } from '@/lib/schema'

type Props = {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params
  const content = getTreatmentContent(slug)
  if (!content) return {}

  const alternates: Record<string, string> = {}
  for (const l of LOCALES) {
    alternates[l] = `https://esvitaclinicreviews.com/${l}/treatments/${slug}`
  }

  return {
    title: `${content.name} Reviews — Esvita Clinic Istanbul`,
    description: content.description.slice(0, 155),
    alternates: {
      canonical: `https://esvitaclinicreviews.com/${locale}/treatments/${slug}`,
      languages: alternates,
    },
    openGraph: {
      title: `${content.name} Reviews — Esvita Clinic Istanbul`,
      description: content.description.slice(0, 155),
      url: `https://esvitaclinicreviews.com/${locale}/treatments/${slug}`,
      siteName: 'Esvita Clinic Reviews',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  const slugs = Object.keys(TREATMENT_CONTENT)
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export default function TreatmentPage({ params }: Props) {
  const { locale, slug } = params
  const content = getTreatmentContent(slug)
  if (!content) notFound()

  const reviews = getReviewsByTreatment(slug)
  const aggregate = getAggregateRating()

  const treatmentAggregate = reviews.length > 0
    ? {
        average: Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10,
        count: reviews.length,
      }
    : null

  return (
    <>
      <SchemaMarkup
        schema={[buildLocalBusinessSchema(aggregate), buildMedicalProcedureSchema(content.name)]}
      />

      {/* Hero */}
      <section className="bg-brand-cream border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-light font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All reviews
          </Link>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-green mb-4">
            {content.name} Reviews
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mb-8">{content.description}</p>

          {treatmentAggregate && (
            <AggregateRating average={treatmentAggregate.average} count={treatmentAggregate.count} />
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-brand-green mb-6">
          Patient Reviews — {content.name}
        </h2>
        <ReviewGrid reviews={reviews} locale={locale} />
      </section>

      {/* FAQ / GEO content */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-bold text-brand-green mb-6">
          {content.name} — FAQs
        </h2>
        <div className="space-y-3">
          {content.faqs.map(({ q, a }) => (
            <details key={q} className="group bg-white border border-gray-100 rounded-lg">
              <summary className="flex justify-between items-center px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-brand-green transition-colors">
                {q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
