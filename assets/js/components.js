/**
 * components.js — Shared header, footer, and UI components
 */

// ============================================
// Header HTML
// ============================================

function renderHeader(activePage = '') {
  return `
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="header-logo" aria-label="WsCube Tech Blog - Home">
          <div class="header-logo-icon" aria-hidden="true">📚</div>
          <div class="header-logo-text">
            <span class="header-logo-name">WsCube Tech</span>
            <span class="header-logo-tagline">Blog</span>
          </div>
        </a>

        <nav class="header-nav" role="navigation" aria-label="Main navigation">
          <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
          <div class="nav-dropdown">
            <button class="nav-link" aria-haspopup="true" aria-expanded="false">
              Categories ${Icons.chevronDown}
            </button>
            <div class="nav-dropdown-menu" id="categories-dropdown" role="menu">
              <!-- Populated by JS -->
            </div>
          </div>
          <a href="index.html#trending" class="nav-link ${activePage === 'trending' ? 'active' : ''}">Trending</a>
          <a href="index.html#latest" class="nav-link ${activePage === 'latest' ? 'active' : ''}">Latest</a>
        </nav>

        <div class="header-right">
          <button class="header-search-btn" id="search-trigger" aria-label="Open search">
            ${Icons.search}
          </button>
          <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <div class="mobile-menu-inner">
      <a href="index.html" class="mobile-nav-link">🏠 Home</a>
      <a href="index.html#trending" class="mobile-nav-link">🔥 Trending</a>
      <a href="index.html#latest" class="mobile-nav-link">📰 Latest Posts</a>
      <span class="mobile-nav-section">Categories</span>
      <div id="mobile-categories">
        <!-- Populated by JS -->
      </div>
    </div>
  </div>

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay" role="dialog" aria-label="Search" aria-modal="true">
    <div class="search-overlay-inner">
      <div class="search-overlay-header">
        <span>${Icons.search}</span>
        <input
          type="search"
          class="search-overlay-input"
          id="search-input"
          placeholder="Search articles, topics, categories..."
          autocomplete="off"
          aria-label="Search articles"
        />
        <button class="search-overlay-close" id="search-close" aria-label="Close search">${Icons.close}</button>
      </div>
      <div class="search-results-list" id="search-results" role="listbox" aria-label="Search results">
        <!-- Populated by JS -->
      </div>
    </div>
  </div>
  `;
}

// ============================================
// Footer HTML
// ============================================

