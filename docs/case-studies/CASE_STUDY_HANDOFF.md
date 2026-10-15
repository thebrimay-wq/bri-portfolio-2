# Portfolio Case Study Handoff — Bri May

**For:** the next Claude Code session working on `bri-portfolio-2`
**From:** the previous Claude Code session that built the Global Content Studio case study
**Goal:** ship the new Global Content Studio case study, and restructure the three existing case studies (Aimee AI, Financial Finesse Hub, Smart Benefits) to match the same 16-section structure.

---

## 1. Context

Bri is a senior product designer at Financial Finesse. Her portfolio is at `imbrimay.com`, source at `bri-portfolio-2` (GitHub Pages, deploys on push to `main`). Currently has three case studies: `aimee-ai`, `work/hub`, `work/smart-benefits`. They use inconsistent structures.

A fourth case study — **Global Content Studio** — has already been built at `work/ff-content-writer/index.html`. It uses a new, unified 16-section structure that we want to backport to the other three.

**Bri's preferences:** minimal tokens, design-forward, plain prose (not bullet-heavy), no emoji unless asked. Treat her as a colleague, not a customer.

---

## 2. Repo & deploy conventions (do NOT violate)

- **Deployed static HTML only.** The `src/` React app is a mirror, not deployed. Never touch `src/` for portfolio changes.
- **Deploy:** `.github/workflows/deploy.yml` copies static files to `_site/` on push to `main`. It does NOT run `vite build`.
- **Shared CSS source of truth:** `styles/site.css`. Never re-declare its tokens, reset, nav, footer, buttons, or scroll reveal in page-level `<style>` blocks. Page-level styles are only for that page's unique treatments.
- **Never use `.btn--primary`** (double-dash) on static pages — that's a React app class.
- **Never introduce terracotta buttons.** All primary buttons are `var(--ink)` (#0A0A0A).
- **Footer standard classes:** `.footer-inner` > `.footer-left` / `.footer-links` / `.footer-right`. All 8 pages use this. Do not use deprecated `.footer-copy`, `.footer-center`, etc.
- **`site.css` design tokens** (from `:root`):
  - `--bg` #ffffff, `--ink` #0A0A0A, `--ink-2` #6B7280, `--ink-3` #9CA3AF
  - `--border` #E5E7EB, `--surface` #F8FAFC, `--surface-2` #f0f2f5
  - `--accent` #9B6B57 (terracotta, decorative only, never buttons)
  - `--px` clamp(24px, 5vw, 80px), `--max` 1160px
- **Font:** Inter only. Preload from Google Fonts.
- **Case-study back-links:** case studies do NOT include a `← All Work` back-link at the top of the page. They end with a bottom nav (`.bottom-cta`) that has `Back to Work / Next Case / Contact` links.

---

## 3. The unified 16-section case study structure

Every case study should follow this order. Global Content Studio is the reference implementation — copy its patterns exactly. Sections:

1. **Hero** — eyebrow (role + company + year), h1 with `<span>` on the second clause, hero-lead paragraph, three hero-stats, hero-image (16:9 full-width)
2. **What I Owned** — surface bg (`.owned-section`), five items: Strategy · Design · AI · Build · Ship (adjust labels per case study)
3. **The Problem** — solution-h2 headline, three problem-bullets with dot markers, `Jump to solution` skip-link
4. **The Opportunity** — surface bg (`.opportunity-section`), giant pullquote, sub, transform-table (4 rows with strikethrough → bold)
5. **The Solution** — solution-h2, solution-body, numbered-list (4 items with `<strong>` lead-ins), solution-quote
6–11. **Experience · 01–06** — each is: eyebrow + exp-h2 (short declarative) + exp-body (2–3 sentences) + big image
12. **Experience · 07 (optional)** — reserved for a distinctive capability (localization for GCS; can be omitted for others)
13. **Process** — surface bg (`.opportunity-section`), Process eyebrow, solution-h2, process-body, transform-table (Traditional → AI-native), process-pullquote
14. **Impact** — centered impact-h2, 3-cell impact-grid, client-pills row (Meta, NFL, JPMorgan Chase, CVS Health, Federal Reserve, Patagonia, McKinsey, Nestlé, Comcast, General Mills)
15. **What I'd do next** — eyebrow + next-h2 + 4 next-items (n number, title, body)
16. **Final Takeaway** — surface bg (`.takeaway-section`), giant takeaway-text with one bold sentence at the end

Then: **Bottom CTA nav** (`.bottom-cta`) — Back to Work / Next Case / Contact.

---

## 4. Files already changed

### `work/ff-content-writer/index.html` (NEW — 42KB)
The full Global Content Studio case study, structured in the 16-section pattern. This is the **template**. Read it thoroughly. Every other case study should match its structure, spacing, class names, and rhythm.

### `work/index.html` (MODIFIED)
Added Global Content Studio as **Card 1** (background `#EDE6DC` warm tan). Existing cards renumbered in comments only (order: Global Content Studio → Aimee AI → Hub → Smart Benefits).

---

## 5. Full content for Global Content Studio (already in the file — for reference)

**Hero**
- Eyebrow: `Lead Product Designer · Financial Finesse · 2026`
- H1: `An AI content studio that scales financial content across every market — <span>without losing the voice that makes it trusted</span>`
- Lead: `A brand-trained AI content studio replacing generic AI for the Financial Finesse content team — with a localization pipeline that ports every piece into five regions. Designed and built end-to-end as a solo, AI-native designer, now shipping to production and powering content for 1M+ employees across Fortune 500 clients.`
- Stats: `1M+ · Employees reached` / `9 mo → weeks · Traditional vs. AI-native` / `Solo build · Designed + built end-to-end`

**What I Owned**
- Strategy — Identified the business constraint and defined the product opportunity — turning a content-team bottleneck into a workflow product, not a feature.
- Design — UX, UI, workflow patterns, component library, and structured editors for all 9 content types — from research to high-fidelity.
- AI Training — Built the brand voice, compliance, and content type schemas the model runs on. The intelligence layer that makes generic AI safe for FF.
- Build — Coded the working product end-to-end — Lit 3, TypeScript, Tailwind, Azure Blob Storage as source of truth, and a Cloudflare Worker as the secure write gate. Roughly 5,800 lines of production code. AI as my engineering partner, no spec doc handoffs.
- Ship — Live on Vercel with auto-deploys from main. Engineering came in only at the production handoff to move it onto our internal infrastructure.

**Problem** — *"A content team scaling for millions, working at the speed of one writer at a time"*
Three bullets: over 1M employees moving at Google-Doc speed · generic AI drifted into individualized advice (compliance line) · 9 types × 5 audiences × multiple regions multiplied the load.

**Opportunity pullquote** — *"What if AI didn't just generate content — what if it understood the voice, the rules, and the workflow of the team using it?"*

**Solution** — *"From content factory to content system"* + 4 numbered pillars (brand-trained AI, structured editors, real workflow, ambient quality).

**Experience 01–07** —
01. AI that writes like a Financial Finesse coach — not like AI
02. Nine content types, nine right-shaped tools
03. Where drafts become a system (library workflow)
04. Quality signals you can't ignore — and can fix in one click (ambient quality, two-col layout)
05. Refine the part that needs it — not the whole thing (selection AI toolbar)
06. A pro tool that doesn't feel like a developer console (autosave, similar-content warning, soft-delete, coachmark)
07. One authoring system — five regions, five languages (localization pipeline)

**Process** — *"Designed and built solo. AI-native, end to end."* + transform-table of 4 comparison rows + pullquote *"The product proves what AI unlocks for content teams. The way I built it proves the same thesis for design."*

**Impact stats** — `1M+ Employees reached` · `5 locales Regions & languages` · `Fortune 500 Trusted by Meta, NFL, JPMorgan, Federal Reserve`

**What's Next** — Real auth & role permissions · Real-time co-editing & comments · Taxonomy-aware related content · Unified FF AI Workspace

**Final Takeaway** — *"Global Content Studio — internally pitched as Margin: make room for what matters — turned the content team's biggest constraint into a system. Live in production, serving 1M+ employees, translated into five locales, designed and built solo in weeks instead of months. **Generic AI gives you words. A brand-trained content studio gives you a team that ships. A senior product designer who can build it gives you both — at speed.**"*

---

## 6. Global Content Studio product facts (for the localization + tech callouts)

- **Name:** Global Content Studio (deployment URL `ff-content-studio.vercel.app`, in-product label still "AI Content Writer")
- **Marketing candidate name:** "Margin" — *"Make room for what matters."*
- **Stack:** Lit 3 · TypeScript · Vite · Tailwind · Azure Blob Storage (source of truth) · Cloudflare Worker (secure write gate) · Vercel auto-deploy from `main`
- **Scale:** ~5,800 lines in a single Lit component
- **9 content types:** article, money tips, quiz, coach insights, calculator, checklist, infographic, user story, video
- **5 audience segments:** Crisis, Struggling, Planning, Optimizing, All Users
- **5 localized regions:** es-MX, es-CO, en-PH, en-CA, en-CA-QC (each with per-locale terminology map + QA gate)
- **6-pass localization pipeline** (worksheets/calculators stay canonical as link targets; articles get translated → reviewed → approved → materialized to shared Azure storage)
- **Ecosystem:** FF AI Workspace (Global Content Studio + AI Meeting Studio + AI Assessment Studio) sharing a canonical `<ff-brand-button>` primitive across all three apps
- **Fortune 500 clients:** Meta, NFL, JPMorgan Chase, CVS Health, Federal Reserve, Patagonia, McKinsey, Nestlé, Comcast, General Mills

---

## 7. Restructure the three other case studies to match

Each of these currently uses a different structure. Rebuild them to match Global Content Studio's 16-section pattern (skip Experience 07 unless the case study has a distinctive extra capability that deserves its own section).

### 7a. `aimee-ai/index.html` (current file is at repo root, not under `work/`)
- **Current structure:** Hero + meta-row + hero-image + before/after cards + problem (2-col) + solution + key decisions + impact + learnings + next-project
- **Target:** Restructure to the 16-section pattern
- **Angle:** senior product designer redesigned a static Q&A tool into a CFP-backed AI coach reaching 1M+ employees
- **Key facts:**
  - Role: Product Design Lead
  - Company: Financial Finesse
  - Timeline: 2024–2025
  - Scope: AI UX · Conversation Design
  - Impact: 1M+ employees reached, Fortune 500 embedded, from keyword Q&A to conversational AI coach
- **What I Owned:** Product strategy · Conversation design · AI UX · Behavior design · Ship
- **Process section:** the "solo AI-native build" positioning doesn't apply to Aimee — instead do "Process — designing under compliance constraint." Traditional path "generic chatbot" vs. AI-native path "CFP-backed constrained coach"
- **Experience sections should cover:** the personality/voice work, the CFP knowledge grounding, benefits integration, proactive prompting, the guided-next-step design, mobile/embedded

### 7b. `work/hub/index.html`
- **Current structure:** actually closest to the 16-section pattern already — Hero, Problem, Opportunity, Solution, Experience 01–06 (Aimee AI, Onboarding, Personalized Results, AI Actions, Personalized Content, Mobile), Impact, What's Next, Final Takeaway
- **What's missing:** the **"What I Owned"** section (add after Hero) and the **"Process"** section (before Impact). Even if Hub wasn't a solo AI-native build, add a Process section that owns the design system, cross-team leadership, or client-launch process — whatever the strongest senior signal is
- **Key facts:**
  - Role: Creative Director & Lead Product Designer
  - Company: Financial Finesse
  - Timeline: 2024
  - Impact: +200% engagement, $12M revenue, Fortune 500 clients
- **What I Owned:** Product strategy · Team leadership · Design system · Behavior design · Client launch
- **Process framing:** "Leading a redesign that moved the business" — cross-team ownership, from research to launch, with a specific angle on how she led the design team through the redesign

### 7c. `work/smart-benefits/index.html`
- **Current structure:** Hero + meta-row + hero-image + stats + before/after + problem (2-col) + solution + impact + learnings + next-project
- **Target:** rebuild to 16-section pattern
- **Angle:** designed an AI-powered benefits experience that turns open enrollment into a guided decision — three embed modes designed for any recordkeeper platform
- **Key facts:**
  - Role: Product Designer
  - Company: Financial Finesse
  - Timeline: 2024
  - Scope: Product Design · AI Systems · Employee Experience
- **What I Owned:** Product strategy · Systems design · Conversational UX · Component library (3 embed modes) · Ship
- **Experience sections should cover:** the three embed modes (side panel, modal, inline), conversational comparison replacing tables, life-situation framing, plan-data personalization
- **Process framing:** "Designing a white-label system for multiple host platforms" — the systems-thinking angle

### 7d. Housekeeping when restructuring
- Move `aimee-ai/` to `work/aimee-ai/` so all case studies live under `work/`. Update the link in `work/index.html` from `../aimee-ai/` to `../work/aimee-ai/`. Verify no other pages link to the old path.
- Every case study's bottom nav (`.bottom-cta`) should link to the next case study in the sequence: Global Content Studio → Aimee AI → Financial Finesse Hub → Smart Benefits → Global Content Studio.
- Every case study needs the `.fade-up` observer inline script that's at the bottom of `work/ff-content-writer/index.html` (or, better, fix `scripts/main.js` — see section 9).

---

## 8. Images needed

For **Global Content Studio**, save images to `images/Global Content Studio Case Study/` and uncomment the 8 `<img>` tags in the page. Note the image folder path in the page currently says `images/FF Content Writer Case Study/` — update the 8 src attributes when adding images. Slots, in order:

1. **Hero.png** — full-app screenshot (sidebar · editor · details panel)
2. **Generator.png** — sidebar prompt → generated FF-voiced article
3. **Editors.png** — multi-editor grid (article, quiz, checklist, money tips, coach insights)
4. **Library.png** — library view with status chips, filters, bulk actions, my queue
5. **Quality.png** — details panel with quality checklist + click-to-fix menu
6. **Selection.png** — highlighted text with floating AI toolbar
7. **Details.png** — details montage (autosave, similar-content warning, soft-delete, coachmark)
8. **Localization.png** — 6-pass pipeline diagram across 5 locales

For the three existing case studies, keep their existing images. Only add slots when a new Experience section is being introduced during restructure.

---

## 9. Known bug worth fixing (Bri's call — high impact, one-line fix)

`scripts/main.js` only observes `.reveal` and `.reveal-group` selectors. But every case study uses `.fade-up`. Without something adding `.visible`, every `.fade-up` element stays at `opacity: 0` permanently. **The Hub case study is affected too** — much of its content is invisible on the live site.

**Fix:** in `scripts/main.js`:

```js
// line 10:
const REVEAL_SELECTOR = '.reveal, .reveal-group, .fade-up';

// around line 25, in the observer callback:
entry.target.classList.add('is-visible', 'visible');
```

The CSS rule `.fade-up.visible` (not `.fade-up.is-visible`) is what transitions it in — see `styles/site.css` line 381.

After applying this fix, the inline `.fade-up` observer at the bottom of `work/ff-content-writer/index.html` becomes redundant (safe to leave or remove).

---

## 10. To ship

```bash
cd bri-portfolio-2

# verify locally first
python3 -m http.server 8000
# open http://localhost:8000/work/ff-content-writer/
# and http://localhost:8000/work/hub/ side by side — should look like siblings

# when ready
git status
git add work/ff-content-writer/index.html work/index.html scripts/main.js
git commit -m "Add Global Content Studio case study; fix .fade-up reveal"
git push origin main
```

GitHub Actions runs the deploy. Live at `imbrimay.com` in ~2 minutes.

---

## 11. Optional folder rename

If Bri wants the URL to match the name, before deploy:

```bash
git mv work/ff-content-writer work/global-content-studio
```

Then update the card link in `work/index.html` from `../work/ff-content-writer/` to `../work/global-content-studio/`. Also update the image folder path if renamed. Bri's call — display name is right either way.

---

**End of handoff.**
