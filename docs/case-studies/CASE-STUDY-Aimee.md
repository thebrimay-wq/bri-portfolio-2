# Aimee — Designing an AI Financial Coach for the Web, Client Sites, and Beyond

**Role:** Lead Product Designer / Design Engineer
**Product:** Aimee — Financial Finesse's AI financial coach
**Scope:** Front-end design, design system, component API, interactive prototypes, multi-surface delivery, engineering handoff
**Company:** Financial Finesse

---

## Overview

Aimee is Financial Finesse's AI financial coach — a chat experience that answers money questions, surfaces the right benefit and next action from a user's plan, and hands off to a certified human coach when a person is needed.

I designed and built the front end of Aimee end-to-end: the visual language, the interaction model, a full component library, and working prototypes — then made it deployable in three places from one codebase: **inside our own Hub, embedded on client websites as a widget, and inside surfaces like Microsoft Teams.** The whole system was designed to be hosted and configured through our **UberAdmin** platform so any of the three destinations could be provisioned without a separate build.

The core challenge: one AI coaching experience that had to feel native everywhere — our platform, a benefits provider's marketing site, a Teams window — while staying on-brand, accessible, and trustworthy for a first-time financial product.

---

## My Role

I owned the front-end design and design engineering for Aimee:

- Defined the **visual language and interaction model** — how Aimee talks, streams, surfaces content, and hands off to humans.
- Authored a **complete design system** as a single source of truth (`DESIGN-SYSTEM.md`) covering tokens, typography, layout, every chat and card component, chart rules, accessibility hard-rules, and anti-patterns.
- Built a **locked, approved component library** (a component "API" of reusable in-chat blocks) that engineering could implement 1:1.
- Designed and coded **high-fidelity interactive prototypes** — real HTML/CSS/JS with live streaming, animation, and state — used to test flows and align stakeholders before a line of production code.
- Designed the **embeddable SDK widget** for client sites and adapted the same system to **Microsoft Teams**.
- Made the experience **hostable through UberAdmin** so one system served all three surfaces.
- Wrote the **engineering handoff spec** (Next.js + Tailwind + A2UI architecture) so the prototypes translated to production without redesign.

---

## The Problem

Financial Finesse needed Aimee to live in three very different contexts:

1. **The Hub (Hub V3)** — our own logged-in financial wellness platform, where Aimee is a full-screen coach woven into the user's plan, benefits, and wellness score.
2. **Client sites** — benefits providers who want to offer Aimee to their employees directly on *their* website, embedded as an unobtrusive chat widget.
3. **Embedded surfaces** — places like Microsoft Teams, where the same coach appears inside a host app's chrome.

Each surface has different constraints (screen real estate, surrounding brand, entry point), but the *coaching experience itself* had to be identical and recognizable. Building three separate front ends would have fractured the brand and tripled maintenance. The answer was one design system, one component library, and one configurable host.

There was also a trust problem specific to financial products: users need to know they're talking to AI, but "virtual assistant" reads as *fake* — the wrong first impression when someone's asking about their retirement. The design had to own the AI honestly while making human coaches feel like a premium upgrade, not a fallback.

---

## What I Designed & Built

### 1. A complete design system (the source of truth)

I wrote `DESIGN-SYSTEM.md` as a reference spec any designer, engineer, or AI tool could build from. It codifies:

- **Color tokens** — Financial Finesse navy (`#00507C`) as the primary, a soft navy surface (`#F4F7FE`) as the workhorse accent, plus semantic brand accents (teal for recommendations, gold for in-progress, green for completed, coral reserved for the single most-urgent item).
- **Accessibility hard-rules** — e.g. never yellow text on white (fails WCAG; use dark amber `#7a5b14` on yellow tints), one hover treatment at a time (soft fill *or* navy stroke, never both), bold in body copy stays in the inherited ink color, not brand color.
- **Typography** — Lato, with a strict rule I enforced across the system: **the user's message and Aimee's reply must always render at the exact same size (16px mobile / 17px desktop)** — never shrink the user's words beneath the AI's. (This came out of catching a real drift where the user bubble had slipped to 14.5px; it's now codified so it can't happen again.)
- **Layout, spacing, and radius scales**, mobile-first breakpoints, chart palette and charting rules, icon style, and a running **anti-patterns list** of things the system must never do.

### 2. A full component API / locked component library

I built a complete, approved library of in-chat components — the "vocabulary" Aimee speaks in. Rather than free-form bubbles, every response is assembled from typed blocks:

