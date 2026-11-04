# UI/UX Reference Documentation
## Source: Law Prep Tutorial Blog (lawpreptutorial.com/blog)
## Theme Source: WsCube Tech (ws-frontend)

---

## 1. Overall Design Language

### Layout
- Max content width: ~1200px, centered, with horizontal padding
- Two-column layout on desktop (main content + sidebar) on listing/detail pages
- Full-width sections on homepage
- Sticky top navigation
- Clean white background with accent colors

### Typography
- Primary font: Inter (sans-serif) for body text
- Display/heading font: TiemposHeadline (serif) for large headings
- Font sizes: Hero 40-48px, H2 28-32px, H3 22-24px, body 16px, meta 13-14px

### Color Palette (from ws-frontend)
- Primary dark: #111827 (label-color-1)
- White: #ffffff (label-color-2)
- Blue accent: #194cff (label-color-3)
- Orange accent: #fc9c03 (label-color-24)
- Yellow: #f8db46 (label-color-18)
- Light gray bg: #f3f4f6 (label-color-29)
- Body text secondary: #4b5563 (label-color-7)
- Muted text: #6b7280 (label-color-10)
- Deep dark: #0c1e5e (label-color-23)
- Purple dark: #28003f (label-color-purple)

---

## 2. Page: Blog Homepage (/)

### Section 1: Sticky Header/Navigation
- Logo left, nav links center/right
- Search icon + hamburger for mobile
- Nav items: Home, Categories (dropdown), About, Contact
- On scroll: header gains background shadow
- Mobile: collapsible hamburger menu with full-width dropdown

### Section 2: Hero Banner
- Full-width colored background (dark blue/gradient)
- Large headline text (serif font)
- Subtitle description
- Search bar (prominent, centered)
- Category pill/tag filters below search

### Section 3: Browse by Category
- Section title: "Browse by Category"
- Horizontal scrollable row of category cards
- Each card: colored icon + category name + article count
- Hover: scale + shadow effect

### Section 4: Latest Posts
- Section title: "Latest Posts — Fresh reads from all categories"
- 2-3 column grid of article cards
- Article card anatomy:
  - Featured image (16:9 ratio, rounded top corners)
  - Category badge (colored pill)
  - Title (2-line clamp, bold)
  - Excerpt (3-line clamp, muted color)
  - Author avatar + name + date + reading time
- Load More button at bottom

### Section 5: Essential Reads / Featured Articles
- Section title: "Essential Reads"
- Large horizontal featured card (image left, content right)
- Or 2-column featured layout

### Section 6: Trending Posts
- Section title: "Trending Posts — Popular reads students are exploring now"
- Horizontal scrollable cards or 4-column grid
- Numbered ranking (1, 2, 3...)
- Card: small image + title + category + date
- "More Trending Reads" link button

### Section 7: Category-wise Recent Articles
- Multiple sections, one per category
- Section header: Category name + "View All" link
- 4-column row of latest articles per category
- Article card: image thumbnail + date + title + "Read More"

### Section 8: Newsletter Subscription (optional)
- Email input + subscribe CTA

### Section 9: Footer
- Logo + description
- Navigation links in columns (Quick Links, Categories, About)
- Social media icons
- Copyright notice
- Dark background (#111827 or #0c1e5e)

---

## 3. Page: Category Listing Page (/category.html)

### Breadcrumb
- Home > Category Name

### Page Header
- Category name as H1
- Category description paragraph
- Article count badge

### Filter Bar
- Sub-category pills / tag filters
- Sort dropdown (Latest, Popular, Oldest)
- Search within category

### Article Grid
- 2-column grid (desktop) / 1-column (mobile)
- Each card: full info (image, category, title, excerpt, author, date, reading time)
- Pagination at bottom (numbered pages + prev/next)

### Sidebar (right, 1/3 width on desktop)
- Search box
- Popular articles list (ranked 1-5)
- Category list with counts
- Newsletter CTA

---

## 4. Page: Article Detail Page (/article.html)

### Breadcrumb
- Home > Category > Article Title

### Article Header
- Category badge
- Title (H1, large serif font)
- Excerpt / subtitle
- Author info (avatar + name + role)
- Published date + reading time
- Social share buttons (Twitter, LinkedIn, Facebook, Copy Link)
- Featured image (full-width, rounded corners)

### Article Body Layout
- Two-column: article content (70%) + sticky sidebar (30%)
- Progress bar at top

### Article Content Blocks
1. Paragraphs with proper line height (1.75)
2. H2/H3 headings with visual hierarchy
3. Ordered/Unordered lists with custom bullet styles
4. Comparison tables (styled, responsive)
5. Highlight/callout boxes (colored left border)
6. Image with caption
7. FAQ accordion (expand/collapse)
8. Step-by-step numbered sections
9. Code blocks (if applicable)

### Sticky Sidebar (Article Page)
- Table of Contents (auto-generated from H2/H3)
  - Active state highlighting on scroll
- Related Articles (3-4 cards)
- Popular Articles
- Category tags

### Below Article
- Tags list
- Author bio card (large, with social links)
- Social share buttons (repeat)
- Related Articles (full grid, 3 columns)
- Comments section header

---

## 5. Components

### Article Card (Standard)
- Border: 1px solid #e5e7eb
- Border-radius: 12px
- Hover: translateY(-4px) + box-shadow
- Image: object-fit cover, aspect-ratio 16/9
- Category badge: background-color accent, border-radius 20px
- Title: font-weight 700, line-clamp 2
- Excerpt: color #4b5563, line-clamp 3
- Meta row: flex, gap 8px, color #6b7280

### Trending Card (Small)
- Horizontal layout (image left, text right)
- Number badge overlay or left
- Title: line-clamp 2

### Category Card
- Square or rounded rectangle
- Colored background per category
- Icon centered
- Category name + count below
- Hover scale effect

### Tag / Badge
- border-radius: 20px
- padding: 4px 12px
- font-size: 12-13px
- font-weight: 600

### Sidebar Widget
- border: 1px solid #e5e7eb
- border-radius: 12px
- padding: 20-24px
- Section title with bottom border

---

## 6. Responsive Breakpoints

| Breakpoint | Width    | Behavior |
|-----------|----------|----------|
| Mobile    | < 768px  | 1-col layout, hamburger menu, full-width cards |
| Tablet    | 768-992px | 2-col grid, condensed sidebar |
| Desktop   | > 992px  | 3-col grid, full sidebar, sticky nav |
| Wide      | > 1200px | Max-width container centered |

---

## 7. Interactions & Animations

- Card hover: translateY(-4px), box-shadow increase, 0.2s ease
- Button hover: opacity 0.85, slight translateY(-1px)
- Nav links: color transition on hover
- Search: expand animation on focus
- Sidebar TOC: smooth scroll + active highlight
- FAQ accordion: max-height transition
- Mobile menu: slide down with opacity
- Skeleton loaders for async content (if used)
- Image lazy loading

---

## 8. SEO & Meta
- Each page has proper title, meta description
- Open Graph meta tags
- Canonical URLs
- Structured breadcrumbs
