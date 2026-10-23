# Bri May Portfolio — Brutalist-Kinetic Rebuild Roadmap

> ⚠️ **SUPERSEDED (2026-08-19).** This roadmap predates the shipped direction: the live site is the **Brix agent homepage** (chat shell + side-panel previews, light/dark, keyless on-device KB) with the Global Content Studio case study as the flagship at `/work/global-content-studio/` (the `work/ff-content-writer/` path referenced below no longer exists). Kept for the still-relevant ideas — the live GCS demo embed (MUST-01), Loom walkthrough (MUST-02), and named testimonials (MUST-03) remain open and worth doing. See `CLAUDE.md` for the current architecture.

> **Direction:** Pure white canvas (`#FFFFFF`) with 1.5% paper-grain hatch, brutalist editorial typography (Inter + Playfair Display italic + JetBrains Mono), seven thoughtful motion moves, no chromatic accent, FF Content Writer as flagship via black-card inversion.
>
> **Strategic context:** Not actively job-searching. Building toward a *single* top-1% portfolio drop. This shifts priorities — quality over speed.
>
> **Realistic timeline:** 3–4 calendar weeks at a sustainable pace (weekends off).
> **Sequence:** Phases must be done in order. Phase 1 (imagery capture) is the hidden bottleneck — without imagery, the rebuild renders empty boxes.

---

## What "ship-ready" looks like before you start applying

Don't open a single application until all of these are done:

- [ ] Phases 0–5 complete (the core rebuild)
- [ ] **MUST-01** — Live FF Content Writer demo embedded as `Experience · 01` of the case study (live URL: `https://thebrimay-wq.github.io/ff-content-writer/` — already deployed)
- [ ] **MUST-02** — 60–90s Loom walkthrough of FF Content Writer narrating the build
- [ ] **MUST-03** — 2–3 real testimonials with named attributions
- [ ] **MUST-04** — Resume page live at `/resume/` with PDF download
- [ ] Personal cross-browser test on Chrome, Safari, Firefox at 375 / 768 / 1280 / 1920px
- [ ] One trusted designer reviews the live site before you go public

Optional, ship after applying starts:
- [ ] Real `⌘K` command palette
- [ ] Dark mode toggle

---

## MUST-01 — Embed the live FF Content Writer demo

**Outcome:** The FF Content Writer case study contains a live, playable iframe of the deployed app. Visitors can type a topic, pick a content type, and generate a brand-trained draft without leaving the case study.

**Place it as `Experience · 01`** (immediately after the hero), so it's the first thing a recruiter touches.

**Paste into Claude Code:**
> In `work/ff-content-writer/index.html`, add a new section right after the hero (before "What I Owned"). The section has:
>
> 1. A mono eyebrow `Experience · 01 · Live demo` with `data-kinetic="pin-eyebrow"`.
> 2. A sans h2 `Try it. The same tool the team ships with.` with `data-kinetic="word-rise"`.
> 3. A body paragraph: `A sandboxed version of FF Content Writer, embedded below. Type a topic, pick a content type, watch a brand-trained draft come back. No login, no waiting list — just the product.`
> 4. A `.demo-frame` wrapper containing a `.demo-utility` strip (mono `↗ thebrimay-wq.github.io/ff-content-writer · live` on the left, `open full ↗` link on the right opening the URL in a new tab) and an `<iframe>` to `https://thebrimay-wq.github.io/ff-content-writer/` with `loading="lazy"`, `width: 100%; height: 760px; border: 0; display: block;`. Title the iframe `FF Content Writer — live interactive demo`.
>
> Add to `styles/case-study.css`:
> ```css
> .demo-frame { border: 0.5px solid var(--ink); border-radius: 0; }
> .demo-utility {
>   display: flex; justify-content: space-between; align-items: center;
>   padding: 10px 18px; border-bottom: 0.5px solid var(--border);
>   font-family: var(--font-mono); font-size: 11px; color: var(--ink-2);
>   letter-spacing: 0.04em;
> }
> .demo-utility a { color: var(--ink); text-decoration: none; }
> .demo-utility a:hover { text-decoration: underline; text-underline-offset: 3px; }
> @media (max-width: 768px) { .demo-frame iframe { height: 560px; } }
> ```
>
> Don't restyle the iframe contents. Don't try to match its font to the portfolio. The mismatch (Lato inside, Inter outside) signals "this is a real product, not a portfolio asset." That's intentional.

---

## Phase ladder at a glance

| Phase | What it is | Effort | Blocking? |
|---|---|---|---|
| 0 | Triage — stop the bleeding | < 1 hour | Blocks everything |
| 1 | Imagery capture | 1 working day | Blocks Phase 3+ |
| 2 | Foundation — tokens, fonts, motion library | 1–2 days | Blocks Phase 3+ |
| 3 | Homepage rebuild | 1 day | — |
| 4 | Case study migrations + diagrams | 2–3 days | — |
| 5 | Polish + mobile QA + kinetic wiring | 1 day | — |
| 6 | Nice-to-have additions | Ongoing | Optional |

---

# PHASE 0 — Triage (do today, < 1 hour, zero new code)

These four CRITICAL fixes remove recruiter trust-killers currently live on `imbrimay.com`. Don't skip ahead — every redesign decision past this point assumes the placeholder leaks are fixed.

## CRITICAL-01 — Hide the Aimee case study

**Outcome:** The Aimee link no longer appears on the homepage or `/work/`. The case study URL can stay live for personal reference but isn't linked.

