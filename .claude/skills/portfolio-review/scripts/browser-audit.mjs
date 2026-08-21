#!/usr/bin/env node
/**
 * Browser audit of the built site — the checks that caught real shipped bugs.
 *
 * Usage:  node browser-audit.mjs [baseUrl] [chromiumPath]
 *   baseUrl       default http://127.0.0.1:8899
 *   chromiumPath  default $CHROMIUM_PATH, then playwright's own resolution
 *
 * Requires playwright (npm install --no-save playwright). Google Fonts and
 * video files are stubbed out: fonts because sandboxes often block the host
 * (a stalled font request skews every timing), video because test Chromium
 * builds lack H.264 — a video readyState of 0 here is NOT a site bug.
 *
 * Exits 0 only if every check passes.
 */
import { chromium, devices } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:8899';
const EXE = process.argv[3] || process.env.CHROMIUM_PATH || undefined;
const PAGES = ['/', '/work/', '/about/', '/resume/', '/contact/',
  '/work/global-content-studio/', '/work/hub/', '/work/brix/', '/aimee-ai/'];

const b = await chromium.launch(EXE ? { executablePath: EXE } : {});
let pass = 0, fail = 0;
const log = (n, ok, d = '') => { ok ? pass++ : fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); };
const mk = async o => {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, ...o });
  await p.route('**fonts.googleapis.com**', r => r.abort());
  await p.route('**fonts.gstatic.com**', r => r.abort());
  await p.route('**/*.{mp4,webm,mov}', r => r.abort());
  return p;
};

console.log('\n══ 1. NETWORK: no 404s, no broken images');
for (const path of PAGES) {
  const p = await mk();
  const bad = [];
  p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().replace(BASE, '')); });
  await p.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(900);
  const broken = await p.evaluate(() => [...document.querySelectorAll('img')]
    .filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')));
  log(path, bad.length === 0 && broken.length === 0, [...bad, ...broken].join(', ') || 'clean');
  await p.close();
}

console.log('\n══ 2. LAYOUT: no sideways scroll at 320 / 375 / 768');
for (const w of [320, 375, 768]) {
  const p = await mk({ viewport: { width: w, height: 800 } });
  const bad = [];
  for (const path of PAGES) {
    await p.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await p.waitForTimeout(250);
    const o = await p.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    if (o.s > o.c + 1) bad.push(`${path}(${o.s}px)`);
  }
  log(`${w}px sweep`, bad.length === 0, bad.join(', ') || 'all pages clean');
  await p.close();
}

