'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const TREATMENTS = [
  { name: 'Hair Transplant', slug: 'hair-transplant' },
  { name: 'Dental Treatment', slug: 'dental-treatment' },
  { name: 'Rhinoplasty', slug: 'rhinoplasty' },
  { name: 'Beard Transplant', slug: 'beard-transplant' },
  { name: 'Eyebrow Transplant', slug: 'eyebrow-transplant' },
]

const COUNTRIES = [
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Russia', code: 'RU' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Austria', code: 'AT' },
  { name: 'Poland', code: 'PL' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Other', code: 'XX' },
]

type Field = {
  reviewer_name: string
  country_code: string
  city: string
  treatment_slug: string
  rating: number
  review_text: string
  honeypot: string
}

export default function SubmitReviewPage() {
  const params = useParams()
  const locale = params.locale as string

  const [form, setForm] = useState<Field>({
    reviewer_name: '',
    country_code: '',
    city: '',
    treatment_slug: '',
    rating: 0,
    review_text: '',
    honeypot: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: keyof Field, value: string | number) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.rating === 0) { setError('Please select a rating.'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/reviews/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-brand-green mb-3">Thank you!</h1>
        <p className="text-gray-600 mb-8">Your review has been submitted and is pending approval. It will appear on the site once reviewed.</p>
        <Link href={`/${locale}`} className="inline-block bg-brand-green text-white px-6 py-3 rounded-full font-medium hover:bg-brand-green-light transition-colors">
          Back to reviews
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 text-sm text-brand-green font-medium mb-8 hover:text-brand-green-light transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to reviews
      </Link>

      <h1 className="font-display text-3xl font-bold text-brand-green mb-2">Share Your Experience</h1>
      <p className="text-gray-500 mb-8">Your review helps other patients make informed decisions about their treatment in Istanbul.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        {/* Honeypot - hidden from humans */}
        <input
          type="text"
          value={form.honeypot}
          onChange={e => set('honeypot', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.reviewer_name}
              onChange={e => set('reviewer_name', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              placeholder="e.g. Maria R."
              required
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              value={form.city}
              onChange={e => set('city', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              placeholder="e.g. London"
              maxLength={100}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country <span className="text-red-400">*</span></label>
            <select
              value={form.country_code}
              onChange={e => set('country_code', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-white"
              required
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Treatment <span className="text-red-400">*</span></label>
            <select
              value={form.treatment_slug}
              onChange={e => set('treatment_slug', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-white"
              required
            >
              <option value="">Select treatment</option>
              {TREATMENTS.map(t => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating <span className="text-red-400">*</span></label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => set('rating', star)}
                className={`text-3xl transition-transform hover:scale-110 ${form.rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your review <span className="text-red-400">*</span></label>
          <textarea
            value={form.review_text}
            onChange={e => set('review_text', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-none"
            rows={6}
            placeholder="Share your experience at Esvita Clinic — what was the treatment like, how was the team, would you recommend it?"
            required
            minLength={20}
          />
          <p className="text-xs text-gray-400 mt-1">{form.review_text.length} characters (minimum 20)</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-green text-white py-3 rounded-xl font-medium hover:bg-brand-green-light transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>

        <p className="text-xs text-center text-gray-400">
          Reviews are moderated before publication. We do not edit review content.
        </p>
      </form>
    </div>
  )
}
