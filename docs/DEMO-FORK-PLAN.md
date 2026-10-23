# Global Content Studio — Personal Demo Fork Plan

> **Goal:** A public, interactive Global Content Studio demo on `thebrimay-wq`, embedded in
> imbrimay.com, with **zero connection** to Financial Finesse's Azure blob storage, worker,
> or API keys.
>
> **Status:** planned 2026-08-20. Nothing published yet.

---

## Why a rebuild, not a fork

**Do NOT use GitHub's "Fork" button, and do NOT copy `.git/`.**

The company repo's git history is a liability: it spans ~9 months of commits that may contain
`.env` files, the Azure connection string, the Anthropic key, client names, and internal QA
discussion. A fork carries all of it, and a fork of a private org repo also keeps a visible
upstream link.

The demo repo starts as a **fresh repo with one squashed initial commit** — current file
state only, no history.

---

## Architecture: what has to be severed

Three couplings tie the app to company infrastructure. All three are in code, not config,
so each needs an explicit cut.

| Coupling | Where | Cut |
|---|---|---|
| Azure blob storage | `worker/azureBlob.ts`, secret `AZURE_STORAGE_CONNECTION_STRING` | Worker's blob routes deleted entirely in the demo build |
| Shared content index | `src/lib/remoteStore.ts` → `loadAll()` fetches `${WORKER_BASE_URL}/api/entries` | Demo-mode adapter reads bundled static JSON |
| Team Anthropic key | `worker/index.ts`, secret `ANTHROPIC_API_KEY` | New personal worker, new key, hard caps (below) |

**The lever that makes this clean:** `src/lib/api.ts:381` already reads
`VITE_FF_WORKER_URL` as an override, and `remoteStore.loadAll()` already has a
localStorage fallback path for when the worker is unreachable. The app was built with a
decoupled mode half-present — we're finishing it, not fighting it.

`src/lib/seedDemo.ts` also already seeds 20 entries into localStorage from
`real-ff-content/sampleArticles.json`. That is the seed of the demo data path.

---

## Phase 1 — Scaffold the clean repo (local only)

1. `rsync` the working tree to `~/Documents/Bri May/Github Bri/gcs-demo/`, excluding
   `.git/`, `node_modules/`, `dist/`, `.env*`, `worker/`, and every content directory.
2. `git init` fresh. One commit.
3. **Secret scan before the first push** — `gitleaks detect` (or `trufflehog filesystem`)
   over the whole tree. Nothing gets pushed until this is clean.
4. Manual grep pass for: `AZURE_`, `DefaultEndpointsProtocol`, `sk-ant-`, `.workers.dev`,
   internal hostnames, and the FF worker subdomain.

## Phase 2 — Demo data (~580 pieces)

**Provenance decision (made 2026-08-20): synthetic bulk + a few already-public real articles.**

- **Bulk (~575):** generated locally with the app's own system prompt + content-type schemas
  (`src/lib/contentTypeSchemas.ts`), 20 per locale × 29 locales. Real structure, real
  taxonomy shape, invented content. Costs one scripted generation run.
- **Showcase (3–5):** hand-picked articles **already published publicly** by Financial
  Finesse, used for the localization diff (same piece across en-IE / ko-KR / cs-CZ).
  These make the demo credible. Worth a courtesy heads-up to your manager.

**Scrub every record** before it lands in the repo — these fields carry real people and clients:

```
author, lastEditedBy, reviewedBy, publishedBy, assignee, reviewNotes,
client, excludeClients, benefitsCodes, benefitsCodesIds, internalTags,
documentNotes, legacyId
```

Output: `demo-data/library.json` (index) + `demo-data/entries/*.json`, plus
`demo-data/locales.json`. Committed to the repo — no network, no storage account.

## Phase 3 — Demo mode

A build flag, `VITE_DEMO_MODE=1`, that changes three behaviors:

- **Reads** — `remoteStore.loadAll()` / `getById()` resolve from bundled JSON instead of
  the worker. (Add a `demoStore.ts` adapter behind the existing store interface so no
  call sites change.)
- **Writes** — every mutation goes to Dexie/localStorage only. Per-visitor sandbox.
  Nothing leaves the browser.
- **Reset** — a visible "Reset demo" control that clears local state and re-seeds. Every
  visitor gets a clean, working app regardless of what the previous one did.

Also: a small persistent "Demo — sample data" badge in the header, so nobody mistakes it
for the production system.

## Phase 4 — AI worker, with guardrails

You chose live AI on your own key. That's a public endpoint spending your money, so it
ships with limits from day one, not later:

- New Cloudflare Worker, **new personal Anthropic key** (never the FF key), on your own
  account.
- **Anthropic Console spend cap** set low (e.g. $20/mo) — the real backstop.
- `ALLOWED_ORIGINS` locked to `imbrimay.com` + the demo's own domain only.
- **Rate limit** per IP (Cloudflare Rate Limiting rule, e.g. 10 req/min, 100/day).
- `max_tokens` capped server-side; long-running batch/bulk endpoints **not exposed**.
- Cheapest capable model for demo traffic.
- Kill switch: one env var that flips the demo to pre-recorded responses if it gets abused.

## Phase 5 — Deploy + embed

- Deploy to **Vercel with deployment protection OFF** (a public demo needs no password)
  or GitHub Pages. Either way, `X-Frame-Options` must permit framing from imbrimay.com.
- Swap the case-study launcher card for a **real inline `<iframe>`** — the current
  poster-and-launch pattern exists only because the company deploy sends
  `X-Frame-Options: DENY`. Once the demo is frameable, the case study gets a true
  embedded demo with no password chip.
- Keep "open full ↗" for a full-screen view.

---

## Sequencing

Phase 1 → 2 → 3 can all happen locally, with nothing public. **Publish only after the
secret scan and a scrub review.** Phase 4 and 5 are the only steps that expose anything.

## Open items for Bri

- [ ] Export the 3–5 showcase articles (needs Azure access — only you can do this)
- [ ] Confirm those articles are already publicly published
- [ ] Create the personal Anthropic key + set the spend cap
- [ ] Decide demo domain (`demo.imbrimay.com`? `gcs-demo.vercel.app`?)
