---
phase: 1
title: "Mobile Nav And Blog Title Normalization"
status: in-progress
priority: P1
effort: "2h"
dependencies: []
---

# Phase 1: Mobile Nav And Blog Title Normalization

## Context Links

- Plan: `plans/260904-1510-mobile-nav-blog-title-fix/plan.md`
- Header nav source: `src/components/layout/header.tsx:8-15`, `src/components/layout/header.tsx:41-52`
- Product menu behavior: `src/components/layout/product-menu.tsx:7-25`, `src/components/layout/product-menu.tsx:94-122`
- Category source/filter: `src/lib/categories.ts:12-23`, `src/lib/products.ts:259-264`
- Blog parse path: `src/lib/blog.ts:120-140`
- Blog detail metadata/UI: `src/app/tin-tuc/[slug]/page.tsx:14-22`, `src/app/tin-tuc/[slug]/page.tsx:63-67`
- Blog index metadata: `src/app/tin-tuc/page.tsx:10-13`
- Root metadata template: `src/app/layout.tsx:24-28`
- Next metadata behavior: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md:241-345`
- Polluted source examples: `data/blog/13-cach-chon-sua-tam-goi-cho-be.md:2-15`, `data/blog/14-cach-chon-nuoc-rua-binh-sua.md:2-15`, `data/blog/14-cach-rua-binh-sua-cho-be.md:2-15`

## Overview

Deliver one small implementation pass. Keep desktop nav untouched at `md+`; fix mobile nav visibility in `Header`; normalize blog titles near `readPost` so current UI and metadata stop inheriting the brand suffix from markdown content.

## Key Insights

- Current mobile nav is a single horizontally scrollable row with `overflow-x-auto` and `shrink-0` items, so later links can sit offscreen at 360-390px (`src/components/layout/header.tsx:42-50`).
- `ProductMenu` already handles mobile-safe popup width with `window.innerWidth - 32`; it should remain the primary entry for the 8 storefront categories (`src/components/layout/product-menu.tsx:15-20`, `src/lib/categories.ts:12-23`, `src/lib/products.ts:259-264`).
- `readPost` derives `post.title` from markdown H1, not a sanitized title field, so a trailing brand suffix in content leaks into article H1 and metadata (`src/lib/blog.ts:124-129`, `src/app/tin-tuc/[slug]/page.tsx:19-22`, `src/app/tin-tuc/[slug]/page.tsx:65`).
- In the installed Next docs, a page `title` string is augmented by the parent `title.template`; hardcoding `| Michio Japan` in child titles risks double branding (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md:241-345`, `src/app/layout.tsx:24-28`).

## Requirements

- Functional:
- On mobile 360-390px, remove reliance on horizontal scrolling for top-priority nav access.
- Keep `ProductMenu` reachable and verify all 8 categories open/click through.
- Render clean blog titles in H1 even when source markdown ends with `| Michio Japan`.
- Preserve branded document titles through the root layout template rather than page-level hardcoding.
- Non-functional:
- No visual or behavior regression on desktop nav.
- Keep fix backward-compatible with existing blog markdown files; no content migration.
- Run lint/build/blog validation plus local/live browser checks.

## Architecture

Data flow:
- Nav: `primaryNav` (`src/components/layout/header.tsx:8-15`) + `ProductMenu` mount (`src/components/layout/header.tsx:47`) -> mobile-only priority-visible group / secondary fallback -> desktop current row unchanged.
- Categories: `data/categories.json` -> `CATEGORIES` (`src/lib/categories.ts:21-23`) -> `getCategoriesWithProducts` (`src/lib/products.ts:259-264`) -> `ProductMenu` items (`src/components/layout/product-menu.tsx:110-121`).
- Blog titles: markdown H1 (`data/blog/*.md`) -> `readPost` (`src/lib/blog.ts:120-140`) -> `post.title` -> detail-page H1 + `generateMetadata` (`src/app/tin-tuc/[slug]/page.tsx:19-22`, `src/app/tin-tuc/[slug]/page.tsx:65`) -> root title template (`src/app/layout.tsx:24-28`).

