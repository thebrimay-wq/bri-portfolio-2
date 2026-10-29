# Portfolio evidence ledger

Private working document. Not deployed (`docs/` is outside the deploy allowlist).
Started 2026-10-13 while implementing `docs/claude-code-portfolio-handoff.md`.

Status key: **CONFIRMED** (derived from code, git, or the live index, source named) ·
**ESTIMATE** (modeled from stated assumptions) · **SNAPSHOT** (true on a date) ·
**UNCONFIRMED** (only Bri can confirm; public wording narrowed until then) ·
**RETIRED** (removed from the public site).

**Commit counts (Bri, 2026-10-24):** show one only when it proves authorship. Public use is the Global Content Studio ratio "493 of its 524 commits" (case study, Code page, Brix answers about who built it). Every other count below stays here as evidence and is described on the site by what the code does.

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
| Origin: writers were drafting company content on unregulated AI tools (personal tools, outside company control or review), which led Bri to build the Studio | STATED BY BRI 2026-10-24 | Bri | "saw writers drafting company content on unregulated AI tools" / "Spotted unregulated AI use in content" |
| 8,729 entries · 592 en-US source pieces · 8,118 localized variants · 28 locales | CONFIRMED, SNAPSHOT 2026-09-08 | live Azure index, read-only (`facts.md`) | "… as of September 8, 2026" wherever the figure appears |
| 25 locales with published or approved content | CONFIRMED, SNAPSHOT 2026-09-08 | same | "25 locales with published or approved content" (never merged with 28) |
| 70 countries by the end of 2026 | UNCONFIRMED, stated by Bri 2026-10-23 | Bri: the CEO wanted to go global, and the plan is 70 countries by year end. A target, not today's count; today is 25 markets with published or approved content (Sep 8, 2026). | GCS hero: "Built before anyone asked. Now going global in 70 countries." and a "70 · Countries planned by the end of 2026" fact beside "25 · Markets live today". Never present 70 as already live. The Work card, homepage door, and Brix chat card use the same line. |
| Live in 25 countries today; 70 by 2027 | UNCONFIRMED, stated by Bri 2026-10-23 | Bri: "We are global in 25 countries already and will be at 70 by 2027." Consistent with the index (25 locales with published or approved content, Sep 8, 2026) and with the 70-countries target above. Use "25 countries" (not "over 25"); 70 stays a target. | "25 countries" may stand as live today; "70" only with "by 2027" or "planned". |
| Global in over 25 countries in a quarter | UNCONFIRMED, stated by Bri 2026-10-23 | Bri's wording. Bri has since given the count as 25 countries (row above), so "over 25" overstates it. "In a quarter" is still unsourced: 25 locales were reached about 15 weeks after launch QA (05-22). | Homepage preview study G (`labs/brix-next/g/`), Studio tile only, now as "Built before anyone asked. 25 countries in a quarter, 70 by 2027." (replaced "over 25"). Not on the case study, Brix KB, or résumé until the quarter is confirmed. |
| One-click localization: "A pipeline and UI to localize our content in just one click, built and shipped by me." | RETIRED 2026-10-29 (contradicts the human-review story); tile now reads "The review tool behind our content in 25 markets. I designed it and built the first version." | Bri's line for the live homepage tile (shipped 2026-10-23). "Built and shipped by me" matches the v1 record (493 of 524 commits, four weeks to launch QA). "One click" describes the Localize action in the Studio UI; the case study does not show it as a single click. | Live homepage Studio tile only. The "25 countries in a quarter, 70 by 2027" line stayed in the preview and did not ship. |
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

## Global Content Studio, v2 and v3 (surveyed 2026-10-15, read-only, three private org repos)

