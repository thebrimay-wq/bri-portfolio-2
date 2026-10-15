# Claude Code implementation brief: Bri May's AI-native product design portfolio

Prepared October 13, 2026, following a live review of imbrimay.com and Bri's clarification of her target role.

## 1. Objective and positioning

Improve this portfolio to support applications for **AI-Native Senior Product Designer** roles, with a strong emphasis on using AI to design AND ship products. Bri wants remote work and compensation above $200,000 per year, ideally at a FAANG company. Whether that compensation target means base salary or total compensation is unconfirmed; do not advertise a salary requirement on the site.

Keep these two lines:

> AI-Native Senior Product Designer
> I design the product, then I ship the code.

The central story is a senior designer who identifies worthwhile problems, makes product and design decisions, uses AI to accelerate exploration and implementation, and takes responsibility for production quality. Do not reposition Bri as a conventional designer whose coding is incidental. Do not reposition her as a software engineer whose design is incidental.

Show both:

- **Designing AI-powered products:** Studio, Aimee, their interaction models, uncertainty, human review, and quality controls.
- **Using AI to design and build products:** Bri's actual workflow, tools, judgment, corrections, implementation, validation, and collaboration.

The second story is currently underdeveloped. Stacks, commit counts, and test counts do not explain it by themselves.

A possible supporting sentence, to refine against the evidence:

> I use AI to move from product discovery to working prototypes and production code, with hands-on ownership of the experience and its quality.

This brief supersedes the earlier review's recommendation to deemphasize the AI-native title or replace the existing tagline. It also supersedes conflicting editorial priorities in `docs/portfolio-fix-list.md` and `docs/positioning-brief-for-claude-code.md`. Those files provide context, not a second implementation mandate. Respect applicable repository and execution instructions; explain material conflicts rather than silently ignoring them.

## 2. Start by establishing the correct baseline

This is an implementation request. Inspect, then make and validate the changes; do not stop after producing another plan.

1. Read applicable repository instructions, `README.md`, `CLAUDE.md`, the deployment workflow, this brief, `facts.md`, and relevant source material in `docs/case-studies/`.
2. Inspect the branch, git status, recent history, and actual deployed source layout. Preserve existing changes and untracked files. At handoff time, `facts.md` and the two older brief/fix-list files were untracked; do not discard or overwrite them.
3. Compare the live site, local checkout, and relevant repository history before editing. The October review found live pages and content newer than this local checkout, including `/work/brix/`, `/code/`, and `/aimee-ai/components/`. Resolve that discrepancy without reverting newer work or destructively resetting the checkout. Use the repository source/history when available; do not treat browser-rendered HTML as an ideal replacement for maintained source.
4. The current README describes a static HTML/CSS/JS site with no build step, deployed by an explicit GitHub Pages allowlist. Older parts of `CLAUDE.md` describe a React mirror that the README says is archived. Verify the actual state. Work on the deployed implementation; do not migrate frameworks or rebuild the archived app for this task.
5. Prepare a local preview and a concrete diff. Do not push to `main` or deploy as part of this handoff alone: that publishes changes. Finish the work and checks before requesting any final publication approval, unless Bri separately authorizes publication in the implementation session.

Make routine, reversible implementation decisions autonomously. Ask for missing facts in a concise batch while continuing work that does not depend on them. Do not let missing metrics block navigation, layout, copy tightening, chat behavior, or résumé export fixes.

## 3. Evidence rules

Treat the existing portfolio as a collection of claims, not independent proof. `facts.md` is a dated working source with references, unresolved TODOs, and some internal inconsistencies; it is not infallible.

Maintain a compact private evidence ledger, for example `docs/portfolio-evidence.md`: claim, source/date, definition, confidence/confirmation status, approved public wording, and locations using it. Add only what is needed for this implementation.