function renderFooter() {
  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo" aria-label="WsCube Tech Blog - Home">
            <div class="footer-logo-icon" aria-hidden="true">📚</div>
            <span class="footer-logo-name">WsCube Tech Blog</span>
          </a>
          <p class="footer-description">
            Your go-to resource for learning digital marketing, web development, artificial intelligence, 
            career guidance, and more. Quality content backed by industry expertise.
          </p>
          <div class="footer-social" role="list" aria-label="Social media links">
            <a href="#" class="footer-social-link" aria-label="Twitter" role="listitem">𝕏</a>
            <a href="#" class="footer-social-link" aria-label="LinkedIn" role="listitem">in</a>
            <a href="#" class="footer-social-link" aria-label="YouTube" role="listitem">▶</a>
            <a href="#" class="footer-social-link" aria-label="Instagram" role="listitem">◈</a>
          </div>
        </div>

        <div>
          <h3 class="footer-col-title">Quick Links</h3>
          <ul class="footer-links" role="list">
            <li><a href="index.html" class="footer-link">Home</a></li>
            <li><a href="index.html#latest" class="footer-link">Latest Articles</a></li>
            <li><a href="index.html#trending" class="footer-link">Trending Posts</a></li>
            <li><a href="index.html#categories" class="footer-link">Browse Categories</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-col-title">Categories</h3>
          <ul class="footer-links" id="footer-categories" role="list">
            <!-- Populated by JS -->
          </ul>
        </div>

        <div>
          <h3 class="footer-col-title">Resources</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://www.wscubetech.com" class="footer-link" target="_blank" rel="noopener">WsCube Tech</a></li>
            <li><a href="https://www.wscubetech.com/courses" class="footer-link" target="_blank" rel="noopener">Online Courses</a></li>
            <li><a href="https://www.wscubetech.com/free-resources" class="footer-link" target="_blank" rel="noopener">Free Resources</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; ${new Date().getFullYear()} WsCube Tech Blog. All rights reserved.
        </p>
        <div class="footer-bottom-links">
          <a href="#" class="footer-bottom-link">Privacy Policy</a>
          <a href="#" class="footer-bottom-link">Terms of Use</a>
          <a href="#" class="footer-bottom-link">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Back to Top -->
  <button class="back-to-top" id="back-to-top" aria-label="Back to top">
    ${Icons.arrowUp}
  </button>
  `;
}

// ============================================
// Sidebar: Popular Posts
// ============================================

function renderPopularPostsSidebar(articles, categories) {
  if (!articles || !articles.length) return '';

  const items = articles.slice(0, 5).map((a, i) => {
    const cat = categories ? categories.find(c => c.id === a.category) : null;
    return `
      <a href="article.html?id=${encodeURIComponent(a.slug || a.id)}" class="popular-post-item" aria-label="${escapeHtml(a.title)}">
        <span class="popular-post-number">${String(i + 1).padStart(2, '0')}</span>
        <div>
          <p class="popular-post-title line-clamp-2">${escapeHtml(a.title)}</p>
          <span class="popular-post-meta">
            ${cat ? getCategoryBadge(a.category, cat.name) : ''}
            <span class="meta-dot"></span>
            ${formatDate(a.publishedDate)}
          </span>
        </div>
      </a>
    `;
  }).join('');

  return `
    <div class="sidebar-widget">
      <h2 class="sidebar-widget-title">🔥 Popular Posts</h2>
      <div>${items}</div>
    </div>
  `;
}

// ============================================
// Sidebar: Category List
// ============================================

function renderCategoryListSidebar(categories) {
  if (!categories || !categories.length) return '';

  const items = categories.map(c => `
    <a href="category.html?id=${encodeURIComponent(c.id)}" class="category-list-item" aria-label="${escapeHtml(c.name)} (${c.articleCount} articles)">
      <span class="category-list-name">
        <span aria-hidden="true">${c.icon || '📁'}</span>
        ${escapeHtml(c.name)}
      </span>
      <span class="category-list-count">${c.articleCount}</span>
    </a>
  `).join('');

  return `
    <div class="sidebar-widget">
      <h2 class="sidebar-widget-title">📂 Categories</h2>
      <div>${items}</div>
    </div>
  `;
}

// ============================================
// Sidebar: Search
// ============================================

function renderSearchSidebar() {
  return `
    <div class="sidebar-widget">
      <h2 class="sidebar-widget-title">🔍 Search</h2>
      <div class="sidebar-search">
        <input type="search" id="sidebar-search-input" placeholder="Search articles..." aria-label="Search articles" />
        <button id="sidebar-search-btn" aria-label="Search">
          ${Icons.search}
        </button>
      </div>
    </div>
  `;
}

// ============================================
// Sidebar: Newsletter
// ============================================

function renderNewsletterSidebar() {
  return `
    <div class="sidebar-widget" style="background: linear-gradient(135deg, #0c1e5e, #2d0095); border-color: transparent; text-align:center;">
      <div style="font-size:2rem;margin-bottom:12px;" aria-hidden="true">📬</div>
      <h3 style="color:#fff;font-size:1.1rem;margin-bottom:8px;">Stay Updated</h3>
      <p style="color:rgba(255,255,255,.7);font-size:.875rem;margin-bottom:16px;line-height:1.6;">
        Get the latest articles delivered to your inbox weekly.
      </p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <input 
          type="email" 
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          style="padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);color:#fff;font-size:.875rem;outline:none;"
        />
        <button class="btn btn-orange" style="border-radius:8px;padding:10px;">Subscribe Free</button>
      </div>
    </div>
  `;
}

// ============================================
// Shared Component Initialization
// ============================================

function initSharedComponents(activePage, categories, trendingArticles) {
  // Populate category dropdown
  if (categories) {
    const dropdown = document.getElementById('categories-dropdown');
    const mobileCategories = document.getElementById('mobile-categories');
    const footerCategories = document.getElementById('footer-categories');

    if (dropdown) {
      dropdown.innerHTML = categories.map(c => `
        <a href="category.html?id=${encodeURIComponent(c.id)}" class="nav-dropdown-item" role="menuitem">
          <span class="nav-dropdown-item-icon" style="background-color:${c.bgColor || '#f3f4f6'}">${c.icon || '📁'}</span>
          <span>${escapeHtml(c.name)}</span>
        </a>
      `).join('');
    }

    if (mobileCategories) {
      mobileCategories.innerHTML = categories.map(c => `
        <a href="category.html?id=${encodeURIComponent(c.id)}" class="mobile-nav-link">
          ${c.icon || '📁'} ${escapeHtml(c.name)}
        </a>
      `).join('');
    }

    if (footerCategories) {
      footerCategories.innerHTML = categories.map(c => `
        <li><a href="category.html?id=${encodeURIComponent(c.id)}" class="footer-link">${escapeHtml(c.name)}</a></li>
      `).join('');
    }
  }

  // Header scroll shadow
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Search overlay
  const searchTrigger = document.getElementById('search-trigger');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResultsEl = document.getElementById('search-results');

  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput && searchInput.focus(), 100);
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('open');
      if (searchInput) searchInput.value = '';
      if (searchResultsEl) searchResultsEl.innerHTML = '';
    });
  }

  // Close on backdrop click
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('open');
        if (searchInput) searchInput.value = '';
        if (searchResultsEl) searchResultsEl.innerHTML = '';
      }
    });
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (searchOverlay) {
        searchOverlay.classList.remove('open');
        if (searchInput) searchInput.value = '';
        if (searchResultsEl) searchResultsEl.innerHTML = '';
      }
    }
  });

  // Search input
  if (searchInput && searchResultsEl) {
    let searchDebounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        const q = searchInput.value.trim();
        if (!q) {
          searchResultsEl.innerHTML = '';
          return;
        }
        const results = BlogData.searchArticles(q);
        if (!results.length) {
          searchResultsEl.innerHTML = `
            <div class="search-no-results">
              <p style="font-size:1.25rem;margin-bottom:8px;">🔍</p>
              <p>No results for "<strong>${escapeHtml(q)}</strong>"</p>
            </div>
          `;
          return;
        }
        const cats = BlogData.getCategories();
        searchResultsEl.innerHTML = results.slice(0, 6).map(a => {
          const cat = cats.find(c => c.id === a.category);
          return `
            <a href="article.html?id=${encodeURIComponent(a.slug || a.id)}" class="search-result-item" role="option">
              <img class="search-result-img" src="${escapeHtml(a.image || '')}" alt="" loading="lazy" data-category="${escapeHtml(a.category)}" onerror="handleImgError(this)" />
              <div>
                <p class="search-result-title line-clamp-1">${escapeHtml(a.title)}</p>
                <span class="search-result-meta">
                  ${cat ? getCategoryBadge(a.category, cat.name) : ''}
                  &nbsp;&bull;&nbsp;
                  ${formatDate(a.publishedDate)}
                </span>
              </div>
            </a>
          `;
        }).join('');
      }, 250);
    });
  }

  // Sidebar search
  const sidebarSearchInput = document.getElementById('sidebar-search-input');
  const sidebarSearchBtn = document.getElementById('sidebar-search-btn');
  if (sidebarSearchInput && sidebarSearchBtn) {
    const doSidebarSearch = () => {
      const q = sidebarSearchInput.value.trim();
      if (q) window.location.href = `index.html?search=${encodeURIComponent(q)}`;
    };
    sidebarSearchBtn.addEventListener('click', doSidebarSearch);
    sidebarSearchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSidebarSearch();
    });
  }

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FAQ accordion (delegated)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const answer = item ? item.querySelector('.faq-answer') : null;
    if (!answer) return;
    const isOpen = answer.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question.active').forEach(q => {
      q.classList.remove('active');
      q.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      answer.classList.add('open');
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}
