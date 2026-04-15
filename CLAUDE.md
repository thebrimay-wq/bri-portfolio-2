# CLAUDE.md — Bri May Portfolio Playbook

> **Purpose:** Persistent project reference for future Claude Code sessions.  
> **Rule:** Update this file whenever styling conventions, structure, or important patterns change.

---

## Project Overview

**What this site is:**  
Bri May's senior product design portfolio. Showcases case studies, skills, and contact info. Audience: hiring managers and recruiters at product companies.

**Stack:**
- **Deployed site:** Vanilla HTML + CSS + JavaScript (static, no build step)
- **React app:** React 18 + Vite + Framer Motion lives in `/src/` — a parallel implementation that is NOT currently deployed (CI copies static files only)
- **Routing (React):** `react-router-dom` v6, `HashRouter`
- **Animations (React):** `framer-motion` v11
- **Font:** Inter (Google Fonts, variable weight 100–900, optical sizing on)

**Deployment:**
- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- Push to `main` triggers deploy
- The workflow copies raw static files — **it does NOT run `vite build`**
- Built output goes to `_site/`, images merged from `/images/` and `/public/images/`
- Custom domain via `CNAME` file

---

## Project Structure

```
bri-portfolio-2/
├── index.html              ← Homepage (static, deployed)
├── CNAME                   ← Custom domain
├── styles/
│   ├── site.css            ← ⭐ SOURCE OF TRUTH for all static pages — tokens, reset, nav, footer, buttons, scroll reveal
│   ├── system.css          ← Design tokens for React app (system.css is NOT linked by static pages)
│   └── components.css      ← React app components: buttons, cards, hero, nav, tags, reveal animations
├── scripts/
│   └── main.js             ← Scroll reveal (IntersectionObserver), nav scroll state
├── images/                 ← Production images (thumbnails, portraits, case study)
├── public/images/          ← Alternate image source (merged over /images/ on deploy)
├── work/                   ← Work page HTML
├── about/                  ← About page HTML
├── resume/                 ← Résumé page HTML
├── contact/                ← Contact page HTML
├── aimee-ai/               ← Aimee AI case study HTML
├── src/                    ← React/Vite app (mirrors static site, not deployed)
│   ├── App.jsx             ← Routes: /, /work, /work/hub, /work/aimee, /work/smart-benefits, /about, /resume, /contact
│   ├── main.jsx            ← Entry point, imports globals.css + system.css + components.css
│   ├── pages/              ← Home, Work, Hub, Aimee, SmartBenefits, About, Resume, Contact
│   ├── components/
│   │   ├── Nav.jsx         ← Sticky frosted-glass nav with scroll state
│   │   ├── Footer.jsx      ← Simple 3-column footer (brand / links / copyright)
│   │   ├── FadeUp.jsx      ← Reusable Framer Motion scroll reveal (opacity + translateY)
│   │   └── ParallaxImage.jsx
│   └── styles/
│       └── globals.css     ← React-specific global overrides
├── .github/workflows/
│   └── deploy.yml          ← GitHub Actions deploy (static files only)
├── vite.config.js          ← Vite config (base: '/', outDir: 'dist')
└── package.json            ← React + Vite + Framer Motion deps
```

**Important:** When editing the deployed site, edit the **static HTML files** (`index.html`, `work/index.html`, etc.) and **`styles/site.css`** (the shared CSS source of truth). The React app in `/src/` is a development mirror — keep changes in sync if both are being maintained.

**CSS linking on static pages:** Every static page links **only** `styles/site.css` (after Google Fonts). Do NOT add `system.css` or `components.css` links to static pages — those are for the React dev app only. Page-level `<style>` blocks contain only styles unique to that page.

---

## Styling System

### CSS Custom Properties (Design Tokens)

Defined **once** in `styles/site.css` `:root` block — do NOT redefine in page `<style>` blocks:

