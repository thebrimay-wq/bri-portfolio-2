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

### Case Study Section Order (current template — Global Content Studio is the reference)
1. **Hero** — eyebrow (role · company · year), headline w/ `<span>` clause, hero-lead, 3 hero-stats, hero image
2. **At a glance** — fast-scan block: `.glance-summary` TL;DR + `.glance-facts` (Role · Timeline · Team · Scope) + a **`.jump-nav`** "Jump to" chip row (`#owned` · solution id · `#process` · `#impact`; styles in `site.css`). Lets a recruiter get the whole story in ~10s and skip to the key sections.
3. **What I Owned** (`.owned-section`, surface bg) — 5 role items (label + text)
4. **The Problem**
5. **The Solution** (numbered-list; no closing solution-quote)
6. **The Pipeline** (optional — GCS only; horizontal `.pipeline-flow`)
7–10. **Experience · 01–04** (eyebrow + exp-h2 + tight exp-body + image) — cap at ~4; each is one distinctive capability/decision
11. **Process** (surface bg, transform-table + process-pullquote) — framing varies per study (solo AI-native build / leadership / systems)
12. **Impact** (impact-grid + client-pills)
13. **Final Takeaway** (surface bg, one bold closing sentence)
+ Bottom nav (`.bottom-cta`) — Back to Work / Next case / Contact. Loop: GCS → Aimee → Hub → GCS.

**Trimmed for a hiring audience (2026-07-17):** removed the standalone **The Opportunity** and **What's Next** sections, capped **Experiences at ~4**, dropped the redundant `.solution-quote`, and tightened hero leads/takeaways. A VP skims in 30–90s — cut anything that isn't the fast scan (at-a-glance + jump chips) or a senior-signal section (What I Owned · Process · Impact · a few sharp Experiences).

**Scannability rule:** every case study must read fast AND deep — the At-a-glance block + declarative section headlines carry the scan; the section bodies carry the depth. Keep bodies to 1–2 sentences, avoid long text blocks.

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