| Claim | Status | Source | Public wording |
|---|---|---|---|
| v2 = the localizer review console and review API on the company's Python pipeline platform; engineering rebuilt the pipeline and ported v1's quality gates file by file | CONFIRMED | pipeline-platform repo: gate docstrings, `design/REVIEW_CONSOLE.md` ("The previous version (ff-content-writer) failed on these four") | "the pipeline platform"; never the repo or product name |
| Bri: 113 of 717 commits on main (Aug 13–14: 20 commits incl. spec, prototype, review API, React console; Oct 9–13: batch generation, 42 commits on Oct 13) | CONFIRMED | `git shortlog`, `git log --author` | evidence only; not shown publicly (2026-10-24) |
| Engineers on v2: two (not Parth); console roles → platform tokens 2026-09-02 by engineering | CONFIRMED | git log | "two engineers", unnamed |
| Four v1 failures → v2 fixes (reviewer copy separate field, etag/409, 50-entry revision log, resolution block shared with heal stage, plain-label flag rail with Apply/Fix myself/Dismiss+reason, stored flag counts, 50-row queries) | CONFIRMED | `core/review.py`, `FlagCard.tsx`, `docs/review_console.md` | keep |
| 43 locale grounding files; 22 batch-generation markets; ~2,190 pytest + 90 vitest repo-wide | CONFIRMED, SNAPSHOT 2026-10-15 | `resources/locales/`, `core/batchgen/markets.py` | tests are repo-wide, not Bri's alone |
| bg-bg sample: 445 staged docs, 630 flags, 78% freshness | CONFIRMED | `docs/review_console.md` | keep without locale name if preferred |
| No review-time / throughput metric exists in any version (Tracker never built) | CONFIRMED | pipeline-platform docs | state as a limitation |
| v3 = Global Content Review inside the admin platform (Lit 3, TipTap, Entra + token bridge); Bri 81 non-merge commits on the 2026 branch, 109 across branches | CONFIRMED | admin-platform repo git | "the admin platform"; never the product name |
| WYSIWYG round-trip gate tested over 887 real bodies; inline flag decorations; server drafts with etag + merge base + conflict panel; admin matrix; view-as seat; server-side scopes | CONFIRMED | `contentStudioArticle.ts`, `contentStudioDocEditor.ts`, `reviewQueue.ts`, commits 55d6aac, 6590475 | keep |
| Engineers on v3: one wired the always-gated review model + publish flow (f21f96d); one built scopes/regional grants | CONFIRMED | git | "two engineers", unnamed |
| Article generation / gap planner: MAX_BATCH_ARTICLES = 200, 3 in flight per locale, guardrails panel; runs on demo data; `/generate/plan` and `/generate/batch` are a proposed contract; single-article generate exists on the pipeline platform | CONFIRMED (design), UNSHIPPED (batch backend) | local `article-generation` branch, `docs/article-generation-api.md` | always labeled "designed, demo data, backend proposed" |
| Image engine: v1 branch `feature/locale-image-engine` (2026-06-25 → 07-07): Claude cultural analysis + brief + Vision PASS/REVIEW/FAIL; Flux Pro then Gemini. v2: Getty-first, Gemini generate, Gemini judge suitable true/false, human verdict outranks machine | CONFIRMED | `src/lib/imageEngine.ts` (v1 branch), `jobs/content/images.py` | keep; the PASS/REVIEW/FAIL rubric is v1, not v3 |
| 680+ commits of Bri's across three repos (≈493 + 113 + 81) | DERIVED 2026-10-15 | sums above | RETIRED from public use 2026-10-24 |
| "Helped win the Federal Reserve and opened new prospects" | STATED BY BRI 2026-10-15; no evidence in any repo; business attribution needs company clearance | this session | if used: "Per the company, …" and flagged for clearance before deploy |
| Prototype screenshots (v2 review console, v3 workspace, admin matrix, gap planner) | Bri's own HTML prototypes / demo-data previews, rendered 2026-10-15; demo content, no real data | `design/*.html`, `Prototypes/prototype.html`, `Claude outputs/*.png` | captions must say "prototype, demo content" |

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

Homepage tile (2026-10-29, Stripe brief): "Aimee AI Coach: One AI coach across three products, with a human coach a tap away." "Aimee Anywhere" is retired; the case study moved to `/work/aimee/` (stub at `/aimee-ai/`). Earlier wording (2026-10-23): "Aimee Anywhere: Chat with Aimee, and human financial coaches, anywhere, anytime." It describes the design intent; shipping by surface stays UNCONFIRMED above, so the KB and case study keep "designed for three surfaces".

## Financial Finesse B2C App

| Claim | Status | Source | Public wording |
|---|---|---|---|
| 155 commits, all Bri's, 2026-10-19 → 10-22 (v7 build) | CONFIRMED | `facts.md` §11, prototype repo git | "built in four days (October 2026)"; the commit count is evidence only (2026-10-24); the four days describe this build only |
| 376 tests across 53 files (Vitest + jsdom) | CONFIRMED, SNAPSHOT 2026-10-23 | `facts.md` §11 | "376 tests (October 2026)" |
| Built the entire prototype and design alone; personas from years of FF coach–member conversations | STATED BY BRI 2026-10-23 | `facts.md` §11 | keep as her statement; persona data on screen is demo content |
| Cleared to show publicly though unreleased | CONFIRMED (Bri, 2026-10-23) | `facts.md` §11 | keep |
| Homepage tile line "A vision of your future, guided by your agentic coach, Aimee." | Bri's wording, 2026-10-23 | — | homepage tile only |

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
| Browser audit 42/42 (2026-08-20), 44/44 (2026-09-08), 49/49 (2026-10-13), 50/50 (2026-10-23, after the homepage redesign replaced the hero and drawer checks), 53/53 (2026-10-23 review pass: adds the B2C App page, code-answer links, and the phone panel close) | SNAPSHOT | `browser-audit.mjs` | same rule |
| Deploy 130 MB → 51 MB | CONFIRMED 2026-08-20 | asset audit | keep, dated |
| 1 live-region mutation per answer (was 87) | CONFIRMED (measured by audit) | audit | keep |

