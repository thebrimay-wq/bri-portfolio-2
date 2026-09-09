#!/usr/bin/env bash
# Build the site the same way .github/workflows/deploy.yml does, into $1
# (default /tmp/portfolio-review/_site), so the audit tests what actually ships.
# public/images/ is merged OVER images/ — same precedence as the deploy.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../../../.." && pwd)"
OUT="${1:-/tmp/portfolio-review/_site}"
rm -rf "$OUT"
mkdir -p "$OUT/images"
cd "$REPO"
cp index.html CNAME "$OUT/"
cp favicon.png apple-touch-icon.png "$OUT/" 2>/dev/null || true
cp -r images/. "$OUT/images/"
cp -r public/images/. "$OUT/images/" 2>/dev/null || true
for d in styles scripts about resume work contact aimee-ai code; do
  [ -d "$d" ] && cp -r "$d" "$OUT/"
done
echo "built: $OUT ($(du -sh "$OUT" | cut -f1))"
