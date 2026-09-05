---
phase: 1
title: "Place and validate promotional artwork"
status: in-progress
priority: P1
effort: 2h
dependencies: []
---

# Phase 1: Place and Validate Promotional Artwork

## Context Links

- Homepage hero: `src/app/page.tsx:16-20,40-66`
- Category hero: `src/app/danh-muc/[slug]/page.tsx:42-77`
- Skincare slug: `data/categories.json:3-8`
- Image policy: `next.config.ts:3-12`

## Requirements

- Replace homepage product collage; keep headline, CTA order, and hero grid.
- For `slug === "my-pham-skincare"`, replace preview/logo media; preserve all other categories.
- Alt: `Deal Nhật Xinh Yêu – chăm da và làm đẹp nội địa Nhật, ưu đãi nổi bật`.
- Preserve native 1672×941 ratio. Mobile-first `object-contain`; no stretch or destructive crop.
- Pre-compress to WebP ≤400 KB because Next image optimization is globally disabled.

## Architecture

`source PNG → metadata-stripped public WebP → next/image → homepage + skincare-only branch`

Use `width={1672}`, `height={941}`, `h-auto w-full object-contain`, route-accurate `sizes`, and Next 16 `preload`. Do not use `fill` without a ratio box or `object-cover`: promotional text/products reach the canvas edges.

## Related Code Files

- Create: `public/images/promotions/deal-nhat-xinh-yeu.webp`
- Modify: `src/app/page.tsx`
- Modify: `src/app/danh-muc/[slug]/page.tsx`
- Keep: `next.config.ts`

## Implementation Steps

1. Convert via `cwebp` at quality 82 with metadata stripped; verify 1672×941, text clarity, and ≤400 KB.
2. Replace homepage lines 52–64 collage and remove now-unused `heroImages`.
3. Add exact-slug conditional to category media; omit redundant corner logo only for promo branch.
4. Run `npm run lint` and `npm run build`.
5. Inspect `/` and `/danh-muc/my-pham-skincare` at 360, 390, 768, 1024, 1280 px; verify no crop, distortion, overflow, CLS, or warnings.
6. Inspect `/danh-muc/dau-goi-sua-tam` as regression control; verify sorting, pagination, header, and homepage CTAs.

## Todo

- [x] Generate optimized asset.
- [x] Update two target render paths.
- [x] Complete automated and viewport checks.

## Risk Assessment

- Embedded text becomes small on phones: contain full canvas; require a separate mobile source before any crop.
- Dynamic category route has broad blast radius: isolate exact slug and test a control category.

## Security Considerations

Static local asset only; strip metadata, add no remote host or user-controlled URL.

## Success Criteria

- [x] Both target routes render the full artwork naturally; non-skincare media remains unchanged.
- [x] All five widths and lint/build pass without new regressions.
