# Portfolio Ideas — Consolidated Backlog

> Every open idea for imbrimay.com, gathered from the design reviews and working
> sessions of 2026-04 through 2026-08-21. Superseded and already-shipped items are
> listed at the bottom so they stop resurfacing.
>
> **Sources:** the 2026-08-21 `ui-ux-designer` review · the 2026-08-20 design-critique
> session · `ROADMAP.md` (superseded, mined for open items) · `DEMO-FORK-PLAN.md` ·
> `CLAUDE.md` change log.
>
> **Status key:** ⬜ open · 🟡 partially done · ✅ done

---

## 1. Credibility gaps — do these first

These are the cheapest things that most change how a hiring manager reads the site.

| # | Idea | Effort | Status |
|---|---|---|---|
| 1.1 | **Named testimonials.** The Federal Reserve pull-quote on Global Content Studio is unattributed, which reads as self-authored. A real name and title flips it into the most persuasive sentence on the site. Target 2–3. | Outreach, not code | ⬜ |
| 1.2 | **60–90s walkthrough video** of Global Content Studio, narrating the build. Proves the "designed AND built it solo" claim in a way static images can't. | Half a day | ⬜ |
| 1.3 | **Cross-browser + device pass** — Chrome, Safari, Firefox at 375 / 768 / 1280 / 1920. Never formally done. | 2 hours | ⬜ |
| 1.4 | **One trusted designer reviews the live site** before any real application push. | — | ⬜ |

*1.1–1.4 were MUST-02, MUST-03 and the pre-launch checklist in the old roadmap. They
survived the direction change because they aren't about visual design at all.*

---

## 2. The design system pass

From the 2026-08-21 `ui-ux-designer` review. Items 2.1–2.6 are all edits to
`styles/site.css` and propagate to every page — roughly a day for the bulk of the
visual change. A working before/after prototype exists (see *Prototype* below).

| # | Idea | Effort | Status |
|---|---|---|---|
| 2.1 | **Replace the type system.** Retire Inter (the 2021–2024 AI-product default). Newsreader for display (real `opsz` axis), Geist for UI, Geist Mono for eyebrows and metric labels. **Drop every 700 to 300–500** — premium typography comes from the distance between weights, not the average weight. Establish one fluid scale; today each case study redefines its own headings in ~550 inline lines, and h2 is tracked *tighter* than h1, which is backwards. | 4 hrs | ⬜ |
| 2.2 | **Self-host and subset the fonts.** Currently pulling both full variable axes plus the complete italic set from Google Fonts. Recovers ~200–300ms of LCP. | 1 hr | ⬜ |
| 2.3 | **Warm the neutral ramp.** The grays are Tailwind cool-blue slate sitting under a warm clay accent — that mismatch is why the palette feels slightly incoherent. Deriving neutrals from the accent hue fixes it. **See the open decision below.** | 30 min | ⬜ |
| 2.4 | **Motion tokens.** Every transition uses the bare `ease` keyword; `.fade-up` is 20px over 550ms. That combination is the recognizable "AI landing page" signature. Move to ~12px over 320ms on an expo-out curve with a brief blur-out, and cap the stagger at five items. | 2 hrs | ⬜ |
| 2.5 | **Material and depth.** Retire `1px solid var(--border)` as the universal card treatment. A layered ring plus a soft accent-hue-tinted shadow via `color-mix(in oklab, …)` is the specific treatment that separates 2026 from 2021. Add a radius scale — 16px on everything is flat. | 1 hr | ⬜ |
| 2.6 | **A real spacing scale.** Today: `--px` plus hand-picked section padding. Editorial pacing above 1440px needs more air between movements than the current 128px cap. | 1 hr | ⬜ |
| 2.7 | **Extract `case.css` and go asymmetric.** Move the ~550 inline lines out of each case study — that duplication is why the type scale can't be enforced. Then break the centered 720px column: text stays left-of-center, captions and process notes hang in the right margin. The "mindset shift" contrasts are already perfect sidenote content. | Half a day | ⬜ |
| 2.8 | **Retire the metric cards.** `+200%` at ~4.7rem in a light serif with a mono label beneath reads like a magazine spread. Same data, completely different register. | Included in 2.7 | ⬜ |

---

## 3. Structure and interaction

| # | Idea | Effort | Status |
|---|---|---|---|
| 3.1 | **Kill the iframe preview panel; adopt cross-document view transitions.** The current `<iframe>` costs shareable case-study URLs (the single most common thing a recruiter does with a portfolio), breaks the back button, and renders a second nav, footer, and full stylesheet inside the pane. `@view-transition { navigation: auto; }` plus `view-transition-name` on the rail and composer gives persistent chrome across real navigations with zero JS. This is the most 2026-feeling capability available and a static multi-page site is exactly its use case. | 1 day | ⬜ |
| 3.2 | **Rebalance the homepage.** Keep Brix, change which layer it occupies: three case studies with thumbnails own the primary area, Brix becomes a persistent bottom-docked composer across all pages. Currently a hiring manager with eight seconds has to *request* the evidence. Bottom-docked also puts the primary mobile interaction in the thumb zone. | 1–2 days | ⬜ |
| 3.3 | **A localization diff viewer.** One article shown across three countries with the changed reasoning highlighted. Pure static JSON, no backend — and nobody can copy it because the insight is the content. Strongest single addition proposed to date. | 1–2 days | ⬜ |
| 3.4 | **Real `⌘K` command palette.** Long-standing nice-to-have. Fits the LLM-app shell the homepage already uses. | Half a day | ⬜ |
| 3.5 | **Re-map homepage card 2.** Its question says "projects" but it still fires the `about`/bio answer. Flagged 2026-07-21, still open. | 15 min | ⬜ |