- **Chat primitives** — user bubble, Aimee turn (with avatar treatments), per-reply action row (copy / thumbs / regenerate), thinking-dots loading state.
- **A streaming/typing convention** — Aimee's prose types itself in character-by-character; structured content (cards, charts, chips) stays hidden and only fades in *after* the prose finishes (gated behind a `.prose-done` state). This was a deliberate rule: never dump cards on screen mid-sentence.
- **Card system** — a base card with a colored left rail that signals type: navy = analysis, teal = recommendation, gold = human-coach handoff, plus a soft-fill booking/confirmation card.
- **Data viz blocks** — stat tiles, before/after compare tiles, a circular hero-score gauge, retirement progress bars, debt-priority rows, and framed charts — all following the chart palette and accessibility rules.
- **Navigation & follow-ups** — meta-chips that open inline popovers (Related Questions, Recommended Content, Pending Actions) so users explore without leaving the conversation.
- **Hub components** — action rows (with "add to plan" states), benefit cards, and resource cards that match Hub V3 exactly.
- **Welcome experience** — returning-user greeting, composer, and staggered-reveal starter cards.

The library was formally **approved and locked** so it could serve as the definitive spec — every component built to a documented anatomy, states, and CSS contract.

### 3. Interactive prototypes to test with

Instead of static mockups, I coded high-fidelity, interactive HTML prototypes — with real streaming, animation choreography, and stateful interactions — so flows could be tested and felt, not just reviewed. These covered the returning-user welcome, first-time welcome + wellness assessment, a coaching-session booking flow, focused single answers (e.g. a 401(k) match breakdown), search results, and milestone/wellness moments.

As I noted pitching the first-time welcome to leadership: *"Open the prototype to see the streaming effect — it's the kind of detail that doesn't translate in a screenshot."* The prototypes existed precisely to make those details reviewable.

### 4. Three surfaces from one system

- **Hub** — Aimee as a full coach inside Hub V3, with sidebar, topbar wellness pill, and full-plan integration.
- **SDK / embeddable widget** — a floating action button that opens a chat popup over a client's own site (prototyped over a mock provider, "Meridian Benefits"), including an article reader that insets *inside* the same window rather than opening a separate panel — keeping the widget self-contained on someone else's page.
- **Microsoft Teams** — the same coaching experience adapted to live inside Teams' chrome, so the design held up when wrapped in a completely different host UI.

### 5. Built into UberAdmin for hosting

The system was designed to be provisioned and hosted through our **UberAdmin** platform, so any of the three destinations — Hub, client site, or embedded surface — could be configured and deployed from one place rather than as separate one-off builds.

### 6. Engineering handoff

I authored an approved design/architecture spec translating the prototypes into a production **Next.js + Tailwind** app, with design tokens mirrored as CSS custom properties and Tailwind utilities, **Recharts** for data viz, and an **A2UI**-based rendering model where Aimee's rich responses (cards, charts) are described as structured JSON and mapped to my design-system components — so the same component library drives every surface. The spec also defined the FAB → compact panel → full-screen chat mode state machine (chat history surviving every mode switch), responsive rules, and acceptance criteria (visual parity, tokens-only color, Lighthouse a11y ≥ 95).

---

## Key Design Decisions

**Honest AI, premium humans.** Aimee is labeled "AI coach," not "virtual" — "virtual" reads as fake, and hiding the AI status only breaks trust later. Certified human coaches are framed as a premium, one-click upgrade ("when you need a person…"), which protects both products: Aimee feels capable, humans feel credentialed.

**The user's words never shrink.** Enforcing matched 16/17px sizing for user and AI copy keeps the conversation feeling like a dialogue between equals, not a person shouting into a form.

**Prose first, then structure.** Gating cards behind finished streaming keeps responses feeling composed and human rather than like a dashboard loading.

**Restraint as a rule.** Three content blocks max per turn; one primary CTA per card; coral reserved for the single most urgent item. The anti-patterns list is as important as the components.

**One system, three homes.** Every decision was made so a single component library and token set could render natively in the Hub, on a client's site, and inside Teams.

---

## Outcome

Aimee ships as one coherent AI-coaching front end that runs across the Hub, embeddable client widgets, and embedded surfaces — backed by a documented design system, an approved component library, tested interactive prototypes, and a production architecture that keeps all three surfaces in sync from a single source of truth, hostable through UberAdmin.

---

## Skills demonstrated

Product & interaction design · Design systems · Component/API design · Design engineering (HTML/CSS/JS prototyping, Next.js/Tailwind/Recharts architecture) · Accessibility (WCAG) · Multi-surface / embeddable UI · AI/conversational UX · Data visualization · Stakeholder communication & engineering handoff