- Never invent research, participant counts, metrics, testimonials, quotations, business attribution, AI workflows, time savings, production deployment status, or permissions.
- Separate confirmed facts, estimates, dated snapshots, and questions for Bri.
- Preserve distinctions among generated, stored, reviewed, approved, and published content; eligible employees and active users; prototype, merged code, and deployed code.
- Different numbers are acceptable when their definitions or dates differ. Do not force 28 total locales and 25 approved/published locales into one arbitrary number.
- Check arithmetic and scope before copying counts. The status subtotals in `facts.md` do not sum to its stated localized-variant total. Its legacy-locale count also does not match the listed locales. Resolve or omit the problematic breakdown; do not fabricate a correction.
- Historical test counts are snapshots. Do not say tests pass today without running the applicable checks.
- Local employer material is not automatically cleared for public release. Do not publish private source, internal security details, credentials, or unapproved artifacts. Use existing public-safe assets and explanations; ask only when a necessary new disclosure requires Bri's decision.
- Keep unresolved questions in working documents, never as visible TODOs or fake content in the shipped portfolio. Use truthful, narrower public wording while waiting for answers.

## 4. Implementation priorities

### A. Homepage and navigation

- Preserve the exact title and tagline above. Make Bri, her specialization, and her shipped work immediately understandable without typing.
- Keep Global Content Studio first. Default project order for this target: **Studio, Aimee, Hub, Brix**. Studio shows product ownership and AI-assisted shipping; Aimee shows collaboration and systems craft; Hub shows broader product judgment; Brix is supporting inspectable work. Do not promote Brix above employer products solely because its source is public.
- Keep Brix as an optional, useful part of the experience. A complete portfolio must remain available through direct links.
- Make primary project-card actions open full-width case-study pages with meaningful URLs. Chat-linked previews may remain, with a clearly labeled **Read full case study** action. Preserve useful chat state where practical and normal modified-click/new-tab behavior.
- Maintain straightforward résumé and contact access, including mobile.
- Keep the existing coherent visual foundation. Improve hierarchy, reading width, spacing, imagery, and content density rather than replacing the site with an unrelated aesthetic.

### B. Add one concrete AI-assisted design-to-production story

Use a real feature from Studio or Aimee. This is the highest-value new content, provided the evidence is available. Integrate it into the relevant case study and optionally excerpt it on the homepage or About page.

Show a traceable sequence:

1. User problem, constraint, and intended outcome.
2. Bri's framing and the alternatives considered.
3. How she used AI for exploration, prototyping, or implementation, naming tools only where confirmed.
4. What the AI produced and what Bri rejected, corrected, or redirected.
5. The interaction and implementation that shipped, including engineering collaboration or review.
6. How she checked usability, accessibility, correctness, and failure behavior.
7. Result and remaining limitations.

Pair actual interface artifacts with concise annotations. Include a sanitized code excerpt or development artifact only when available and cleared for publication. Do not create a retrospective prompt transcript and present it as historical evidence. Do not equate AI use with automatically faster or better results without evidence.

### C. Global Content Studio: flagship

Keep production evidence, architecture, failures, and technical specificity. Rebalance the narrative so the reader also understands the author's and localizer's experience.

- Shorten the current oversized headline. A possible direction: **Designing and shipping an AI studio for global financial content.** Put verified scale, timing, and ownership in the supporting summary.
- Explain the original authoring/review workflow and the problem Bri selected to solve.
- Show key design decisions about review prioritization, provenance, uncertainty, status, human control, and error recovery, using actual evidence.
- Develop the approved-content-overwrite incident into a design story: what users lost, how the workflow changed, how control became explicit, and what validates the fix. Connect the UI to the engineering behavior.
- Show rejected options and constraints. Keeping secrets server-side is appropriate engineering practice; it should not be the leading example of difficult product judgment.
- State engineering integration/review contributions alongside Bri's primary ownership. Keep strong individual ownership without misleadingly erasing collaborators.
- Preserve the distinction between four weeks to launch QA and approximately five weeks to the first ten-locale run. Do not imply the full 28-locale snapshot existed at the earlier milestone without evidence.
- Distinguish total library contents from outputs attributable to the specific Studio run. Label the date of production snapshots.
- Verify the dollar-cost source and scope. `facts.md` still marks the claimed $21,287 as needing confirmation. The roughly $2.44M manual alternative is an estimate requiring assumptions, not measured savings. Remove or qualify unsupported claims rather than repackaging them as proof.
- Explain model self-scoring, a separate model verification pass, deterministic checks, and human review accurately. A separate model call is not a human native-reader review or a guarantee of correctness. Avoid unsupported confidence thresholds and absolute quality guarantees.
- Retain architecture as an optional deeper layer, after the reader understands the workflow and decisions.

### D. Aimee: collaboration, AI interaction, and systems craft

