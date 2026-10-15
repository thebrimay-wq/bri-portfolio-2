# imbrimay.com + résumé: positioning brief for Claude Code

Owner: Bri May. Target reader: FAANG hiring managers and recruiters for AI-Native Senior Product Designer roles. Date: Sept 2026.

## 0. The one decision everything else follows

Title, everywhere, exactly: **AI-Native Senior Product Designer**
Second line, everywhere, exactly: **I design the product, then I ship the code.**

"Design Engineer" survives only as (a) a secondary line on the contact page, (b) a skills group, (c) the Brix answer when someone asks about it. It is no longer a title, a byline, a lens chip, or a resume header.

The thesis the visitor must absorb in six seconds without typing anything: this designer ships production code, and here is the code.

Rules that follow from the thesis:

1. Every claim of shipping is adjacent to a link to the thing shipped (repo, live product, commit, or a screenshot of real production data).
2. The word "handoff" and the phrase "hand off" are removed from every page and the résumé. Replace with what actually happened: "merged," "shipped," "deployed," or, where engineering did ship it, "engineering implemented my coded prototypes 1:1."
3. "Trained," "brand-trained," and "AI training" are replaced with "grounded," "prompted," or "RAG over a per-country wiki." Never claim training.
4. One set of numbers per project, identical on the site, in Brix, and on the résumé.

## 1. Facts Bri must supply before the rewrite runs

Claude Code cannot invent these. Fill them in first or the rewrite will restate the current vagueness.

- Global Content Studio stack: framework, hosting, database/storage, where the Anthropic API is called (client or server), queueing for bulk runs, auth. One paragraph.
- How the 0.9 "confidence score" is produced. If the model scores its own output, say so and say what the human review catches that the score misses.
- Two things that broke in production on the Studio and what changed as a result (a bad localized fact that reached QA, a rate-limit or cost incident, a prompt regression, a locale that failed the fit check wrongly, anything true).
- Cost: actual API spend for the 25-country run, per piece.
- Aimee: exactly what Bri coded that runs in production today, versus what engineering implemented from her prototypes and spec. One sentence each. This is currently contradicted between the case study and Brix.
- Hub: how "engagement" was defined, the time window for +200%, and what "$12M" is (bookings, ARR, attributed revenue, something else).
- Public code: which repo(s) can be made public or excerpted. Candidates: this site (Brix), the 38-question harness and audit script, a sanitized slice of the Atlas pipeline or its eval harness, one TypeScript component with a test.
- GitHub username.
- AI team: when Bri joined it, team size, and her role on it relative to the AI developers.
- AI Champion and mentor: what the role actually involves, in numbers. How many people mentored or trained, how many sessions or office hours run, which tools or workflows the company adopted because of it (Claude Code, the Studio, the AI Workspace), and any measurable result (hours saved, adoption count, number of internal AI tools others shipped with her help). "AI Champion" is a company-internal title and means nothing to a FAANG reader until it is backed by these specifics.

## 1b. AI team, AI Champion, mentor: where it goes and how it is phrased

This is the second strongest thing on the profile after shipping code, because it shows the AI work is a team role with influence, not a solo side quest. It goes in five places, and nowhere as a bare badge.

- Résumé, current role line: "AI-Native Senior Product Designer, AI Team" with dates. Then one bullet, third in the list: "Company AI Champion: [mentored N colleagues / ran N sessions] on AI-assisted building; [N] internal tools shipped by non-engineers with my help; drove adoption of [Claude Code / the Studio / the AI Workspace] across [teams]." Numbers from section 1; no numbers, no bullet.
- Résumé summary: append one clause: "...and the company's AI Champion, mentoring the rest of the org on building with AI."
- About page, current role: "AI-Native Senior Product Designer on the AI team. AI Champion and mentor for the company." Under the experience block, not with the hobbies.
- Homepage hero: do not add it above the fold. The hero stays three lines. It appears in the "who is" Brix answer and in the About link copy.
- Brix KB: rewrite the "manage / mentor / leadership" entry so it leads with the concrete Champion facts, and add keys "ai team," "ai champion," "champion," "mentor," "teach," "train others," "evangelist." The "who is" and "why hire" answers each get one clause about it.
- Contact page: no.

Phrasing rules: "AI Champion" is always followed by what it means in the same sentence the first time it appears on a page. Never "AI evangelist," "AI advocate," or "thought leader." Never list it as a skill.

## 2. Homepage (index.html)

Keep Brix. Stop hiding the person behind it.

Above the composer, visible with JS on, before any card:

```
Bri May
AI-Native Senior Product Designer
I design the product, then I ship the code.
[View the code ↗]  [Global Content Studio →]  [Résumé ↓]
```