```css
:root {
  --bg:        #ffffff;         /* Page background */
  --ink:       #0A0A0A;         /* Primary text */
  --ink-2:     #6B7280;         /* Secondary / muted text */
  --ink-3:     #9CA3AF;         /* Tertiary / placeholder text */
  --border:    #E5E7EB;         /* Borders, dividers */
  --surface:   #F8FAFC;         /* Card backgrounds, tags */
  --surface-2: #f0f2f5;         /* Slightly darker surface */
  --accent:    #9B6B57;         /* Warm terracotta — used sparingly */
  --px:        clamp(24px, 5vw, 80px);  /* Horizontal page padding */
  --max:       1160px;          /* Max content width */
}
```

Also defined as semantic tokens in `styles/system.css` (React app only):
```css
--color-accent:       #9B6B57;
--color-accent-light: #f5ede9;
--color-border:       #E5E7EB;
--color-gray-100:     #F8FAFC;
```

### Typography

**Font:** Inter (variable, loaded from Google Fonts)  
**Font features:** `cv02, cv03, cv04, cv11` — optical sizing on  
**Anti-aliasing:** `-webkit-font-smoothing: antialiased`

| Role | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero h1 | `clamp(40px, 5.5vw, 64px)` | 700 | -0.025em | 1.05 |
| Section h2 | `clamp(26px, 3vw, 38px)` | 600–700 | -0.02em | 1.15 |
| Subhead h3 | `clamp(18px, 1.6vw, 22px)` | 600 | -0.02em | 1.25 |
| Body | `clamp(16px, 1.2vw, 18px)` | 400 | — | 1.65–1.7 |
| Eyebrow | `12px` | 500 | 0.08em | — |
| Nav link | `14px` | 500 | — | — |
| Tag / label | `11px` | 500 | 0.02–0.1em | — |
| Card CTA | `13px` | 500 | — | — |
| Footer | `14px` / `13px` | 500–600 | — | — |

**Eyebrow pattern:** `12px`, `font-weight: 500`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--ink-3)`.  
Used above every section heading. Class: `.eyebrow`.

### Spacing Scale

Defined in `styles/system.css` as `--space-1` through `--space-10` (base-8 system):

| Token | Value | px |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 1rem | 16px |
| `--space-4` | 1.5rem | 24px |
| `--space-5` | 2rem | 32px |
| `--space-6` | 3rem | 48px |
| `--space-7` | 4rem | 64px |
| `--space-8` | 5rem | 80px |
| `--space-9` | 6rem | 96px |
| `--space-10` | 8rem | 128px |

### Color Palette

| Name | Hex | Use |
|---|---|---|
| `--ink` | `#0A0A0A` | Headings, primary text, dark buttons |
| `--ink-2` | `#6B7280` | Body copy, descriptions |
| `--ink-3` | `#9CA3AF` | Labels, placeholders, muted CTA text |
| `--border` | `#E5E7EB` | All borders and dividers |
| `--surface` | `#F8FAFC` | Card backgrounds, tag backgrounds |
| `--bg` | `#ffffff` | Page background |
| `--accent` | `#9B6B57` | Warm terracotta — active nav link, accent buttons, tag accent |
| `--color-accent-light` | `#f5ede9` | Accent tag backgrounds |

**Accent color rule:** Used sparingly — active nav state, `.tag--accent`, `.btn--primary` (CSS class version). Never used for large background blocks.

### Layout & Container

- **Horizontal padding:** `--px: clamp(24px, 5vw, 80px)` — applied directly to elements, not a wrapper
- **Max content width:** `--max: 1160px` (static) / `.container { max-width: 1160px }` (React)
- **Container class (React):** `.container` (1160px), `.container--narrow` (720px), `.container--wide` (1400px)
- **Static pattern:** `section-container` div with `max-width: var(--max); margin-inline: auto; padding-inline: var(--px)`

### Section Spacing

```css
.page-section { padding: clamp(72px, 9vw, 120px) 0; }       /* static */
.section       { padding-block: 96px; }                      /* React utility */
.section--sm   { padding-block: 56px; }
.section--lg   { padding-block: 120px; }
```

