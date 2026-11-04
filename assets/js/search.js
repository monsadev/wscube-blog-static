/* ============================================================
   search.js — Inline live search with autocomplete dropdown
   Uses .search-drop / .sdi CSS classes from blog.css
   ============================================================ */
(function () {
  'use strict';

  let _timer = null;
  let _focused = -1;
  let _results = [];

  function debounce(fn, ms) {
    return function () {
      clearTimeout(_timer);
      _timer = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }

  /* Build one result row */
  function buildItem(article, query, idx) {
    const cat = getCategoryById(article.category);
    const catName = cat ? cat.name : article.category;
    const catColor = cat ? cat.color : '#194cff';
    const titleHl = highlightText(article.title, query);

    return `<a href="article.html?id=${escapeHtml(article.id)}"
      class="sdi" data-idx="${idx}" role="option" tabindex="0"
      aria-label="${escapeHtml(article.title)}">
      <div class="sdi-img">
        <img src="${escapeHtml(article.image)}" alt="" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div>
        <span class="sdi-cat" style="color:${catColor};">${escapeHtml(catName)}</span>
        <div class="sdi-title">${titleHl}</div>
        <div class="sdi-meta">${formatDate(article.publishedDate)} &middot; ${article.readingTime || 5} min read</div>
      </div>
    </a>`;
  }

  /* Populate dropdown */
  function renderDrop(drop, results, q) {
    _results = results;
    _focused = -1;

    if (!q.trim()) { drop.classList.remove('open'); return; }

    if (!results.length) {
      drop.innerHTML = `<div class="search-drop-empty">
        <strong>No results for "${escapeHtml(q)}"</strong>
        Try different keywords or browse by category.
      </div>`;
      drop.classList.add('open');
      return;
    }

    const items = results.slice(0, 7).map((a, i) => buildItem(a, q, i)).join('');
    const hint = results.length > 7
      ? `<div class="search-drop-hint">${results.length} results — showing top 7</div>` : '';

    drop.innerHTML = `<div class="search-drop-list" role="listbox">${items}</div>${hint}`;
    drop.classList.add('open');
  }

  /* Move keyboard focus */
  function moveFocus(drop, dir) {
    const items = drop.querySelectorAll('.sdi');
    if (!items.length) return;
    items[_focused]?.classList.remove('focused');
    _focused += dir;
    if (_focused < 0) _focused = items.length - 1;
    if (_focused >= items.length) _focused = 0;
    items[_focused]?.classList.add('focused');
    items[_focused]?.scrollIntoView({ block: 'nearest' });
  }

  /* ---- Hero search ---- */
  function initHeroSearch() {
    const input = document.getElementById('hero-search-input');
    const btn = document.getElementById('hero-search-btn');
    const wrap = document.getElementById('hero-search-wrap');
    if (!input || !wrap) return;

    /* Inject dropdown */
    let drop = document.getElementById('hero-search-drop');
    if (!drop) {
      drop = document.createElement('div');
      drop.id = 'hero-search-drop';
      drop.className = 'search-drop';
      wrap.appendChild(drop);
    }

    const doSearch = debounce(function (q) {
      renderDrop(drop, searchArticles(q), q);
    }, 220);

    input.addEventListener('input', function () { doSearch(this.value); });
    input.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!drop.classList.contains('open') && this.value.trim()) doSearch(this.value);
          moveFocus(drop, 1); break;
        case 'ArrowUp':
          e.preventDefault(); moveFocus(drop, -1); break;
        case 'Enter': {
          e.preventDefault();
          const f = drop.querySelector('.sdi.focused');
          if (f) { f.click(); }
          else if (_results.length) location.href = 'article.html?id=' + encodeURIComponent(_results[0].id);
          break;
        }
        case 'Escape':
          e.preventDefault();
          drop.classList.remove('open'); _focused = -1; this.blur(); break;
      }
    });

    if (btn) btn.addEventListener('click', function () {
      const q = input.value.trim();
      if (_results.length) location.href = 'article.html?id=' + encodeURIComponent(_results[0].id);
      else if (q) { const r = searchArticles(q); if (r.length) location.href = 'article.html?id=' + encodeURIComponent(r[0].id); }
    });

    document.addEventListener('mousedown', function (e) {
      if (!wrap.contains(e.target)) { drop.classList.remove('open'); _focused = -1; }
    });
  }

  /* ---- Sidebar search ---- */
  function initSidebarSearch() {
    const input = document.getElementById('sb-search-input');
    const btn = document.getElementById('sb-search-btn');
    if (!input) return;
    const go = () => {
      const q = input.value.trim();
      if (q) { sessionStorage.setItem('wscube_q', q); location.href = 'index.html'; }
    };
    if (btn) btn.addEventListener('click', go);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  }

  function initSearch() { initHeroSearch(); initSidebarSearch(); }

  window.initSearch = initSearch;

})();