- Preserve the distinction between Bri's design/prototypes/production contributions and the SDK/backend engineering team's work. Confirm deployed status where necessary; commits alone are not deployment evidence.
- Show what remained consistent across Hub, embedded widget, and Teams, and what adapted to each context. Do not claim every interaction should be identical.
- Add evidence of trust and failure-state design where it exists: insufficient context, correcting assumptions, uncertainty, interruption/retry, and human-coach availability/escalation.
- Present AI transparency and human escalation as design decisions with supporting reasoning or research. Do not imply trust improved merely because a label or card color changed.
- Replace deliverables masquerading as outcomes. Three surfaces and one component library demonstrate scope; label them accordingly. Add validated user or operational outcomes if available. Otherwise state the measurement limitation and show actual validation findings.
- Qualify the homepage's 1M+ employee language. Platform reach/eligibility does not establish Aimee usage.
- Keep the public component library and show meaningful interaction examples. Avoid turning the case study into a component inventory.
- Show one real example of collaboration improving the result. Reduce repeated “implemented 1:1” language and claims that dismiss design documentation or engineering interpretation.

### E. Hub: evidence of senior product judgment

- Define +200% engagement: event/metric, population, baseline, comparison window, and relevant rollout effects.
- Define $12M: revenue type, period, relationship to the redesign, and source. Do not imply causal attribution without evidence.
- Do not equate engagement with financial behavior change. Use measured actions if available or narrow the claim.
- Distinguish the case study's 2024 redesign from later Aimee work and screenshots. Tie results to the correct release.
- Add a before/after flow, an actual research finding that changed direction, alternatives, constraints, and a post-launch iteration when source material supports them.
- If outcome definitions remain unavailable, publish a shorter, truthful account of verified scope and decisions. Do not automatically delete the project or invent research to fill the template.

### F. Brix: answer usefulness and honesty

Keep the on-device retrieval approach unless another change is separately justified. A real LLM or backend is not required to prove AI-native capability. Explain clearly that Brix searches a curated portfolio knowledge base.

The October 13 live review reproduced these failures:

| Query | Observed answer problem | Required behavior |
| --- | --- | --- |
| What research changed the design? | Generic claim that Bri introduced research | Give a supported concrete example and link, or acknowledge that the detailed example is not documented |
| Tell me about a disagreement with a product manager. | Commit counts and general engineering collaboration | Give a verified story if supplied; otherwise state the limitation without pretending the adjacent answer satisfies the question |
| How was the 200% engagement increase measured? | Repeated headline metrics | Give the definition/source if confirmed; otherwise explicitly say the public portfolio does not document it |
| How many people actually use Aimee? | SDK ownership and implementation details | Distinguish usage from eligible platform reach; acknowledge missing active-user data |
| Show me her strongest case study. | A general pitch rather than opening the work | Recommend Studio with a direct case-study link and a brief supported reason |
| Is she available for fully remote work? | Remote plus hybrid availability | Match Bri's confirmed remote preference and the contact page |

- Remove unnecessary simulated thinking delay. Preserve useful stop, keyboard, and accessible announcement behavior.
- Test answer relevance, factual support, uncertainty, and links, not just whether a query matches a knowledge-base entry.
- Add regression coverage for the queries above, paraphrases, unknown questions, and ambiguous queries. Evaluate complete answers; do not inflate success counts by counting irrelevant responses as answered.
- Reconcile current test/check summaries. Historical 38/42 and later 50/44 counts may remain when dated and explained, but current summary cards should identify the latest actual results.
- If displaying source, ensure it is the actual implementation or label the excerpt accurately.

### G. Case-study editing and visuals

- Give each case study a compact initial summary: user/problem, Bri's role, collaborators, timeframe/status, and verified result or scope.
- Avoid repeating the same summary in hero, at-a-glance, role, solution, impact, and final takeaway sections.
- Use a readable story of evidence → decision → design → implementation → validation. Do not force every project into an identical process template.
- Reduce excessive vertical gaps and oversized paragraphs. Maintain legibility and breathing room.
- Supplement angled device mockups with straight-on interface details. Annotate what changed and why; captions should teach the reader what to notice.
- Preserve responsive behavior, focus styles, contrast, semantic structure, reduced-motion behavior, and no-JavaScript content.
- Label client organizations as Financial Finesse customers, with specific project relationships only where established. Do not imply direct employment or invent endorsements.

