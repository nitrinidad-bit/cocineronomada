#!/usr/bin/env node
// ============================================================
// COCINERO NOMADA — Daily Newsletter Sender
// Usage:
//   node send-email.js           # Send today's email
//   node send-email.js --test    # Preview without sending
//   node send-email.js --day 5   # Send specific day's content
// ============================================================

const fs = require('fs');
const path = require('path');
const config = require('./config');

// ---- Parse args ----
const args = process.argv.slice(2);
const isTest = args.includes('--test');
const forceDayIdx = args.indexOf('--day');
const forceDay = forceDayIdx !== -1 ? parseInt(args[forceDayIdx + 1]) : null;

// ---- Calculate day number ----
function getDayNumber() {
  if (forceDay !== null) return forceDay;
  const start = new Date(config.NEWSLETTER_START_DATE);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return diff + 1; // Day 1 is the first day
}

// ---- Load content ----
function loadChapters() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'chapters.json'), 'utf8'));
}

function loadRecipes() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'recipes.json'), 'utf8'));
}

function loadSubscribers() {
  const file = path.join(__dirname, config.SUBSCRIBERS_FILE);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// ---- Build email ----
function buildChapterEmail(chapter, dayNumber) {
  let template = fs.readFileSync(
    path.join(__dirname, 'templates', 'chapter.html'), 'utf8'
  );

  const excerpt = chapter.excerpt || chapter.content.substring(0, 300) + '...';

  template = template
    .replace(/\{\{DAY_NUMBER\}\}/g, dayNumber)
    .replace(/\{\{CHAPTER_NUMBER\}\}/g, chapter.number)
    .replace(/\{\{CHAPTER_TITLE\}\}/g, chapter.title)
    .replace(/\{\{CITY\}\}/g, chapter.city)
    .replace(/\{\{COUNTRY\}\}/g, chapter.country)
    .replace(/\{\{EXCERPT\}\}/g, excerpt)
    .replace(/\{\{LANDING_URL\}\}/g, config.LANDING_URL)
    .replace(/\{\{YOUTUBE_URL\}\}/g, config.BRAND.youtube)
    .replace(/\{\{INSTAGRAM_URL\}\}/g, config.BRAND.instagram)
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, config.LANDING_URL + '?unsubscribe=true');

  return {
    subject: `Dia ${dayNumber}: ${chapter.title} — Cocinero Nomada`,
    html: template
  };
}

function buildRecipeEmail(recipe) {
  let template = fs.readFileSync(
    path.join(__dirname, 'templates', 'recipe.html'), 'utf8'
  );

  const ingredientsHTML = recipe.ingredients
    .map(i => `<p style="margin:0 0 6px;font-size:14px;color:#b8a898;padding-left:12px;">&bull; ${i}</p>`)
    .join('');

  const stepsHTML = recipe.steps
    .map((s, idx) => `<p style="margin:0 0 10px;font-size:14px;color:#b8a898;padding-left:12px;"><strong style="color:#e8dcc8;">${idx + 1}.</strong> ${s}</p>`)
    .join('');

  template = template
    .replace(/\{\{RECIPE_EMOJI\}\}/g, recipe.emoji)
    .replace(/\{\{RECIPE_NAME\}\}/g, recipe.name)
    .replace(/\{\{CITY\}\}/g, recipe.city)
    .replace(/\{\{COUNTRY\}\}/g, recipe.country)
    .replace(/\{\{RECIPE_DESC\}\}/g, recipe.desc)
    .replace(/\{\{SERVINGS\}\}/g, recipe.servings)
    .replace(/\{\{TIME\}\}/g, recipe.time)
    .replace(/\{\{DIFFICULTY\}\}/g, recipe.difficulty)
    .replace(/\{\{INGREDIENTS_HTML\}\}/g, ingredientsHTML)
    .replace(/\{\{STEPS_HTML\}\}/g, stepsHTML)
    .replace(/\{\{LANDING_URL\}\}/g, config.LANDING_URL)
    .replace(/\{\{YOUTUBE_URL\}\}/g, config.BRAND.youtube)
    .replace(/\{\{INSTAGRAM_URL\}\}/g, config.BRAND.instagram)
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, config.LANDING_URL + '?unsubscribe=true');

  return {
    subject: `Receta: ${recipe.emoji} ${recipe.name} — Cocinero Nomada`,
    html: template
  };
}

// ---- Send via Resend API ----
async function sendEmail(to, subject, html) {
  if (!config.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured. Set it as env variable or in config.js');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${err}`);
  }

  return response.json();
}

// ---- Main ----
async function main() {
  const dayNumber = getDayNumber();
  console.log(`\n📬 Cocinero Nomada Newsletter — Dia ${dayNumber}`);
  console.log(`   Start date: ${config.NEWSLETTER_START_DATE}`);
  console.log(`   Mode: ${isTest ? 'TEST (no emails sent)' : 'LIVE'}\n`);

  if (dayNumber < 1) {
    console.log('⏳ Newsletter has not started yet. Nothing to send.');
    return;
  }

  let email;

  if (dayNumber <= config.TOTAL_CHAPTERS) {
    // Phase 1: Chapters (Day 1-28)
    const chapters = loadChapters();
    const chapter = chapters[dayNumber - 1]; // 0-indexed
    if (!chapter) {
      console.error(`❌ Chapter not found for day ${dayNumber}`);
      process.exit(1);
    }
    console.log(`📖 Phase: CHAPTERS`);
    console.log(`   Sending: Capitulo ${chapter.number} — ${chapter.title}`);
    email = buildChapterEmail(chapter, dayNumber);
  } else {
    // Phase 2: Recipes (Day 29+)
    const recipes = loadRecipes();
    const recipeIndex = (dayNumber - config.TOTAL_CHAPTERS - 1) % recipes.length;
    const recipe = recipes[recipeIndex];
    console.log(`🍳 Phase: RECIPES`);
    console.log(`   Sending: ${recipe.emoji} ${recipe.name}`);
    email = buildRecipeEmail(recipe);
  }

  console.log(`   Subject: ${email.subject}\n`);

  if (isTest) {
    // Write preview to file
    const previewPath = path.join(__dirname, 'preview.html');
    fs.writeFileSync(previewPath, email.html);
    console.log(`✅ Preview saved to: ${previewPath}`);
    console.log('   Open it in a browser to see the email.\n');
    return;
  }

  // Load subscribers and send
  const subscribers = loadSubscribers();
  if (subscribers.length === 0) {
    console.log('⚠️  No subscribers found. Add emails to subscribers.json');
    return;
  }

  console.log(`📤 Sending to ${subscribers.length} subscriber(s)...\n`);

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const recipientEmail = typeof sub === 'string' ? sub : sub.email;
    try {
      await sendEmail(recipientEmail, email.subject, email.html);
      sent++;
      console.log(`   ✅ ${recipientEmail}`);
    } catch (err) {
      failed++;
      console.error(`   ❌ ${recipientEmail}: ${err.message}`);
    }
  }

  console.log(`\n📊 Results: ${sent} sent, ${failed} failed\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
