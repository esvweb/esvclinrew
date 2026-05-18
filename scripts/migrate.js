const { neon } = require('@neondatabase/serverless')
require('dotenv').config({ path: '.env.local' })

const sql = neon(process.env.POSTGRES_URL)

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS submitted_reviews (
      id SERIAL PRIMARY KEY,
      reviewer_name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      country_code VARCHAR(2) NOT NULL,
      flag_emoji VARCHAR(10) NOT NULL,
      city VARCHAR(100),
      treatment VARCHAR(100) NOT NULL,
      treatment_slug VARCHAR(100) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('Migration complete.')
  process.exit(0)
}

migrate().catch(err => { console.error(err); process.exit(1) })
