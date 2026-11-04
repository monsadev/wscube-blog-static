# WsCube Tech Blog — Static Website

A complete static blog built with HTML5, CSS3, and Vanilla JavaScript.

## ⚡ How to Run

This site uses `fetch()` to load JSON data files, so it **must be served over HTTP** (not opened directly as `file://`).

### Option 1 — Python (simplest)
```bash
cd d:\Projects\ws-blog-static
python -m http.server 8080
```
Then open: http://localhost:8080

### Option 2 — Node.js (npx)
```bash
cd d:\Projects\ws-blog-static
npx serve .
```

### Option 3 — VS Code Live Server
Install the "Live Server" extension → right-click `index.html` → "Open with Live Server"

### Option 4 — PowerShell one-liner
```powershell
cd d:\Projects\ws-blog-static
python -m http.server 8080
```

## 📁 Structure

```
ws-blog-static/
├── index.html          # Homepage
├── category.html       # Category listing page
├── article.html        # Article detail page
├── assets/
│   ├── css/
│   │   ├── variables.css   # Theme tokens (from ws-frontend)
│   │   ├── base.css        # Reset, utilities, shared components
│   │   ├── layout.css      # Header, footer, sidebar, grid
│   │   ├── home.css        # Homepage-specific styles
│   │   └── article.css     # Article & category page styles
│   ├── js/
│   │   ├── data.js         # JSON data loader & query helpers
│   │   ├── utils.js        # Card builders, content renderer, icons
│   │   └── components.js   # Header, footer, sidebar components
│   └── images/
│       ├── articles/       # 25 real WsCube Tech article images (webp/jpg)
│       └── authors/        # Author avatar SVGs
├── data/
│   ├── articles.json       # 25 articles with full content
│   ├── categories.json     # 6 categories
│   ├── authors.json        # 5 authors
│   ├── featured.json       # Featured & essential reads config
│   └── trending.json       # Trending article IDs
└── docs/
    └── ui-ux-reference.md  # Law Prep Tutorial UI/UX documentation
```

## 🎨 Theme

Colors and design tokens are taken directly from `ws-frontend/src/styles/scss/_variables.scss`.

## 📰 Content

All 25 articles use real titles, descriptions, dates, and images sourced from WsCube Tech's blog (wscubetech.com/blog).