Recommended implementation shape:
1. Replace the mobile horizontal nav scroller with a non-scrolling priority layout in `Header`; keep desktop classes/markup behavior unchanged behind `md:` breakpoints.
2. Keep `ProductMenu` first and visible. Keep purchase/content/contact links in the always-visible mobile set; move lower-priority informational links into a wrap-safe or disclosure fallback.
3. Add one tiny trailing-suffix normalizer in `src/lib/blog.ts` that strips only exact terminal `| Michio Japan` after whitespace cleanup.
4. Change `src/app/tin-tuc/page.tsx` metadata title to the unbranded base string so the root layout appends the brand once.

Rejected option:
- Strip the suffix only in the detail-page H1. Rejected because the same `post.title` also feeds metadata through `generateMetadata`, so UI-only stripping leaves SEO/title inconsistency.

## Related Code Files

- Modify: `src/components/layout/header.tsx`
- Modify: `src/lib/blog.ts`
- Modify: `src/app/tin-tuc/page.tsx`
- Verify after change: `src/app/tin-tuc/[slug]/page.tsx`
- Read-only references: `src/components/layout/product-menu.tsx`, `src/app/layout.tsx`

## Implementation Steps

1. Split mobile nav rendering in `Header` into priority-visible and secondary links; remove the need to side-scroll for core actions at 375px.
2. Preserve the current desktop nav branch and CTA behavior from `md` upward.
3. Normalize trailing brand suffixes during blog title parsing in `src/lib/blog.ts`.
4. Remove the hardcoded `| Michio Japan` from `/tin-tuc` page metadata and rely on the root layout template.
5. Validate three known polluted posts and one clean control post on local + live mobile viewports.

## Todo List

- [x] Implement mobile non-scrolling nav layout.
- [x] Regression-check `ProductMenu` open/close and 8 category links.
- [x] Normalize branded blog title suffix at parse time.
- [x] Confirm one-brand document titles on `/tin-tuc` and `/tin-tuc/[slug]` locally.
- [x] Run lint/build/blog validate and local browser checks.
- [ ] Verify the deployed Vercel site after push.

## Success Criteria

- [x] At 375px, no high-priority nav control is hidden off-canvas.
- [x] `ProductMenu` still lists 8 storefront categories and remains tappable.
- [x] Known polluted posts render H1 without `| Michio Japan` and within 3 lines on mobile.
- [x] Desktop header layout does not regress.
- [ ] `npm run lint`, `npm run build`, `npm run blog:validate`, local browser check, and live browser check all pass.

## Risk Assessment

- High: a wrap/disclosure mobile nav can increase sticky-header height and regress earlier chrome-reduction work. Mitigation: keep one compact mobile nav container, verify at 360/390 before live deploy, leave desktop path untouched.
- Medium: naive title stripping can remove legitimate text. Mitigation: strip only exact trailing pattern `| Michio Japan`.
- Medium: parse-layer normalization changes both UI and metadata from one place. Mitigation: regression-check the three polluted posts plus one unaffected post.

## Security Considerations

- No auth or data-scope change.
- Preserve current external CTA targets and outbound-link safety behavior in header anchors.

## Backwards Compatibility

- Existing blog markdown stays valid; normalization happens at parse time, so no content migration or URL change.
- Desktop nav behavior from `md+` stays on the current path.

## Test Matrix

| Layer | Cases |
|---|---|
| Unit | Title normalizer strips exact suffix and leaves already-clean titles unchanged |
| Integration | `getBlogPost` returns clean `title` for polluted posts; `/tin-tuc` metadata no longer hardcodes the brand |
| E2E/manual | 360x800 and 390x844 on local + live: nav visible, `ProductMenu` works, polluted article H1 <=3 lines, desktop no regression |

## Rollback Plan

- If the mobile nav layout regresses discoverability, revert only `src/components/layout/header.tsx` and keep blog title normalization.
- If title normalization breaks expected SEO copy, revert the helper in `src/lib/blog.ts` and fall back to page-level stripping as a smaller patch.
- No data migration rollback needed because markdown sources stay unchanged.

## Next Steps

- Serialize any concurrent header work with `plans/260830-1817-michio-japan-mobile-storefront-optimization/phase-01-mobile-header-cta-and-media-cleanup.md`.
- After implementation, run local browser check first, then live site verification before merge/deploy.
