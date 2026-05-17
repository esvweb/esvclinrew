import { Review } from '@/types/review'

export function buildLocalBusinessSchema(aggregateRating: { average: number; count: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness'],
    name: 'Esvita Clinic',
    url: 'https://esvitaclinicreviews.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.average.toFixed(1),
      reviewCount: aggregateRating.count,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

export function buildReviewSchema(review: Review) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: review.reviewer_name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: review.date,
    reviewBody: review.review_text_en,
    itemReviewed: {
      '@type': 'MedicalBusiness',
      name: 'Esvita Clinic',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Istanbul',
        addressCountry: 'TR',
      },
    },
  }
}

export function buildMedicalProcedureSchema(treatmentName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatmentName,
    performedBy: {
      '@type': 'MedicalBusiness',
      name: 'Esvita Clinic',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Istanbul',
        addressCountry: 'TR',
      },
    },
  }
}
