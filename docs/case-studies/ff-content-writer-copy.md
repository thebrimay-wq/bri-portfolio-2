# FF Studio (formerly FF Content Writer) — Case study copy (v2: tight, FAANG-worthy)

> **Use:** Drop this copy into `work/ff-content-writer/index.html` during Phase 4 of the rebuild. Every section maps to a slot in the universal case study template.
>
> **Bar:** FAANG-worthy + skimmable. 60–90 seconds end-to-end. Each Experience section: 1–2 sentences max.
>
> **Positioning word:** *shipped.* (Designer-builder. The rarest hire signal in 2026.)
>
> **Naming note:** Public-facing name is **FF Studio** going forward — captures both the CMS nature and the creative authoring nature. Internal URL stays `/work/ff-content-writer/` to avoid folder/asset refactors. Find-and-replace string for the rename: `FF Content Writer → FF Studio`.
>
> **The flagship.** This case study gets the homepage black-card inversion treatment. Of every project on the site, this is the one that earns "designer-builder, AI-native, ships solo." Everything in this copy is engineered to make that claim undeniable in 90 seconds.

---

## Hero

**Eyebrow:** Lead Product Designer · Financial Finesse · 2026

**Headline (editorial serif italic moment):**
A brand-trained AI CMS that writes *like* the team that built it.

**Subhead:**
Designed and built end-to-end. Solo. AI-native. Now powering financial wellness content for 1M+ employees across Fortune 500 clients including Meta, NFL, JPMorgan, and the Federal Reserve.

**Metadata:**
Role · Lead PD + Solo Builder  ·  Timeline · Weeks  ·  Stack · Web · AI · End-to-end  ·  Status · Shipped

**Hero asset:** Autoplay video loop of the live product. `images/ff-content-writer/featured-loop.mp4`. 21:9, no audio. Develops in on scroll.

---

## Try it

**Eyebrow:** Live demo

**H2 (sans, 500):** The same tool the team ships with.

**Body:**
A sandboxed version of FF Studio embedded below. Type a topic, pick a content type, watch a brand-trained draft come back. No login. No waiting list. Just the product.

**Embed:**
- Utility strip on top: mono `↗ thebrimay-wq.github.io/ff-content-writer · live` left, `open full ↗` link right
- iframe pointing to `https://thebrimay-wq.github.io/ff-content-writer/`, 760px tall, lazy loaded, hairline border
- Don't restyle the iframe contents — the Lato/Inter mismatch signals "this is real product, not a portfolio asset"

---

## What I owned

| Strategy | Identified the bottleneck and defined the product opportunity — turned a content-team constraint into a workflow product, not a feature. |
| Design | UX, UI, workflow patterns, component library, structured editors for all 9 content types — research to high-fidelity. |
| AI Training | Built the brand voice rules, compliance non-negotiables, banned-phrase lists, audience tones, and content type schemas the model runs on. |
| Build | Coded the working product end-to-end using AI as my engineering partner. No spec doc handoffs. Design and build in the same loop. |
| Ship | Delivered a production-ready app. Engineering came in only at the deploy stage — to move it onto internal infrastructure. |

---

## Stat block

| 1M+ | Employees reached through generated content |
| 9 mo → weeks | Traditional build cycle vs. AI-native solo build |
| 9 | Content types · 5 audience segments · multiple regions |
| Solo | Designed, trained, and built end-to-end |

---

## The problem

**A content team scaling for millions, working at the speed of one writer at a time.**

- Content for **over 1M employees** across Fortune 500 clients moved at the speed of one writer in a Google Doc.
- Generic AI couldn't fill the gap — wrong voice, banned phrases, drifting into individualized financial advice (a hard **compliance line** FF cannot cross).
- **9 content types · 5 audience segments · multiple regions** — every dimension multiplied the load.

---

## The opportunity

*What if AI didn't just generate content — what if it understood the voice, the rules, and the workflow of the team using it?*

| Generic AI generation | → | Brand-trained, compliance-aware authoring |
| Drafts in scattered docs | → | Library with status, owners, review flow |
| Manual voice + compliance review | → | Ambient quality signals in the editor |
| One-size prompt | → | Structured editors per content type |

---

## The solution

**From content factory to content system.**

FF Studio is a workflow product, not a generator. The AI is trained on FF's voice pillars, compliance non-negotiables, banned phrases, audience tones, and the structure of all 9 content types. The interface wraps that intelligence in a real authoring experience — so the team doesn't fight the tool to make it useful.