## Résumé / About / Contact

| Claim | Status | Public wording |
|---|---|---|
| FF 2016–present; Sr. Graphic 2016–17; Lead PD · Product Creative Director 2017–2025; AI-Native Senior PD 2025– | CONFIRMED (Bri's résumé) | keep; historical titles unchanged |
| CKC Communications 2012–2015, 50+ companies | CONFIRMED (Bri's résumé) | keep |
| Education: Chico B.S. Business/Marketing on a full-ride soccer scholarship; ASU 2 years, D1 soccer on a full-ride scholarship | CONFIRMED (Bri, 2026-10-23) | Chico is never called D1 (NCAA Division II); "D1" belongs to ASU only |
| 80 commits into `blue`, 27 into `ff.workers`, 32 into `benehub` | CONFIRMED | evidence only, never shown publicly (2026-10-24) |
| "Introduced user research and usability testing" | UNCONFIRMED example | keep as role statement; no specific finding is published |
| Mentors colleagues on building with AI / AI Champion | UNCONFIRMED numbers | role line only |
| PDF reading order | DEFECT (pypdf plain mode: bullets after Education) | fixed 2026-10-13, see below |

## Speed and working with the CEO (stated by Bri, 2026-10-29)

| Claim | Status | Source | Public wording |
|---|---|---|---|
| Has worked directly with the Financial Finesse CEO since starting at FF (2016) | STATED BY BRI 2026-10-29 | Bri | "I've worked directly with our CEO for ten years" / "since 2016". Never name the CEO. |
| Prototyped the B2C App in two days from the CEO's vision | STATED BY BRI 2026-10-29 | Bri; the git record (B2C row above) covers the four-day v7 build, 10-19 → 10-22 | "2 days from the CEO's vision to a working prototype". The four days stay as the build of the version shown. |
| CEO reaction to the B2C prototype: "WOW, just wow. I love how well we work together— you took the spirit and made it better than I could have envisioned!" | STATED BY BRI 2026-10-29 (private message, Bri's to share) | Bri | Quote verbatim, attributed to "CEO, Financial Finesse", unnamed. B2C App case study and Brix only. It praises the prototype; never attach a business result to it (see the retired Federal Reserve quote). |
| Prototyped the first version of the Financial Finesse Hub in 24 hours | STATED BY BRI 2026-10-29 | Bri | "I prototyped the first version of the Hub in 24 hours". Which release that prototype preceded is not stated; do not tie it to the 2024 redesign's dates. |
| Has built multiple websites in a day | STATED BY BRI 2026-10-29 | Bri; no dated example on the site | About and Brix only, as her statement: "I've built whole websites in a day." No count. |
| Joined FF when it had a logo, a brand guide, coaching research and coaches, but no products or app; designed every product FF ships today | STATED BY BRI 2026-10-29 (Stripe brief) | Bri | Homepage: "When I joined Financial Finesse, it had a logo, a brand guide and great coaches. Every product it ships today, I designed." Résumé: "I joined when the company had a brand and no product." |
| Lead Product Designer and Product Creative Director were separate titles with their own years (2017–2025 combined until now) | OPEN 2026-10-29 | Bri | Résumé shows both with "[BRI: years]" until she supplies them; PDFs not regenerated until then. |

## Questions for Bri (batched, priority order)

- (2026-10-23) Answered: designing since 2011 (Bri). Keep "since 2011"; CKC is her first dated role (2012).
- (2026-10-23) Answered: Chico was a full-ride soccer scholarship; ASU was a full-ride D1 soccer scholarship. Résumé, one-page résumé, and KB updated.
- (2026-10-24) Answered: keep the "unregulated AI" origin line as Bri's statement (writers used personal AI tools for company content outside company control or review). Wording: "saw writers drafting company content on unregulated AI tools" (résumé page), "Spotted unregulated AI use in content" (one-page résumé and PDF).
- (2026-10-23) Answered: retitle. `resume/one-page.html` and its PDF now say "AI-Native Senior Product Designer", with the same ledger fixes as the main résumé.

- (2026-10-23) Answered: 70 = countries planned by the end of 2026 (a CEO goal). Cards now match the headline.
- (2026-10-23) Answered: 25 countries are live today, and the plan is 70 by 2027.
- (2026-10-29) Answered: Bri has worked directly with the CEO since she started at FF; prototypes in a day or two (Hub first version in 24 hours, B2C App in two days, websites in a day). Logged under "Speed and working with the CEO".
- (2026-10-23) Open: which quarter does "in a quarter" (homepage preview G) refer to?

1. **One AI-assisted shipping example.** Pick the Studio feature that best shows your process (candidates from the logs: the skip-approved fix, the independent verify stage, the single-flight brief cache). For it: which tools (Claude Code is confirmed; anything else?), what the AI produced first, what you rejected or redirected, what shipped, and which artifacts can be shown publicly (a sanitized diff, a test, a screenshot of the review console).
2. **Hub outcomes.** What exactly is "engagement" (event, population, baseline, window)? What does $12M measure (bookings, ARR, contract value), over what period, and what source states it? Until answered the site says "internal reporting" and drops $12M from headline stats.
3. **Research and collaboration.** One real research finding that changed a design (any project), and one disagreement or constraint resolved with product or engineering, with what changed. Brix currently says these are not documented.
4. **Studio cost.** Confirm the API spend figure and window from the Anthropic console, the coach-review cost, and whether the 2.5 h / $60 manual-cost assumptions are yours. The dollar figures are off the site until then.
5. **Aimee validation.** Is the SDK with your components live to users today, on which surfaces? Any usage or validation findings? Any public-safe failure-state screenshots (insufficient context, retry, interruption)?
6. **Leadership and availability.** Mentoring or standards work that changed team behavior (even qualitative). Is remote mandatory or preferred? Is $200k base or total (targeting only, never public)?
7. **Names.** May the contributing engineer (20 commits) and the localizers be named publicly? Currently "one engineer" and "localizers".

## Validation log

- 2026-10-23 review pass: GCS hero "8,118 live today" → "in the index, Sep 8, 2026"; "27 locales by August" → replaced by "5 careful passes per article" (facts.md §3.7); the Federal Reserve note removed from the GCS page (row 49 retired it); commit counts aligned to the v2/v3 survey (113 pipeline platform, 81 admin platform, Oct 2026); private repo names removed from /code/; "per-locale wiki" → per-market fact libraries; audit now 53 checks incl. the B2C App page, code-answer links, and the phone panel close.

| Date | Check | Result |
|---|---|---|
| 2026-10-13 | Engine probe (`probe-engine.mjs`): 62 questions, 20 routing regressions, 20 answer-content checks | 61/62 confident, 0 failing |
| 2026-10-13 | Browser audit (`browser-audit.mjs`) on the deploy-merged build: 404s, overflow at 320/375/768, contrast both themes, head hygiene, no-JS, a11y, Brix features, panel flows, deep link, résumé download | 49/49 |
| 2026-10-13 | Flow checks (`.scratch/flows.mjs`, session-only): door navigation, Back with recents, Cmd-click new tab, panel label, Esc focus restoration, `#ai-assisted` deep link, reduced motion, tab order, no-JS content, 320px shortcut row | 13/13 after the hash fix |
| 2026-10-13 | Résumé PDF: pypdf plain + layout, pdfminer.six | one page; headings → roles → bullets in order; "·" separators present |
| 2026-10-13 | Screenshots: home, Studio, Aimee, Hub, About, Work, Résumé, Contact, Code, Brix at 1440 and 390, light and dark | no overflow, no broken images, only the aborted test-video request logged |

## Public claims narrowed or removed this pass

- Removed: `$21,287` run cost; `$2.44M` / `$2.42M` as savings; the "helped us win the Federal Reserve" pull quote; `$12M` as a headline stat (résumé, Hub hero, Brix answers, homepage cards); "Fortune 500 clients won"; "shipping to the Hub, widget, and Teams"; "implemented 1:1"; "under two minutes" onboarding; "variable thinking delay"; "role lens"; "An AI coach for 1M+ employees".
- Narrowed: `+200%` → "per internal reporting; definition not published"; Aimee deployment → "merged into the production SDK"; usage → "reach, not usage"; manual cost → a labeled model with stated assumptions (37,000 h, ≈$2.2M at $60/h); research → "the research is not published here"; remote only.