**Paste into Claude Code:**
> In `index.html` and `work/index.html`, remove the work-card link that points to `/aimee-ai/` or `../aimee-ai/`. Re-grid the remaining cards as a 3-column row on desktop. Don't delete the `aimee-ai/` directory — just remove every public link to it. Leave the file intact in case I want to revive it later.

## CRITICAL-02 — Remove every live placeholder string

**Outcome:** No reader ever sees `X%`, `X+`, `Family photo coming soon`, `Coming soon`, `TODO`, or a dashed image placeholder div on a public page.

**Paste into Claude Code:**
> Audit every HTML file in this repo. For each instance of the strings `X%`, `X+`, `Family photo coming soon`, `Coming soon`, the HTML comment `<!-- TODO`, and any `<div class="img-placeholder">…</div>` element, do the following: if there is real content I should add, comment the placeholder out and add `<!-- TODO bri: replace with real value -->` next to it; if the section becomes empty after removing the placeholder, hide the entire section by wrapping it in `<!-- ... -->` until I add real content. Print a single-page audit report at the end listing every file you touched, every placeholder you found, and what state you left it in.

## CRITICAL-03 — Reframe the marquee honestly (or kill it)

**Outcome:** No reader thinks you worked at Meta / NFL / JPMorgan. The Fortune 500 client roster is framed as: *"My work powers Financial Finesse — used by [client list]."*

**Paste into Claude Code:**
> In `index.html`, replace the entire `.marquee-wrap` section. Two options — pick one:
>
> **Option A (preferred):** Replace it with a single line of body text reading: `My work at Financial Finesse powers financial wellness for clients including Meta, NFL, JPMorgan, the Federal Reserve, and Patagonia.` Style it as 14px Inter, color `var(--ink-2)`, max-width 720px, centered between the hero and the Featured Work section. No animation. Wrap it with the same eyebrow pattern: a small mono `Trusted at scale` label above.
>
> **Option B:** Remove the marquee entirely; the new stat block (in Phase 3) will replace its function.
>
> I'm going with option A.

## CRITICAL-04 — Pick one role title, use it everywhere

**Outcome:** Every page agrees on your title. No more `Senior Product Designer & Creative Director` vs. `Creative Director & Lead Product Designer` vs. `Product Design Lead` vs. `Lead Product Designer`.

**Paste into Claude Code:**
> Grep this codebase for every instance of the strings `Senior Product Designer`, `Creative Director`, `Product Design Lead`, `Lead Product Designer`, and any combination thereof. List every file and line where they appear. Then replace all of them with the single title `Senior Product Designer` everywhere except the experience timeline on `/about/`, where I want the actual job titles I held at each role to remain accurate. Confirm the list with me before applying changes.

---

# PHASE 1 — Imagery capture (1 working day, no code)

This is *your* job, not Claude Code's. But it unblocks every visual change after this point. The previous portfolio failed because half the image slots were dashed-box placeholders. We don't repeat that.

## What to capture

### Homepage assets
- New square portrait — `images/portrait-square.jpg`. Plain background. Calm, present-tense crop.

### FF Content Writer (the flagship — most important captures)
- `images/ff-content-writer/featured-hero.jpg` — Full app, all three zones visible: sidebar with prompt + 9 content type list, editor with a real generated FF article visible, right details panel showing quality checklist with at least one signal in green and one in amber. 21:9 crop.
- `images/ff-content-writer/featured-loop.mp4` — 12-second screencap of the product in actual use. QuickTime/ScreenStudio, H.264, ~6Mbps, no audio.
- `images/ff-content-writer/exp-01-generator.jpg` — Sidebar prompt + generated FF-voice article in editor.
- `images/ff-content-writer/exp-02-editors.jpg` — 3×3 grid of mini-screenshots, one per content type (article, money tip, quiz, coach insight, calculator, checklist, infographic, user story, video).
- `images/ff-content-writer/exp-03-library.jpg` — Library view with status chips visible, filter chips active, bulk-action bar showing.
- `images/ff-content-writer/exp-04-quality.jpg` — Two-panel split: editor + quality checklist with click-to-fix menu open.
- `images/ff-content-writer/exp-05-selection.jpg` — Highlighted text in editor with floating AI toolbar showing all six options.
- `images/ff-content-writer/exp-06-details.jpg` — 2×2 composite: autosave indicator, soft-delete confirmation, similar-content warning, coachmark.
- `images/ff-content-writer/process-build.jpg` — Build environment screenshot (Cursor/VS Code with codebase open).
- `images/ff-content-writer/row-thumb.jpg` — Tight 4:3 crop for the work index row, 256×192 minimum.
- `images/ff-content-writer/row-thumb-loop.mp4` — 4-second hover loop.

### FF Hub
- Re-crop existing screenshots from `images/Financial Finesse Case Study/` to 21:9 hero and remove rounded corners. Filenames: `Hero.png`, `Aimee.png`, `Onboarding.png`, `Onboarding results.png`, `AI Actions.png`, `Personalized Content.png`, `Mobile transition.png` — keep these.
- `images/ff-hub/process-research.jpg` — One new image: a research/framework board screenshot (Miro, FigJam, or your synthesis).
- `images/ff-hub/row-thumb.jpg` + `row-thumb-loop.mp4` — Row entry assets.