- **Homepage is "Brix" — the Portfolio Agent:** the agent is named **Brix**; its avatar is an inline-SVG recreation of Bri's "B" mark (circle + B + diagonal slash, white on `#0A0A0A`). `index.html` is a scripted conversational concierge, not a real LLM. It shows suggested-prompt chips (Case studies · About Bri · Résumé · Contact) and a free-text input; typed queries are keyword-matched to intents (`matchIntent`) and responses render inline in a message thread. All logic is self-contained vanilla JS in `index.html` (no backend, no API key — works on static Pages). Case studies render as `.cs-card`s; **Global Content Studio is always first and carries a `.featured-pill`** (accent color). **Answering questions (keyless "wiki about Bri"):** typed free-text is answered by a client-side knowledge base — the `KB` array in `index.html` (each entry = `keys` trigger substrings + `text` answer, optional `href`/`label` for an "open case study" link). `answerLocally()` scores the question against `KB` (weight 2 per key ≥3 chars, threshold 2); a hit renders the answer (+ optional link), otherwise it falls back to a nav intent, then to a random line from the `FUNNY` array (10 on-brand redirects). **No backend, no API key, no cost** — it only knows about Bri and deflects everything else. Chips remain scripted navigation. Edit `KB`/`FUNNY` to change what Brix knows/says. (A real-LLM Cloudflare Worker was prototyped then removed in favor of this keyless approach — it's in git history if ever wanted.) The homepage is a three-column LLM app-shell (`.app` flex): a **left rail** (`.rail` — New chat, a Pages nav that opens Work/About/Résumé/Contact in the side panel, a live **Recent** history of the visitor's questions, email/LinkedIn footer), a center **chat pane** (`.chat-pane`, scroll + composer), and a right **side panel** (`.panel`). There is **no top nav** on the homepage — the rail replaces it, and on mobile (≤900px) the rail becomes a slide-out drawer toggled by a hamburger in `.chat-topbar` (with a `.rail-scrim` backdrop). React mirror (`/src/`) is NOT updated to match — the agent lives only on the deployed static homepage.
- **Pages open in a right-side panel (artifact-style):** On the homepage, a delegated click handler intercepts internal links (case-study cards, About/Résumé/Contact buttons, nav links) and opens the target page in an `<iframe>` side panel (`#panel-frame`, loaded with `?embed=1`) instead of navigating away — mirroring Claude's artifact/code panel. On desktop the panel **floats as a rounded, shadowed box** with a gap from the edges (Claude-desktop style); on mobile (<900px) it's a full-screen overlay. External links, `mailto:`, `[download]`, and `target="_blank"` are left alone. **Embed mode:** `scripts/embed.js` (included in `<head>` of every embeddable page) adds `html.embedded` when a page is in an iframe or has `?embed=1`; `site.css` then hides that page's `#site-nav` + `footer` so it reads as a clean preview. Esc closes the panel; the header has an "open full page" (new tab) affordance.
- **Shared CSS source of truth:** `styles/site.css` is the single shared stylesheet for all static pages. It defines tokens, reset, nav, footer, buttons, `.container`, and scroll reveal. Do not re-declare these in page `<style>` blocks.
- **Page `<style>` blocks:** Contain only page-specific styles. Acceptable overrides: `.label { margin-bottom: Xpx }`, `.eyebrow { margin-bottom: Xpx }`, `.back-link { padding-top: 32px }`. Everything else should be unique to that page.
- **React app CSS:** `system.css` and `components.css` are for the React dev app in `/src/` only. Static pages do not link them.
- **Button color:** All primary buttons are dark ink (`#0A0A0A`). No terracotta buttons. `components.css` `.btn--primary` was fixed to match.
- **Footer classes:** Standard pattern is `.footer-inner` > `.footer-left` / `.footer-links` / `.footer-right`. All 8 pages now use this.
- **Dual implementation:** Static HTML is the deployed site. React/Vite in `/src/` is a development mirror. When making changes, update the static HTML files for deployment.
- **Mobile menu:** Inner pages (about/work/resume/contact + case studies) get a hamburger via `scripts/nav.js`, which self-injects a `.nav-toggle` button into `#site-nav .nav-inner` (no per-page markup) and toggles `#site-nav.menu-open` to drop the `.nav-links` down as a frosted panel ≤640px (styles in `site.css`). The homepage uses the left-rail drawer instead (no `#site-nav`). Include `<script src="/scripts/nav.js"></script>` on any new page that has the shared top nav.
- **Favicon + social share:** `favicon.svg` (the B-mark) + `apple-touch-icon.png` at repo root (both copied to `_site/` by `deploy.yml`), and a 1200×630 `images/og-cover.png` share card. Every page's `<head>` links the favicon and sets Open Graph + Twitter (`summary_large_image`) tags with per-page `og:title`/`description`/`url` (absolute `https://imbrimay.com/…`). Regenerate the OG card / icons from `scratchpad` templates via Playwright if the branding changes.
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
| 2026-07-17 | Added **Global Content Studio** case study (`work/global-content-studio/`, renamed from `work/ff-content-writer/`) and made it the featured/first case study on the Work page. Fixed the `.fade-up` reveal bug in `scripts/main.js` (now observes `.fade-up` and adds `.visible`). |
| 2026-07-17 | **Homepage rebuilt as the "Portfolio Agent"** — a scripted conversational concierge (see Current Decisions). Replaced the old hero/marquee/featured-work/about/CTA layout. |
| 2026-07-17 | **Side-panel navigation** — homepage internal links now open pages in an artifact-style right-side `<iframe>` panel. Added `scripts/embed.js` + `html.embedded` rules in `site.css` to hide the embedded page's nav/footer. |
| 2026-07-17 | **Résumé refresh** — synced `resume/index.html` to the 2026 PDF (title → "AI-Native Product Designer · Product Creative Director", repositioned summary, restructured roles, 3 skill tracks incl. Engineering/React, added Global Content Studio + Arizona State). Added `resume/BriMay_Resume_2026.pdf` and wired the Download PDF button. |
| 2026-07-17 | **Global Content Studio** — labeled every image placeholder with its target filename chip + picture icon; added a horizontal 9-step **pipeline** overview (`.pipeline-flow`, placeholder thumbs). |
| 2026-07-17 | Named the homepage agent **Brix** (B-mark avatar). Removed the **Smart Benefits** case study (kept in résumé). Added an **About** portrait slot (`/images/bri-about.jpg`). |
| 2026-07-17 | **Fast-scan pattern** — added an **At a glance** block (`.glance`, TL;DR + Role/Timeline/Team/Scope) to Global Content Studio + Hub so case studies scan in ~10s and still go deep. **Restructured the Hub** to the full template (added What I Owned + Process). |
| 2026-07-17 | **Aimee rewritten** to the real design-engineering story (design system, locked component library, coded prototypes, 3 surfaces, Next.js/Tailwind/A2UI) with a live design-system link. Added **"Jump to" anchor chips** (`.jump-nav`) to all case studies and made the homepage **side panel float as a rounded box**. |
| 2026-07-17 | **Trimmed all case studies for a hiring audience** — cut The Opportunity + What's Next, capped Experiences at ~4 (renumbered 01–04), dropped `.solution-quote`, tightened leads/takeaways. Reduces length ~30% while keeping the scan layer + senior-signal sections. |
| 2026-07-17 | **Brix real-LLM upgrade** — added `worker/` (Cloudflare Worker proxy: Anthropic key + Bri knowledge base + 10 funny fallbacks). Typed questions call the Worker when `BRIX_ENDPOINT` is set; otherwise scripted + funny fallbacks. Deploy steps in `worker/README.md`. |
| 2026-07-17 | **Brix → keyless "wiki about Bri"** — removed the Cloudflare Worker/API path. Typed questions now answered by a client-side `KB` knowledge base (`answerLocally()` in `index.html`) with the `FUNNY` redirects for anything off-topic. No backend, no key, no cost; only knows about Bri. |
| 2026-07-18 | **Retitled to "AI-Native Product Designer & Design Engineer"** — removed every "Creative Director" mention across static pages (résumé, about, contact, hub, README) and the React mirror (`src/pages/*`). Reframed the positioning as an AI-native product designer who designs AND builds products solo. |
| 2026-07-18 | **First-time explore list** — homepage now opens with a scannable vertical menu (`.starter` / `.starter-item`, icon + label rows, "Featured" pill on Global Content Studio) instead of pill chips. Featured item opens the case study in the side panel; the rest fire chat intents. Added **phone (209-601-0181)** to the contact page, Brix's contact response, and a `KB` phone entry (`tel:` links). |
| 2026-07-19 | **GCS hero = live 2× demo video + site-wide "framed media" treatment.** Moved the `gcs-localize-article-compatible.mp4` (H.264, 15MB) screen recording into the GCS hero as an autoplay/loop/muted `<video>` at **2× (JS `playbackRate`, respects reduced-motion)**, framed as a rounded card. Adopted a **2026 product-shot framing** — rounded corners + **hairline stroke** (`inset 0 0 0 1px rgba(0,0,0,.07)`) + **soft layered drop shadow** — as the standard for all real content images: added to `.cs-image` in `site.css` (applies across all case studies) and to the About `.intro-portrait` (via `::after` ring), and matched on the hero video slot. Encoder hairlines are clipped by scaling the video ~1.2% inside an `overflow:hidden` slot. Placeholders stay dashed/flat (they're temporary drop-zones). Video/media served from `images/…` (deploy copies it). |
| 2026-07-21 | **GCS real product screenshots wired in.** Replaced the five image placeholders with Bri's uploaded Financial Finesse product shots (in `images/Global Content Studio Case Study/`), each auto-framed by the site-wide `.cs-image` treatment: **What I Owned → `library.png`** (content library, 27 locales), **The Problem → `the-problem.png`** (Localize QA — 1,816 pieces to review), **The Solution → `gcs-korean.png`** (authoring studio + accuracy-check panel), **The Pipeline → `atlas.png`** (Atlas 9-step flow; extracted from the uploaded `8-step pipeline flow.zip` artifact), **Localization → `localization.png`** (one Life Event article across en-IE / zh-CN / cs-CZ). All `<img class="cs-image" loading="lazy">`; lowercase filenames now (was `Library.png` etc.). Spare upload `gcs-hub-startingfamily.png` (published Life Event in the member product) is in the folder but unused — no free slot. |
| 2026-07-19 | **Global Content Studio rewritten from Bri's finalized story — conformed to the shared case-study template** so all three studies (GCS · Aimee · Hub) read the same way. Fit the MD story into the standard sections + classes: Hero → At a glance (jump: What I owned · Solution · Process · Impact) → **What I Owned** (`owned-list`, 5 role items) → The Problem (origin + going-global, `problem-bullets`) → The Solution (`numbered-list`, 4 pillars) → **The Pipeline** (Atlas 8 steps as `numbered-item`s with an inline `.why-note` per step — the one new helper) → **Process** (surface, `transform-table` folds in the cost counterfactual ~$2.44M/9mo → $21,287/25 days, + `process-pullquote` Federal Reserve quote) → Impact (`impact-grid`: $2.42M · 25 countries · 1M+, + `client-pills`) → Takeaway. Dropped the bespoke components from the first pass (before/after cards, atlas-gate, stat-cards, compare, callout) in favor of the shared vocabulary. **Canonical numbers updated site-wide** (homepage KB + `CASE_STUDIES` + work card): 25 countries · ~650 pieces / 16,250 outputs · 25 days · ~$2.42M avoided (115×) · built solo with Claude Code — replacing the old "5 locales / a country a week / ~5,800 lines." Only image slot is `Hero.png`. |
| 2026-07-18 | **About ↔ Résumé consistency pass.** Fixed factual conflicts on `about/index.html`: Financial Finesse start **2019 → 2015** (matches résumé + KB), CKC Communications end **2012–2016 → 2012–2015**; aligned the FF role title to the résumé's separator ("AI-Native Product Designer **·** Design Engineer") and dropped "Creative" from the freelance role ("Founder & Freelance **Designer**"). Aligned typography so the two pages match: About section headings `clamp(26,2.5vw,36)/600` → `clamp(22px,2.5vw,28px)/700/-0.025em` (the résumé `.section-title` spec, which was the site-wide outlier on About), and `.experience-entry-desc` `14px` → the standard body `clamp(17px,1.4vw,20px)`/`--ink-2`. Left the personal hero headline ("Creative by trade. Competitive by nature.") as a deliberate tagline. |
| 2026-07-18 | **Résumé cleanup + body-copy consistency.** Removed the "Selected Work / Projects worth noting" section from `resume/index.html` (and its now-dead `.work-*` CSS). Unified the résumé's body copy to the site-wide standard — `clamp(17px,1.4vw,20px)` / `var(--ink-2)` / line-height 1.7 — across `.hero-summary`, `.company-context` (was 13px/`--ink-3`), and `.role-bullets li` (was 14px); dropped the darker `.highlight-bullet` color override. This matches the primary body copy already used throughout (about `.intro-lead`, contact `.hero p`, work `.intro-section p`, case-study `.opportunity-sub`/`.solution-body`/`.process-body`), so all flowing body prose is one size and one color site-wide. |
| 2026-07-18 | **Smooth side-panel open/close (fixed the "flash").** The panel animated `grid-template-columns` between `1fr 0fr` and `minmax(360px,43fr) 57fr` — incompatible track types can't interpolate, so it snapped. Reworked `.agent-wrap` to `display:flex` and animate the panel's **`flex-basis` (0% → 54%)** plus `margin`/`box-shadow` (0.42s ease) so the floating box eases in/out. Chat pane `flex:1 1 0%` with a desktop `min-width:400px`. Also made the empty-state headline size to the column via **`cqw` container query** (`.chat-inner` is `container-type:inline-size`) with `text-wrap:balance`, so it stays one line in normal views and never clips when the panel narrows the column. Fixed a stale `--nav-h` reference and dropped the mobile body-scroll override (was clipping long chats under the `.app` `overflow:hidden`); mobile now uses the same internal-scroll model as desktop, panel still a bottom-sheet overlay. |
| 2026-07-18 | **Left rail replaces the top nav (full LLM-app shell).** Homepage is now a three-column `.app`: a ChatGPT/Claude-style **left rail** (`.rail`) with **New chat**, a **Pages** nav (Work/About/Résumé/Contact → open in the side panel), a live **Recent** list of the visitor's questions (`pushRecent()`, newest-first, capped 8, persists across New chat), and an email/LinkedIn footer; the center chat pane; and the right side panel. **Removed `#site-nav` from the homepage** (and its measure/scroll JS). On mobile (≤900px) the rail is a slide-out drawer toggled by a hamburger in `.chat-topbar`, with a `.rail-scrim` backdrop — this also closes the long-standing "no mobile menu" gap on the homepage. New chat wired to both the rail button and the mobile topbar (`resetChat()` keeps Recent). |
| 2026-07-18 | **Brix "v2 chat surface" — FAANG-polish pass to read like ChatGPT/Claude.** Subtracted the support-widget cues and added frontier-LLM ones: **de-bubbled the assistant** (flat 16px/1.7 text on the page, avatar left — only the user turn keeps a soft `--surface` pill, no tails); **centered empty state that docks** (`.chat-pane.is-empty` centers the greeting + explore list + composer as one unit, then un-docks to the bottom on first message via `startChat()`); **rounded-rect multiline composer** (`textarea`, auto-grow to 200px, Enter-to-send / Shift+Enter newline, "Message Brix…", send is a rounded square that disables when empty); **copy + 👍/👎 action row** on each answer (hover-revealed, `buildActions()`); **bottom fade scrim** under the docked composer; **"New chat"** reset pill (`resetChat()`); dropped the green "online" dot + per-message name label; 720px reading column; accent `::selection`; cleaner follow-up pills (no arrow glyph). All chrome — content + on-device engine untouched. |
| 2026-07-18 | **Brix "good LLM" feel** — reworked the agent loop (still keyless/on-device) to read like a real LLM product: **token-by-token streaming** with a blinking caret and a **stop button** (send button becomes a stop square mid-stream); **variable "thinking" delay** scaled to answer length; **graceful retrieval** — `route()` normalizes + tokenizes, drops stopwords, expands a small synonym map, and fuzzy-matches (Levenshtein ≤1) with a confidence score (confident ≥2 → answer; weak =1 → answer + "I meant:" alternative; else nav intent, else funny); **one-turn memory** — `lastEntry`/`lastListShown` resolve follow-ups ("tell me more") and ordinals ("the second one" after the work list); **contextual follow-up chips** (`.chips--fu`) generated per answer via `followupsFor()`; inline **`**bold**`** rendering in answers. Reframed the composer hint + greeting around "runs on-device · knows only Bri". |
