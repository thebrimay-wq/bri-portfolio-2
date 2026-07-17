# Brix — the portfolio agent proxy

A tiny Cloudflare Worker that lets the homepage agent (**Brix**) answer real
questions with an LLM. It holds the Anthropic API key **server-side** (never in
the static site) and answers from a knowledge base of Bri's work baked into
`brix.js`.

The site works without this — Brix falls back to scripted answers + the funny
lines. Deploy this to upgrade free-text questions to a real LLM.

## Deploy (about 5 minutes)

You'll need an [Anthropic API key](https://console.anthropic.com/) and a free
Cloudflare account.

```bash
cd worker

# 1. Deploy the Worker (first run will prompt you to log in to Cloudflare)
npx wrangler deploy

# 2. Add your Anthropic API key as a secret (paste it when prompted)
npx wrangler secret put ANTHROPIC_API_KEY
```

`wrangler deploy` prints a URL like `https://brix.<your-subdomain>.workers.dev`.

## Wire it to the site

Open `/index.html`, find:

```js
const BRIX_ENDPOINT = ''; // ← paste your Cloudflare Worker URL here to enable the real LLM
```

Paste the Worker URL, commit, and push. Done — typed questions now go to the LLM.

## Notes

- **Model / cost:** defaults to `claude-haiku-4-5-20251001` (fast + cheap;
  answers are capped at 400 tokens). Change `MODEL` in `brix.js` to a Sonnet id
  for richer answers.
- **What it knows:** everything in the `SYSTEM_PROMPT` in `brix.js` — Bri's case
  studies, work history, skills, education, and bio. Edit that string to update
  what Brix knows. Off-topic / unknown questions get one of the funny lines.
- **Abuse guard:** the Worker only accepts browser requests from the origins in
  `ALLOWED_ORIGINS` (edit if your domain changes). For extra protection you can
  add Cloudflare rate limiting or a Turnstile token — optional for a portfolio.
- **Local testing:** `http://localhost:8134` and `:8000` are already allowlisted.