### Smart Benefits
- `images/smart-benefits/featured-hero.jpg` — Composite hero: three embed modes (panel / modal / inline) side-by-side.
- `images/smart-benefits/exp-01-comparison.jpg` — Aimee comparing two health plan options in plain language. Inset of the "before" benefits comparison table.
- `images/smart-benefits/exp-02-three-modes.jpg` — 3-tile detail with mono captions: `Side panel · 480px wide`, `Modal · 720px wide`, `Inline · responsive`.
- `images/smart-benefits/exp-03-life-situation.jpg` — Question flow starting with employee's situation. Annotated callout: `"Starts where you are, not where the plans are."`
- `images/smart-benefits/process-design-system.jpg` — Design system documentation showing the embeddable component library.
- `images/smart-benefits/row-thumb.jpg` + `row-thumb-loop.mp4` — Row entry assets.

**Don't move into Phase 2 until imagery is captured.** The rebuild without imagery looks like the wireframe.

---

# PHASE 2 — Foundation (1–2 days)

Tokens, fonts, motion library. The system gets installed.

## HIGH-01 — Install fonts

**Outcome:** Inter, Playfair Display (italic-only), and JetBrains Mono are loaded once across every page. No other fonts.

**Paste into Claude Code:**
> In every HTML file's `<head>`, replace the current Google Fonts link with this single import: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap`. Add three CSS variables in `styles/site.css` `:root`: `--font-sans: 'Inter', system-ui, sans-serif`, `--font-serif: 'Playfair Display', Georgia, serif`, `--font-mono: 'JetBrains Mono', ui-monospace, monospace`. Note: Playfair Display is loaded *italic-only* — that's intentional, the serif is only used italic in this system. Confirm the import is single-line and no other font links remain.

## HIGH-02 — Pure white canvas + grain + tokens

**Outcome:** `styles/site.css` reflects the full Pure Mono palette + paper grain background. All pastel card-tints retire.

**Paste into Claude Code:**
> In `styles/site.css`, replace the `body` styles with:
> ```css
> body {
>   background: #FFFFFF;
>   background-image: repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,0.012) 4px 5px);
>   color: #0A0A0A;
>   font-family: var(--font-sans);
>   font-feature-settings: 'cv02','cv03','cv04','cv11';
>   -webkit-font-smoothing: antialiased;
> }
> ```
> Then replace the `:root` block with these tokens exactly:
> ```css
> :root {
>   --canvas: #FFFFFF;
>   --surface: #FAFAFA;
>   --surface-warm: #FAF8F2;
>   --ink:    #0A0A0A;
>   --ink-2:  #525252;
>   --ink-3:  #A3A3A3;
>   --border: #E5E5E5;
>   --border-strong: #0A0A0A;
>   --status-shipped-bg: #F0FDF4;
>   --status-shipped-fg: #166534;
>   --status-shipped-border: #BBF7D0;
>   --px:  clamp(24px, 5vw, 64px);
>   --max: 1440px;
>   --col: 1040px;
>   --read: 680px;
>   --font-sans: 'Inter', system-ui, sans-serif;
>   --font-serif: 'Playfair Display', Georgia, serif;
>   --font-mono: 'JetBrains Mono', ui-monospace, monospace;
> }
> ```
> Then grep for any hardcoded hex values like `#EBE8F4`, `#E2E7F0`, `#E2EDE8`, `#EDE6DC`, `#9B6B57`, `#fff3ec`, etc. across all CSS files, and replace them with the new tokens or remove them entirely. Print every replacement so I can review.

## HIGH-03 — Component primitives

**Outcome:** Buttons, cards, nav, and footer match the brutalist-kinetic system. No `border-radius` greater than 0 except the green status pill. No `box-shadow` anywhere.

**Paste into Claude Code:**
> Rewrite all button, card, nav, and footer styles in `styles/site.css`:
>
> 1. Remove every `border-radius` greater than `0` except the green status pill (which keeps `border-radius: 4px`) and the `⌘K` mono indicator (which keeps `4px`).
> 2. Remove every `box-shadow` from the entire stylesheet.
> 3. Buttons — primary: `background: #0A0A0A; color: #FFFFFF; border: 0.5px solid #0A0A0A; border-radius: 0; padding: 12px 20px; font: 500 14px var(--font-sans);`. Hover: `transform: translate(-1px, -1px);` and an offset 1px hairline appears behind it via a `::before` pseudo. No shadow.
> 4. Buttons — secondary: same shape, transparent fill, ink border. Hover: invert (black fill, white text).
> 5. Buttons — ghost link: plain text + mono trailing arrow. Hover: hand-drawn underline draws across (will be wired by `kinetic.js` MOVE 04).
> 6. Cards: `background: #FFFFFF; border: 0.5px solid var(--border); border-radius: 0; padding: 32px;`. Hover: `border-color: var(--ink);` only.
> 7. Mono pills: `border: 0.5px solid #0A0A0A; background: transparent; padding: 3px 8px; border-radius: 0; font: 500 11px var(--font-mono);`.
> 8. Status pills: `background: var(--status-shipped-bg); color: var(--status-shipped-fg); border: 0.5px solid var(--status-shipped-border); padding: 3px 9px; border-radius: 4px; font: 400 11px var(--font-mono);`.
> 9. Nav: sticky, height 64px, `padding-inline: clamp(24px, 5vw, 64px)`, `background: rgba(255,255,255,0.85); backdrop-filter: blur(20px);`, bottom hairline only on `scroll > 8`.
> 10. Footer: `background: var(--surface); padding-block: clamp(48px, 6vw, 80px); border-top: 0.5px solid var(--border);`. Three columns, mono small text.
>
> Print the diff for each component.

