import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const TREATMENTS = [
  { name: 'Hair Transplant', slug: 'hair-transplant' },
  { name: 'Dental Treatment', slug: 'dental-treatment' },
  { name: 'Rhinoplasty', slug: 'rhinoplasty' },
  { name: 'Beard Transplant', slug: 'beard-transplant' },
  { name: 'Eyebrow Transplant', slug: 'eyebrow-transplant' },
]

const COUNTRIES = [
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺' },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
  { name: 'Other', code: 'XX', flag: '🌍' },
]

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { reviewer_name, country_code, city, treatment_slug, rating, review_text, honeypot } = body

  // Spam check
  if (honeypot) return NextResponse.json({ ok: true })

  // Validate
  if (!reviewer_name?.trim() || !country_code || !treatment_slug || !rating || !review_text?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (review_text.trim().length < 20) {
    return NextResponse.json({ error: 'Review too short' }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
  }

  const country = COUNTRIES.find((c) => c.code === country_code)
  const treatment = TREATMENTS.find((t) => t.slug === treatment_slug)

  if (!country || !treatment) {
    return NextResponse.json({ error: 'Invalid country or treatment' }, { status: 400 })
  }

  await sql`
    INSERT INTO submitted_reviews
      (reviewer_name, country, country_code, flag_emoji, city, treatment, treatment_slug, rating, review_text)
    VALUES
      (${reviewer_name.trim()}, ${country.name}, ${country.code}, ${country.flag},
       ${city?.trim() || null}, ${treatment.name}, ${treatment.slug},
       ${rating}, ${review_text.trim()})
  `

  return NextResponse.json({ ok: true })
}
