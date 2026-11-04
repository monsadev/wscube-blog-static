/**
 * utils.js — Shared utility functions
 */

// Format date like "Jun 20, 2026"
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Format reading time
function formatReadingTime(mins) {
  return mins ? `${mins} min read` : '';
}

// Slugify a string
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Get category badge HTML
function getCategoryBadge(categoryId, categoryName) {
  const name = categoryName || categoryId || '';
  const cls = `badge badge-${(categoryId || '').replace(/[^a-z-]/gi, '-')}`;
  return `<span class="${cls}">${name}</span>`;
}

// Fallback image handler — replaces broken img with a styled placeholder div
function handleImgError(img) {
  // Guard: only run once to avoid infinite loops
  if (img.dataset.errored) return;
  img.dataset.errored = '1';

  const category = img.dataset.category || '';
  const icons = {
    'digital-marketing': '📈',
    'seo': '🔍',
    'web-development': '💻',
    'artificial-intelligence': '🤖',
    'career-guidance': '🎯',
    'interview-questions': '❓',
  };
  const colors = {
    'digital-marketing': 'linear-gradient(135deg, #e8edff, #c5d0ff)',
    'seo': 'linear-gradient(135deg, #fff5e6, #ffd9a0)',
    'web-development': 'linear-gradient(135deg, #dbf5f0, #a0ead9)',
    'artificial-intelligence': 'linear-gradient(135deg, #e3e0f3, #c5bbef)',
    'career-guidance': 'linear-gradient(135deg, #ffedea, #ffb8ae)',
    'interview-questions': 'linear-gradient(135deg, #f3f4f6, #e2e4ea)',
  };
  const icon = icons[category] || '📝';
  const bg = colors[category] || 'linear-gradient(135deg, #f3f4f6, #e2e4ea)';

  const placeholder = document.createElement('div');
  placeholder.className = 'img-placeholder';
  placeholder.style.cssText = `background:${bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;`;
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', img.alt || category);
  placeholder.textContent = icon;

  // Hide the broken image, insert placeholder after it
  img.style.display = 'none';
  if (img.parentElement) {
    img.parentElement.appendChild(placeholder);
  }
}

// Build article card HTML
function buildArticleCard(article, category, author) {
  const catName = category ? category.name : article.category;
  const authorName = author ? author.name : article.author;
  const imgSrc = article.image || '';

  return `
    <article class="article-card">
      <a href="article.html?id=${encodeURIComponent(article.slug || article.id)}" class="article-card-image" aria-label="${escapeHtml(article.title)}">
        <img
          src="${imgSrc}"
          alt="${escapeHtml(article.imageAlt || article.title)}"
          loading="lazy"
          data-category="${escapeHtml(article.category)}"
          onerror="handleImgError(this)"
        />
        ${getCategoryBadge(article.category, catName)}
      </a>
      <div class="article-card-body">
        <h3 class="article-card-title line-clamp-2">
          <a href="article.html?id=${encodeURIComponent(article.slug || article.id)}">${escapeHtml(article.title)}</a>
        </h3>
        <p class="article-card-excerpt line-clamp-3">${escapeHtml(article.excerpt)}</p>
        <div class="article-card-meta">
          <img class="author-avatar" src="${escapeHtml((author && author.avatar) || 'assets/images/authors/default.jpg')}" alt="${escapeHtml(authorName)}" onerror="this.style.display='none'" />
          <span>${escapeHtml(authorName)}</span>
          <span class="meta-dot"></span>
          <span>${formatDate(article.publishedDate)}</span>
          <span class="meta-dot"></span>
          <span>${formatReadingTime(article.readingTime)}</span>
        </div>
      </div>
    </article>
  `;
}

// Build trending card HTML
function buildTrendingCard(article, index, category, author) {
  const catName = category ? category.name : article.category;
  const imgSrc = article.image || '';
  return `
    <a href="article.html?id=${encodeURIComponent(article.slug || article.id)}" class="trending-card" aria-label="${escapeHtml(article.title)}">
      <span class="trending-number">${String(index + 1).padStart(2, '0')}</span>
      <div class="trending-card-image">
        <img src="${imgSrc}" alt="${escapeHtml(article.imageAlt || article.title)}" loading="lazy" data-category="${escapeHtml(article.category)}" onerror="handleImgError(this)" />
      </div>
      <div class="trending-card-body">
        <p class="trending-card-title line-clamp-2">${escapeHtml(article.title)}</p>
        <div class="trending-card-meta">
          ${getCategoryBadge(article.category, catName)}
          <span class="meta-dot"></span>
          <span>${formatDate(article.publishedDate)}</span>
        </div>
      </div>
    </a>
  `;
}

