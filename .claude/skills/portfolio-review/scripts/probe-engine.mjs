#!/usr/bin/env node
/**
 * Probe the Brix retrieval engine with the questions a recruiter actually asks.
 *
 * Extracts the live engine (KB + matchIntent + retrieve + their helpers)
 * straight out of index.html so the probe can never drift from production,
 * then classifies each question the same way route() does.
 *
 * Exit code 0 when the confident-answer rate meets the threshold (default 90%),
 * 1 otherwise. Run from anywhere: node probe-engine.mjs [path-to-index.html]
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const indexPath = process.argv[2] || join(here, '../../../../index.html');
const src = readFileSync(indexPath, 'utf8');

// ── extract the engine between stable anchors ──
function block(start, end) {
  const i = src.indexOf(start);
  if (i === -1) throw new Error(`anchor not found: "${start}" — the engine in index.html was refactored; update the anchors in probe-engine.mjs`);
  const j = src.indexOf(end, i);
  if (j === -1) throw new Error(`end anchor not found: "${end}"`);
  return src.slice(i, j);
}
const engine = [
  block('      const KB = [', '      const CASE_STUDIES'),
  block('      function hasWord(', '      function elFromHtml('),
  block('      const STOP = new Set(', '      function followupsFor('),
].join('\n');

const ctx = {};
new Function(`${engine}\n; this.retrieve = retrieve; this.matchIntent = matchIntent;`).call(ctx);
const { retrieve, matchIntent } = ctx;

// Mirrors route()'s ordering: confident KB > nav intent > hedged KB > fallback.
function classify(q) {
  const r = retrieve(q);
  if (r.entry && r.score >= 2) return { how: 'KB', detail: r.entry.keys[0], text: r.entry.text, href: r.entry.href || null };
  const i = matchIntent(q);
  if (i !== 'fallback') return { how: 'nav', detail: i, text: '', href: null };
  if (r.entry && r.score >= 1) return { how: 'hedged', detail: r.entry.keys[0], text: r.entry.text, href: r.entry.href || null };
  return { how: 'FALLBACK', detail: (r.scored || []).slice(0, 3).map(x => x.e.keys[0]).join(' | ') || '—', text: '', href: null };
}

// ── the screening questions. Add new ones here as recruiters surprise us. ──
const QUESTIONS = [
  'What is her email address?',
  'How does she give feedback?',
  'Does she do motion design?',
  'Does she write UX copy?',
  'B2B or B2C?',
  'Has she won any awards?',
  'Does she have kids?',
  'What are her pronouns?',
  'Do you have references?',
  'What is the confidence score?',
  'What is Atlas?',
  'Who else worked on GCS?',
  'What broke on Global Content Studio?',
  'How did she fix it?',
  'What tradeoffs did she make?',
  "What's the architecture of the Studio?",
  'Why no framework on this site?',
  'What would she do differently?',
  'Is she a design engineer?',
  'Can I see her GitHub?',
  'Show me some of her code',
  'What is her title?',
  'What does she build with?',
  'Does she work with APIs?',
  'Does she actually code?',
  'Has she managed or mentored designers?',
  'What is her design process?',
  'Does she have experience with accessibility?',
  'Has she worked at a big tech company?',
  'Is she open to relocating?',
  'What are her salary expectations?',
  'Does she have startup experience?',
  'How does she collaborate with engineers?',
  'Can she work on 0 to 1 products?',
  "What's an example of a design system she built?",
  'How does she handle ambiguity?',
  'Tell me about a failure',
  'What are her weaknesses?',
  'Does she do user research?',
  'Has she run usability testing?',
  "What's her experience with mobile design?",
  'Does she know Swift or iOS?',
  'How does she measure success?',
  'Walk me through a project end to end',
  'Why is she leaving her current job?',
  'Is she a senior or staff level designer?',
  'What size teams has she worked on?',
  'Does she have B2B or consumer experience?',
  'How does she use AI in her workflow?',
  'What would her manager say about her?',
  'Does she have a portfolio presentation?',
  'How quickly can she start?',
  'Is she authorized to work in the US?',
  "What's her visual design ability like?",
  'Show me her strongest case study',
  'How was this website built?',
  'Did she build this chatbot?',
  'What model are you running on?',
  'Is this a real LLM?',

  'Does she write tests?',
  "What's her TypeScript experience?",
  'How does she think about performance?',
];

// Regressions that once shipped — greetings must not swallow real questions,
// and generic words must not hijack specific ones.
const REGRESSIONS = [
  // 2026-09-10 review: the answer must name the thing asked for, not a neighbour
  { q: 'What is her email address?', expect: r => r.how === 'KB' && r.detail === 'email', label: 'email question gets the email entry (not the phone-first contact blurb)' },
  { q: "What's her LinkedIn?", expect: r => r.how === 'KB' && r.detail === 'linkedin', label: 'linkedin question gets the URL' },
  { q: 'Why should we hire her?', expect: r => r.detail === 'why hire', label: '"hire" no longer hijacks why-hire into contact' },
  { q: 'Has she used the Anthropic API?', expect: r => r.detail === 'ai ', label: '"used" is not "user research"' },
  { q: 'Has she worked in fintech?', expect: r => r.detail === 'industry', label: '"tech" does not match inside "fintech"' },
  { q: 'How many people use Aimee?', expect: r => r.detail === 'use aimee', label: '"ai" does not match inside "Aimee"; usage question gets the usage entry' },
  { q: 'What languages does she speak?', expect: r => r.detail === 'speak', label: 'spoken languages are not TypeScript' },
  { q: 'Does she know Rust?', expect: r => r.detail === 'rust', label: 'a language she does not use gets an honest no' },
  { q: 'Can I see her portfolio?', expect: r => r.how === 'nav' && r.detail === 'casestudies', label: 'portfolio goes to case studies, not design process' },
  { q: 'thanks', expect: r => r.how === 'nav' && r.detail === 'thanks', label: 'thanks gets a closer, not a joke' },
  { q: 'What broke?', expect: r => r.how !== 'FALLBACK', label: '"broke" never falls back to a joke' },
  { q: 'Any tradeoffs?', expect: r => r.how !== 'FALLBACK', label: '"tradeoff" never falls back' },
  { q: 'Tell me about the architecture', expect: r => r.how !== 'FALLBACK', label: '"architecture" never falls back' },
  { q: 'Is she a design engineer?', expect: r => /design engineer/.test(r.detail), label: 'design-engineer question hits the code answer' },
  { q: 'hi', expect: r => r.how === 'nav' && r.detail === 'greet', label: 'bare greeting greets' },
  { q: 'hey there', expect: r => r.how === 'nav' && r.detail === 'greet', label: 'casual greeting greets' },
  { q: 'How was this website built?', expect: r => r.detail !== 'greet', label: '"this" does not trigger greet' },
  { q: 'What do you think?', expect: r => r.detail !== 'greet', label: '"you" does not trigger greet' },
  { q: 'Show me her strongest case study', expect: r => !/education/.test(r.detail), label: '"study" does not hit education' },
  { q: 'What size teams has she worked on?', expect: r => !/aimee/.test(r.detail), label: '"teams" does not hit MS Teams' },
  // 2026-10-23 review: the homepage starters must land on the answer they promise
  { q: 'Show me the code', expect: r => r.detail === 'show me the code', label: 'the "Show me the code" starter gets the code + repo answer, not the stack list' },
  { q: 'What broke, and how did she fix it?', expect: r => r.detail === 'what broke', label: 'the "what broke" starter opens with what broke' },
  { q: 'Tell me about the B2C app', expect: r => r.detail === 'b2c', label: 'the B2C App has its own answer' },
  // 2026-10-29: speed and the CEO partnership have their own answers
  { q: 'How fast does she work?', expect: r => r.detail === 'how fast does she work', label: 'the "How fast" starter gets the speed answer, not build time' },
  { q: 'Has she worked with a CEO?', expect: r => r.detail === 'ceo', label: 'CEO question gets the CEO answer' },
  { q: 'Can she work in a fast-paced startup environment?', expect: r => r.detail === 'ceo' || r.detail === 'how fast does she work', label: 'fast-paced startup question lands on speed or the CEO answer' },
];

// 2026-10-13 live review: these six streamed a confident answer to the wrong question.
// The check is on the ANSWER, not just the routed entry: it must say the supported
// thing, or say plainly that the portfolio does not document it, and link where useful.
const says = (...needles) => r => needles.every(n => (r.text || '').toLowerCase().includes(n.toLowerCase()));
const ANSWERS = [
  { q: 'What research changed the design?', expect: r => says('not yet document', '75')(r) && r.href, label: 'research: names the documented fit-check finding and admits no user-research example is published' },
  { q: 'Which research finding changed a design decision?', expect: says('not yet document', '13'), label: 'research paraphrase' },
  { q: 'Tell me about a disagreement with a product manager.', expect: says("doesn't document a specific disagreement", 'approved'), label: 'disagreement: states the limitation, offers the written incident' },
  { q: 'Has she ever pushed back on a PM?', expect: says("doesn't document a specific disagreement"), label: 'disagreement paraphrase (pushback)' },
  { q: 'How was the 200% engagement increase measured?', expect: says('does not document how', 'internal reporting'), label: 'engagement: says the definition is not published' },
  { q: 'What does the $12M figure actually measure?', expect: says('what the $12m covers'), label: '$12M: same honesty' },
  { q: 'How many people actually use Aimee?', expect: says('active-user numbers', 'eligible'), label: 'Aimee usage: usage vs eligibility, missing data acknowledged' },
  { q: 'Is Aimee in production?', expect: says('which surfaces are live'), label: 'Aimee deployment: not asserted' },
  { q: 'Show me her strongest case study.', expect: r => says('Global Content Studio')(r) && r.href === '/work/global-content-studio/', label: 'strongest: recommends the Studio with a direct link' },
  { q: "What's her best project?", expect: r => r.href === '/work/global-content-studio/', label: 'strongest paraphrase (best project)' },
  { q: 'Where should I start?', expect: r => r.href === '/work/global-content-studio/', label: 'strongest paraphrase (where to start)' },
  { q: 'Is she available for fully remote work?', expect: r => says('remote role')(r) && !/hybrid/i.test(r.text), label: 'remote: matches the confirmed preference, no hybrid' },
  { q: 'Would she do hybrid in SF?', expect: r => says('remote role')(r) && !/open to.*hybrid/i.test(r.text), label: 'remote paraphrase (hybrid)' },
  { q: 'How did she use AI to build the Studio?', expect: r => says('Claude Code', 'verify pass')(r) && r.href, label: 'AI-assisted build: confirmed tools, what the AI got wrong, link' },
  { q: 'What did the AI get wrong?', expect: says('got wrong'), label: 'AI mistakes paraphrase' },
  { q: 'What is the capital of France?', expect: r => r.how === 'FALLBACK', label: 'unknown, off-topic question falls back instead of pretending' },
  { q: 'How much revenue did Brix make?', expect: r => !/\$12m/i.test(r.text), label: 'ambiguous revenue question never asserts $12M without its caveat' },
  { q: 'Does she have experience with accessibility?', expect: r => r.detail === 'accessibility', label: 'accessibility question gets the accessibility entry, not years-of-experience' },
  { q: 'How quickly can she start?', expect: r => r.detail === 'start date', label: 'start-date question gets availability, not build time' },
  { q: 'How fast can she prototype?', expect: says('24 hours', 'two days'), label: 'speed: cites the dated prototypes' },
  { q: 'How does she work with executives?', expect: says('since she joined in 2016', 'just wow'), label: 'CEO: tenure and the quote' },
  { q: "What's her TypeScript experience?", expect: r => r.detail === 'typescript', label: 'TypeScript question gets the stack entry' },
];

const buckets = {};
for (const q of QUESTIONS) {
  const r = classify(q);
  (buckets[r.how] ||= []).push(`${q}  →  ${r.detail}`);
}
for (const k of ['KB', 'nav', 'hedged', 'FALLBACK']) {
  const list = buckets[k] || [];
  console.log(`\n### ${k}  (${list.length}/${QUESTIONS.length})`);
  for (const l of list) console.log('  ' + l);
}

console.log('\n### regressions');
let regFail = 0;
for (const t of REGRESSIONS) {
  const r = classify(t.q);
  const ok = t.expect(r);
  if (!ok) regFail++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${t.label}  (${JSON.stringify(t.q)} → ${r.how}:${r.detail})`);
}

console.log('\n### answer checks (2026-10-13 live review + paraphrases)');
let ansFail = 0;
for (const t of ANSWERS) {
  const r = classify(t.q);
  const ok = !!t.expect(r);
  if (!ok) ansFail++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${t.label}  (${JSON.stringify(t.q)} → ${r.how}:${r.detail})`);
}
regFail += ansFail;

const confident = (buckets.KB || []).length;
const rate = confident / QUESTIONS.length;
const THRESHOLD = 0.9;
console.log(`\nconfident: ${confident}/${QUESTIONS.length} (${(rate * 100).toFixed(0)}%) — threshold ${THRESHOLD * 100}% | regressions failing: ${regFail}`);
process.exit(rate >= THRESHOLD && regFail === 0 ? 0 : 1);