## HIGH-04 — Build the kinetic motion library

**Outcome:** A single vanilla-JS file `scripts/kinetic.js` exposes all seven kinetic moves via data attributes. No external dependencies. Respects `prefers-reduced-motion`.

**Paste into Claude Code:**
> Create `scripts/kinetic.js` implementing all seven motion moves below. Each move is triggered by a data attribute on any element. Use IntersectionObserver for scroll-triggered moves. All seven moves disable when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true — final state shows immediately. No external dependencies — vanilla JS only.
>
> **MOVE 01 — Typewriter** on `[data-kinetic="typewriter"]`. Reads the element's `data-text` attribute. Types character-by-character at 22ms per char. Appends a blinking `_` cursor for the first 2 seconds, then removes it.
>
> **MOVE 02 — Word-rise** on `[data-kinetic="word-rise"]`. Splits the element's text into one `<span>` per word. Each span animates from `translateY(28px) opacity(0)` to `translateY(0) opacity(1)` over 550ms with a 100ms stagger between words. Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`. Triggers on first paint OR scroll-into-view (use IntersectionObserver with 0.2 threshold).
>
> **MOVE 03 — Number count** on `[data-kinetic="count"]`. Reads `data-target` integer. Counts from 0 to target over 1500ms with cubic ease-out. Renders with `toLocaleString()` so `1000000` displays as `1,000,000`. Simultaneously animates `letter-spacing` from `-0.02em` to `-0.06em` — the number visibly *stretches* as it fills in. Triggers on scroll-into-view.
>
> **MOVE 04 — Hand-drawn underline** on `[data-kinetic="underline"]`. Adds an `::after` pseudo-element styled as `position: absolute; left: 0; bottom: -2px; height: 2px; background: currentColor; transform: skewY(-1deg); width: 0;`. Animates `width` from 0 to 100% over 600ms. Triggers on scroll-into-view OR on parent hover (configurable via `data-trigger="hover"` or `data-trigger="scroll"`).
>
> **MOVE 05 — Italic breath** on `[data-kinetic="breath"]`. Continuous CSS animation: `rotation` cycles between -0.5deg and +0.5deg every 6 seconds, ease-in-out, infinite. The element should already have a base rotation; this adds to it. Implement as a CSS class toggled by JS.
>
> **MOVE 06 — Section pin-eyebrow** on `[data-kinetic="pin-eyebrow"]`. When the parent `<section>` scrolls past the viewport top, the eyebrow pins to the top edge as `position: fixed; top: 64px; left: var(--px);` with mono-small treatment (11px JetBrains Mono, ink-3 color). When the section scrolls out of view, eyebrow unpins and disappears. Implement with IntersectionObserver on the section.
>
> **MOVE 07 — Image develop** on `[data-kinetic="develop"]`. The element (image or video) starts with `clip-path: inset(0 100% 0 0);` — fully masked. On scroll-into-view, animates `clip-path` to `inset(0 0 0 0)` over 800ms ease-out. Like a Polaroid printing.
>
> All moves expose a global `window.kinetic.init()` function that scans the DOM for data attributes and wires them up. Auto-call this on `DOMContentLoaded`. Print the resulting file.

---

# PHASE 3 — Homepage rebuild (1 day)

## HIGH-05 — Brutalist-kinetic hero

**Outcome:** New hero with editorial split-headline (sans + serif italic), kinetic word-rise entrance, mono utility strip with typewriter, off-grid status pill, hand-drawn underline on key phrase. Portrait removed.

**Paste into Claude Code:**
> Rebuild the homepage hero in `index.html` to match this structure exactly:
>
> 1. A row at the top with two children: left, a mono utility strip with `data-kinetic="typewriter"` and `data-text="Folio /// 2026 /// Bri May /// Los Angeles"`, rendering 11px in `var(--ink-3)`. Right, a `⌘K` mono pill: `border: 0.5px solid #0A0A0A; padding: 2px 7px; border-radius: 4px; font: 500 11px var(--font-mono);`.
> 2. A 0.5px hairline divider beneath, full-bleed, with `--border` color and a CSS animation that draws its width from 0 to 100% over 500ms with a 500ms delay.
> 3. A 12-col grid container with max-width `var(--max)` and `padding-inline: var(--px)`. Left column (8 cols): the headline.
> 4. Headline: a sans display H1 at `clamp(56px, 8vw, 96px)`, font-weight 500, letter-spacing -0.04em, line-height 0.94, color `var(--ink)`. Wrap each word in `<span>`. Apply `data-kinetic="word-rise"` to the H1. Reading: `Designs the product.` with the word "the" wrapped in `<span style="font-weight: 400; color: var(--ink-2);">the</span>`.
> 5. Below the H1: a serif italic line at `clamp(44px, 6vw, 72px)`, `font-family: var(--font-serif); font-style: italic; font-weight: 400; letter-spacing: -0.03em; margin-left: 22%; transform: rotate(-1deg); transform-origin: left center;`. Apply `data-kinetic="breath"`. Reading: `Ships it. <span style="font-family: var(--font-sans); font-style: normal; font-size: 36px; vertical-align: super; letter-spacing: -0.02em;">solo.</span>`.
> 6. Below: a body paragraph at 14px, max-width 460px, `var(--ink-2)`, line-height 1.55. Text: `Senior product designer. Fourteen years. Recently <span data-kinetic="underline">designed and built</span> a brand-trained AI workflow tool — solo — for 1M+ employees across Fortune 500 clients.`
> 7. Right column (4 cols): a mono metadata rail with three rows. Each row: a small label in `--ink-3`, a value in `--ink`. Rows: `Role / Senior PD`, `Based / Los Angeles`, `Status / Open` (Status value in green `#166534`).
> 8. Above the right column, absolute-positioned and rotated +2deg: a mono pill reading `Open to senior+`. `border: 0.5px solid #0A0A0A; background: var(--canvas); padding: 3px 8px; border-radius: 0; font: 400 11px var(--font-mono);`.
>
> Remove the half-circle portrait image entirely. Remove the `.marquee-wrap` section (already handled in Phase 0). Print the resulting HTML.

