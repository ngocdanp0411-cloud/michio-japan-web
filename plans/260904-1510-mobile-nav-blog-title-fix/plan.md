---
title: "Mobile Nav And Blog Title Fix"
description: "Fix mobile primary-nav overflow and remove branded blog suffix from UI while keeping document-title branding in the root layout template."
status: in-progress
priority: P1
effort: 2h
branch: main
tags: [bugfix, frontend, blog]
blockedBy: []
blocks: []
created: 2026-09-04
---

# Mobile Nav And Blog Title Fix

## Overview

Fix 2 confirmed mobile regressions without changing desktop behavior: stop the primary nav from pushing key links offscreen at 360-390px, and remove trailing `| Michio Japan` from rendered blog titles while keeping document-title branding via `src/app/layout.tsx:24-28`.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | 375px viewport shows `ProductMenu` and high-value nav actions without horizontal hiding; desktop nav unchanged | P1 |
| 2 | Blog article H1/UI use a clean title while metadata still resolves to `{title} | Michio Japan` from the root layout template | P1 |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Mobile Nav And Blog Title Normalization](./phase-01-mobile-nav-and-blog-title-normalization.md) | In progress |

## Dependencies

- Root title branding already lives in `src/app/layout.tsx:24-28`; page-level blog titles should stop hardcoding the brand.
- Mobile nav data comes from `primaryNav` in `src/components/layout/header.tsx:8-15`, `ProductMenu` at `src/components/layout/header.tsx:47`, and category filtering in `src/lib/categories.ts:12-23` -> `src/lib/products.ts:259-264`.
- Shared-file overlap only: `plans/260830-1817-michio-japan-mobile-storefront-optimization/phase-01-mobile-header-cta-and-media-cleanup.md:17-29` also targets `src/components/layout/header.tsx`, so header work should land in one serialized implementation pass.

## Success Criteria

- [x] At 375px, no high-priority nav control is hidden off-canvas; no horizontal nav scroll is needed for core links.
- [x] `ProductMenu` still opens and lists 8 storefront categories.
- [x] Article H1 no longer contains trailing `| Michio Japan` and stays within 3 lines on mobile for known polluted posts.
- [x] Browser title/metadata keep one Michio brand suffix through the root layout template on `/tin-tuc` and `/tin-tuc/[slug]` locally.
- [ ] Live Vercel check at 360px and 390px after push.

<!-- slug: mobile-nav-blog-title-fix -->
