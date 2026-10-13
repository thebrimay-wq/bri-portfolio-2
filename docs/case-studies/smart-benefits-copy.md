# SmartBenefits — Case study copy (v2: tight, FAANG-worthy, grounded in real product)

> **Use:** Drop this copy into `work/smart-benefits/index.html` during Phase 4 of the rebuild. Every section maps to a slot in the universal case study template.
>
> **Bar:** FAANG-worthy + skimmable. 60–90 seconds end-to-end. Each Experience section: 1–2 sentences max.
>
> **Positioning word:** *systemized.*
>
> **Vocabulary:** "Plan Sponsor" (the employer client of the recordkeeper), "Plan Participants" (employees), "Common Q&A" (shared across all plan sponsors), "Plan Sponsor Q&A" (specific to one plan sponsor's documents). Use these terms — they're the industry standard.
>
> **Metrics flagged for substantiation:** specific time-saved numbers and host-platform names need verification before publishing.

---

## Hero

**Eyebrow:** Senior Product Designer · Financial Finesse · 2024–2025

**Headline (editorial serif italic moment):**
A B2B2C benefits AI with two surfaces — an admin console that turns plan documents into trusted Q&A in *hours*, and an embed that delivers it inside any recordkeeper platform.

**Subhead:**
One system. Two products. Five host recordkeepers at launch. Designed against the moment of decision — for the employee, and the recordkeeper behind them.

**Metadata:**
Role · Senior PD  ·  Timeline · 2024–2025  ·  Stack · Admin web app + embeddable component  ·  Status · Shipped

---

## What I owned

| Strategy | Defined the dual-product (admin console + embed) shape that became Financial Finesse's recordkeeper-channel go-to-market. |
| Design | UX, UI, admin console, three embed modes, answer-state machine UX, white-label theming. |
| System | The answer-state machine (Complete / Needs Review / Answer Not Found) and confidence-scoring (High / Medium / Low) that backs every AI-generated Q&A. |
| Constraints | Five host recordkeeper platforms simultaneously. Compliance lane on every word. Trust calibration on every answer. |
| Cross-functional | Recordkeeper integrations team plus three host-platform engineering counterparts. |

---

## Stat block

| 5 | Host platforms supported at launch |
| 2 | Q&A layers — common + plan-sponsor-specific |
| Hours | What used to take weeks of human authoring per plan sponsor |
| 1 | Component system shared across both products |

---

## The problem

**Open enrollment is the most important financial decision an employee makes all year — made under deadline, in a UI built around plan SKUs, with no real guidance.**

Two failures, two markets:

- **Employee-facing.** Most employees defaulted to last year's selections. Voluntary benefits had double-digit underutilization. Recordkeeper UI assumed knowledge employees didn't have.
- **Admin-facing.** Recordkeepers wanted real benefits guidance inside their platforms. They don't have the financial wellness IP — FF does. But every plan sponsor's benefits documents are different. Authoring custom Q&A by hand for every plan sponsor was a multi-week-per-client lift. The economics broke at scale.

Three constraints framed every decision:

- **Host-UI parity.** The embed has to feel native inside five different recordkeeper platforms.
- **Compliance lane.** FF cannot give individualized advice. Guidance language only — every word defends the line.
- **Trust calibration.** The admin tool generates AI answers. Reviewers need to know which to trust and which to fix — without reading every one.

---

## The opportunity

*What if one system delivered FF's safe AI to any recordkeeper — and ran the content pipeline itself?*

| Manual Q&A authoring per plan sponsor | → | AI synthesis with a confidence loop |
| Plan comparison tables | → | Conversational tradeoffs in the host UI |
| Static FAQ | → | Plan-specific, source-attributed Q&A |
| One layout per host | → | One component, three modes, five hosts |
| Multi-week per-client onboarding | → | 3-step wizard, hours per plan sponsor |

---

## The solution

**Two products. One system.**

### Product 1 — The admin console

A 3-step onboarding wizard plus a structured operational layer for every plan sponsor:

- **Setup.** *Common Q&A* (shared baseline answers used across all plan sponsors) plus *Plan Sponsor Q&A* (sponsor-specific answers generated from their uploaded documents).
- **Manage.** Documents library categorized by Benefits → Retirement Plans / Life Insurance / Short-Term Disability. AI-generated answers carry status (Complete / Needs Review / Answer Not Found) and confidence (High / Medium / Low). Bulk publish or per-answer review. Advisors directory for human handoffs.
- **View.** Participant View (preview what employees see) plus Interactions (real-world usage data).

The breakthrough is the **answer state machine.** Every AI answer carries a status and a confidence rating. Reviewers see only what needs attention. Admins choose AI-only or human-in-the-loop modes. Trust is built into the seam — not assumed.

### Product 2 — The embed

A configurable web component that surfaces the same Q&A and Aimee AI inside any host platform. Three modes:

- **Panel** (480px wide) — desktop hosts with sidebar real estate
- **Modal** (720px wide) — hosts without sidebar space
- **Inline** (responsive) — mobile-first hosts

One token system underneath. Hosts theme the chrome — colors, type, density. FF keeps the voice — question framework, compliance lane, source attribution.

*Most AI tools ask humans to trust the output. We designed for the moment humans verify it — and made that the cheapest part of the workflow.*

---

## Experience · 01 — The 3-step onboarding wizard

Upload plan sponsor documents → AI synthesizes answers → human reviews and publishes. What used to take weeks per plan sponsor now takes hours.

[Image: `images/smart-benefits/exp-01-wizard.jpg` — three-step wizard tab strip with Step 1 active]

---

## Experience · 02 — The answer state machine

Every AI answer carries a status (Complete / Needs Review / Answer Not Found) and a confidence rating (High / Medium / Low). Reviewers see only what needs them. Admins pick fully-human or AI-trusted operating modes.

[Image: `images/smart-benefits/exp-02-state-dashboard.jpg` — three status cards with counts, plus the table of Q&A pairs with confidence badges visible]

---

## Experience · 03 — Two Q&A layers, one experience

*Common Q&A* answers questions every plan sponsor's employees ask. *Plan Sponsor Q&A* answers what only this sponsor's documents can answer. The participant feels one experience; the admin manages two layers without overlap.

[Image: `images/smart-benefits/exp-03-two-layers.jpg` — sidebar showing both Common Q&A and Plan Sponsor Q&A under Setup]

---

## Experience · 04 — Document categorization that drives synthesis

Documents are tagged by category and subcategory (Benefits → Retirement Plans, Life Insurance, Short-Term Disability). The AI uses those categories to scope every answer. Source attribution is visible in every Q&A row — reviewers know which PDF a sentence came from.

[Image: `images/smart-benefits/exp-04-documents.jpg` — documents library with category / subcategory columns visible]

---

## Experience · 05 — The embed: three modes, one engine

Panel, modal, inline. One conversational engine underneath. Each host configures, none customizes.

[Image: `images/smart-benefits/exp-05-three-modes.jpg` — three embed modes side-by-side, labeled Panel · 480px / Modal · 720px / Inline · responsive]

---

## Experience · 06 — White-label without losing the voice

Hosts theme the chrome via tokens — colors, type, density. FF keeps the voice — question framework, compliance lane, source attribution. The host gets the brand. We keep the trust signal.

[Image: `images/smart-benefits/exp-06-theming.jpg` — same surface in three host themes]

---

## Process

**Two products designed in parallel. One system shipped.**

The admin console came first — the embed has nothing to surface without it. We mapped the recordkeeper-side workflow against three operational realities (what gets uploaded, what gets generated, what gets reviewed) and designed the answer state machine that became the spine of both products.

Five concurrent host design exercises followed. Five custom integrations would have been five custom support contracts. One configurable component was the product move.

*Five integrations is a sales problem. One system is the product.*

[Image: `images/smart-benefits/process-state-machine.jpg` — annotated diagram of the answer state machine: Upload → AI Synthesize → Confidence-score → Route to Review or Auto-publish]

---

## Impact

| 5 | Host platforms supported at launch |
| 2 | Q&A layers — Common + Plan-Sponsor-specific |
| Hours | Replaces weeks of human authoring per plan sponsor |

*Optional stakeholder quote (drop in if available):*
*"SmartBenefits is the cleanest white-label embed we've integrated. We barely touched it." — [Name, Title, Host platform]*

---

## What's next

01. Outcomes feedback loop — track which framings drove which decisions, refine the AI accordingly.
02. Voice expansion beyond enrollment — life events, eligibility changes, year-round coaching.
03. Embedded action — execute against host APIs from inside the embed.
04. Mobile-first authoring console — most enrollment happens on phones; the admin tool should follow.

---

## Final takeaway

**Two products that share one system. The admin console turned weeks of authoring into hours. The embed turned five recordkeeper platforms into FF distribution. The discipline — *one engine, one state machine, one token system* — was what made it shippable.**