## HIGH-06 — Oversized number + supporting marquee

**Outcome:** A full-bleed section with one oversized hero number (`1,000,000+`) that count-stretches on scroll, plus a horizontal marquee row of supporting numbers in mixed type.

**Paste into Claude Code:**
> Below the hero in `index.html`, add a full-bleed `<section class="hero-stat">` with:
>
> 1. A 0.5px top hairline (`--border`).
> 2. An oversized number element: `<div data-kinetic="count" data-target="1000000">0</div>` styled as `font-size: clamp(96px, 14vw, 200px); font-weight: 500; line-height: 0.85; font-variant-numeric: tabular-nums; letter-spacing: -0.02em;`. Append a `<span class="num-plus">+</span>` styled `font-size: 36px; vertical-align: super; letter-spacing: -0.02em;` with its own opacity 0 → 1 fade-in delayed 1700ms (CSS animation).
> 3. Below the number, a mono caption: `employees reached / one tool / built solo` at 12px, `--ink-2`, with `border-left: 0.5px solid var(--border); padding: 2px 8px;`.
> 4. A 0.5px hairline below.
> 5. A horizontal marquee row, full-bleed (extends edge-to-edge), with these items separated by mono `/` characters: `$12M revenue` (sans 16px 500), `14 years` (sans), `solo build` (serif italic 16px 400), `Fortune 500` (sans), `brand-trained AI` (sans). All baseline-aligned. No animation — static.
> 6. A 0.5px bottom hairline.
>
> Section padding: `clamp(64px, 8vw, 112px) 0;` block, with inner content using `padding-inline: var(--px)` and max-width `var(--max)`.
>
> Print the resulting HTML.

## HIGH-07 — Featured FF Content Writer (black inversion + kinetic)

**Outcome:** Full-width black-card section with kinetic word-rise headline, status pills, autoplay product video loop, and an off-grid italic `built solo` mark.

**Paste into Claude Code:**
> Build the homepage featured project section as a single full-width `<a href="/work/ff-content-writer/">` block:
>
> Background `#0A0A0A`, color `#FFFFFF`, border `0.5px solid #1F1F1F`, border-radius `0`, padding `clamp(40px, 6vw, 72px)`. Inside:
>
> 1. A small mono eyebrow at the top: `Case 01 · FF Content Writer · 2026` in `#888`.
> 2. Above the eyebrow, absolute-positioned and rotated -1deg, a tiny mono callout `built solo` in serif italic 14px in `#888`, slightly off-grid to the right (e.g., `right: 8%; top: 24px;`).
> 3. The headline: sans display at `clamp(28px, 4vw, 48px)`, font-weight 500, line-height 1.1, max-width 820px, color white. Reading: `A brand-trained AI workflow tool that scales financial content — without losing the voice that makes it trusted.` Apply `data-kinetic="word-rise"`.
> 4. A row of mono pills: `[shipped]` (text color `#4ADE80`, border `#166534`), `[solo build]`, `[1M+ users]`, `[brand-trained AI]`. Each pill: `border: 0.5px solid #2A2A2A; background: transparent; padding: 4px 10px; border-radius: 0; font: 500 11px var(--font-mono); color: #BBB;` (except shipped which is green).
> 5. The hero video: a `<video autoplay muted loop playsinline>` pointing to `images/ff-content-writer/featured-loop.mp4`, full card width, aspect-ratio 21/9, with `data-kinetic="develop"`. Fallback `<img>` to `featured-hero.jpg` for non-video browsers.
> 6. A bottom-row link `view case study →` in mono 12px `#BBB`.
>
> Hover the entire link: nothing changes. The card is its own state.

## HIGH-08 — Supporting work as flat rows with kinetic hover

**Outcome:** FF Hub and Smart Benefits become flat rows below the featured card. Hand-drawn underline animates on hover.

**Paste into Claude Code:**
> Below the featured FF Content Writer card, add `<section class="work-rows">`. Inside, two row links (`<a>` blocks). Each row is a 6-column grid: `28px 1fr 1fr 100px 64px 14px` with 14px gap, `padding: clamp(20px, 3vw, 28px) 0;` separated by `border-top: 0.5px solid var(--border);`. Columns: (1) mono number `02` / `03`, (2) project title (sans 14px 500) and one-line scope (mono 11px), (3) one-line outcome (sans 12px `--ink-2`), (4) mono date range, (5) thumbnail at 64px wide pointing to `images/[project]/row-thumb.jpg` with `data-kinetic="develop"`, (6) mono `→`.
>
> Row 02: FF Hub, `Platform redesign · enterprise scale`, `+200% engagement, $12M revenue, Fortune 500 clients including Meta and the Federal Reserve.`, `2024 — 2025`, thumbnail `images/ff-hub/row-thumb.jpg`.
>
> Row 03: Smart Benefits, `B2B2C embed system · 3 modes`, `A white-labeled AI benefits guide. Three embed modes shipping into any recordkeeper platform.`, `2024`, thumbnail `images/smart-benefits/row-thumb.jpg`.
>
> Hover: row's bottom hairline triggers `data-kinetic="underline"` to draw across left-to-right and animates color from `var(--border)` to `var(--ink)`. Apply `data-trigger="hover"` to the underline.
>
> Print the resulting HTML.

