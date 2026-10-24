#!/usr/bin/env node
// Print the one-page résumé (resume/one-page.html) to the PDF every download link serves,
// then copy it to the legacy alias and the one-page path so all three stay byte-identical.
// Usage: node print-resume.mjs <base-url>   (needs `npm install --no-save playwright`)
import { chromium } from 'playwright';
import { copyFileSync } from 'node:fs';
const [base = 'http://127.0.0.1:8899', out = 'resume/BriMay_Resume.pdf'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(base + '/resume/one-page.html', { waitUntil: 'networkidle' });
await p.emulateMedia({ media: 'print' });
await p.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
await b.close();
for (const alias of ['resume/BriMay_Resume_2026.pdf', 'resume/BriMay_Resume_OnePage.pdf']) copyFileSync(out, alias);
console.log('wrote', out, '+ aliases');
