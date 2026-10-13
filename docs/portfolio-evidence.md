# Portfolio evidence ledger

Private working document. Not deployed (`docs/` is outside the deploy allowlist).
Started 2026-10-13 while implementing `docs/claude-code-portfolio-handoff.md`.

Status key: **CONFIRMED** (derived from code, git, or the live index, source named) ·
**ESTIMATE** (modeled from stated assumptions) · **SNAPSHOT** (true on a date) ·
**UNCONFIRMED** (only Bri can confirm; public wording narrowed until then) ·
**RETIRED** (removed from the public site).

## Positioning (fixed by Bri, 2026-10-13)

| Item | Wording | Where |
|---|---|---|
| Title | AI-Native Senior Product Designer | every page, Brix, résumé, metadata |
| Tagline | I design the product, then I ship the code. | same |
| Supporting line | I use AI to move from product discovery to working prototypes and production code, with hands-on ownership of the experience and its quality. | homepage hero, About |
| Work order | Studio · Aimee · Hub · Brix | homepage doors, Work page, Brix `CASE_STUDIES`, bottom-cta loop |
| Availability | Remote. Pleasanton, CA (Pacific). No hybrid preference advertised. No worldwide eligibility claim. | Contact, Brix |
| Not public | compensation target, company targeting | planning docs only |

## Global Content Studio

| Claim | Status | Source / definition | Public wording |
|---|---|---|---|
| 8,729 entries · 592 en-US source pieces · 8,118 localized variants · 28 locales | CONFIRMED, SNAPSHOT 2026-09-08 | live Azure index, read-only (`facts.md`) | "… as of September 8, 2026" wherever the figure appears |
| 25 locales with published or approved content | CONFIRMED, SNAPSHOT 2026-09-08 | same | "25 locales with published or approved content" (never merged with 28) |
| 4,154 published · 975 approved · 2,772 in review · 229 draft | SNAPSHOT 2026-09-08. Sums to 8,130, not 8,118; `facts.md` does not explain the 12. | same | Publish only published / approved / in review as "of the 8,118". Do not print the four-way breakdown as a sum. |
| 3,512 variants in one run, 2026-06-01→06-04, ten locales brought live, peak day 1,575 | CONFIRMED | index `createdAt` + workflow logs | keep, dated |
| 3,726 Studio-era variants since 2026-04-28 across 26 locales | CONFIRMED | same | optional; "Studio-era" must be labeled, legacy-locale caveat applies |
| First commit 2026-04-28 · Worker + Vercel 05-05/07 · launch QA 05-22 · first ten-locale run 06-01 | CONFIRMED | git history, logs | "four weeks to launch QA; the first ten-locale run five weeks after the first commit" — never "built in four weeks and live in 28 locales" |
| 524 commits, ~493 Bri's, 20 by one engineer (Parth Nain) | CONFIRMED | git log | keep; engineer named only as "one engineer" unless Bri clears the name |
| 221 Vitest tests, 12 files, passing | SNAPSHOT 2026-09-08 | `facts.md` §1 | "221 tests (September 2026)". Never "all passing today". |
| Stack: TypeScript, Lit 3, Vite, Tailwind, Tiptap, Dexie, Vercel, Cloudflare Worker, Azure Blob (SharedKey REST), Anthropic API, claude-sonnet-4-6 | CONFIRMED | repo | keep |
| Built with Claude Code; CLI localization workflow is a Claude Code Workflow script fanning out Sonnet subagents | CONFIRMED | `scripts/workflow-localize.js`, story doc | tools may be named |
| Confidence score = model grading its own output; routing signal only; no 0.9 threshold | CONFIRMED | `locPipeline.ts`, `locPassSpec.ts` | keep the "routing signal, not a gate" sentence |
| Independent verify pass = a separate model call with typed failures + redo loop | CONFIRMED | same | say "separate model pass", never "native-reader review" as if human |
| Human localizer review gates publishing; nothing auto-publishes (policy in code, 2026-07) | CONFIRMED | code | keep |
| Approved-overwrite incident: `limit: 25` es-MX batch discarded human edits; 26/26, 32/32, 32/32 reviewed sentences lost; fix 2026-08-05 skip-approved default + explicit `includeApproved` | CONFIRMED | spec + logs | design story in the case study |
| Five other production failures (titles/slugs, US-only links, brief race, silent pass failure, en-GB fit check 75→13/62) | CONFIRMED | logs, specs | keep |
| ~335k tokens per article per locale on the five-stage pipeline; ~2M tokens / 31 min for six articles | CONFIRMED | logs | keep as measured |
| $21,287 all-in cost ($3,835 API + $4,760 coach review + $12,692 build) | UNCONFIRMED; build cost is a 200-hour placeholder | story doc note | RETIRED from the site 2026-10-13 pending confirmation |
| ~$2.44M / ~9.4 months manual alternative | ESTIMATE (2.5 h/item × $60/h × 592 × 25, 25 people in parallel) | story doc | may appear only as a labeled model with its assumptions, never as savings |
| "$2.42M avoided", "115×", "25 days", "one country a day", "16,250", "~650 pieces", "0.9 score" | RETIRED | superseded by the live index | must not reappear |
| "Helped us win the Federal Reserve" / CEO reaction | UNCONFIRMED (business attribution) | story doc §7 | RETIRED from the page 2026-10-13; Federal Reserve stays a listed customer |
| 1M+ employees | Platform reach / eligibility, not Studio or Aimee usage | résumé context line | "a platform whose customers employ 1M+ people"; never as users of a feature |
| Read routes (`GET /api/entries`) not behind the bearer gate | CONFIRMED finding, private | `facts.md` §1 | not published |

