#!/usr/bin/env node
// Print the résumé page to PDF from its @media print stylesheet.
// Usage: node print-resume.mjs <base-url> <out.pdf>   (needs `npm install --no-save playwright`)
import { chromium } from 'playwright';
const [base = 'http://127.0.0.1:8899', out = 'resume/BriMay_Resume.pdf'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(base + '/resume/', { waitUntil: 'networkidle' });
await p.emulateMedia({ media: 'print' });
await p.pdf({ path: out, format: 'Letter', printBackground: false, preferCSSPageSize: true });
await b.close();
console.log('wrote', out);