- "View the code" links to the GitHub profile or the pinned repo. This is the single most important new element on the site.
- Remove the role-lens row ("Hiring for a specific role? Design Engineer / Senior Product Designer"). One audience now.
- Starter cards: replace "See all Bri's case studies" with "See the code she ships" (opens the repo or a code page in the side panel). Keep the featured Studio card, résumé, contact.
- `<title>` and OG tags: "Bri May: AI-Native Senior Product Designer who ships in code."
- Keep the noscript version and make its copy identical to the new hero.

## 3. Brix (the on-device engine)

- The "level," "who is," "why hire," "design engineer," and "how does this work" KB entries are rewritten to the new title and second line. Grep the KB for "Lead Product Designer," "Design Engineer," "Senior / Principal," and "seam" and fix every hit.
- Add KB entries with real answers for: "what broke," "how did she fix," "tradeoff," "architecture," "tests," "stack," "why no framework," "what would you do differently." Each answer points to the specific case study section. A question containing broke, fix, fail, tradeoff, architecture, test, debug, or why must never route to a joke.
- Cut the ten funny redirects to three, and make them plain: "I only know Bri's work. Closest things I do know:" followed by the nearest-topic chips (that fallback already exists; make it the default).
- The code excerpt shown in chat must be the real `retrieve()` that runs, not a simplified copy. Either render the actual function (wrap it in the text/plain block by build step or copy it verbatim) or change the caption from "the engine answering you right now" to "a simplified excerpt; full source on GitHub ↗." Given the site's thesis, ship the real one.
- Remove the artificial thinking delay, or reduce it to a single 120ms beat. Keep token streaming and the stop control.
- Make the Aimee answer match the Aimee case study exactly (see section 1).
- Add a "Code" entry in the left rail Pages list linking to the repo.

## 4. Case studies

Every case study gets the same required sections, in this order, after the hero: **What I owned** (with an explicit "Coded by me" versus "Built by engineering from my prototypes" split), **Architecture** (one diagram plus one paragraph, only for projects where Bri wrote the production code), **Decisions and tradeoffs** (three, each with the option not taken and why), **What broke and what changed** (minimum two), **Proof** (link to repo, live product, or production screenshots with real counts), **Impact** (numbers with definitions and time windows).

### Global Content Studio (featured, stays first)
- Byline: "AI-Native Senior Product Designer · Designed and shipped solo · Financial Finesse · 2026"
- Add Architecture, Decisions, What broke, Proof sections from the facts in section 1.
- Rename the "AI training" role block to "Grounding and guardrails."
- Reconcile numbers: pick one of "one country a day" or "one country per week," one of "one month" or "two weeks to build, four to refine," and one locale count (25, 26, or 27). Use the same everywhere including the résumé.
- Replace "$2.42M net cost avoided" as the lead number. Keep it as a footnoted comparison. Lead with a measured number: pieces localized, locales live, actual spend, time to first locale.
- "1M+ employees reached" becomes "in production for a platform serving 1M+ employees," or is cut.
- Add the honest line about scoring: how the 0.9 is produced and what human QA catches.

### Brix (moves to second)
- It is the only case study with what-broke evidence and inspectable code, so it earns the second slot for this audience.
- Publish the 38-question harness and the 42-check audit script in the repo and link them from the case study where they are mentioned.
- Fix the "renders the engine's actual source" claim per section 3.

### Aimee (third)
- Byline drops "Design Engineer." Replace with "AI-Native Senior Product Designer · Front-end design, design system, coded prototypes."
- Rewrite "What I owned" with the true coded-by-me / implemented-by-engineering split. Remove "Handoff" from the scope line.
- Move the component library off the random Netlify subdomain to something like aimee.imbrimay.com or /work/aimee/components/, and strip the internal review copy ("Review & approve before we wire them into the SDK widget").
- Stop presenting DESIGN-SYSTEM.md as the design system. It is the spec. Show the tokens and components as code.

### Financial Finesse Hub (fourth)
- Reframe as the product-judgment piece. Add one real research artifact (a testing round summary, a pivot log, before/after screens).
- Define "engagement" and "$12M" per section 1, and use one label for the $12M block (currently "Revenue growth" and "Revenue contribution" on the same page).
- Reconcile NFL versus NFLPA. Cut "Netflix-style." Replace "Led the design team" with the true statement of team shape.
- If none of this can be supplied, cut the Hub to a short summary card on the Work page rather than a full case study.

### Work index page
- Order: Studio, Brix, Aimee, Hub. Each card gets a "Code ↗" or "Live ↗" link where one exists.
- Subhead becomes: "Products I designed and shipped in code."

## 5. About page
- Experience block moves to the top; hobbies below.
- Timeline title for 2025–present: "AI-Native Senior Product Designer." The 2016–2025 row keeps the historical titles. Remove the 2016 start date from the current title.
- One line under the current role: "Ships production React and the AI pipelines behind it."

