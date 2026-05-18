import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function GET(req: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const status = req.nextUrl.searchParams.get('status') || 'pending'
  const rows = await sql`
    SELECT * FROM submitted_reviews
    WHERE status = ${status}
    ORDER BY created_at DESC
  `
  return NextResponse.json(rows)
}
