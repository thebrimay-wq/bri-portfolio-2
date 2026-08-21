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

# Two reference pools: everything (conservative keep-list), and only what
# actually deploys (static html/css/js outside src/). A file present in the
# first but not the second ships as dead weight — e.g. an image only the
# non-deployed React mirror uses.
texts_all, texts_deployed = [], []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git', '_site')]
    for f in files:
        if f.endswith(('.html', '.css', '.js', '.jsx', '.json', '.md', '.yml')):
            try:
                t = open(os.path.join(root, f), encoding='utf8', errors='ignore').read()
            except OSError:
                continue
            texts_all.append(t)
            in_src = root == './src' or root.startswith('./src/')
            if not in_src and f.endswith(('.html', '.css', '.js')):
                texts_deployed.append(t)
blob = '\n'.join(texts_all)
blob_dec = urllib.parse.unquote(blob)
dblob = '\n'.join(texts_deployed)
dblob_dec = urllib.parse.unquote(dblob)

unused, heavy, dead_weight = [], [], []
for base in ('images', 'public/images'):
    if not os.path.isdir(base):
        continue
    for root, _, files in os.walk(base):
        for f in files:
            p = os.path.join(root, f)
            sz = os.path.getsize(p)
            referenced = f in blob or f in blob_dec
            if f == '.DS_Store' or not referenced:
                unused.append((sz, p))
            elif f not in dblob and f not in dblob_dec:
                dead_weight.append((sz, p))
            if sz > 600_000 and f.lower().endswith(('.png', '.jpg', '.jpeg')):
                heavy.append((sz, p))

print(f"UNREFERENCED: {len(unused)} files, {sum(s for s, _ in unused) / 1048576:.1f} MB")
for s, p in sorted(unused, reverse=True)[:20]:
    print(f"  {s / 1048576:6.2f} MB  {p}")
print(f"\nDEPLOYED BUT ONLY REFERENCED FROM NON-DEPLOYED CONTEXTS (src/, docs): {len(dead_weight)} files, {sum(s for s, _ in dead_weight) / 1048576:.1f} MB")
for s_, p in sorted(dead_weight, reverse=True)[:15]:
    print(f"  {s_ / 1048576:6.2f} MB  {p}")

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