console.log('\n══ 3. CONTRAST: text tokens ≥ 4.5:1 in both themes');
{
  const p = await mk();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const check = () => p.evaluate(() => {
    const lum = x => { const [r, g, bl] = x.match(/\d+/g).map(Number).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * bl; };
    const ratio = (a, bg) => { const L1 = lum(a), L2 = lum(bg); return (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05); };
    const cs = getComputedStyle(document.documentElement);
    const hex2rgb = h => { h = h.trim(); const n = parseInt(h.slice(1), 16); return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`; };
    const tok = n => cs.getPropertyValue(n).trim().startsWith('#') ? hex2rgb(cs.getPropertyValue(n)) : cs.getPropertyValue(n).trim();
    const bg = tok('--bg'), surface = tok('--surface');
    const out = {};
    for (const t of ['--ink', '--ink-2', '--ink-3']) {
      out[t] = Math.min(ratio(tok(t), bg), ratio(tok(t), surface)).toFixed(2);
    }
    return out;
  });
  const light = await check();
  for (const [t, r] of Object.entries(light)) log(`light ${t} worst-case`, +r >= 4.5, r + ':1');
  await p.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  const dark = await check();
  for (const [t, r] of Object.entries(dark)) log(`dark  ${t} worst-case`, +r >= 4.5, r + ':1');
  await p.close();
}

console.log('\n══ 4. HEAD HYGIENE: title, canonical, img dims, posters');
{
  const p = await mk();
  let noDim = 0; const noCanon = [];
  for (const path of PAGES) {
    await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(250);
    noDim += await p.evaluate(() => [...document.querySelectorAll('img')].filter(i => !i.getAttribute('width')).length);
    if (!await p.evaluate(() => !!document.querySelector('link[rel=canonical]'))) noCanon.push(path);
  }
  log('every rendered <img> declares width/height', noDim === 0, noDim + ' missing');
  log('canonical on every page', noCanon.length === 0, noCanon.join(',') || 'ok');
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  log('homepage title carries the positioning', (await p.title()).includes('AI-Native'), await p.title());
  for (const path of ['/work/hub/', '/work/global-content-studio/', '/aimee-ai/']) {
    await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const posters = await p.evaluate(() => [...document.querySelectorAll('video')].map(v => !!v.poster));
    log(`videos on ${path} have posters`, posters.length === 0 || posters.every(Boolean), posters.length + ' video(s)');
  }
  await p.close();
}

console.log('\n══ 5. NO-JS: content visible without scripts');
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASE + '/about/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(300);
  const vis = await p.evaluate(() => { const h = document.querySelector('h1'); return h ? +getComputedStyle(h).opacity : 0; });
  log('inner-page h1 visible with JS off', vis === 1, 'opacity ' + vis);
  const p2 = await ctx.newPage();
  await p2.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  log('homepage noscript renders', !!await p2.evaluate(() => document.querySelector('.noscript-page h1')));
  await ctx.close();
}

console.log('\n══ 6. A11Y: skip link, announcer, streaming volume');
{
  const p = await mk();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500);
  await p.keyboard.press('Tab');
  log('first tab = skip link', await p.evaluate(() => document.activeElement.className.includes('skip-link')));
  await p.keyboard.press('Enter');
  await p.waitForTimeout(300);
  log('skip link focuses composer', await p.evaluate(() => document.activeElement.id === 'composer-input'));
  const region = await p.evaluate(() => ({
    thread: document.getElementById('thread')?.getAttribute('aria-live'),
    ann: !!document.getElementById('sr-announcer'),
  }));
  log('thread silenced + announcer present', region.thread === 'off' && region.ann, JSON.stringify(region));
  await p.evaluate(() => {
    window.__m = 0;
    new MutationObserver(ms => window.__m += ms.length)
      .observe(document.getElementById('sr-announcer'), { childList: true, subtree: true, characterData: true });
  });
  await p.fill('textarea', 'tell me about the global content studio');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(8000);
  const m = await p.evaluate(() => window.__m);
  log('announcer ≤ 3 mutations per answer', m <= 3, m + ' mutations');
  await p.close();
  const p2 = await mk();
  await p2.goto(BASE + '/resume/', { waitUntil: 'domcontentloaded' });
  await p2.waitForTimeout(400);
  await p2.keyboard.press('Tab');
  log('inner page first tab = skip link', await p2.evaluate(() => document.activeElement.className.includes('skip-link')));
  await p2.close();
}

console.log('\n══ 7. BRIX FEATURES: chat, lens, code exhibit, deep links');
{
  const p = await mk();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(600);
  log('4 starter cards', await p.locator('.home-card').count() === 4);
  log('2 lens chips', await p.locator('.lens-chip').count() === 2);
  await p.goto(BASE + '/?q=' + encodeURIComponent('does she actually code?'), { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(8000);
  log('?q= deep link auto-asks', await p.locator('.bubble--user').count() === 1);
  log('code exhibit renders', await p.locator('.code-chat').count() === 1);
  log('copy-link action present', await p.locator('.act-btn[aria-label="Copy link to this answer"]').count() === 1);
  await p.goto(BASE + '/?q=show me her case studies', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(8000);
  log('4 case-study cards in chat', await p.locator('.cs-card').count() === 4);
  await p.close();
}

console.log('\n══ 8. CORE FLOWS: panel, dark mode, drawer, résumé download');
{
  const p = await mk();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500);
  await p.locator('.rail-nav a').first().click();
  await p.waitForTimeout(1300);
  log('side panel opens', await p.evaluate(() => document.querySelector('#panel').getBoundingClientRect().width > 200));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(800);
  log('Esc closes panel', await p.evaluate(() => document.querySelector('#panel').getBoundingClientRect().width < 80));
  await p.locator('#rail-theme').click();
  await p.waitForTimeout(300);
  log('dark toggle sets + persists', await p.evaluate(() => document.documentElement.dataset.theme === 'dark' && localStorage.theme === 'dark'));
  await p.close();
  const m = await b.newPage({ ...devices['iPhone 13'], hasTouch: true });
  await m.route('**fonts.g**', r => r.abort());
  await m.route('**/*.mp4', r => r.abort());
  await m.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await m.waitForTimeout(600);
  await m.locator('#rail-open').click();
  await m.waitForTimeout(600);
  log('mobile drawer opens', await m.evaluate(() => document.querySelector('#rail').getBoundingClientRect().left > -20));
  await m.close();
  const d = await b.newPage({ acceptDownloads: true });
  await d.route('**fonts.g**', r => r.abort());
  await d.goto(BASE + '/resume/', { waitUntil: 'domcontentloaded' });
  await d.waitForTimeout(500);
  const [dl] = await Promise.all([d.waitForEvent('download', { timeout: 10000 }), d.click('a.btn-outline[download]')]);
  log('résumé downloads as BriMay_Resume.pdf', dl.suggestedFilename() === 'BriMay_Resume.pdf', dl.suggestedFilename());
  await d.close();
}

console.log(`\n════ ${pass} passed, ${fail} failed ════`);
await b.close();
process.exit(fail ? 1 : 0);
