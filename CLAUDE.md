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
  --ink-2:     #515661;         /* Secondary / muted text (7.4:1 on white — AA) */
  --ink-3:     #697282;         /* Tertiary / muted labels (4.9:1 on white — AA) */
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
| `--ink-2` | `#515661` | Body copy, descriptions (dark theme: `#B3B8BE`) |
| `--ink-3` | `#697282` | Labels, placeholders, muted CTA text (dark theme: `#7F868F`) — every text token must stay ≥4.5:1 on both `--bg` and `--surface`; check before changing |
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

- **Homepage is "Brix" — the Portfolio Agent:** the agent is named **Brix**; its avatar is Bri's **"B" mark** — a monoline terracotta (`#9b6b58`) B, supplied by Bri as vector files in `images/`: **`b-icon 1.svg`** (white B, for dark bg), **`b-icon 2.svg`** (white B on a filled terracotta circle — the **chat avatar** + favicon source), **`b-icon 3.svg`** (bare terracotta B — the **rail brand icon** left of "Bri May" in `.rail-head`). Referenced via `<img src="/images/b-icon%202.svg">` etc. (note the `%20` — the filenames contain a space; keep the names so Bri's re-uploads still apply). The **favicon** (`favicon.png`, 512, transparent corners) and **`apple-touch-icon.png`** (terracotta square) are rendered from `b-icon 2.svg` via Playwright (`scratchpad/render-icons.mjs`) — re-render there if the mark changes. The kicker above the greeting reads "Hi, I'm Brix, Bri's assistant." `index.html` is a scripted conversational concierge, not a real LLM. It shows suggested-prompt chips (Case studies · About Bri · Résumé · Contact) and a free-text input; typed queries are keyword-matched to intents (`matchIntent`) and responses render inline in a message thread. All logic is self-contained vanilla JS in `index.html` (no backend, no API key — works on static Pages). Case studies render as `.cs-card`s; **Global Content Studio is always first and carries a `.featured-pill`** (accent color). **Answering questions (keyless "wiki about Bri"):** typed free-text is answered by a client-side knowledge base — the `KB` array in `index.html` (each entry = `keys` trigger substrings + `text` answer, optional `href`/`label` for an "open case study" link). `answerLocally()` scores the question against `KB` (weight 2 per key ≥3 chars, threshold 2); a hit renders the answer (+ optional link), otherwise it falls back to a nav intent, then to a random line from the `FUNNY` array (10 on-brand redirects). **No backend, no API key, no cost** — it only knows about Bri and deflects everything else. Chips remain scripted navigation. Edit `KB`/`FUNNY` to change what Brix knows/says. (A real-LLM Cloudflare Worker was prototyped then removed in favor of this keyless approach — it's in git history if ever wanted.) The homepage is a three-column LLM app-shell (`.app` flex): a **left rail** (`.rail` — New chat, a Pages nav that opens Work/About/Résumé/Contact in the side panel, a live **Recent** history of the visitor's questions, email/LinkedIn footer), a center **chat pane** (`.chat-pane`, scroll + composer), and a right **side panel** (`.panel`). There is **no top nav** on the homepage — the rail replaces it, and on mobile (≤900px) the rail becomes a slide-out drawer toggled by a hamburger in `.chat-topbar` (with a `.rail-scrim` backdrop). React mirror (`/src/`) is NOT updated to match — the agent lives only on the deployed static homepage.
- **Pages open in a right-side panel (artifact-style):** On the homepage, a delegated click handler intercepts internal links (case-study cards, About/Résumé/Contact buttons, nav links) and opens the target page in an `<iframe>` side panel (`#panel-frame`, loaded with `?embed=1`) instead of navigating away — mirroring Claude's artifact/code panel. On desktop the panel **floats as a rounded, shadowed box** with a gap from the edges (Claude-desktop style); on mobile (<900px) it's a full-screen overlay. External links, `mailto:`, `[download]`, and `target="_blank"` are left alone. **Embed mode:** `scripts/embed.js` (included in `<head>` of every embeddable page) adds `html.embedded` when a page is in an iframe or has `?embed=1`; `site.css` then hides that page's `#site-nav` + `footer` so it reads as a clean preview. Esc closes the panel; the header has an "open full page" (new tab) affordance.
- **Shared CSS source of truth:** `styles/site.css` is the single shared stylesheet for all static pages. It defines tokens, reset, nav, footer, buttons, `.container`, and scroll reveal. Do not re-declare these in page `<style>` blocks.
- **Page `<style>` blocks:** Contain only page-specific styles. Acceptable overrides: `.label { margin-bottom: Xpx }`, `.eyebrow { margin-bottom: Xpx }`, `.back-link { padding-top: 32px }`. Everything else should be unique to that page.
- **React app CSS:** `system.css` and `components.css` are for the React dev app in `/src/` only. Static pages do not link them.
- **Button color:** All primary buttons are dark ink (`#0A0A0A`). No terracotta buttons. `components.css` `.btn--primary` was fixed to match.
- **Footer classes:** Standard pattern is `.footer-inner` > `.footer-left` / `.footer-links` / `.footer-right`. All 8 pages now use this.
- **Dual implementation:** Static HTML is the deployed site. React/Vite in `/src/` is a development mirror. When making changes, update the static HTML files for deployment.
- **Mobile menu:** Inner pages (about/work/resume/contact + case studies) get a hamburger via `scripts/nav.js`, which self-injects a `.nav-toggle` button into `#site-nav .nav-inner` (no per-page markup) and toggles `#site-nav.menu-open` to drop the `.nav-links` down as a frosted panel ≤640px (styles in `site.css`). The homepage uses the left-rail drawer instead (no `#site-nav`). Include `<script src="/scripts/nav.js"></script>` on any new page that has the shared top nav.
- **Favicon + social share:** `favicon.png` (the B-mark, tan circle) + `apple-touch-icon.png` at repo root (both copied to `_site/` by `deploy.yml`), and a 1200×630 `images/og-cover.png` share card. Every page's `<head>` links the favicon and sets Open Graph + Twitter (`summary_large_image`) tags with per-page `og:title`/`description`/`url` (absolute `https://imbrimay.com/…`). Regenerate the OG card / icons from `scratchpad` templates via Playwright if the branding changes.
- **HashRouter:** React app uses `HashRouter` for GitHub Pages compatibility (no server-side routing needed).
- **Hero portrait:** `bri-half-circle.png` — transparent PNG that fills its column. No frame or card treatment on the image itself.
- **Images:** Stored in both `/images/` (root) and `/public/images/`. On deploy, `/public/images/` wins for conflicts. Keep production images in `/public/images/` going forward.
- **Vite base:** Set to `'/'` — do not change without updating the deploy workflow.