## Aimee

| Claim | Status | Source | Public wording |
|---|---|---|---|
| Engineering built the production SDK (`packages/ff-chat-sdk`, React + A2UI, from 2026-04-23) | CONFIRMED | benehub git | keep, with named ownership |
| Bri coded the interactive prototypes, wrote `DESIGN-SYSTEM.md` and the engineering spec, shipped the component library | CONFIRMED | aimee-chat repo, handoff | keep |
| 32 commits, +3,520/−5,039 lines, 51 files, 2026-07-21→08-17: token layer (`styles.ts`, 1,062 lines), `ChatEmptyState`, `ConversationsPane`, `icons`, A2UI card shell, `FinancialHubActionsCard`, `BenehubFfChatMount` | CONFIRMED (merged) | benehub git | "merged into the production SDK"; deployed-to-users status is UNCONFIRMED |
| Shipping to Hub, client widget, Teams today | UNCONFIRMED by surface | — | "designed for three surfaces; the Hub integration is in the production repo" |
| Active users of Aimee | UNCONFIRMED (no data) | — | Brix says so explicitly; distinguish from 1M+ eligibility |
| "Implemented 1:1" | Engineering built from prototypes; drift did occur (user bubble slipped to 14.5px and was caught) | CASE-STUDY-Aimee.md | use once at most; the drift catch is the collaboration example |
| Trust / failure states: "AI coach" not "virtual"; coach escalation card; "Aimee can make mistakes" disclaimer; thinking state; prose-first gating; coral for a single urgent item | CONFIRMED in the component library | `/aimee-ai/components/` | document as design decisions with reasoning; no measured trust outcome exists |
| Validated user outcomes | NONE AVAILABLE | — | state the limitation; scope (3 surfaces, 1 library) is labeled as scope |

## Financial Finesse Hub