## 6. Contact page
- Availability copy: "Open to AI-Native Senior Product Designer roles (Bay Area or remote)." Optional second line: "Also a fit for Design Engineer teams that want a designer who ships." Remove the four-title list.
- Add GitHub next to LinkedIn.

## 7. Résumé (site page and PDF)

Rebuild from scratch. Single column. No letter-spaced headings (the ATS reads the current title as "A I - N AT I V E ..."). Real text, no chat-composer footer.

Header:
```
Bri May
AI-Native Senior Product Designer · Pleasanton, CA
imbrimay.com · github.com/<handle> · linkedin.com/in/brimay · thebrimay@gmail.com
```

Summary (two lines, no "seam"):
"Senior product designer who designs the product and ships the code. Built and shipped an AI localization studio solo (React, Anthropic API) that took Financial Finesse's content library into 25 markets; designed the Aimee AI coach across three surfaces; led the Hub redesign that drove +200% engagement."

Impact strip, in this order: a build metric first (e.g., "25 markets live, 1 designer, 6 weeks"), then engagement, then revenue. Every number defined in its bullet.

Experience, 2025–present, bullet order:
1. Studio: what it is, what she coded, stack, measured outcome, link.
2. Aimee: true split (coded prototypes and component contract; engineering implemented 1:1), surfaces, stack.
3. Design system in code: tokens, components, accessibility rules, where it runs.
4. Smart Benefits: keep only if there is a verifiable claim; cut "used within Olympic organizations."
No bullet contains "hand off."

2017–2025 stays but shrinks to three bullets. 2016–17 and CKC become one line each.

Skills: three groups, in this order: Engineering (React, TypeScript if true, JavaScript, HTML/CSS, Tailwind, Vite, design tokens, accessible UI, Git, CI), AI (Anthropic API, RAG/grounding, evals and human-in-the-loop QA, conversational UX), Design (product design 0→1, design systems, prototyping in code, research). Drop "Prompt Engineering" and "Rapid AI Prototyping" as line items.

Fixes carried from the critique: "JPMorgan Chase" (no comma), "Arizona State University, 2 years, D1 soccer" (drop "Coursework"), one figure for the Studio savings that matches the site, "saved millions" removed.

Export: generate the PDF from a print stylesheet with real text; verify with `pdftotext` that the title and bullets extract in reading order.

## 8. Code evidence (the change that makes the rest credible)

Ship, in this order:
1. Make the portfolio repo public. Add a README that explains the engine, the a11y decisions, and how to run the harness. Link from hero, rail, Brix, résumé.
2. Publish the harness (38 questions) and the audit script (42 checks) in that repo.
3. Publish one sanitized excerpt from the Studio: the Atlas step definitions, the guardrail step, or the eval harness, with real code and a short README. If the company code can't be public, rebuild the pattern as a small open-source demo and say that's what it is.
4. Add TypeScript and a test file to at least one public component. Then "TypeScript" and "tests" can go on the résumé.

## 9. Language to delete site-wide

"in the seam between design and engineering," "designs and builds" as a tagline, "one loop," "zero to one / 0→1" as identity, "AI-native" as an adjective for herself outside the title, "show, don't claim," "the portfolio is the proof," "solo with Claude Code" as a credential (say what was shipped instead), "AI as her engineering partner," "doesn't just X, she Y," "Netflix-style," "brand-trained," "AI training," "handoff," "pixel-accurate."

Keep and use more: specific counts from production screenshots, the fit-check and US-reference guardrail, the one-announcement live region, the what-broke numbers on Brix, the candid weakness answer.

## 10. Consistency checklist (run last)

Grep the whole repo and the résumé source for each and confirm one value:
- Title strings: "Lead Product Designer," "Design Engineer," "Senior / Staff / Principal," "Product Creative Director" (historical only).
- "Ten years" claims that describe the design-engineering period. The real number is 2025 onward.
- Studio timing: day vs week; one month vs six weeks.
- Locale count: 25 / 26 / 27.
- Savings figure: $2.42M / $2.44M / "millions."
- Revenue label: "growth" vs "contribution."
- NFL vs NFLPA.
- Aimee ownership sentence, identical in case study and Brix.
- Every "Code ↗" link resolves.

## 11. Order of work for Claude Code

1. Section 1 facts in a `facts.md` at repo root (Bri writes this by hand).
2. Résumé rebuild (section 7), PDF export, pdftotext check.
3. Homepage hero + Brix KB rewrite (sections 2 and 3).
4. Studio case study rewrite (section 4).
5. Repo public + harness published (section 8, steps 1 and 2).
6. Aimee, Hub, About, Contact, Work index.
7. Consistency checklist (section 10). Re-run the browser audit and the 38-question harness; add the new "what broke" questions to it.
