# imbrimay.com

[![Deploy to GitHub Pages](https://github.com/thebrimay-wq/bri-portfolio-2/actions/workflows/deploy.yml/badge.svg)](https://github.com/thebrimay-wq/bri-portfolio-2/actions/workflows/deploy.yml)

Portfolio of **Bri May** — AI-Native Lead Product Designer & Design Engineer.
The homepage is **Brix**, a conversational concierge whose answer engine runs
entirely in the visitor's browser: **no framework, no build step, no backend,
no API key.**

**Live: [imbrimay.com](https://imbrimay.com)** · Ask it anything — or try a
deep link like
[`/?q=how does this work`](https://imbrimay.com/?q=how%20does%20this%20work)
and it will explain (and show you) its own engine.

![Brix answering "How does this work — are you a real AI?" with its own source code rendered inside the chat answer](images/brix-case-study/hero-answer.webp)

## Why it's built this way

A portfolio's claims should be checkable. Instead of writing "design engineer"
on a static page, the page is the evidence — and every engineering decision
optimizes for the person who will actually poke at it:

- **On-device retrieval instead of an LLM API.** Questions are normalized,
  stop-worded, synonym-expanded, and fuzzy-matched (Levenshtein ≤ 1) against a
  hand-written knowledge base, scored for confidence, then streamed
  token-by-token. Zero latency floor, zero run cost, works offline, nothing
  leaves the browser — and the site says exactly what it is when asked.
- **Honest LLM ergonomics.** Streaming with punctuation-aware pacing, a
  thinking state, stop-to-finish, one-turn memory, contextual follow-ups, a
  graceful fallback that offers the nearest topics it *does* know, and
  shareable `?q=` deep links to any answer.
- **Accessibility as architecture, not a pass.** WCAG AA contrast in both
  themes (worst-case measured against page *and* card surfaces), streaming
  that announces once to screen readers instead of ~90 times, skip links,
  keyboard-complete flows, intrinsic image dimensions (CLS ≈ 0), and a full
  `<noscript>` homepage.
- **Audited like a product.** A scripted browser drives every page — network,
  layout at 320–1440px, contrast, live-region behavior, downloads — and a
  38-question recruiter-screening probe runs against the live engine.
  Current state: **probe 37/38 confident · 42/42 browser checks · both
  themes AA**. The QA pass is codified in
  [`.claude/skills/portfolio-review/`](.claude/skills/portfolio-review/) so
  it runs identically every time.

The full story is a case study on the site itself:
**[imbrimay.com/work/brix](https://imbrimay.com/work/brix/)**.

## Architecture

```
index.html            The homepage — a three-column LLM-app shell (rail / chat / side panel).
                      All chat logic is self-contained vanilla JS in this file: the KB,
                      the retrieval engine, streaming, and the UI.
styles/site.css       Single shared stylesheet: design tokens (light + dark + manual
                      toggle), reset, nav, footer, buttons, scroll reveal.
scripts/nav.js        Inner-page nav: mobile menu, theme toggle, skip link, footer year.
scripts/embed.js      Pages opened in the homepage's side panel (?embed=1 / iframe) hide
                      their own chrome; the saved theme is applied before first paint.
work/ about/ resume/  Static pages. Page <style> blocks hold only page-specific CSS.
contact/ aimee-ai/    Case studies: Global Content Studio, FF Hub, Aimee, and Brix itself.
src/                  A React 18 + Vite mirror — a development sandbox, not deployed.
.claude/skills/       The portfolio-review QA skill: engine probe, browser audit,
                      asset audit, and the judgment checklist.
.github/workflows/    Deploy: static files copied to GitHub Pages on push to main.
```

Design tokens are defined three times in `site.css` — light `:root`,
`prefers-color-scheme: dark`, and a manual `[data-theme]` override persisted
to `localStorage` — so the whole site re-themes with no flash and no
per-component color code.

## Running locally

The deployed site needs no install:

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

React mirror (optional): `npm install && npm run dev`

## Running the QA pass

```bash
node .claude/skills/portfolio-review/scripts/probe-engine.mjs     # engine probe, seconds
python3 .claude/skills/portfolio-review/scripts/asset-audit.py    # asset report, seconds
# full browser audit: see .claude/skills/portfolio-review/SKILL.md
```

## Rights

Code is public to read as a work sample. The content — case studies, copy,
images, and the résumé — is © Bri May, all rights reserved.