| Claim | Status | Source | Public wording |
|---|---|---|---|
| +200% engagement | UNCONFIRMED: metric, population, baseline, window undefined | not in any repo | "internal reporting credited the redesign with a 200% rise in platform engagement; the metric definition is not published here" |
| $12M | UNCONFIRMED: revenue type, period, attribution | not in any repo | removed from headline stats; one qualified sentence at most |
| 14 employer pilots, 200+ interviews, 3 diary studies, 7 of 9 wins | UNCONFIRMED | `ff-hub-copy.md` (flagged there too) | not published |
| Clients: Meta, NFL, JPMorgan Chase, CVS Health, Federal Reserve, Patagonia, McKinsey, Nestlé, Comcast, General Mills | Financial Finesse customers | company list | always labeled "Financial Finesse customers"; no project-level relationship implied |
| 2024 redesign vs Aimee-era screenshots | Experience 03 image is the AI actions screen | images folder | caption dates the screenshot; Aimee work credited to 2026 |
| Role: Lead Product Designer, cross-functional team | CONFIRMED by résumé timeline | — | "led the design" not "led the design team" (team size unknown) |

## Brix (this site)

| Claim | Status | Source | Public wording |
|---|---|---|---|
| Engine probe: 62 questions + 20 regressions, 61/62 (2026-09-10) | SNAPSHOT | `probe-engine.mjs` | current cards show the latest dated run; older 20/38, 37/38, 49/50 may stay as history if dated |
| Browser audit 42/42 (2026-08-20), 44/44 (2026-09-08) | SNAPSHOT | `browser-audit.mjs` | same rule |
| Deploy 130 MB → 51 MB | CONFIRMED 2026-08-20 | asset audit | keep, dated |
| 1 live-region mutation per answer (was 87) | CONFIRMED (measured by audit) | audit | keep |

## Résumé / About / Contact

| Claim | Status | Public wording |
|---|---|---|
| FF 2016–present; Sr. Graphic 2016–17; Lead PD · Product Creative Director 2017–2025; AI-Native Senior PD 2025– | CONFIRMED (Bri's résumé) | keep; historical titles unchanged |
| CKC Communications 2012–2015, 50+ companies | CONFIRMED (Bri's résumé) | keep |
| Education: Chico B.S. Business/Marketing, D1 soccer; ASU 2 years D1 | CONFIRMED | keep |
| 80 commits into `blue`, 27 into `ff.workers`, 32 into `benehub` | CONFIRMED | keep as commit counts, never as deployment proof |
| "Introduced user research and usability testing" | UNCONFIRMED example | keep as role statement; no specific finding is published |
| Mentors colleagues on building with AI / AI Champion | UNCONFIRMED numbers | role line only |
| PDF reading order | DEFECT (pypdf plain mode: bullets after Education) | fixed 2026-10-13, see below |

## Questions for Bri (batched, priority order)

1. **One AI-assisted shipping example.** Pick the Studio feature that best shows your process (candidates from the logs: the skip-approved fix, the independent verify stage, the single-flight brief cache). For it: which tools (Claude Code is confirmed; anything else?), what the AI produced first, what you rejected or redirected, what shipped, and which artifacts can be shown publicly (a sanitized diff, a test, a screenshot of the review console).
2. **Hub outcomes.** What exactly is "engagement" (event, population, baseline, window)? What does $12M measure (bookings, ARR, contract value), over what period, and what source states it? Until answered the site says "internal reporting" and drops $12M from headline stats.
3. **Research and collaboration.** One real research finding that changed a design (any project), and one disagreement or constraint resolved with product or engineering, with what changed. Brix currently says these are not documented.
4. **Studio cost.** Confirm the API spend figure and window from the Anthropic console, the coach-review cost, and whether the 2.5 h / $60 manual-cost assumptions are yours. The dollar figures are off the site until then.
5. **Aimee validation.** Is the SDK with your components live to users today, on which surfaces? Any usage or validation findings? Any public-safe failure-state screenshots (insufficient context, retry, interruption)?
6. **Leadership and availability.** Mentoring or standards work that changed team behavior (even qualitative). Is remote mandatory or preferred? Is $200k base or total (targeting only, never public)?
7. **Names.** May the contributing engineer (20 commits) and the localizers be named publicly? Currently "one engineer" and "localizers".