## HIGH-08b — About preview + footer

**Outcome:** Updated About preview with small portrait + mono caption; new footer with typeset-in line.

**Paste into Claude Code:**
> Update the About preview section on `index.html` to a 2-column grid (1fr 1fr): left column has a mono eyebrow `About`, a sans h2 `Senior, strategic, obsessed with craft.` (apply `data-kinetic="word-rise"`), a one-paragraph body at 14px `var(--ink-2)`, and a mono `more →` link. Right column has a square portrait `<img src="images/portrait-square.jpg">` at max-width 220px, aligned right, `border-radius: 0`. Below the image, a mono caption: `Bri / Los Angeles / 2026` at 11px `var(--ink-3)` with `data-kinetic="underline"` on the name.
>
> Update the footer to: full-bleed background `var(--surface)`, top hairline, three columns (brand block / sitemap mono links / social mono links), and a final mono line at the bottom reading: `© 2026 — Bri May / Designed and built by Bri / typeset in Inter, Playfair Display, JetBrains Mono.`

---

# PHASE 4 — Case study migrations (2–3 days)

## HIGH-09 — Universal case study template

**Outcome:** A shared `styles/case-study.css` and HTML template that all three case studies use. Section eyebrows are pinnable. Hero supports video loops.

**Paste into Claude Code:**
> Create `styles/case-study.css` and `templates/case-study.html` defining the universal case study layout below. Then refactor `work/ff-content-writer/index.html` to import this CSS and use the shared classes. Strip the page-level `<style>` block to only what's truly unique to FF Content Writer.
>
> **Template structure:**
>
> 1. **Hero** — Mono eyebrow `Case 0X · [Project] · [Year]` with `data-kinetic="pin-eyebrow"`. Editorial serif italic headline (one per page) with `data-kinetic="breath"`. Sans subhead at 19px max-width 680px. Mono metadata strip (Role · Timeline · Stack · Status). Hero `<video>` loop with `data-kinetic="develop"`, autoplay muted loop playsinline, fallback `<img>`. 21:9 aspect, full-bleed.
> 2. **What I owned** — 5-row table: Strategy / Design / [Domain] / Build / Ship. One sentence each. No image.
> 3. **Stat block** — Full-bleed, 3 cells separated by hairlines. Numbers with `data-kinetic="count"`.
> 4. **Problem** — Single editorial column 680px max, mono eyebrow, sans h2, body prose. No image.
> 5. **Opportunity** — Pull-quote-style large headline (sans 500), transform table.
> 6. **Solution** — Section header + numbered list (4 max). One annotated SVG systems diagram (`solution-diagram.svg`).
> 7. **Experience 01–06** — Six section blocks. Each: mono eyebrow with pin-eyebrow, sans h2, paragraph, image (full-bleed OR 2-up OR side-by-side with annotation overlay). Each image gets `data-kinetic="develop"`.
> 8. **Process** — Narrate how the work was made. Image: Figma board / system map / build artifact.
> 9. **Impact** — Full-bleed stat slab, 3 cells, count-up. Optional client pill row.
> 10. **What's next** — Numbered list of 3–4 items.
> 11. **Final takeaway** — Full-bleed slab on `var(--surface)`. Sans display 500 with `--ink-2` muted second line. NO serif here — the serif moment is the hero only. Hard rule.
>
> All h2s use sans display weight 500. Eyebrows in mono, lowercase, letter-spacing 0.04em. Border-radius 0 throughout. No shadows. Print the template.

## HIGH-10 — Migrate FF Content Writer

**Outcome:** FF Content Writer case study uses the new template, has all real screenshots embedded, includes the autoplay hero video and the off-grid `built solo.` callout.

**Paste into Claude Code:**
> In `work/ff-content-writer/index.html`:
>
> 1. Replace every `<div class="img-placeholder">…</div>` with a real `<img>` or `<video>` tag pointing at the correct asset in `images/ff-content-writer/`. Expected filenames: `featured-loop.mp4` (hero video, autoplay), `solution-diagram.svg`, `exp-01-generator.jpg`, `exp-02-editors.jpg`, `exp-03-library.jpg`, `exp-04-quality.jpg`, `exp-05-selection.jpg`, `exp-06-details.jpg`, `process-build.jpg`. Verify each file exists first; if any missing, list them and stop.
> 2. Add `data-kinetic="develop"` to every image and video.
> 3. Add `data-kinetic="pin-eyebrow"` to every section eyebrow.
> 4. Add `data-kinetic="count"` with appropriate `data-target` to every number in the impact section: `1,000,000` for the employees reached, `12,000,000` displayed as `$12M` for revenue, etc.
> 5. Next to the impact section, add an absolute-positioned italic stamp: `<span class="impact-stamp" data-kinetic="breath">built solo.</span>` styled as `font-family: var(--font-serif); font-style: italic; font-size: 32px; transform: rotate(-2deg); position: absolute; right: 8%; top: 24px;`.

## HIGH-10b — Use the rewritten copy for all three case studies

