'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Review = {
  id: number
  reviewer_name: string
  country: string
  flag_emoji: string
  city: string | null
  treatment: string
  rating: number
  review_text: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const STATUS_TABS = ['pending', 'approved', 'rejected'] as const

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeTab, setActiveTab] = useState<typeof STATUS_TABS[number]>('pending')
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState<Record<string, number>>({ pending: 0, approved: 0, rejected: 0 })

  const fetchReviews = useCallback(async (status: string) => {
    setLoading(true)
    const res = await fetch(`/api/admin/reviews?status=${status}`)
    if (res.status === 401) { router.push('/adminlogin'); return }
    const data = await res.json()
    setReviews(data)
    setLoading(false)
  }, [router])

  const fetchCounts = useCallback(async () => {
    const results = await Promise.all(
      STATUS_TABS.map(s => fetch(`/api/admin/reviews?status=${s}`).then(r => r.json()))
    )
    setCounts({
      pending: results[0].length,
      approved: results[1].length,
      rejected: results[2].length,
    })
  }, [])

  useEffect(() => {
    fetchReviews(activeTab)
    fetchCounts()
  }, [activeTab, fetchReviews, fetchCounts])

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setReviews(r => r.filter(x => x.id !== id))
    fetchCounts()
  }

  async function deleteReview(id: number) {
    if (!confirm('Delete this review permanently?')) return
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
    setReviews(r => r.filter(x => x.id !== id))
    fetchCounts()
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/adminlogin')
  }

  return (
    <div>
        {/* Header */}
        <header className="bg-[#1B4332] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Esvita Reviews — Admin</h1>
            <p className="text-green-300 text-xs mt-0.5">Review Management Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/en" target="_blank" className="text-green-200 text-sm hover:text-white transition-colors">
              View site →
            </a>
            <button onClick={logout} className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              Sign out
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATUS_TABS.map(s => (
              <div key={s} className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{counts[s]}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {STATUS_TABS.map(s => (
              <button
                key={s}
                onClick={() => setActiveTab(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  activeTab === s
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1B4332]'
                }`}
              >
                {s} {counts[s] > 0 && <span className="ml-1 opacity-70">({counts[s]})</span>}
              </button>
            ))}
          </div>

          {/* Reviews list */}
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading…</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No {activeTab} reviews.</div>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="text-xl">{review.flag_emoji}</span>
                        <span className="font-semibold text-gray-900">{review.reviewer_name}</span>
                        <span className="text-sm text-gray-500">{review.city ? `${review.city}, ` : ''}{review.country}</span>
                        <span className="text-xs bg-green-50 text-[#1B4332] px-2 py-0.5 rounded-full border border-green-100">{review.treatment}</span>
                        <StarDisplay rating={review.rating} />
                        <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString('en-GB')}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.review_text}</p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      {activeTab === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(review.id, 'approved')}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => updateStatus(review.id, 'rejected')}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      {activeTab === 'rejected' && (
                        <button
                          onClick={() => updateStatus(review.id, 'approved')}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          ✓ Approve
                        </button>
                      )}
                      {activeTab === 'approved' && (
                        <button
                          onClick={() => updateStatus(review.id, 'rejected')}
                          className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          ✕ Reject
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}
