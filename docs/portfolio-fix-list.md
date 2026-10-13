# Portfolio fix list for imbrimay.com

Goal: pass FAANG-level AI-native Design Engineer loops. Items ordered by interview impact.

## 1. Ship inspectable React/TypeScript code (loop-killer, do first)

- Deploy the src/ React+Vite sandbox publicly, or extract the locked Aimee component contract into its own public repo with docs.
- Link the live repo from the Code page and the relevant case studies so a reviewer can click into real React/TS.
- Done when: a visitor can read actual React/TypeScript source from the site, not just vanilla JS.

## 2. Document real-model streaming and failure UX

- Brix currently streams from a simulated keyword engine. Either wire it to a real model, or clearly label what is simulated and add a documented section covering: streaming with stop control, interruption, mid-stream failure UX, and safe rendering on live model calls.
- Add the same failure-state documentation for Aimee AI Coach.
- Done when: each case study names specific streaming, interruption, and failure-state design decisions.

## 3. Add an eval design section

- The "what broke" sections are good debugging stories but loops ask about designed evals.
- Reframe the en-GB fit-check as an eval design: golden sets, quality gates, measured confidence thresholds.
- Add this as its own section in the GCS case study.
- Done when: a reviewer can see how you define and measure quality, not just how you fixed bugs.

## 4. Add agent-UI architecture content

- Design engineer loops whiteboard streaming, run-state, and conversation-state architecture for agent UIs.
- Add an architecture section (GCS case study or Code page) describing how you would structure streaming and conversation state for an agent interface.
- Done when: there is a written architecture answer for agent UIs a reviewer can point to.

## 5. Add prepared STAR stories

- Add a page or section mapping prepared STAR stories to common loop prompts: ownership, debugging, conflict, ambiguity, mentoring.
- Keep them short and specific, one story per prompt.
- Done when: five to eight stories exist and each names a concrete situation, action, and outcome.

## 6. Fix Brix number drift

- 42/42 vs 44/44 browser checks and 38 vs 50 screening questions appear on the same page.
- Pick one consistent number for each and update every occurrence.
- Done when: a grep finds no conflicting numbers.

## 7. Fix GCS timeline wording

- Heading says "five weeks", copy says "first commit to launch QA in four weeks". Pick one.
- Done when: both match.

## 8. Reconcile locale counts

- Work cards say 28 locales, resume page summary says 25 live markets.
- Reconcile to one true number and update both pages.
- Done when: both pages agree.

## Still pending from Bri

- Attach the exact submission resume PDF so the resume can be scored the same way.