**Outcome:** All three case studies are migrated to the universal template AND rewritten to the FAANG-skimmable bar. Three copy files saved at:
- `case-studies/ff-content-writer-copy.md`
- `case-studies/ff-hub-copy.md`
- `case-studies/smart-benefits-copy.md`

**Paste into Claude Code (when migrating each case study):**
> Read `case-studies/[project]-copy.md` and use that file as the source of truth for every section's copy. Map each section in the file to its slot in the universal case study template — hero, what-i-owned, stat block, problem, opportunity, solution, six experience sections, process, impact, what's next, takeaway. Don't paraphrase; use the copy as written. Don't drop any section. Verify every section has a corresponding HTML element before considering the migration complete.

**Naming note:** The FF Content Writer case study has been rewritten under the new product name **FF Studio**. URLs and folder paths can stay `/work/ff-content-writer/` — only the public-facing name changes.

## HIGH-11 — Migrate FF Hub

**Outcome:** FF Hub uses the universal template with re-cropped existing images and one new process image.

**Paste into Claude Code:**
> Refactor `work/hub/index.html` to use `styles/case-study.css`. Re-write the page using the same structural classes as FF Content Writer (hero, what-i-owned, stat-block, problem, opportunity, solution, exp-01..06, process, impact, whats-next, takeaway). Map the existing copy from the current page into the new structure.
>
> Existing image filenames in `images/Financial Finesse Case Study/` are: `Hero.png`, `Aimee.png`, `Onboarding.png`, `Onboarding results.png`, `AI Actions.png`, `Personalized Content.png`, `Mobile transition.png` — keep these. Add image placeholders for `solution-diagram.svg` and `process-research.jpg` (I'll add those later).
>
> Apply `data-kinetic` attributes:
> - `pin-eyebrow` on every section eyebrow
> - `develop` on every image
> - `count data-target="200"` on the +200% engagement number
> - `count data-target="12000000"` on the $12M number
> - `breath` on the editorial serif headline
>
> In the impact section, add a marquee row of mixed-family client names: `Meta · NFL · JPMorgan · Federal Reserve · Patagonia` separated by mono `/` characters. Mix sans 500 and serif italic 400 alternating.

## HIGH-12 — Migrate Smart Benefits

**Outcome:** Smart Benefits uses the universal template; placeholder values are gone; new screenshots embedded; three embed modes reveal sequentially.

**Paste into Claude Code:**
> Refactor `work/smart-benefits/index.html` to use `styles/case-study.css`. Migrate from the older template (with `.before-after`, `.problem`, `.solution`, `.key-decisions`, `.learnings` classes) to the universal template. Map existing copy to new sections.
>
> Replace every `X%` and `X+` placeholder: either with a real number I'll provide, or by hiding the entire stat cell. List every placeholder you find before applying changes.
>
> Image references should point at `images/smart-benefits/`. Expected filenames: `featured-hero.jpg` (hero), `solution-diagram.svg`, `exp-01-comparison.jpg`, `exp-02-three-modes.jpg`, `exp-03-life-situation.jpg`, `process-design-system.jpg`. Where files don't exist yet, leave the `<img>` tag commented out with a note.
>
> Apply `data-kinetic` attributes throughout (pin-eyebrow, develop, count, breath).
>
> In the solution section, the three embed modes (panel / modal / inline) reveal sequentially. Wrap each in its own container with `data-kinetic="develop"` and stagger them via inline `style="animation-delay: 200ms"` etc. Each label is in serif italic 18px.

## HIGH-13 — Hand-annotated systems diagrams

**Outcome:** Each case study has one annotated SVG systems diagram. This is the single biggest "level signal" upgrade.

**Paste into Claude Code:**
> For each of the three case studies, create one SVG systems diagram and save it under the case study's image folder as `solution-diagram.svg`. Each diagram is a 1040×360 SVG, white background, hairline 0.5px borders in `#0A0A0A`, mono labels in `JetBrains Mono` at 11px. Each label gets a small random rotation between -1deg and +1deg (deterministic — use the label's index to seed) for the hand-made feel. Connector lines have 0.5px black + 0.5px white double-stroke for a subtle hand-drawn shimmer. 4–5 boxes per diagram connected by simple right-angle lines with arrowheads.
>
> Diagrams to create:
>
> 1. `images/ff-content-writer/solution-diagram.svg` — Sequential flow. Boxes: `Brand voice rules` → `Content type schemas` → `Compliance non-negotiables` → `Generation engine` → `Drafted content`.
> 2. `images/ff-hub/solution-diagram.svg` — Hub-and-spoke. Center: `Personalized dashboard`. Inputs from left: `Onboarding inputs`. Three branches out: `Aimee coach`, `AI actions`, `Content recommendations`.
> 3. `images/smart-benefits/solution-diagram.svg` — Embed architecture. A `Recordkeeper host platform` dashed-rectangle on the left wraps three boxes (`Side panel`, `Modal`, `Inline`) — these represent the white-label boundary. They all connect to `Aimee guidance engine` → `Plan recommendations` on the right.
>
> No decorative effects. Pure structural diagrams. Print each SVG so I can review before saving.

---

# PHASE 5 — Polish (1 day)

## MEDIUM-01 — Wire the seven kinetic moves across the site

**Outcome:** Every kinetic move from `scripts/kinetic.js` fires on the right elements across every page. Reduced-motion respected globally.

