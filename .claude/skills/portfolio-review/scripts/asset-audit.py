#!/usr/bin/env python3
"""Asset audit: find unreferenced files and oversized rasters before they ship.

The deploy copies images/ then public/images/ over it, so both trees count.
"Referenced" means the basename appears (raw or URL-encoded) in any html/css/
js/jsx/json/md/yml outside node_modules, dist, and .git. That is deliberately
conservative — a file mentioned only in CLAUDE.md is kept, because deleting is
a human decision; this script only reports.

Exit 0 always (it's a report, not a gate). Run: python3 asset-audit.py [repo]
"""
import os
import sys
import urllib.parse

repo = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '../../../..')
os.chdir(repo)

texts = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git', '_site')]
    for f in files:
        if f.endswith(('.html', '.css', '.js', '.jsx', '.json', '.md', '.yml')):
            try:
                texts.append(open(os.path.join(root, f), encoding='utf8', errors='ignore').read())
            except OSError:
                pass
blob = '\n'.join(texts)
blob_dec = urllib.parse.unquote(blob)

unused, heavy = [], []
for base in ('images', 'public/images'):
    if not os.path.isdir(base):
        continue
    for root, _, files in os.walk(base):
        for f in files:
            p = os.path.join(root, f)
            sz = os.path.getsize(p)
            if f == '.DS_Store' or (f not in blob and f not in blob_dec):
                unused.append((sz, p))
            if sz > 600_000 and f.lower().endswith(('.png', '.jpg', '.jpeg')):
                heavy.append((sz, p))

print(f"UNREFERENCED: {len(unused)} files, {sum(s for s, _ in unused) / 1048576:.1f} MB")
for s, p in sorted(unused, reverse=True)[:20]:
    print(f"  {s / 1048576:6.2f} MB  {p}")
print(f"\nHEAVY RASTERS (>600KB, candidates for resize/WebP): {len(heavy)}")
for s, p in sorted(heavy, reverse=True)[:20]:
    print(f"  {s / 1048576:6.2f} MB  {p}")

merged = {}
for base in ('images', 'public/images'):
    if not os.path.isdir(base):
        continue
    for root, _, files in os.walk(base):
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), base)
            merged[rel] = os.path.getsize(os.path.join(root, f))
print(f"\nDEPLOYED IMAGE WEIGHT (public wins on conflict): {sum(merged.values()) / 1048576:.1f} MB across {len(merged)} files")