// Build small horizontal article card for sidebar
function buildHorizontalCard(article, category) {
  const catName = category ? category.name : article.category;
  const imgSrc = article.image || '';
  return `
    <a href="article.html?id=${encodeURIComponent(article.slug || article.id)}" class="article-card-h" aria-label="${escapeHtml(article.title)}">
      <div class="article-card-h-image">
        <img src="${imgSrc}" alt="${escapeHtml(article.imageAlt || article.title)}" loading="lazy" data-category="${escapeHtml(article.category)}" onerror="handleImgError(this)" />
      </div>
      <div class="article-card-h-body">
        <p class="article-card-h-title line-clamp-2">${escapeHtml(article.title)}</p>
        <div class="article-card-h-meta">
          ${getCategoryBadge(article.category, catName)}
          <span class="meta-dot"></span>
          <span>${formatDate(article.publishedDate)}</span>
        </div>
      </div>
    </a>
  `;
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Render article content blocks to HTML
// Each case uses a block scope {} to avoid lexical declaration errors in switch
function renderContentBlock(block) {
  switch (block.type) {
    case 'paragraph': {
      return `<p>${escapeHtml(block.text)}</p>`;
    }

    case 'heading': {
      const level = block.level || 2;
      return `<h${level} id="${slugify(block.text)}">${escapeHtml(block.text)}</h${level}>`;
    }

    case 'list': {
      const tag = block.style === 'ordered' ? 'ol' : 'ul';
      const items = (block.items || []).map(i => `<li><span>${escapeHtml(i)}</span></li>`).join('');
      return `<${tag}>${items}</${tag}>`;
    }

    case 'image': {
      return `
        <figure style="margin:28px 0;">
          <img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || '')}" loading="lazy" style="width:100%;border-radius:12px;" />
          ${block.caption ? `<figcaption style="text-align:center;font-size:.875rem;color:#6b7280;margin-top:8px;">${escapeHtml(block.caption)}</figcaption>` : ''}
        </figure>
      `;
    }

    case 'highlight': {
      const hlStyle = block.style || 'info';
      const hlIcons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
      return `
        <div class="highlight-box ${hlStyle}">
          ${block.title ? `<div class="highlight-box-title">${hlIcons[hlStyle] || 'ℹ️'} ${escapeHtml(block.title)}</div>` : ''}
          <div class="highlight-box-text">${escapeHtml(block.text)}</div>
        </div>
      `;
    }

    case 'table': {
      const headers = (block.headers || []).map(h => `<th>${escapeHtml(h)}</th>`).join('');
      const rows = (block.rows || []).map(row =>
        `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`
      ).join('');
      return `
        <div class="content-table-wrapper">
          <table class="content-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    case 'faq': {
      const faqItems = (block.items || []).map((faq, i) => `
        <div class="faq-item">
          <button class="faq-question" data-faq-index="${i}" aria-expanded="false">
            <span>${escapeHtml(faq.question)}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-answer-${i}" role="region">
            <div class="faq-answer-text">${escapeHtml(faq.answer)}</div>
          </div>
        </div>
      `).join('');
      return `<div class="faq-section">${faqItems}</div>`;
    }

    case 'steps': {
      const stepItems = (block.items || []).map(step => `
        <div class="step-item">
          <div class="step-number" aria-hidden="true">${step.step}</div>
          <div class="step-content">
            <h4 class="step-title">${escapeHtml(step.title)}</h4>
            <p class="step-description">${escapeHtml(step.description)}</p>
          </div>
        </div>
      `).join('');
      return `<div class="steps-list">${stepItems}</div>`;
    }

    default:
      return '';
  }
}

// Render all content blocks for an article
function renderArticleContent(blocks) {
  if (!blocks || !blocks.length) return '<p>Content coming soon...</p>';
  return blocks.map(renderContentBlock).join('\n');
}

// Extract TOC headings from content blocks
function extractTOC(blocks) {
  if (!blocks) return [];
  return blocks
    .filter(b => b.type === 'heading' && (b.level === 2 || b.level === 3))
    .map(b => ({ text: b.text, level: b.level, id: slugify(b.text) }));
}

// Generate SVG icons
const Icons = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  chevronDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  chevronUp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  book: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  share: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  tag: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  list: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
};
