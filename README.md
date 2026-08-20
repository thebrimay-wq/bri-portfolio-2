# imbrimay.com

Portfolio and case-study site for **Bri May** — AI-Native Lead Product Designer & Design Engineer.

Live at [imbrimay.com](https://imbrimay.com).

## Architecture

The deployed site is **static HTML + CSS + vanilla JavaScript — no build step, no framework, no backend**. That's a deliberate choice, not a limitation:

- **Instant loads.** No hydration, no bundle. The heaviest page ships one stylesheet and one script.
- **Zero run cost.** GitHub Pages serves everything; there is nothing to scale, patch, or pay for.
- **The chat has no API.** The homepage "Brix" assistant is a client-side retrieval engine — questions are normalized, stop-worded, synonym-expanded, and fuzzy-matched (Levenshtein ≤ 1) against a hand-written knowledge base, scored for confidence, then streamed token-by-token for feel. No key, no per-message cost, nothing leaves the visitor's browser, works offline. The trade-off is scope: it only knows about Bri, and says so.

### Layout

```
index.html            The homepage — a three-column LLM-app shell (rail / chat / side panel).
                      All chat logic is self-contained vanilla JS in this file.
styles/site.css       Single shared stylesheet: design tokens (light + dark), reset, nav,
                      footer, buttons, scroll reveal. Source of truth for every static page.
scripts/nav.js        Inner-page nav: mobile hamburger, theme toggle, skip link, footer year.
scripts/embed.js      Marks pages opened in the homepage's side panel (?embed=1 / iframe)
                      so they hide their own chrome; applies the saved theme before paint.
work/ about/ resume/  Static pages. Page <style> blocks contain only page-specific CSS.
contact/ aimee-ai/
src/                  A React 18 + Vite mirror of the site. Not deployed — kept as a
                      development sandbox. CI copies static files only.
.github/workflows/    GitHub Pages deploy: copies static files into _site/ and publishes.
```

### Details that matter

- **Design tokens, both themes.** All color flows through custom properties defined three times in `site.css` — light `:root`, `prefers-color-scheme: dark`, and a manual `[data-theme]` override persisted to `localStorage` and applied in `<head>` (no flash). Text tokens meet WCAG AA on both grounds.
- **Accessible streaming.** The chat thread is `role="log"` with `aria-live="off"` while tokens stream; the finished answer is announced once through a separate polite live region, so screen readers hear one reply instead of ~90 fragments.
- **No-JS fallback.** Scroll-reveal styles are scoped to an `html.js` class and the homepage carries a full `<noscript>` version, so the site is complete content without JavaScript.
- **CLS ≈ 0.** Every `<img>` declares intrinsic `width`/`height`; videos carry poster frames.
- **Side panel.** Internal links on the homepage open in an artifact-style `<iframe>` panel (Esc closes, focus is managed in and back out) instead of navigating away.

## Running locally

No install needed for the deployed site:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

React mirror (optional):

```bash
npm install
npm run dev
```

## Deploying

Push to `main`. The GitHub Actions workflow copies the static files (merging `public/images/` over `images/`) into `_site/` and publishes to GitHub Pages under the custom domain.