---

## 4. The live demo

The Global Content Studio demo is the highest-signal thing on the site — recruiters
*operate* the product rather than looking at screenshots of it.

| # | Idea | Effort | Status |
|---|---|---|---|
| 4.1 | Demo section on the case study — launcher card, click-to-copy password, poster screenshot | — | ✅ 2026-08-20 |
| 4.2 | **Standalone demo repo**, decoupled from company Azure/worker, synthetic content, 15 locales, 225 variants, 512 QA flags. Private at `thebrimay-wq/global-content-studio-demo`. Verified zero network requests at runtime. | — | ✅ |
| 4.3 | **Deploy the demo to Vercel** from the private repo (Vercel deploys private repos normally, so the public URL still works). | 1 hr | ⬜ |
| 4.4 | **Swap the launcher for a true inline `<iframe>`.** The poster-and-password pattern exists *only* because the company Vercel deploy sends `X-Frame-Options: DENY`. Once the demo is on your own deploy without password protection, it becomes frameable and this is a one-block swap. | 1 hr | ⬜ |
| 4.5 | Personal Anthropic key + spend cap, if the demo keeps the live AI path | — | ⬜ |
| 4.6 | Pick a demo domain — `demo.imbrimay.com`? | — | ⬜ |
| 4.7 | Decide on Financial Finesse branding inside the demo (currently left as-is, per your call) | — | 🟡 |

---

## 5. Housekeeping

| # | Idea | Effort | Status |
|---|---|---|---|
| 5.1 | **`deploy.yml` copies an explicit allowlist.** A new top-level page directory that isn't added to it works perfectly on localhost and 404s in production. Worth a guard or at least the README note (added 2026-08-21). | — | 🟡 |
| 5.2 | **`node_modules` was committed** (2748 files) — untracked 2026-08-21, but it's still in git history. Removing it from history is a separate decision with its own blast radius. | — | 🟡 |
| 5.3 | Delete or keep `_local/` (95MB of unreferenced assets) and `docs/case-studies/media/` (544MB) | — | ⬜ |
| 5.4 | Three orphaned worktree directories (~1.4GB) under the stray `Github/bri-portfolio-2/` path | — | ⬜ |

---

## Open decisions

**1. `--ink-3`: cool or warm?** Two AA-passing options are on the table and they
conflict.

- **Shipped (2026-08-19):** `#6C7481` light / `#7F8791` dark — cool gray, 4.72:1 and 5.16:1
- **Proposed (2026-08-21):** `#6E6663` light / `#8A827E` dark — warm, 5.60:1 and 5.00:1

The warm values only make sense as part of re-hueing the whole ramp to the clay accent
(2.3). Taking them piecemeal would leave the palette *more* inconsistent, not less.
Decide 2.3 and this resolves with it.

**2. How much of §2 to take.** The type system (2.1) alone is the single biggest
perceptual change and is one afternoon. The full pass is about a day. §3 is
structural and should be a separate branch.

---

## Prototype

A working before/after prototype of §2 exists — real Hub case study copy rendered
through both token systems, with live toggles for Current ↔ Proposed and Light ↔ Dark,
a motion replay, and a contrast-audit table that recomputes per mode. Built
2026-08-21, session scratchpad, `redesign-preview.html`. Worth re-generating into the
repo if §2 gets picked up.

---

## Done — do not re-propose

From the old `ROADMAP.md` (a "Brutalist-Kinetic Rebuild" that was abandoned in favor of
the Brix agent direction) and the change log:

- ✅ **Dark mode** — full token-driven theme, system-aware plus manual toggle, no flash
- ✅ **Résumé page** at `/resume/` with PDF download
- ✅ **Mobile navigation** — rail drawer on the homepage, hamburger on inner pages
- ✅ **Live GCS demo embedded** in the case study (as a launcher — see 4.4)
- ✅ **Accessibility floor** — AA contrast, global focus ring, 44px touch targets,
  `scroll-margin-top`, `aria-current`, JSON-LD, `<noscript>` fallback
- ✅ **Brix retrieval fixes** — per-entry token credit, strongest-project intent,
  greeting word boundaries, persistent recents
- ✅ Real product screenshots, interactive Atlas pipeline, hero videos, framed media
- ❌ **The brutalist-kinetic direction itself** — pure white canvas, paper grain,
  Playfair Display italic, seven kinetic moves, black-card inversion, oversized-number
  marquee. Superseded. The roadmap is kept only for the items above.
