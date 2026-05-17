import { MetadataRoute } from 'next'
import { getAllReviews } from '@/lib/dummy-reviews'
import { TREATMENT_CONTENT } from '@/lib/treatments-content'
import { LOCALES } from '@/types/review'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://esvitaclinicreviews.com'
  const reviews = getAllReviews()
  const treatmentSlugs = Object.keys(TREATMENT_CONTENT)
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
    entries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    for (const review of reviews) {
      entries.push({
        url: `${baseUrl}/${locale}/reviews/${review.slug}`,
        lastModified: new Date(review.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
    for (const slug of treatmentSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/treatments/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }

  return entries
}
