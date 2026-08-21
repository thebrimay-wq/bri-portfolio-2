---
name: portfolio-review
description: Run the full agent QA pass on this portfolio site — engine probe, browser audit, asset audit — and report findings ranked by who sees them. Use this whenever the user asks to review, audit, QA, test, verify, or check the site or the Brix chat; before merging to main or pushing live; and after any change to index.html (the engine or KB), styles/site.css (tokens), a case study, or images. Even a "small" copy or token edit warrants at least the relevant section of this pass — the engine and contrast regressions this skill catches have all shipped before.
---

# Portfolio Review

An agent QA pass for imbrimay.com. Three scripted checks plus a judgment layer.
The scripts encode every defect class that has actually shipped on this site,
so a green run means "no known-class regressions," not "perfect."

## Why this exists

This site's credibility claim is *the site itself is the proof of craft* — so a
recruiter-visible defect costs more here than on a normal site, and the Brix
engine fails silently (a bad keyword match still streams a confident answer).
The August 2026 audit found 12 shipped defects this way; these scripts are that
audit, made repeatable.

## The pass

### 0. Setup (once per session)

```bash
# Playwright, if the browser audit will run. node_modules/ is untracked, so
# this never pollutes the repo.
npm install --no-save playwright
# In the Claude remote sandbox, Chromium is preinstalled — pass its path:
#   export CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
# (adjust the version dir to whatever exists under /opt/pw-browsers)
```

### 1. Engine probe — seconds, no browser

```bash
node .claude/skills/portfolio-review/scripts/probe-engine.mjs
```

Extracts the live retrieval engine out of `index.html` and runs 38 real
recruiter screening questions plus the known-regression set (greeting
substring bug, "study"→education, "teams"→MS Teams). Exits non-zero below
90% confident answers or on any regression. **Run this after any edit to the
`KB`, `matchIntent`, `retrieve`, `STOP`, or `SYN` in index.html** — it is the
only fast signal that a keyword change broke an unrelated answer.

If it dies with "anchor not found", the engine was refactored: update the
three anchors at the top of the script to the new code boundaries.

### 2. Browser audit — a few minutes

```bash
# If something already serves :8899, don't build over it — build-site.sh does
# rm -rf on the output dir, which breaks a server whose cwd is inside it.
# Either kill the old server first, or build to a fresh dir + fresh port and
# point the audit there.
pkill -f "http.server 8899" 2>/dev/null || true
bash .claude/skills/portfolio-review/scripts/build-site.sh /tmp/portfolio-review/_site
(cd /tmp/portfolio-review/_site && python3 -m http.server 8899 &)
node .claude/skills/portfolio-review/scripts/browser-audit.mjs http://127.0.0.1:8899 "$CHROMIUM_PATH"
```

Always audit the **built** site, not the repo root — the deploy merges
`public/images/` over `images/`, and testing the repo root hides path bugs.

Covers, per page: 404s and broken images (after a full-page scroll, to catch
lazy loads), sideways scroll at 320/375/768px, token contrast in **both**
themes measured against both `--bg` and `--surface`, canonical + title + img
dimensions + video posters, no-JS rendering, the skip links, the
screen-reader announcer (≤3 mutations per streamed answer), Brix features
(starter cards, lens chips, `?q=` deep links, code exhibit, case-study list),
and core flows (side panel, dark mode persistence, mobile drawer, résumé
download filename).

### 3. Asset audit — seconds

```bash
python3 .claude/skills/portfolio-review/scripts/asset-audit.py
```

Reports unreferenced files, deployed files whose only references are in
non-deployed contexts (`src/`, CLAUDE.md, README — dead weight that still
ships), rasters over 600KB, and total deployed image weight. It reports
only — deleting is a human decision. Baseline after the 2026 cleanup:
~51MB deployed. Meaningful growth over that means new unoptimized uploads.

### 4. Judgment layer — what scripts can't check

Scope: the diff against `origin/main` (what a merge would ship). On a clean
tree with nothing to diff, apply these checks to the whole site at HEAD.
Read anything in scope and ask:

- **New KB answers**: is every number consistent with the canonical set in
  CLAUDE.md (25 countries · ~$2.42M net avoided · +200% · $12M · 1M+ ·
  FF 2016–present)? GCS also deliberately cites **$2.44M** — that's the
  gross by-hand counterfactual, not a stale $2.42M; don't flag it.
  A stale number in one answer contradicts another page.
- **New pages**: on the case-study template? (hero → at-a-glance + jump nav →
  What I Owned → Problem → Solution → Experiences ≤4 → Process → Impact →
  Takeaway → bottom-cta). Is the bottom-cta loop still a loop?
- **New images**: WebP for heavy art, real `alt` text, intrinsic dimensions,
  under `public/images/` per CLAUDE.md.
- **New top-level page directory**: it must be added in three places or it
  silently escapes both the deploy and this audit — `deploy.yml`'s copy
  list, `scripts/build-site.sh`, and `PAGES` in `scripts/browser-audit.mjs`.
- **Copy**: does anything still say "three case studies" or an old title?
  `grep -ri "three deep-dives\|three case" --include=*.html .`

## Known false alarms — do not report these as site bugs

- **Video `readyState 0` / posters "not loading"** in headless test Chromium:
  that build lacks H.264. The site's videos are H.264 and play in real
  browsers. Verify codecs with `strings`, not playback.
- **Slow page loads in a sandbox that blocks fonts.googleapis.com**: every
  page stalls identically on the font request. The audit script aborts font
  requests for exactly this reason; never quote sandbox LCP numbers.
- **`curl` to imbrimay.com failing from a sandbox**: the egress proxy, not
  the site. Verify deploys via the GitHub Actions run result instead.

## Reporting

Rank findings by audience, not severity-in-the-abstract:

1. **Recruiter-visible** — anyone on a phone sees it (layout breaks, broken
   downloads, wrong titles, placeholder text, obviously wrong chat answers)
2. **Interviewer-visible** — found in DevTools or with a screen reader
   (contrast, live regions, keyboard order, console errors, repo hygiene)
3. **Report-only** — asset weight, copy drift, template deviations

For each: the evidence (measured numbers, not impressions), the file:line,
and the one-line fix. State what was NOT verified and why. If everything is
green, say so plainly and give the three counts (probe X/38, browser N/N,
deployed weight).
