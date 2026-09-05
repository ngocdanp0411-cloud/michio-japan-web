---
title: "Promotional Hero And Skincare Banner"
description: "Place the Deal Nhật Xinh Yêu artwork in the homepage hero and Mỹ phẩm skincare category without distortion or regressions."
status: in-progress
priority: P1
effort: 2h
branch: main
tags: [feature, frontend]
blockedBy: []
blocks: []
created: 2026-09-05
---

# Promotional Hero And Skincare Banner

## Overview

Convert the supplied 1672×941 PNG to a web-ready asset, replace the homepage hero collage, and show the promotion only on `/danh-muc/my-pham-skincare`. Preserve hero copy, CTAs, other categories, and the intentional `images.unoptimized` deployment setting.

## Exact Scope

- Source: `/Users/phamngocdan/Downloads/ChatGPT Image 13_26_01 5 thg 9, 2026.png` (2.2 MB).
- Create: `public/images/promotions/deal-nhat-xinh-yeu.webp`.
- Modify: `src/app/page.tsx` and `src/app/danh-muc/[slug]/page.tsx`.
- Keep unchanged: `next.config.ts`, global CSS, existing plans/docs.

## Phases

| # | Phase | Status |
|---|---|---|
| 1 | [Place and validate promotional artwork](./phase-01-place-and-validate-promotional-artwork.md) | In progress |

## Success Criteria

- [x] Artwork appears in the first homepage section and only the skincare category banner.
- [x] Full composition remains readable and undistorted at 360, 390, 768, 1024, and 1280 px.
- [x] Meaningful Vietnamese alt, intrinsic dimensions, LCP preload, and accurate `sizes` are present.
- [x] Pre-compressed asset is ≤400 KB; lint, build, target routes, and a non-skincare control route pass.

## Unresolved Questions

None.
