# facts.md — section 1 of the positioning brief

Written 2026-09-08. Every item below is either DERIVED (read from code, git history, project logs, or the
Studio's live Azure index, with the source named) or TODO(bri) (only Bri can supply it). Nothing here is
inferred from the current portfolio copy. Where a derived fact contradicts the current site, the site is wrong.

---

## 1. Global Content Studio — stack  (DERIVED)

Source: `Desktop/GitHub FF/GCS` = `Financial-Finesse/ff-content-writer` (private). `package.json`, `CLAUDE.md`,
`worker/index.ts`, `worker/wrangler.toml`, `worker/azureBlob.ts`, `src/lib/*`, `scripts/workflow-localize.js`.

- **App:** TypeScript, Lit 3 (one light-DOM custom element `<ff-app>`, plus `<ff-library>` and `<ff-localize>`),
  Vite, Tailwind. Tiptap for the editor, `marked` for markdown, Dexie (IndexedDB) for local localization jobs and runs.
- **Hosting:** Vercel, auto-deploys `main` (`https://ff-content-studio.vercel.app`). No GitHub Actions.
- **API layer:** a Cloudflare Worker (`ff-claude-proxy`, `wrangler.toml`) that Bri wrote. It (a) proxies
  `/v1/messages` to the Anthropic API with the key held as a Worker secret, so the browser never sees it, and
  (b) exposes REST routes over **Azure Blob Storage** — `/api/entries`, `/api/wiki`, `/api/flags`,
  `/api/blob-versions`, `/api/reindex` — using a hand-written SharedKey HMAC client (`azureBlob.ts`), because the
  Azure JS SDK cannot run in Workers. Azure Blob is the source of truth for the content library, every localized
  variant, the per-locale wiki, and QA flags.
- **Where the model is called:** from the browser through the Worker (in-app authoring and the in-app localization
  pipeline, model `claude-sonnet-4-6`), and from the CLI localization workflow (`scripts/workflow-localize.js`, a
  Claude Code Workflow script that fans out Sonnet subagents per article: gate → research (web search) → draft →
  independent verify (+ redo) → save, then a deterministic packager and a link check).
- **Queueing / concurrency:** the bulk localizer runs a 5-worker pool per locale; `SaveQueue` serializes Azure PUTs
  so concurrent writers cannot race on the index; `SingleFlight` dedupes per-locale brief derivation (see "what
  broke" #3). Nothing auto-publishes: every variant lands in `review` for a human (policy in code, 2026-07).
- **Auth:** CORS origin allowlist plus a bearer token (`FF_API_TOKEN` Worker secret) on write, admin, and proxy
  routes; `x-ff-user` for attribution. No per-user identity or SSO in the Studio itself.
  **Finding while checking:** read routes (`GET /api/entries`) are not behind the bearer gate; the index is
  readable with only a spoofable `Origin` header. TODO(bri): decide whether that is intentional before it is
  described publicly.
- **Tests:** Vitest, 12 files, 221 tests, all passing on 2026-09-08 (`atlas-gate`, `atlas-policy`,
  `atlas-rewrite`, `atlas-index`, `atlas-cli-parity`, `localeFeedback`, `registerOverrides`, `excludedConstructs`,
  `wiki`, `wikiActions`, `wikiFormat`, `briefFigureAnchors`, …). TypeScript throughout (`tsc && vite build`).
- **Authorship:** 524 commits; Bri authored ~493 of them (as "Bri Doty", "thebrimay-wq", "Bri May"); one engineer
  (Parth Nain) contributed 20.

## 2. How the "confidence score" is actually produced  (DERIVED)

Source: `src/lib/locPipeline.ts`, `src/lib/locPassSpec.ts`, `scripts/workflow-localize.js`, `OVERNIGHT-LOG.md`.

- There is **no 0.9 threshold anywhere in the code.** The current case-study line ("scored at least 0.9 on each
  dimension") is not implemented and must come off the site.
- What exists: each pipeline pass returns a JSON `confidence` number that the **model assigns to its own output**
  (defaults to 0.5 if absent) and per-sentence classifications (`universal | jurisdiction | culture | numeric`) with
  a confidence each. Locale-brief facts are tagged `high | medium | low` by the model; anything not `high` is
  flagged for the reviewer instead of stated as fact.
- What actually gates output: an **independent native-reader verify pass** (separate model call, `verdict: pass |
  fail`, typed problems: `us-comparison`, `us-institution`, `literal-idiom`, `us-currency-or-format`,
  `us-only-framing`, `terminology-violation`, `register-slip`) with a redo loop, a **suitability gate**
  (`keep | rewrite | drop`) before any localization, deterministic post-passes (US-term sweep, figure checks,
  link check), and then **human localizer review** — nothing publishes without it.
- What the human catches that the score misses (from the logs): first-party ffhub.com links pointing at US-only
  articles; English titles and slugs left on localized bodies; register slips (`usted` vs `tú`); figures the model
  could only tie to a secondary source; and hallucinated links.
- Honest sentence for the site: "The score is the model grading itself; we treat it as a routing signal. What
  gates publishing is an independent verify pass and a human localizer."

## 3. Two (or more) things that broke in production and what changed  (DERIVED)

Source: `OVERNIGHT-LOG.md`, `ATLAS-LOCALIZATION-FIX-SPEC.md`, `QA-REPORT-2026-05-22.md`,
`localization-report-en-GB-drops.md`, `src/lib/singleFlight.ts`, `scripts/workflow-localize.js` header comment.

1. **5,455 published variants carried English titles and slugs on localized bodies.** Found in the live Azure
   data during the August audit. Change: title/slug localization became a checked output of the packager, and
   the review console shows source vs localized title side by side.
2. **US-only links were invisible to every automated check.** Localized articles kept first-party `ffhub.com`
   links to US-only content (HSAs, 401(k)s). Change: an independent verifier stage was added (`verdict=fail` on a
   US-only link → redo → `pass`), plus a deterministic link check that wraps, aligns, or strips links and rewrites
   the dangling CTA sentence (51 dangling CTA phrases found across 27 locales, 8,120 variants).
3. **Five different locale briefs for the first five articles of every batch.** The 5-worker pool derived the
   per-locale brief in parallel before the cache was written: five model calls and five inconsistent briefs.
   Change: `SingleFlight` keyed in-flight dedupe, with tests; a cached es-MX brief was later caught still using
   the wrong register, which led to brief versioning.
4. **A silent pipeline failure.** Pass 4 (cultural) threw a JSON parse error that was swallowed; the job sat at
   `running` forever with no UI signal (QA #29, May 2026). Change: unparseable model output now fails the job
   with a Retry CTA; count checks throw `UnparseableModelError`.
5. **The pipeline overwrote localizer-approved articles.** A `limit: 25` es-MX batch consumed approved variants
   and reported "25 written, 0 errors" while discarding human edits (measured: 26/26, 32/32, 32/32 reviewed
   sentences did not survive a re-run). Change (Bri's call, 2026-08-05): approved variants are skipped by default;
   re-localizing one is an explicit `includeApproved: true`.
6. **The fit check, on real data:** of 75 en-GB articles the gate dropped, 13 had a genuine UK analogue and were
   rewritten as UK-native pieces; 62 could not honestly exist (26 on the US healthcare system alone).
7. **Cost went up 5× when quality did.** Moving from one pass to five (gate, research, draft, verify, redo) took an
   article to ~335k tokens; six articles cost ~2M tokens and 31 minutes wall clock. That forced the
   skip-approved default and targeted re-runs instead of full-corpus rewrites.

## 4. Cost  (PARTLY DERIVED)

- Measured in the logs: ~335k tokens per article per locale on the five-stage CLI pipeline (Sonnet); ~2M tokens
  and 31 minutes for six articles. The earlier one-pass in-app pipeline was roughly a fifth of that.
- TODO(bri): actual dollar spend on the Anthropic account for the localization work, and the run(s) it covers. The
  site currently says "$21,287 all in" — confirm the source (Anthropic console) and the window, or replace it.

## 5. Aimee — what Bri coded that runs in production vs what engineering implemented  (DERIVED, confirm)

Source: `Desktop/GitHub FF/aimee-chat` (prototypes, `DESIGN-SYSTEM.md`, `handoff/`, netlify bundles, CEO email),
and `Financial-Finesse/benehub` git history (the production Hub; 2,119 commits since 2024-12).

- **Engineering built the production Aimee SDK** (`packages/ff-chat-sdk`, React + A2UI, first commit 2026-04-23;
  principal authors Scott Brown, Ryan Trainor, Parth Nain, Carey Payette).
- **Bri coded the interactive prototypes** (real HTML/CSS/JS with streaming and state: welcome, assessment,
  milestones, charts, coach handoff, Teams, SDK widget), wrote `DESIGN-SYSTEM.md` and the engineering spec,
  and shipped the component library on Netlify.
- **Bri also committed production code into the SDK:** 32 commits, +3,520 / −5,039 lines across 51 files in
  `benehub`, 2026-07-21 → 2026-08-17: the design-token layer (`components/styles.ts`, 1,062 lines),
  `ChatEmptyState.tsx`, `ConversationsPane.tsx`, `icons.tsx`, the A2UI card shell and
  `FinancialHubActionsCard.tsx`, and the host mount `BenehubFfChatMount.tsx`. This is the "Aimee brand
  design-sync" implementation (spec + plan committed 2026-07-21).
- One sentence each, for the site and Brix (identical): "Engineering built the Aimee SDK in React and A2UI from my
  coded prototypes and spec. I then merged the design-system layer and the empty-state, conversations, icon, and
  card-shell components into the production SDK myself (32 commits, July–August 2026)."
- TODO(bri): confirm those commits are live in the production Hub today, and whether the Netlify library should
  move to imbrimay.com (brief §4).

## 6. Financial Finesse Hub — how engagement and $12M were defined  (TODO(bri))

Not in any repo. Needed: the engagement metric (what was counted), the before/after window for +200%, what
"$12M" is (bookings, ARR, attributed revenue, something else) and over what period, the true team shape ("led
the design team" — how many designers), and NFL vs NFLPA (the site uses both: 9× NFL, 2× NFLPA).
If these cannot be supplied, brief §4 says the Hub becomes a summary card, not a case study.

## 7. Public code  (DERIVED, decisions TODO(bri))

- `thebrimay-wq/bri-portfolio-2` is **already public.** It contains the Brix engine (`index.html`), the
  38-question probe (`.claude/skills/portfolio-review/scripts/probe-engine.mjs`), the 42-check Playwright audit
  (`browser-audit.mjs`), and the asset audit. It has no README describing them yet.
- `thebrimay-wq/global-content-studio-demo` (`Github Bri/gcs-demo`) is a self-contained public-safe demo: no
  backend, no credentials, 23 pieces × 15 locales = 345 synthetic variants with 892 QA flags. Currently private.
- Company code that shows the Atlas pattern (private, needs permission): `scripts/workflow-localize.js`, the gate /
  verify schemas, `src/lib/singleFlight.ts` + its test, `src/lib/locPassSpec.ts`.
- TypeScript + tests already exist in three company repos Bri commits to (Studio: 221 Vitest tests; `blue`
  Content Studio: `test/contentStudio*.test.ts`; `ff.workers`: `tests/test_review_api.py`). Only a public excerpt
  is missing.
- TODO(bri): (a) make gcs-demo public? (b) permission to publish a sanitized slice of Atlas (SingleFlight + test,
  and the gate/verify schemas are the safest)? (c) if not, the demo fork carries a rebuilt pattern and says so.

## 8. GitHub username  (DERIVED)

`thebrimay-wq` (personal, 11 public repos, created Feb 2026). Company work is under the `Financial-Finesse`
org: `ff-content-writer`, `benehub`, `blue`, `ff.workers`.

## 9. AI team  (TODO(bri))

Nothing in the repos states when Bri joined the AI team, its size, or her role relative to the AI developers.
Derived context that supports it: Bri is the majority author of `ff-content-writer` (493 of 524 commits), and
has merged production code into all three other company repos in 2026 — `blue` (80 commits, +23,789 lines:
the Content Studio and localizer review queue, with tests), `ff.workers` (27 commits, +18,905 lines: Python
review API and core, its tests, and the React review console), `benehub` (32 commits, the Aimee SDK layer).
Needed: join date, team size, her role vs the AI developers.

## 10. AI Champion and mentor  (TODO(bri))

Needed in numbers: people mentored or trained, sessions or office hours run, tools or workflows the company
adopted because of it (Claude Code, the Studio, the AI Workspace), internal tools others shipped with her help,
any measurable result. Without numbers the role line stays and the bullet is cut (brief §1b).

---

## Numbers the site must use (one set, DERIVED from the live Azure index, read-only, 2026-09-08)

- Content library: 8,729 entries; 592 en-US source pieces; 8,118 localized variants across 28 locales.
- 25 locales have published or approved localized content (matches "25").
- Status of localized variants: 4,154 published · 975 approved · 2,772 in human review · 229 draft.
- Content types: 8,057 articles, 313 life events, 189 downloadables, 85 calculators, 83 wiki pages.
- Studio-era output: 3,726 variants created since the Studio's first commit (2026-04-28) across 26 locales;
  **3,512 of them in one four-day run, 2026-06-01 → 06-04**, which brought 10 new locales live (vi-VN, id-ID,
  de-DE, en-SG, pt-BR, cs-CZ, ro-RO, ms-MY, th-TH, pl-PL). Peak day: 1,575 variants (2026-06-03).
- Wiki pages exist for nl-NL (75) and es-MX (8); the Locale Wiki as a Worker route is tabled (Aug 2026).
- Timing to reconcile (brief §4): first commit 2026-04-28 → Worker + Vercel live 2026-05-05/07 → launch QA
  2026-05-22 → first bulk multi-locale run 2026-06-01. So: "built in four weeks, first ten-locale run five weeks
  after the first commit." Drop "one country a day / per week" unless Bri has a run that supports it.
- Legacy caveat: eight locales (bg-BG, en-IN, en-AU, en-CA, en-GB, en-IE, es-MX, nl-NL, es-CO) carry
  `createdAt` dates inherited from 2011-era source articles, so "created since" undercounts Studio re-localizations
  of those; the approved counts there (en-IE 476, en-GB 181, en-CA 78, es-MX 47, en-IN 37, es-CO 8 as of the
  August workflow comment) are Studio output reviewed by localizers.
- Human localizers named in the data: Kari Cedergren (2,509 variants authored/edited), Brigham Tappana (1,006).
