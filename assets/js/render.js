/* ============================================================
   render.js — HTML rendering utilities
   SVG icons, no emoji, block-scoped switch cases
   ============================================================ */

/* ================================================================
   SVG ICON LIBRARY — inline, no external deps
   ================================================================ */
const ICONS = {
  /* Category icons */
  'digital-marketing': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  'seo': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  'web-development': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'artificial-intelligence': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>`,
  'career-guidance': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  'interview-questions': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,

  /* UI icons */
  'arrow-right': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  'clock': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'calendar': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  'search': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  'list': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  'twitter': `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.622 5.905-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  'linkedin': `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-6a2 2 0 100 4 2 2 0 000-4z"/></svg>`,
  'link': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  'check': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  'tag': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  'fire': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`,
  'book': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
  'user': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  'grid': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  'chevron-right': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  'plus': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
};

/* ================================================================
   UTILITY FUNCTIONS
   ================================================================ */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function slugify(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const safe = escapeHtml(text);
  const safeQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp('(' + safeQ + ')', 'gi'), '<mark>$1</mark>');
}

function getCategoryForArticle(article) {
  if (!article) return null;
  const cat = getCategoryById(article.category);
  return cat || { id: article.category, name: article.category, color: '#194cff', bgColor: '#e8edff' };
}

function getAuthorForArticle(article) {
  if (!article) return null;
  const auth = getAuthorById(article.author);
  return auth || { id: article.author, name: article.author, role: 'Writer', avatar: 'assets/images/authors/default.svg', bio: '' };
}

/* ================================================================
   CATEGORY CARD
   ================================================================ */
function renderCategoryCard(cat) {
  if (!cat) return '';
  const icon = ICONS[cat.id] || ICONS['grid'];
  return `<a href="category.html?id=${escapeHtml(cat.id)}" class="cat-card" style="background:${cat.bgColor};color:${cat.color};" aria-label="${escapeHtml(cat.name)} — ${cat.articleCount} articles">
    <div class="cat-icon" style="color:${cat.color};">${icon}</div>
    <h3 class="cat-name">${escapeHtml(cat.name)}</h3>
    <p class="cat-desc">${escapeHtml(cat.description)}</p>
    <span class="cat-count" style="background:${cat.color};">${cat.articleCount} Articles</span>
  </a>`;
}

/* ================================================================
   ARTICLE CARD (Standard grid card)
   ================================================================ */
function renderArticleCard(article, catOverride, authOverride) {
  if (!article) return '';
  const cat = catOverride || getCategoryForArticle(article);
  const auth = authOverride || getAuthorForArticle(article);
  const catColor = cat ? cat.color : '#194cff';
  const catBg = cat ? cat.bgColor : '#e8edff';
  const catName = cat ? cat.name : '';
  const catId = cat ? cat.id : (article.category || '');

  return `<article class="acard" onclick="location.href='article.html?id=${escapeHtml(article.id)}'" role="article">
    <div class="acard-img">
      <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt || article.title)}" loading="lazy" onerror="this.style.display='none'" />
      <span class="acard-cat" style="background:${catBg};color:${catColor};">${escapeHtml(catName)}</span>
    </div>
    <div class="acard-body">
      <h3 class="acard-title">
        <a href="article.html?id=${escapeHtml(article.id)}" onclick="event.stopPropagation()">${escapeHtml(article.title)}</a>
      </h3>
      <p class="acard-excerpt">${escapeHtml(article.excerpt)}</p>
      <div class="acard-meta">
        <div class="acard-author">
          <img src="${escapeHtml(auth && auth.avatar ? auth.avatar : 'assets/images/authors/default.svg')}" alt="${escapeHtml(auth ? auth.name : '')}" loading="lazy" onerror="this.style.display='none'" />
          <span>${escapeHtml(auth ? auth.name : '')}</span>
        </div>
        <div class="acard-date-read">
          <span>${formatDate(article.publishedDate)}</span>
          <span class="sep">·</span>
          <span>${article.readingTime || 5} min</span>
        </div>
      </div>
    </div>
  </article>`;
}

/* ================================================================
   TRENDING CARD
   ================================================================ */
function renderTrendingCard(article, index, catOverride) {
  if (!article) return '';
  const cat = catOverride || getCategoryForArticle(article);
  const catColor = cat ? cat.color : '#194cff';
  const catBg = cat ? cat.bgColor : '#e8edff';
  const catName = cat ? cat.name : '';
  const catId = cat ? cat.id : (article.category || '');
  const num = String(index + 1).padStart(2, '0');

  return `<a href="article.html?id=${escapeHtml(article.id)}" class="tcard" aria-label="${escapeHtml(article.title)}">
    <div class="tcard-num">${num}</div>
    <div class="tcard-thumb">
      <img src="${escapeHtml(article.image)}" alt="" loading="lazy" onerror="this.style.display='none'" />
    </div>
    <div class="tcard-body">
      <span class="tcard-cat" style="color:${catColor};">${escapeHtml(catName)}</span>
      <h3 class="tcard-title">${escapeHtml(article.title)}</h3>
      <span class="tcard-date">${formatDate(article.publishedDate)}</span>
    </div>
  </a>`;
}

/* ================================================================
   HORIZONTAL MINI CARD (category blocks)
   ================================================================ */
function renderHCard(article, catOverride) {
  if (!article) return '';
  const cat = catOverride || getCategoryForArticle(article);
  const catBg = cat ? cat.bgColor : '#f3f4f6';

  return `<a href="article.html?id=${escapeHtml(article.id)}" class="hcard" aria-label="${escapeHtml(article.title)}">
    <div class="hcard-img" style="background:${catBg}">
      <img src="${escapeHtml(article.image)}" alt="" loading="lazy" onerror="this.style.display='none'" />
    </div>
    <div class="hcard-body">
      <h4 class="hcard-title">${escapeHtml(article.title)}</h4>
      <span class="hcard-date">${formatDate(article.publishedDate)}</span>
    </div>
  </a>`;
}

/* ================================================================
   ARTICLE CONTENT BLOCKS
   ================================================================ */
function renderArticleContent(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(b => renderBlock(b)).join('\n');
}

function renderBlock(block) {
  if (!block || !block.type) return '';

  switch (block.type) {
    case 'paragraph': {
      return `<p>${block.text || ''}</p>`;
    }
    case 'heading': {
      const lvl = block.level || 2;
      const id = slugify(block.text || '');
      return `<h${lvl} id="${id}">${escapeHtml(block.text || '')}</h${lvl}>`;
    }
    case 'list': {
      const tag = block.style === 'ordered' ? 'ol' : 'ul';
      const items = (block.items || []).map(i => `<li><span>${escapeHtml(i)}</span></li>`).join('');
      return `<${tag}>${items}</${tag}>`;
    }
    case 'table': {
      const ths = (block.headers || []).map(h => `<th>${escapeHtml(h)}</th>`).join('');
      const rows = (block.rows || []).map(row => {
        const tds = row.map(c => `<td>${escapeHtml(c)}</td>`).join('');
        return `<tr>${tds}</tr>`;
      }).join('');
      return `<div class="table-wrap"><table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case 'highlight': {
      const style = block.style || 'info';
      const iconMap = { info: ICONS['search'], success: ICONS['check'], warning: ICONS['fire'], error: ICONS['tag'] };
      const icon = iconMap[style] || ICONS['search'];
      const title = block.title ? `<div class="hbox-t">${icon} ${escapeHtml(block.title)}</div>` : '';
      return `<div class="highlight-box ${style}">${title}<div class="hbox-b">${block.text || ''}</div></div>`;
    }
    case 'faq': {
      const items = (block.items || []).map((item, i) => `
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)" id="fq-${i}">
            <span>${escapeHtml(item.question)}</span>
            <span class="faq-icon" aria-hidden="true">${ICONS['plus']}</span>
          </button>
          <div class="faq-a" role="region" aria-labelledby="fq-${i}">
            <div class="faq-a-in">${item.answer || ''}</div>
          </div>
        </div>`).join('');
      return `<div class="faq-list">${items}</div>`;
    }
    case 'steps': {
      const items = (block.items || []).map(item => `
        <div class="step-item">
          <div class="step-num" aria-hidden="true">${item.step}</div>
          <div class="step-body">
            <h4>${escapeHtml(item.title || '')}</h4>
            <p>${escapeHtml(item.description || '')}</p>
          </div>
        </div>`).join('');
      return `<div class="steps-list">${items}</div>`;
    }
    case 'image': {
      return `<figure style="margin:24px 0;">
        <img src="${escapeHtml(block.src || '')}" alt="${escapeHtml(block.alt || '')}" loading="lazy" style="width:100%;border-radius:var(--r-md);" />
        ${block.caption ? `<figcaption style="text-align:center;font-size:.8125rem;color:var(--gray-400);margin-top:8px;">${escapeHtml(block.caption)}</figcaption>` : ''}
      </figure>`;
    }
    default: {
      return '';
    }
  }
}

/* ================================================================
   FAQ toggle (called inline from HTML)
   ================================================================ */
function toggleFaq(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  // close all others first
  document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(b => {
    if (b !== btn) {
      b.setAttribute('aria-expanded', 'false');
      const a = b.nextElementSibling;
      if (a) a.classList.remove('open');
    }
  });
  btn.setAttribute('aria-expanded', String(!expanded));
  const answer = btn.nextElementSibling;
  if (answer) answer.classList.toggle('open', !expanded);
}