Sections are separated by `border-top: 1px solid var(--border)` rather than background color changes.

### Card Styles

```
border-radius: 14px
background: var(--surface)   (#F8FAFC)
overflow: hidden
border: none (work cards) / 1px solid #E5E7EB (generic .card class)
```

**Work card (.wcard):**
- Image area: `aspect-ratio: 4/3`, colored background per card (`bg` property)
- Body: `padding: 24px 28px 28px`, flex column
- Hover: `translateY(-3–4px)` + `box-shadow: 0 24px 56px rgba(0,0,0,0.09)`
- Image hover: `scale(1.04)` with `0.35–0.5s` ease

**Generic .card class:**
- `border-radius: 14px`, `border: 1px solid #E5E7EB`, `box-shadow: --shadow-sm`
- Hover: `translateY(-3px)` + elevated shadow
- Variants: `.card--flat` (no hover lift), `.card--dark` (dark bg)

### Button Styles

Three button types, all with `border-radius: 10px`, `font-size: 15px`, `font-weight: 500`:

| Class | Background | Color | Border | Hover |
|---|---|---|---|---|
| `.btn-primary` | `var(--ink)` (#0A0A0A) | #fff | none | bg → #222, lift -1px, shadow |
| `.btn-secondary` | transparent | `var(--ink)` | `var(--border)` | bg → ink, color → #fff, lift -1px |
| `.btn-ghost` | transparent | `var(--ink-2)` | none | color → ink, bg → surface |

Padding: `13px 24px` (primary/secondary), `13px 18px` (ghost).

**Rule: All buttons are dark ink. No terracotta buttons anywhere.**
- `site.css` `.btn-primary` → `var(--ink)` (#0A0A0A) ← use this on static pages
- `components.css` `.btn--primary` → now also `#0A0A0A` (fixed — was incorrectly terracotta)
- Never use `.btn--primary` (double-dash) on static pages — that class is for the React app

### Link Styles

- Default: `color: inherit; text-decoration: none`
- Nav links: `font-size: 14px; font-weight: 500` — hover reduces opacity to `0.5`
- Active nav link: `color: var(--accent)`
- Footer links: `color: var(--ink-2)` — hover → `var(--ink)`

### Image Treatment

- No heavy drop shadows
- Case study images: `border-radius: 0` at primary/secondary level (no tile treatment)
- Hero portrait: full-bleed in column, `object-fit: contain`, `object-position: right center`
- Work card images: `object-fit: cover`, `aspect-ratio: 4/3`, scale on hover
- Case study `.cs-image` hover: `scale(1.01)`, slow `0.5–0.6s` ease
- Float animation for mobile screenshots: `cs-image--float` (5s infinite, 10px vertical)

### Responsive Behavior

| Breakpoint | Changes |
|---|---|
| `≤ 900px` | Work grid: 3col → 2col |
| `≤ 860px` | Hero: 2col → 1col, portrait centers |
| `≤ 768px` | Section padding reduces, grids collapse to 1col |
| `≤ 700px` | About preview grid: 2col → 1col |
| `≤ 640px` | Nav links hidden (mobile: no hamburger currently) |
| `≤ 580px` | Work grid: 2col → 1col |
| `≤ 560px` | Hero portrait: 100% width |

### Animation & Microinteractions

**Scroll reveal (static) — two patterns, both defined in `site.css`:**
- Pattern A: `.fade-up` + JS adds `.visible` → used by most pages (about, work, contact, hub, aimee-ai, smart-benefits)
- Pattern B: `.reveal` + JS adds `.is-visible` → used by index.html; also supports `.visible`
- Staggered children: `.reveal-children` + `.visible`, or `.reveal-group` + `.is-visible`
- Stagger delays: `0s, 0.07s, 0.14s, 0.21s, 0.28s, 0.35s`
- `prefers-reduced-motion`: disables all animations
- **Do NOT redefine these in page `<style>` blocks** — they live in `site.css`

**Scroll reveal (React):**
- `FadeUp` component — `opacity: 0, y: 24` → `opacity: 1, y: 0`
- Uses `framer-motion` `whileInView`, `viewport: { once: true, margin: '-60px' }`
- Duration: `0.65s`, easing: `[0.25, 0.46, 0.45, 0.94]`
- Supports `delay` prop for staggering

**Parallax:** Hero portrait has subtle `useScroll` + `useTransform` Y offset (0 → -32px) via Framer Motion.

**Marquee:** Infinite horizontal scroll `28s linear`, pauses on hover. `@media (prefers-reduced-motion)` stops animation.

**All animations:** Respect `prefers-reduced-motion` — disable or skip on reduced-motion.

**Nav:** Frosted glass sticky nav — `background: rgba(255,255,255,0.88); backdrop-filter: blur(20px)`. Border appears on scroll (`scrolled` class, threshold: 8px scroll).

### Portfolio-Specific Visual Rules

- Section labels always use the eyebrow pattern (uppercase, spaced, muted) before headings
- Section headings: concise, often 2-line with line breaks for rhythm
- Impact statements on work cards are quantified (percentages, dollar figures, user counts)
- Work card image backgrounds use soft, desaturated pastels: `#EBE8F4` (purple), `#E2E7F0` (blue-gray), `#E2EDE8` (sage green)
- Trust strip (marquee of client names) sits between hero and featured work — acts as social proof

---

## Component Patterns

### Nav
- Sticky, `z-index: 100`, frosted glass
- Logo: "Bri May" (text, 15px 600 weight)
- Links: Work, About, Résumé, Contact
- Active state: accent color; hover: opacity 0.5
- Hidden on mobile ≤ 640px (no hamburger menu currently)

### Hero
- 2-column grid: text left, image/portrait right
- Full viewport-width layout (no max-width container on hero)
- Horizontal padding via `--px` on the copy column only
- Portrait: `object-fit: contain`, anchored right, bleeds to edge
- Eyebrow → H1 → 2 body paragraphs → button row
- Divider line (`border-top: 1px solid var(--border)`) after portrait, inset by `--px`
- Mobile (≤860px): stacks to 1col, portrait centers below copy

### Section Pattern
```
<eyebrow label>       ← uppercase, muted, small
<h2 heading>          ← strong, tight letter-spacing
<supporting text>     ← muted, readable size
<content / grid>
```

### Work Cards (wcard)
- `border-radius: 14px`, `background: var(--surface)`, flex column, full height
- Image top (4:3 ratio, colored bg), body below
- Tags → title → impact → "View Case Study →" CTA
- Hover lifts card and scales image

### Footer
- 3-column row: brand name | email + LinkedIn | copyright
- `border-top: 1px solid var(--border)`
- Mobile ≤640px: stacks to column, left-aligned
- **Standard classes (required on all pages):**
  ```html
  <footer>
    <div class="footer-inner">
      <span class="footer-left">Bri May</span>
      <div class="footer-links">
        <a href="mailto:thebrimay@gmail.com">thebrimay@gmail.com</a>
        <a href="https://www.linkedin.com/in/brimay" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
      <span class="footer-right">© 2025 Bri May</span>
    </div>
  </footer>
  ```
- **Deprecated classes** (do not use): `.footer-logo`, `.footer-copy`, `.footer-center`, `.footer-middle`, `.footer-copyright`

### Tags
- `font-size: 11px`, `letter-spacing: 0.02em`, uppercase-adjacent
- `background: #f0f0f0` or `var(--surface)`, `border: 1px solid var(--border)`
- Variant `.tag--accent`: warm bg `#fff3ec`, color `#9B6B57`

### Case Study Sections (`.cs-section`)
- `padding: clamp(96px, 10vw, 140px) 0`
- `border-top: 1px solid var(--color-border)`
- Two-column layout (`.hub-two-col`): `1fr 1fr`, gap `clamp(48px, 8vw, 96px)`
- Typography: `.cs-h2` (heading), `.cs-body` (body up to 560px wide)

### Case Study Default Section Order
1. Hero
2. Overview
3. Problem
4. Opportunity
5. Constraints
6. Approach
7. Key Decisions
8. Experience
9. Outcomes
10. What's Next
11. Final Takeaway

Keep case studies scannable — avoid long text blocks.

---

## Editing Rules

### Must Stay Consistent
- Font: Inter only. Do not introduce secondary typefaces.
- Color palette: only tokens above. Do not invent new colors.
- Accent: `#9B6B57` is the only accent. Use sparingly.
- Border: always `1px solid var(--border)` — no thicker borders.
- Border-radius: `10px` buttons, `14px` cards, `16–24px` hero image card.
- Section spacing: use `.page-section` padding pattern or equivalent clamped values.
- Eyebrow pattern: always precede section headings with the eyebrow label.
- Animation: fade + upward reveal only. No bounces, flips, or flashy transitions.
- `prefers-reduced-motion`: always respect it.

### Do Not Change Without Approval
- Overall page layout or navigation structure
- The hero design (2-col split, portrait treatment, divider)
- The work card visual pattern (image top, colored bg, 4:3 ratio)
- The accent color (`#9B6B57`)
- The trust strip / marquee

### Matching Existing Style When Adding New UI
1. Copy the exact eyebrow pattern for any new section label
2. Use `clamp()` for all font sizes and spacing that should scale
3. Use `var(--ink)`, `var(--ink-2)`, `var(--ink-3)` — never hardcode text colors
4. New cards follow `.wcard` or `.card` patterns
5. New buttons use `.btn-primary` / `.btn-secondary` / `.btn-ghost`
6. Wrap new content in `.section-container` (static) or `.container` (React)
7. Add scroll reveal: `.reveal` class (static) or `<FadeUp>` wrapper (React)
8. Test at mobile breakpoints ≤640px, ≤768px, ≤860px

---

## Current Decisions

- **Shared CSS source of truth:** `styles/site.css` is the single shared stylesheet for all static pages. It defines tokens, reset, nav, footer, buttons, `.container`, and scroll reveal. Do not re-declare these in page `<style>` blocks.
- **Page `<style>` blocks:** Contain only page-specific styles. Acceptable overrides: `.label { margin-bottom: Xpx }`, `.eyebrow { margin-bottom: Xpx }`, `.back-link { padding-top: 32px }`. Everything else should be unique to that page.
- **React app CSS:** `system.css` and `components.css` are for the React dev app in `/src/` only. Static pages do not link them.
- **Button color:** All primary buttons are dark ink (`#0A0A0A`). No terracotta buttons. `components.css` `.btn--primary` was fixed to match.
- **Footer classes:** Standard pattern is `.footer-inner` > `.footer-left` / `.footer-links` / `.footer-right`. All 8 pages now use this.
- **Dual implementation:** Static HTML is the deployed site. React/Vite in `/src/` is a development mirror. When making changes, update the static HTML files for deployment.
- **No hamburger menu:** Nav links are hidden on mobile via `display: none`. This is a known gap, not a bug.
- **HashRouter:** React app uses `HashRouter` for GitHub Pages compatibility (no server-side routing needed).
- **Hero portrait:** `bri-half-circle.png` — transparent PNG that fills its column. No frame or card treatment on the image itself.
- **Images:** Stored in both `/images/` (root) and `/public/images/`. On deploy, `/public/images/` wins for conflicts. Keep production images in `/public/images/` going forward.
- **Vite base:** Set to `'/'` — do not change without updating the deploy workflow.

---

## Change Log

| Date | Change |
|---|---|
| 2026-04-15 | Created `CLAUDE.md` — full playbook documenting static + React dual architecture, design tokens, component patterns, and editing rules |
| 2026-04-15 | CSS refactor — created `styles/site.css` as shared base for all static pages; stripped duplicate `:root`, reset, nav, footer, and scroll-reveal CSS from all 7 non-homepage pages; standardized footer to `.footer-left` / `.footer-links` / `.footer-right`; fixed `.btn--primary` in `components.css` from terracotta to dark ink |