---

## Change Log

| Date | Change |
|---|---|
| 2026-08-21 | **Added the `portfolio-review` project skill** (`.claude/skills/portfolio-review/`) — the agent QA pass from the August audit, made repeatable. Three scripts: `probe-engine.mjs` (extracts the live Brix engine out of `index.html`, runs 38 recruiter screening questions + a known-regression set; exits non-zero under 90% confident or on any regression — run after ANY edit to `KB`/`matchIntent`/`retrieve`), `browser-audit.mjs` (Playwright: 404s/broken imgs, overflow at 320/375/768, token contrast both themes vs bg AND surface, canonical/title/img-dims/posters, no-JS render, skip links + announcer ≤3 mutations, Brix features, core flows — always run against the deploy-merged build from `build-site.sh`, not the repo root), and `asset-audit.py` (unreferenced files, >600KB rasters, deployed weight; report-only). SKILL.md documents the known false alarms (headless Chromium has no H.264; sandbox blocks fonts + imbrimay.com egress) and the report format (rank by recruiter-visible → interviewer-visible → report-only). Invoke by asking to review/audit/QA the site, or before any merge to main. |
| 2026-08-21 | **Teardown build list shipped (ideas 3, 6, 8, 9) — verified 24/24 in-browser.** (1) **Fourth case study: `work/brix/` — this site itself** ("The portfolio is the case study"): standard template (hero w/ real screenshot of Brix showing its own engine code · at-a-glance + jump nav · What I Owned · Problem · Solution · 3 Experiences · Process w/ transform-table · Impact · Takeaway). Screenshots live in `images/brix-case-study/*.webp` (captured via Playwright — re-capture if the homepage changes); work-page card thumb is `images/brix-card.webp`; hero-media 16:9 template rule overridden to `aspect-ratio:auto` on this page. Wired everywhere: 4th `work/index.html` card, 4th `CASE_STUDIES` entry in the Brix chat, "how does this work" KB answer now links the study (keys include `brix`/`this site`), Hub's bottom-cta now loops Hub → Brix → GCS, noscript + "Four deep-dives" copy updated. (2) **Role lens** — `.lens-row` chips under the starter cards ("Hiring for a specific role? Design Engineer / Senior Product Designer") fire `lens_de`/`lens_pd` intents (tailored pitch + links); typed phrases reach them via KB entries with an `intent:` field (serveEntry delegates). (3) **Show-don't-tell** — KB entries with `code: true` render a real excerpt of `retrieve()` into the answer as `.code-chat`, sourced from a `<script type="text/plain" id="engine-excerpt">` (update the excerpt if the engine changes). Wired on the "does she code" and "how does this work" answers. (4) **`?q=` deep links** — `/?q=…` auto-asks on load (param stripped after), and every answer's action row has a copy-link button that copies `/?q=<question>` (question tracked via `currentQ`). Probe still 37/38 + 1 correct nav. |
| 2026-08-20 | **Full QA fix pass (12 defects from the audit, all verified 42/42 in-browser).** (1) **Contrast tokens now WCAG AA in both themes** — light `--ink-2 #515661` / `--ink-3 #697282`, dark `--ink-2 #B3B8BE` / `--ink-3 #7F868F` (worst-case ≥4.5:1 on bg *and* surface; same hue, luminance-only shift). Rule stands: only change tokens with a contrast check. (2) **Résumé mobile overflow** — `.hero-location-row` got `flex-wrap`. (3) **Homepage `<title>`** → "AI-Native Product Designer & Design Engineer". (4) **h1 whitespace** fixed on home + about (spans concatenated in a11y/SEO text). (5) **Every `<img>` carries intrinsic `width`/`height`** (global `img{height:auto}` keeps CSS sizing); JS-templated imgs included. (6) **All four videos have real poster frames** (`*-poster.jpg`, hand-picked via ffmpeg contact sheets) and reveal on `loadstart` (was `loadeddata`, which hid the poster behind the placeholder until full download); the GCS filename-label placeholder is gone. (7) **A11y streaming** — `#thread` is `aria-live=off`, finished answers are announced once via `#sr-announcer` (`role=status`, `.sr-only`); measured 1 mutation/answer (was 87). (8) **Skip links** — homepage `.skip-link` focuses the composer; `nav.js` self-injects one on every inner page (styles in `site.css`). (9) **No-JS support** — reveal-hiding CSS is scoped to `html.js` (set in `<head>` by embed.js / inline on homepage; the reduced-motion block mirrors the `.js` scoping — keep specificity matched or content vanishes), and the homepage has a full `<noscript>` version. (10) **Canonical tags** on all 8 pages. (11) **Asset purge + WebP** — deleted ~85MB of unreferenced images/dupes/zip (git history keeps them); the heavy case-study PNGs are now WebP (18.3→2.8MB, refs updated in static + React); deploy went 130MB→51MB. `frame.png`/`bri-half-circle.png` PNGs are gone — React mirror now points at WebP. (12) **Repo hygiene** — `.gitignore` added, `node_modules/` + `dist/` untracked (86 tracked files, was 2,922), README rewritten around the architecture story. **Brix engine overhaul:** `matchIntent` now word-boundary (the `includes('hi')`→"t**hi**s" greet bug is dead; bare greetings only), KB entries support `not:` veto keys (education no longer answers "case study", Aimee no longer answers "team size"), multi-word key matches outscore single-word, and the funny fallback now offers the 3 nearest known topics (`topicLabel()`); **+19 recruiter-screen KB entries** (process, research, leadership, a11y, collaboration, 0→1, stack, weaknesses/failure, why-leaving, level, location, start date, work auth, mobile, metrics, company size, tests, salary deflect, and an honest "how does this work" that owns the no-LLM design). Probe went 20→37/38 confident. **Résumé page synced to the canonical PDF** — title "AI-Native Lead Product Designer", FF 2016–Present, Lead 2017–2025, Sr. Graphic 2016–2017 (About timeline + Brix KB + React mirror match). |
| 2026-08-17 | **Résumé PDF replaced — one canonical file for every download.** Bri's new one-page portfolio résumé ("AI-Native Lead Product Designer") is now the download everywhere. Canonical path is **`resume/BriMay_Resume.pdf`** (year-free so the filename never goes stale, and a new path sidesteps any cached copy of the old one). Repointed all four download entry points: the résumé page button, the **contact page Résumé row** (was mislabeled — "Download PDF →" linked to `/resume/`, the page, not a file; now a real `[download]` link ending in ↓), the **Brix chat** résumé answer in `index.html`, and `META.resumePdf` in the React mirror (`src/pages/Resume.jsx`, which pointed at a nonexistent `/Bri-May-Resume.pdf` and feeds both of that page's download links). **`resume/BriMay_Resume_2026.pdf` is kept as a byte-identical alias** so any link Bri already shared still serves the current résumé — when the PDF changes, **overwrite both files**. Verified in-browser: all three static paths plus the legacy URL download bytes matching the source (md5 `a2cb83e9…`). Note: the résumé *page* still carries the older title/dates ("AI-Native Product Designer · Design Engineer", FF 2015–, Lead 2016–2025) — the new PDF says **Lead Product Designer**, FF **2016**–present, Lead **2017–2025**. Page copy was left alone; sync it in a follow-up. |
| 2026-07-28 | **Homepage entry = 4 action cards (720px column).** The empty state mounts the 2×2 `.home-cards` grid (`buildStarter()` into `#starter-mount`) with four cards: **See Bri's latest project** (featured, `.home-card--featured` + pill; `kind:'page'` → opens Global Content Studio in the side panel), **See all Bri's case studies** (`intent:casestudies` → lists the 3 cs-cards in chat), **See Bri's resume** (`kind:'page'` → opens `/resume/`), **How do I contact Bri?** (`intent:contact`). `STARTER` items support `kind:'page'` (with optional `panel` for the panel header) or `kind:'intent'`. Brix's reading column is a true 720px: `.chat-inner`/`.composer-inner` max-width `calc(720px + 2 * var(--px))`, `.empty-state` 640→720, `.cs-cards` 560→720. (Briefly tried leading with the 3 case-study tiles directly, then reverted to the 4-card grid.) |
| 2026-07-22 | **Dark mode (system-aware + manual toggle).** Added a full dark theme driven entirely by tokens in `site.css` — a dark palette applied via `@media (prefers-color-scheme: dark)` (auto) and `:root[data-theme="dark"]` (manual). The toggle sets `data-theme` and persists to `localStorage.theme`; the saved value is applied **in `<head>`** (inline on the homepage, via `embed.js` on inner pages) so there's **no flash**. Tokenized the last hardcoded chrome — button `--on-ink`/`--btn-hover`, frosted `--nav-bg`, framed-media `--frame-ring`, `--hover-soft`, plus new `--gutter`/`--accent-tint` — so every static page adapts for free. Homepage gets a **light⇆dark toggle in the rail** (sun/moon + label); inner pages get one injected by `nav.js`, which now groups the links into a `.nav-right` cluster (`.nav-theme` icon button, visible on mobile). GCS Atlas rests on a **light bed** in dark mode so its navy/teal product UI stays legible; other brand-colored islands (work-card pastel tiles, product screenshots) intentionally stay as-is. **Rule:** never hardcode chrome colors — add a token to all three `:root` blocks and reference it, so dark mode keeps working. |
| 2026-07-22 | **FAANG polish pass (8 items).** (1) **About↔Résumé sync** — removed the "mayd: by bri" freelance entry from the About timeline (not on the résumé). (2) **Dynamic copyright** — `nav.js` sets the year on any `.footer-year` span (all footers now `© <span class="footer-year">…`). (3) **Dark mode** (above). (4) **Thinking shimmer** — replaced the pre-answer blinking dots with a shimmering "Thinking…" label (`.thinking`, gradient sweep, static under reduced-motion). (5) **Composer send button** — disabled state is now a light "empty" fill vs a solid dark "ready" button (with hover lift). (6) **Monoline icons** — swapped the eight About "Outside the studio" emoji for consistent hand-drawn monoline SVGs (`currentColor`). (7) **Top whitespace** — trimmed hero top padding `clamp(96px,12vw,160px)` → `clamp(72px,8vw,112px)` on Work/About/Contact/Résumé. (8) **Contact rows** — stacked each reach-out row (small label above the large link) instead of `space-between` (which left a cavernous gap); widened the intro to 620px. |
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
| 2026-07-21 | **Homepage shell polish — floating rail + full-page mobile.** (1) **Left rail now floats** as a rounded, shadowed panel (Claude-desktop style): `.rail` gets `margin:12px; border-radius:16px; border:1px solid var(--border); box-shadow` soft, and the app sits on a subtle gray (`.app { background:#F1F2F4 }`) with the content kept white via `.agent-wrap { background: var(--bg) }`. The right side-panel already floated, so both panels now read as rounded boxes on the gray gutter. Mobile drawer resets to flush full-height (`margin:0; border-radius:0`). **New chat** is now a plain text+icon row (no button box), and a **desktop collapse toggle** (sidebar icon in the rail head → `app.rail-collapsed` hides the rail; a floating `.rail-show` button re-opens it; both use `.icon-btn.rail-collapse`/`.icon-btn.rail-show` compound selectors so they beat the base `.icon-btn{display:flex}`). (2) **Mobile home is full-page:** ≤900px the empty state fills the viewport — greeting + cards centered, **composer docked at the bottom** (sticky) — and the cards become **compact horizontal list items** (icon left · title+subtitle right) so all four fit above the composer. Mobile overrides are placed *after* the base card/composer CSS so they win on source order (media queries don't add specificity). Desktop 2×2 grid unchanged. |
| 2026-07-21 | **Homepage empty-state → conversational option-card grid (LLM-native first run).** Replaced Brix's vertical `.starter` explore list with a **2×2 `.home-cards` grid** (Sand-style): each card is an icon tile + a **question title** + a one-line subtitle. The four cards are phrased as recruiter questions and wired to intents — **What has Bri recently shipped?** (`casestudies`, always the **featured** card, accent border + accent icon tile, never swapped), **What projects has Bri done?** (`about`), **What is Bri's experience?** (`resume`), **How do I contact Bri?** (`contact`). Clicking a card calls `handleIntent(id, title)`, which posts the question **as the visitor's own message** (and to Recent), so it reads as a real conversation, not a nav menu. Cards stack to 1 col ≤520px; hover lift is disabled under `prefers-reduced-motion`. Grounded in July-2026 LLM-UI best practice: guided/intent-first starters, ≤4 options, one clear default, honest-scope line kept ("Runs on-device · knows only Bri"). Built on branch `claude/home-card-grid`, then merged live. (Note: card 2's question says "projects" but still triggers the `about`/bio answer — flagged for a possible re-map.) |
| 2026-07-21 | **Résumé FF role/date sync (to Bri's real résumé).** On `resume/index.html`, retitled the mid-tenure role **Product Designer → Lead Product Designer · Product Creative Director** and moved the **AI-Native Product Designer · Design Engineer** start from **2022 → 2025**; extended the Lead role end **2022 → 2025** so the timeline stays contiguous (AI-Native 2025–Present · Lead 2016–2025 · Sr. Graphic 2015–2016). Kept "· Design Engineer" (not "Product Creative Director") on the current AI-native line per the earlier no-Creative-Director positioning — PCD lives only on the earlier Lead role. Skills / education / impact already matched the résumé. |
| 2026-07-21 | **About page alignment fix.** The **Outside the Studio** + **Experience** sections (and the family-photo section) used `padding: clamp(…) 0` — the shorthand's `0` reset the horizontal padding that `.container` supplies (`padding: 0 var(--px)`), so those sections bled to the window edge while the hero/footer stayed inset. Switched all three to **`padding-block`** so `.container`'s `--px` survives; every section now left-aligns at one consistent gutter (verified 64px at 1280w, no mobile h-overflow). Lesson: on a `.container` element, never set section spacing with the `padding` shorthand — use `padding-block`. Rest of the page (eyebrow `.label`, `clamp(22,2.5vw,28)` headings, body copy, dividers) was already on-system. |
| 2026-07-21 | **About page real photos in.** Wired Bri's uploaded backyard family photo into the **Family Photo** banner (`.photo-placeholder`, 16/7, `object-position:center 28%` so all three faces stay in frame; file kept its original camera name `E8692738-…​.jpg`) and set the **intro portrait** to the existing `bri-hero.jpg` (was the missing `bri-about.jpg` placeholder; framed 4/5 card, `object-position:center 20%`). Both verified — no faces cropped. |
| 2026-07-21 | **Work-page case-study thumbnails.** Wired Bri's uploaded product-mockup thumbnails into the three `work/index.html` cards (were empty colored `.work-card-image-inner` blocks): **GCS → `gcs-card.png`** (studio on a laptop), **Aimee → `aimee-card.png`** (app on a phone), **Hub → `hub-card.png`** (dashboard on a laptop). Renamed from the uploaded `"gcs - thumbnail.png"` / `"hub- thumbnail.png"` / `"aimee ai - thumbnail.png"` to clean, space-free names (the old `public/images/*-thumbnail.png` belong to the React mirror only — left untouched). `<img loading="lazy" object-fit:cover>` in the 4:3 image area; the per-card `background` color stays as a fallback. Also swapped the **homepage Brix `.cs-card` 64px swatches** from flat color to the same thumbnails (`thumb` field on `CASE_STUDIES`, `object-fit:cover` inside the rounded 64px square, swatch color as fallback) so the chat cards show a mini product preview too. |
| 2026-07-21 | **Hub hero = welcome video.** Swapped the Hub case study's static `Hero.png` for the uploaded `welcome-to-financial-finesse.mp4` (renamed from `welcome_to_financial_finesse_v2 (1080p).mp4` for a web-safe path; lives in `images/Financial Finesse Hub Case Study/`). Same framed-media treatment as the GCS hero video (`.cs-video-slot` rounded card + hairline `::after` ring + soft layered shadow, `scale(1.012)` edge-crop, graceful `.cs-video-ph` placeholder until `onloadeddata`) — but **normal speed** (it's a produced welcome video, not a sped-up screen recording, so no 2× playbackRate). **Updated to a real player:** swapped `autoplay muted loop` for native **`controls` + sound** (plays once, has a scrubber/volume/fullscreen), dropped the `scale(1.012)` edge-crop so the controls bar isn't clipped (video's own `border-radius:16px` rounds it instead), and added hero **bottom padding** `clamp(64px,8vw,108px)` so it doesn't crowd the next section. |
| 2026-07-21 | **GCS Pipeline is now a live interactive element** (not a screenshot). Rebuilt the Atlas flow from the uploaded `Atlas_Pipeline_Flow.dc.html` Claude-artifact (which needs the artifact runtime and can't run on the static site) as a self-contained vanilla component: a horizontal 9-step track (circles 0–8, the guardrail = white teal-ringed circle, proportional group labels **Get it right / Guarantee it / Approve & ship**, connectors) + a **live detail panel** that updates on hover / tap / keyboard focus (defaults to Step 0), + the **"What comes out the other side"** outcome pills. Uses Financial Finesse brand colors (navy `#063853` / teal `#00507C`) to match the product screenshots. Markup + `.atlas-*` CSS + inline `STEPS` script all live in `work/global-content-studio/index.html`; horizontally scrolls on mobile (`.atlas-scroll`, min-width 680). **Replaced** both the flat `atlas.png` and the redundant `numbered-list` of steps (and deleted `atlas.png`). Also added a graceful auto-appearing **Impact** slot (`gcs-impact.png` — a published localized article live in the member product). |
| 2026-07-21 | **GCS real product screenshots wired in.** Replaced the five image placeholders with Bri's uploaded Financial Finesse product shots (in `images/Global Content Studio Case Study/`), each auto-framed by the site-wide `.cs-image` treatment: **What I Owned → `library.png`** (content library, 27 locales), **The Problem → `the-problem.png`** (Localize QA — 1,816 pieces to review), **The Solution → `gcs-korean.png`** (authoring studio + accuracy-check panel), **The Pipeline → `atlas.png`** (Atlas 9-step flow; extracted from the uploaded `8-step pipeline flow.zip` artifact), **Localization → `localization.png`** (one Life Event article across en-IE / zh-CN / cs-CZ). All `<img class="cs-image" loading="lazy">`; lowercase filenames now (was `Library.png` etc.). Spare upload `gcs-hub-startingfamily.png` (published Life Event in the member product) is in the folder but unused — no free slot. |
| 2026-07-19 | **Global Content Studio rewritten from Bri's finalized story — conformed to the shared case-study template** so all three studies (GCS · Aimee · Hub) read the same way. Fit the MD story into the standard sections + classes: Hero → At a glance (jump: What I owned · Solution · Process · Impact) → **What I Owned** (`owned-list`, 5 role items) → The Problem (origin + going-global, `problem-bullets`) → The Solution (`numbered-list`, 4 pillars) → **The Pipeline** (Atlas 8 steps as `numbered-item`s with an inline `.why-note` per step — the one new helper) → **Process** (surface, `transform-table` folds in the cost counterfactual ~$2.44M/9mo → $21,287/25 days, + `process-pullquote` Federal Reserve quote) → Impact (`impact-grid`: $2.42M · 25 countries · 1M+, + `client-pills`) → Takeaway. Dropped the bespoke components from the first pass (before/after cards, atlas-gate, stat-cards, compare, callout) in favor of the shared vocabulary. **Canonical numbers updated site-wide** (homepage KB + `CASE_STUDIES` + work card): 25 countries · ~650 pieces / 16,250 outputs · 25 days · ~$2.42M avoided (115×) · built solo with Claude Code — replacing the old "5 locales / a country a week / ~5,800 lines." Only image slot is `Hero.png`. |
| 2026-07-18 | **About ↔ Résumé consistency pass.** Fixed factual conflicts on `about/index.html`: Financial Finesse start **2019 → 2015** (matches résumé + KB), CKC Communications end **2012–2016 → 2012–2015**; aligned the FF role title to the résumé's separator ("AI-Native Product Designer **·** Design Engineer") and dropped "Creative" from the freelance role ("Founder & Freelance **Designer**"). Aligned typography so the two pages match: About section headings `clamp(26,2.5vw,36)/600` → `clamp(22px,2.5vw,28px)/700/-0.025em` (the résumé `.section-title` spec, which was the site-wide outlier on About), and `.experience-entry-desc` `14px` → the standard body `clamp(17px,1.4vw,20px)`/`--ink-2`. Left the personal hero headline ("Creative by trade. Competitive by nature.") as a deliberate tagline. |
| 2026-07-18 | **Résumé cleanup + body-copy consistency.** Removed the "Selected Work / Projects worth noting" section from `resume/index.html` (and its now-dead `.work-*` CSS). Unified the résumé's body copy to the site-wide standard — `clamp(17px,1.4vw,20px)` / `var(--ink-2)` / line-height 1.7 — across `.hero-summary`, `.company-context` (was 13px/`--ink-3`), and `.role-bullets li` (was 14px); dropped the darker `.highlight-bullet` color override. This matches the primary body copy already used throughout (about `.intro-lead`, contact `.hero p`, work `.intro-section p`, case-study `.opportunity-sub`/`.solution-body`/`.process-body`), so all flowing body prose is one size and one color site-wide. |
| 2026-07-18 | **Smooth side-panel open/close (fixed the "flash").** The panel animated `grid-template-columns` between `1fr 0fr` and `minmax(360px,43fr) 57fr` — incompatible track types can't interpolate, so it snapped. Reworked `.agent-wrap` to `display:flex` and animate the panel's **`flex-basis` (0% → 54%)** plus `margin`/`box-shadow` (0.42s ease) so the floating box eases in/out. Chat pane `flex:1 1 0%` with a desktop `min-width:400px`. Also made the empty-state headline size to the column via **`cqw` container query** (`.chat-inner` is `container-type:inline-size`) with `text-wrap:balance`, so it stays one line in normal views and never clips when the panel narrows the column. Fixed a stale `--nav-h` reference and dropped the mobile body-scroll override (was clipping long chats under the `.app` `overflow:hidden`); mobile now uses the same internal-scroll model as desktop, panel still a bottom-sheet overlay. |
| 2026-07-18 | **Left rail replaces the top nav (full LLM-app shell).** Homepage is now a three-column `.app`: a ChatGPT/Claude-style **left rail** (`.rail`) with **New chat**, a **Pages** nav (Work/About/Résumé/Contact → open in the side panel), a live **Recent** list of the visitor's questions (`pushRecent()`, newest-first, capped 8, persists across New chat), and an email/LinkedIn footer; the center chat pane; and the right side panel. **Removed `#site-nav` from the homepage** (and its measure/scroll JS). On mobile (≤900px) the rail is a slide-out drawer toggled by a hamburger in `.chat-topbar`, with a `.rail-scrim` backdrop — this also closes the long-standing "no mobile menu" gap on the homepage. New chat wired to both the rail button and the mobile topbar (`resetChat()` keeps Recent). |
| 2026-07-18 | **Brix "v2 chat surface" — FAANG-polish pass to read like ChatGPT/Claude.** Subtracted the support-widget cues and added frontier-LLM ones: **de-bubbled the assistant** (flat 16px/1.7 text on the page, avatar left — only the user turn keeps a soft `--surface` pill, no tails); **centered empty state that docks** (`.chat-pane.is-empty` centers the greeting + explore list + composer as one unit, then un-docks to the bottom on first message via `startChat()`); **rounded-rect multiline composer** (`textarea`, auto-grow to 200px, Enter-to-send / Shift+Enter newline, "Message Brix…", send is a rounded square that disables when empty); **copy + 👍/👎 action row** on each answer (hover-revealed, `buildActions()`); **bottom fade scrim** under the docked composer; **"New chat"** reset pill (`resetChat()`); dropped the green "online" dot + per-message name label; 720px reading column; accent `::selection`; cleaner follow-up pills (no arrow glyph). All chrome — content + on-device engine untouched. |
| 2026-07-18 | **Brix "good LLM" feel** — reworked the agent loop (still keyless/on-device) to read like a real LLM product: **token-by-token streaming** with a blinking caret and a **stop button** (send button becomes a stop square mid-stream); **variable "thinking" delay** scaled to answer length; **graceful retrieval** — `route()` normalizes + tokenizes, drops stopwords, expands a small synonym map, and fuzzy-matches (Levenshtein ≤1) with a confidence score (confident ≥2 → answer; weak =1 → answer + "I meant:" alternative; else nav intent, else funny); **one-turn memory** — `lastEntry`/`lastListShown` resolve follow-ups ("tell me more") and ordinals ("the second one" after the work list); **contextual follow-up chips** (`.chips--fu`) generated per answer via `followupsFor()`; inline **`**bold**`** rendering in answers. Reframed the composer hint + greeting around "runs on-device · knows only Bri". |