**Paste into Claude Code:**
> Audit every page in this repo and ensure each kinetic move from `scripts/kinetic.js` fires on the right elements:
>
> - **MOVE 01 (typewriter):** homepage utility strip; case study eyebrow strips.
> - **MOVE 02 (word-rise):** every page's primary headline, including all case study heroes and the homepage hero.
> - **MOVE 03 (count):** every visible large number — homepage hero stat, all case study impact numbers.
> - **MOVE 04 (underline):** every key phrase in body prose marked with the data attribute (e.g., `designed and built` on home, project titles in body prose).
> - **MOVE 05 (breath):** every italic serif moment (one per page).
> - **MOVE 06 (pin-eyebrow):** every section eyebrow in case studies.
> - **MOVE 07 (develop):** every product screenshot and video loop.
>
> Verify all seven moves disable when `prefers-reduced-motion: reduce`. Audit-print every page's kinetic activations so I can review coverage. Add `<script src="/scripts/kinetic.js" defer></script>` to every page if not already present.

## MEDIUM-02 — Mobile QA + hamburger nav

**Outcome:** Every page works at 375px (iPhone SE), 414px (iPhone Plus), 768px (tablet), 1024px (small laptop). Real mobile nav.

**Paste into Claude Code:**
> Audit every page for mobile breakpoints:
>
> 1. The hero on every page must keep type proportions sensible at 375px — the serif italic headline should never overflow horizontally.
> 2. The supporting work rows on the homepage should collapse from a 6-column grid to a stacked 2-row layout per item at ≤640px.
> 3. The featured black-card on the homepage should keep its inversion treatment but reduce padding to `clamp(24px, 6vw, 40px)` at narrow viewports.
> 4. Case study experience images should always be full-width at ≤768px.
> 5. The oversized hero number (`1,000,000+`) should clamp down to `clamp(72px, 18vw, 140px)` at ≤640px so it stays in-frame.
> 6. Add a real mobile nav: a hamburger icon at ≤640px (3 horizontal hairlines) that opens a full-screen overlay with the same nav links in mono 18px, plus close button (×). Overlay background `var(--canvas)` with paper grain. No shadow.
>
> Print the diff for each file you change.

---

# PHASE 6 — Nice to have (when time permits)

These compound your hire signal but aren't required to ship.

## NTH-01 — Embedded interactive FF Content Writer demo

A read-only sandboxed version of the AI generator embedded inside the case study, where visitors type a topic and see a generated FF-voice draft. **The single highest-leverage thing you could add.** Targets your unfair advantage and proves "designer-builder" beyond doubt. Plan it as a separate week-long project once Phase 5 is shipped.

## NTH-02 — Loom or hosted MP4 walkthrough

60–90 seconds. You narrating a click-through of FF Content Writer end to end. Embed at the top of the case study as a second loop option (the silent autoplay loop is already there from HIGH-10). If you can ship this in a single afternoon — do it. Almost as good as NTH-01, an order of magnitude cheaper.

## NTH-03 — Real testimonials with attributed quotes

2–3 quotes, each from a named senior partner (your VP Product, the head of content, the engineering lead at FF). Format as a single `quotes/` section on the homepage between the supporting work and the About preview. One quote per partner. Mono attribution. Style the quotes in serif italic for one editorial moment per quote (this becomes the "earned" italic moment on the homepage).

## NTH-04 — `⌘K` actually works

Build a real command palette: navigate to projects, jump to sections, switch between case studies. Uses [`cmdk`](https://cmdk.paco.me/) (well-known React lib, drop-in for vanilla too). Closes the loop on the visual cue you already added.

## NTH-05 — Resume page

Single static HTML resume at `/resume/`. Fits one page when printed. Same brutalist-kinetic system. Includes a `Download PDF` link generated server-side or pre-rendered. Match the flat-row aesthetic of the work index. The serif italic moment becomes your name.

## NTH-06 — Dark mode toggle

The system inverts cleanly to a dark theme. Add `[data-theme="dark"]` rules in CSS, a small toggle in the nav. Recruiters who land on the dark version remember you.

---

# Suggested cadence

If you're working solo with Claude Code, here's a realistic timeline:

- **Today (1 hour):** Phase 0 triage — all four CRITICAL fixes. Don't move on until imbrimay.com has zero placeholder strings public.
- **This weekend (1 day):** Phase 1 — capture every screenshot + 5 video loops + new portrait. Drop everything into `images/` with the right filenames.
- **Next Mon–Tue:** Phase 2 — fonts, tokens, components, kinetic library.
- **Next Wed:** Phase 3 — homepage rebuild.
- **Next Thu–Fri:** Phase 4 — case study template + migrations + diagrams.
- **Following Mon:** Phase 5 — polish + mobile QA + kinetic wiring.
- **Done.** Site is in the top 1% by the second Monday.

Phase 6 items spread across the next two weeks while you also start applying.

---

# What this gets you

After roughly 10–14 working days through Phases 0–5:

You have a portfolio that registers as 2026 cutting-edge — pure white, brutalist-kinetic, multi-family typography, seven thoughtful motion moves, one wow per page, no fluff color. Personality bearer is type and motion, not decoration. Hire signal is *"designer-builder who understands when motion has meaning."*

The FF Content Writer story is *insistent* — black-card inversion, count-up `1,000,000+` with letter-spacing stretch, italic `built solo.` stamp, autoplay product loop. Reviewers don't have to believe your claim — they see the proof.

You're competing with Rauno Freiberg, Studio Lowrie, the Pentagram redesigns, the recent A24 / Linear marketing register. That's the ceiling. This system gets you onto that shelf.

---

*Last updated: 2026-05-01 · Generated with Claude*
