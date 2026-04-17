// ============================================================
// COCINERO NOMADA — Newsletter Configuration
// ============================================================

module.exports = {
  // Set this to the date you want to start sending (YYYY-MM-DD)
  // Day 1 = first chapter, Day 28 = last chapter (epilogo)
  // Day 29+ = recipes (one per day, cycling through all 27)
  NEWSLETTER_START_DATE: process.env.NEWSLETTER_START_DATE || '2026-05-01',

  // Landing page URL (update when deployed)
  LANDING_URL: process.env.LANDING_URL || 'https://yourusername.github.io/cocinero-nomada/landing',

  // Email sender info
  FROM_EMAIL: process.env.FROM_EMAIL || 'newsletter@cocineronomada.com',
  FROM_NAME: 'Cocinero Nomada',

  // Resend API
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  // Resend Audience ID (create at resend.com/audiences)
  RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID || '',

  // Fallback subscribers file (dev/testing only — never commit with real emails)
  SUBSCRIBERS_FILE: './subscribers.json',

  // Total chapters in the book (including prólogo and epílogo)
  TOTAL_CHAPTERS: 28,

  // Brand
  BRAND: {
    name: 'Cocinero Nomada',
    tagline: 'Sabores sin fronteras',
    youtube: 'https://youtube.com/@cocineronomadapr',
    instagram: 'https://instagram.com/cocineronomada',
    colors: {
      black: '#0f0d0b',
      red: '#b83220',
      orange: '#d4622a',
      gold: '#c9973f',
      cream: '#e8dcc8'
    }
  }
};