01. **A purpose-trained AI** grounded in FF voice pillars, compliance rules, and 9 content type schemas — every generation reflects the brand.
02. **Structured editors** for articles, money tips, quizzes, coach insights, calculators, checklists, infographics, user stories, and videos.
03. **A real workflow** — drafts, assignees, review notes, approve / send back, status tracking, and a "my queue" view.
04. **Ambient quality** that flags missing CTAs, weak meta descriptions, banned phrases, and voice drift — with click-to-fix AI actions.

*The team stopped fighting the tool to keep the voice. The tool started defending the voice for them.*

---

## Experience · 01 — AI that writes like a Financial Finesse coach, not like AI

Every generation runs through a system prompt built from FF's voice pillars, compliance rules, banned-word lists, audience tones, and content type schemas. Drafts arrive already aligned to the voice — not needing rewrites.

[Image: `images/ff-content-writer/exp-01-generator.jpg` — sidebar prompt → generated FF-voiced article in editor]

---

## Experience · 02 — Nine content types, nine right-shaped tools

A money-tips carousel doesn't need the same editor as a CFP coach insight or a calculator spec. Each content type gets its own structured editor with the right fields, AI prompts, and preview.

[Image: `images/ff-content-writer/exp-02-editors.jpg` — multi-editor grid: article · quiz · checklist · money tips · coach insights]

---

## Experience · 03 — Where drafts become a system

Every piece carries status, owner, audience, content type, and review notes. Filters cut by audience, status, and type. Bulk actions move five quizzes through review at once.

[Image: `images/ff-content-writer/exp-03-library.jpg` — library view with status chips, audience filter, bulk-action bar, my-queue toggle]

---

## Experience · 04 — Quality signals you can't ignore — and can fix in one click

A right-panel checklist watches the draft in real time. It flags missing CTAs, weak meta descriptions, banned phrases, off-target reading level, and voice drift. Each signal is one-click fixable with a scoped AI action.

[Image: `images/ff-content-writer/exp-04-quality.jpg` — details panel with quality checklist + click-to-fix menu open]

---

## Experience · 05 — Refine the part that needs it, not the whole thing

Highlight any sentence and pick Improve, Shorten, Simplify, Warmer, More actionable, or Ask. Writers stay in flow.

[Image: `images/ff-content-writer/exp-05-selection.jpg` — selection-based AI toolbar floating above highlighted text]

---

## Experience · 06 — A pro tool that doesn't feel like a developer console

Autosave every 10 seconds. Drafts born with a name. Soft-delete with a 30-day Trash. Similar-content warnings as you type a topic. Coachmarks the first time you hover the section AI button. Every detail tuned to the content team's actual day.

[Image: `images/ff-content-writer/exp-06-details.jpg` — details montage: autosave · similar-content warning · soft-delete · coachmark]

---

## Process

**Designed and built solo. AI-native, end to end.**

A traditional design-and-build cycle for a workflow product this deep takes a designer, a PM, and a multi-person engineering pod nine months. I designed and shipped it solo — using AI as my engineering partner — in weeks. Engineering came in only at the production handoff.

| ~9 months end to end | → | Weeks to a working product |
| Designer + PM + multi-person dev pod | → | Solo — designer as builder |
| Specs → handoff → revisions → build | → | Design and build in one loop |
| Dev team needed from day one | → | Dev needed only at production deploy |

*The product proves what AI unlocks for content teams. The way I built it proves the same thesis for design.*

[Image: `images/ff-content-writer/process-build.jpg` — build environment screenshot: Cursor or VS Code with the codebase open]

---

## Impact

| 1M+ | Employees reached through generated content |
| 9 mo → weeks | Traditional build cycle vs. AI-native solo build |
| Fortune 500 | Trusted at Meta, NFL, JPMorgan, Federal Reserve |

**Marquee of clients (mixed family):**
Meta · *NFL* · JPMorgan · *Federal Reserve* · Patagonia · *Comcast* · CVS Health · *General Mills*

*(Italics = serif, romans = sans, separators in mono. Framed honestly: my work at Financial Finesse powers content for these employers.)*

**Off-grid stamp** — italic serif rotated -2deg, positioned absolute next to the impact section: *built solo.*

---

## What's next

01. Persistent backend + real auth — beyond browser storage so the team can collaborate from anywhere.
02. Real-time co-editing & comments — Figma-for-content, with presence and threaded review notes.
03. Taxonomy-aware related content — auto-detect duplicates and surface "refresh this existing piece instead?" before a writer starts a new one.
04. Mobile authoring — capture coach insights, edits, and approvals from anywhere.

---

## Final takeaway

**FF Studio turned the content team's biggest constraint — voice consistency at scale — into a system. I built it the same way I designed it: AI-native, end to end, in weeks instead of months.**

*Generic AI gives you words. A brand-trained workflow tool gives you a team that ships. A senior product designer who can build it gives you both — at speed.*
