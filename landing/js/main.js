// ============================================================
// COCINERO NOMADA — Landing Page JS
// ============================================================

const COUNTRY_COLORS = {
  "Puerto Rico": "#b83220",
  "Estados Unidos": "#5a7d9a",
  "Colombia": "#c9973f",
  "Peru": "#d4622a",
  "Ecuador": "#6a5acd",
  "Mexico": "#4a7a5f"
};

let chapters = [];
let recipes = [];
let allPosts = [];

// ---- Load content ----
async function loadContent() {
  try {
    const [chapRes, recRes] = await Promise.all([
      fetch('content/chapters.json'),
      fetch('content/recipes.json')
    ]);
    chapters = await chapRes.json();
    recipes = await recRes.json();

    // Build mixed posts for blog preview
    allPosts = buildMixedPosts();
    renderBlogGrid(allPosts.slice(0, 6));
  } catch (e) {
    console.error('Error loading content:', e);
    document.getElementById('blogGrid').innerHTML =
      '<p style="color:var(--muted);text-align:center;grid-column:1/-1">Contenido cargando...</p>';
  }
}

function buildMixedPosts() {
  const chapterPosts = chapters
    .filter(c => c.id !== 0 && c.id !== 27) // skip prólogo & epílogo for blog preview
    .map(c => ({
      type: 'chapter',
      title: c.title,
      city: c.city,
      country: c.country,
      excerpt: c.excerpt,
      content: c.content,
      number: c.number,
      id: c.id
    }));

  const recipePosts = recipes.map(r => ({
    type: 'recipe',
    title: r.emoji + ' ' + r.name,
    city: r.city,
    country: r.country,
    excerpt: r.desc,
    tags: r.tags,
    recipe: r
  }));

  // Interleave: 2 chapters, 1 recipe
  const mixed = [];
  let ci = 0, ri = 0;
  while (ci < chapterPosts.length || ri < recipePosts.length) {
    if (ci < chapterPosts.length) mixed.push(chapterPosts[ci++]);
    if (ci < chapterPosts.length) mixed.push(chapterPosts[ci++]);
    if (ri < recipePosts.length) mixed.push(recipePosts[ri++]);
  }
  return mixed;
}

// ---- Render blog grid ----
function renderBlogGrid(posts) {
  const grid = document.getElementById('blogGrid');
  grid.innerHTML = posts.map((post, i) => {
    const color = COUNTRY_COLORS[post.country] || '#c9973f';
    const typeLabel = post.type === 'chapter' ? 'Cronica' : 'Receta';

    let tagsHTML = '';
    if (post.tags) {
      tagsHTML = `<div class="blog-card-tags">${post.tags.map(t => `<span>${t}</span>`).join('')}</div>`;
    }

    return `
      <article class="blog-card" data-type="${post.type}" data-country="${post.country}" data-index="${i}" onclick="openPost(${i})">
        <span class="blog-card-type ${post.type}">${typeLabel}</span>
        <h3>${post.title}</h3>
        <div class="blog-card-meta">
          <span style="color:${color}">${post.city}</span>
          <span>${post.country}</span>
        </div>
        <p>${post.excerpt}</p>
        ${tagsHTML}
      </article>
    `;
  }).join('');
}

// ---- Filters ----
document.addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;
  let filtered;

  if (filter === 'all') {
    filtered = allPosts;
  } else if (filter === 'chapter' || filter === 'recipe') {
    filtered = allPosts.filter(p => p.type === filter);
  } else {
    filtered = allPosts.filter(p => p.country === filter);
  }

  renderBlogGrid(filtered.slice(0, 6));
});

// ---- Modal ----
function openPost(index) {
  const post = allPosts[index];
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');

  let html = '';

  if (post.type === 'chapter') {
    const paragraphs = post.content
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => `<p>${p.trim()}</p>`)
      .join('');

    html = `
      <span class="blog-card-type chapter">Capitulo ${post.number}</span>
      <h2>${post.title}</h2>
      <div class="modal-meta">${post.city}, ${post.country}</div>
      <div class="modal-body">${paragraphs}</div>
    `;
  } else {
    const r = post.recipe;
    html = `
      <span class="blog-card-type recipe">Receta</span>
      <h2>${r.emoji} ${r.name}</h2>
      <div class="modal-meta">${r.city}, ${r.country} &middot; Capitulo ${r.bookChapter}</div>
      <div class="modal-body">
        <p>${r.desc}</p>
        <div class="recipe-details">
          <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
              <div class="label">Porciones</div>
              <div class="value">${r.servings}</div>
            </div>
            <div class="recipe-meta-item">
              <div class="label">Tiempo</div>
              <div class="value">${r.time}</div>
            </div>
            <div class="recipe-meta-item">
              <div class="label">Dificultad</div>
              <div class="value">${r.difficulty}</div>
            </div>
          </div>
          <h3>Ingredientes</h3>
          <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
          <h3>Preparacion</h3>
          <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>
      </div>
    `;
  }

  content.innerHTML = html;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Mobile nav ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Nav scroll state (subtle premium) ----
const navEl = document.querySelector('.nav');
const setNavScrolled = () => navEl.classList.toggle('scrolled', window.scrollY > 12);
setNavScrolled();
window.addEventListener('scroll', setNavScrolled, { passive: true });

// ---- Newsletter / Store form submission via Cloudflare Worker ----
// Worker URL — update after deploying with: npx wrangler deploy
const SUBSCRIBE_WORKER_URL = 'https://cocinero-subscribe.YOUR_SUBDOMAIN.workers.dev';

function setupForm(formId, statusId, successMsg) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    status.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(SUBSCRIBE_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:20px">
            <p style="font-size:1.2rem;color:var(--gold);margin-bottom:8px">${successMsg}</p>
          </div>`;
      } else {
        const err = await res.json().catch(() => ({}));
        status.textContent = err.error || 'Error al suscribir. Intenta de nuevo.';
        status.style.color = '#b83220';
        status.style.display = 'block';
        btn.disabled = false;
        btn.textContent = originalText;
      }
    } catch {
      status.textContent = 'Error de conexion. Intenta de nuevo.';
      status.style.color = '#b83220';
      status.style.display = 'block';
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

setupForm('newsletterForm', 'newsletterStatus', 'Bienvenido! Manana recibes tu primer capitulo.');
setupForm('storeForm', 'storeStatus', 'Te avisaremos cuando abramos!');

// Handle redirect params (backwards compat)
if (window.location.search.includes('subscribed=true')) {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.innerHTML = `
        <div style="text-align:center;padding:20px">
          <p style="font-size:1.2rem;color:var(--gold);margin-bottom:8px">Bienvenido!</p>
          <p style="color:var(--muted)">Manana recibes tu primer capitulo.</p>
        </div>`;
    }
  });
}
if (window.location.search.includes('store=true')) {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('storeForm');
    if (form) {
      form.innerHTML = `
        <div style="text-align:center;padding:12px">
          <p style="color:var(--gold)">Te avisaremos cuando abramos!</p>
        </div>`;
    }
  });
}

// ---- Init ----
loadContent();