### H. Résumé, About, Code, Contact, and metadata

- Keep the AI-Native Senior Product Designer title and tagline consistent across visible pages, Brix, résumé, and metadata. Historical job titles should remain accurate.
- Résumé bullets should connect problem/scope, design judgment, AI-assisted execution, and verified result. Retain meaningful technical detail; replace exhaustive stack/commit lists with selective evidence.
- Keep engineering and AI skills prominent alongside product design. Do not claim unverified proficiency or alter historical titles to match an aspiration.
- Regenerate the PDF from maintained source. The live PDF was visually readable, but one `pypdf` extraction put experience bullets after Education, separated from their job headings. Fix reading order and check visually and with two extraction approaches where available. Do not claim guaranteed ATS compatibility.
- On About, introduce professional relevance before lengthy hobby content. Keep personality and shorten repetition.
- On Code, prioritize a few inspectable examples and clear explanations. Employer-owned code can remain private. Do not make repositories public or publish excerpts without applicable authorization.
- Contact/Brix should describe remote opportunities consistently. Bri's stated target is remote; do not keep advertising hybrid as a preference unless she confirms it. Do not claim worldwide work eligibility or unrestricted geography.
- Keep compensation and company-name targeting in private planning documents, not public portfolio copy.
- Update page titles, descriptions, share metadata, and project summaries to match the final content.

## 5. Missing information to request from Bri

First inspect existing sources so you do not ask questions already answered. Bundle the remaining questions and continue independent implementation. Prioritize the first three:

1. **One AI-assisted shipping example:** Which real feature best shows your process? What tools did you use, what did AI produce, what did you correct, what shipped, and which artifacts can be shown publicly?
2. **Hub outcomes:** What exactly is engagement, what are the before/after period and population, and what does $12M measure? What source supports these figures and your contribution?
3. **Research and collaboration:** One real finding that changed a design, and one disagreement or constraint resolved with product/engineering. What changed and what evidence can be shown?
4. **Studio scope and cost:** Confirmation of the expense figure/window, manual-cost assumptions, milestone dates, and attribution of total library counts versus specific runs.
5. **Aimee validation:** Actual usage or validation findings, deployment status by surface, and public-safe failure-state examples.
6. **Leadership and availability:** What mentoring or standards work changed team behavior? Is remote mandatory or preferred? Does $200k mean base or total compensation? The latter informs targeting only.

Do not ask Bri to write complete case studies. Request concise facts or existing artifacts, then do the editorial work. Qualitative evidence can be useful; do not discard an honest leadership story merely because it lacks a number.

## 6. Validation and completion criteria

Use the existing browser/engine audit tooling where available, adapting it to the actual implementation. Validate changed functionality, not arbitrary test-count targets.

- Serve the site over HTTP. Inspect actual rendered pages, including scrolling to trigger lazy images and reveal animations before calling assets broken.
- Check homepage, Work, all case studies, component library, Code, About, Contact, résumé page, and PDF links.
- Inspect desktop and mobile, including 320px, 390px, 768px, and 1440px widths; both themes; keyboard navigation; reduced motion; and no-JavaScript fallbacks where applicable.
- Verify full-page case-study navigation, browser Back, anchors, modified clicks, preview opening/closing if retained, focus restoration, and résumé download behavior.
- Run meaningful Brix regression checks and manually assess the answers against the evidence ledger.
- Visually inspect the PDF and validate text order, selectable text, contact separators, URLs, and association of bullets with roles. Use a second parser where possible and report limits.
- Check links, missing assets, console/runtime errors, and deployment allowlist coverage for any added production paths.
- Reconcile claims across pages, PDF, cards, metadata, and Brix. Preserve dates and definitions; do not present old snapshots as current measurements.
- Update relevant project documentation when implementation conventions or navigation behavior change.

Finish with: a working preview or reproducible preview command; a concise account of changes; meaningful check results; screenshots of major changed views when practical; and a short list of unresolved facts. Identify exactly which public claims were narrowed or omitted pending confirmation.

Done means all work supportable by available evidence is implemented and validated, with factual gaps made explicit in private working notes. It does not mean inventing missing evidence, guaranteeing a hiring outcome, or publishing unapproved changes.
