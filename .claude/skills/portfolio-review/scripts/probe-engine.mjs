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
  if (r.entry && r.score >= 2) return { how: 'KB', detail: r.entry.keys[0] };
  const i = matchIntent(q);
  if (i !== 'fallback') return { how: 'nav', detail: i };
  if (r.entry && r.score >= 1) return { how: 'hedged', detail: r.entry.keys[0] };
  return { how: 'FALLBACK', detail: (r.scored || []).slice(0, 3).map(x => x.e.keys[0]).join(' | ') || '—' };
}

// ── the screening questions. Add new ones here as recruiters surprise us. ──
const QUESTIONS = [
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
  'Show me some of her code',
  'Does she write tests?',
  "What's her TypeScript experience?",
  'How does she think about performance?',
];

// Regressions that once shipped — greetings must not swallow real questions,
// and generic words must not hijack specific ones.
const REGRESSIONS = [
  { q: 'hi', expect: r => r.how === 'nav' && r.detail === 'greet', label: 'bare greeting greets' },
  { q: 'hey there', expect: r => r.how === 'nav' && r.detail === 'greet', label: 'casual greeting greets' },
  { q: 'How was this website built?', expect: r => r.detail !== 'greet', label: '"this" does not trigger greet' },
  { q: 'What do you think?', expect: r => r.detail !== 'greet', label: '"you" does not trigger greet' },
  { q: 'Show me her strongest case study', expect: r => !/education/.test(r.detail), label: '"study" does not hit education' },
  { q: 'What size teams has she worked on?', expect: r => !/aimee/.test(r.detail), label: '"teams" does not hit MS Teams' },
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

const confident = (buckets.KB || []).length;
const rate = confident / QUESTIONS.length;
const THRESHOLD = 0.9;
console.log(`\nconfident: ${confident}/${QUESTIONS.length} (${(rate * 100).toFixed(0)}%) — threshold ${THRESHOLD * 100}% | regressions failing: ${regFail}`);
process.exit(rate >= THRESHOLD && regFail === 0 ? 0 : 1);
