---
title: "Implement and verify storefront presentation"
status: completed
priority: P2
---

# Implement and verify storefront presentation

## Context

- [Plan and reference mapping](./plan.md)
- Work context: `/Users/phamngocdan/Documents/ChatGPT/michio japan -web mobie/michio-japan-web`; paths below relative to this root.
- Read `README.md`, `AGENTS.md`, `CLAUDE.md`, `memory.md`, `docs/michio-design-tokens.md`; bundled `node_modules/next/dist/docs/` guides before implementation.

## Overview

Apply one shared visual system to seven existing page types using eight screenshot references. Preserve data derivation and behavior; screenshot 08 contributes styling only.

## Requirements

- White canvas; Michio red wordmark/primary CTA/active indicators, pale pink panels, neutral text, subtle borders, rounded 10–16px surfaces and pill search. Keep existing Vietnamese font; avoid importing decorative mockup typography that hurts legibility.
- Mobile 390px: 16px gutters; 12px card gaps; compact 56–64px brand row; search 44–48px; h1 22–26px; body 16px; labels 12–14px. No fake iOS status bar, device bezel or cart badges.
- Header has real brand asset/name, search access and Menu; all seven destinations and eight categories reachable. Duplicate responsive menus require unique IDs; hidden menu content inert; controls retain 44px hit targets.
- Home campaign remains short/image-led, followed by categories/products before long copy. Use 4×2 category tiles (all eight), 2-column product grid at 390px; adapt mockup density rather than shrinking text to force 3 columns.
- No new state, APIs, data fields, product sorting or invented claims. Present existing content; do not split descriptions into fabricated ingredients/review tabs.

## Architecture and file ownership

| Work package | Owns presentation changes | Preserve |
|---|---|---|
| Shared shell | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/layout/{header,product-menu,top-bar,sticky-dock,footer}.tsx` | Header destinations, skip link, metadata, footer/contact links, product-route dock exclusion |
| Home and discovery | `src/app/page.tsx`, `src/components/home/muji-home-preview.tsx`, `src/components/product/{category-rail,product-card}.tsx`, `src/app/{cua-hang,tim-kiem}/page.tsx`, `src/app/danh-muc/[slug]/page.tsx` | Existing featured products, category order/selection, search predicate, canonical pagination, sorting |
| Product detail | `src/app/san-pham/[slug]/page.tsx`, `src/components/product/{product-gallery,product-description}.tsx` | Gallery/swipe/lightbox and complete description; price/reviews from existing fields; related selection; Product/Breadcrumb JSON-LD |
| Editorial/about | `src/app/tin-tuc/page.tsx`, `src/app/tin-tuc/chuyen-muc/[slug]/page.tsx`, `src/app/tin-tuc/[slug]/page.tsx`, `src/components/blog/blog-content.tsx`, `src/app/gioi-thieu/page.tsx` | Posts/order/categories, body parser, internal links/sources/disclosure, article/FAQ schemas and metadata |

Prefer existing modules. If extracting presentation from >200-line files, preserve exported behavior, use descriptive domain names and no plan references. No source file deletion planned. Avoid wholesale formatter rewrites of logic blocks.

## Implementation Steps

1. Record git diff/baseline route outputs and representative product/article slugs. Preserve any concurrent changes; work on preview branch. Establish seven-header-destination mapping explicitly.
2. Shared shell first: consolidate semantic tokens; recreate compact red wordmark, search, complete Menu and footer/contact chrome. Keep fixed elements coordinated with page padding and safe-area; do not stack a mockup bottom tab bar over existing contact dock.
3. Rework current home component in place: short promo hero with existing asset, factual existing service/contact strip, eight categories, selected products, contact panel and article previews. No newsletter submit UI or carousel dots unless existing behavior supports them.
4. Make shop category directory visually match 02 while retaining the current paginated products below. Apply its row/card style to category selection without adding a new `/danh-muc` index route. Preserve category sort form and no price filter.
5. Product cards and search results: use actual product images/name/price; search displays current computed result count and empty/query states. Cart icons become clearly labelled existing Zalo contact links or are omitted. GET `q` unchanged.
6. Product detail: gallery first, thumbnails, title/price/summary, existing contact CTA, full description, related items. Reuse current gallery event handlers. Optional native disclosure styling only for content already present; no added ingredients/review data or quantity selector.
7. Blog listing/category: use real category links as scrollable/wrapping tabs, compact horizontal image/title/date rows. Preserve featured/rest ordering and all posts. Article: left-aligned h1/meta, complete image/body/content links, related items, existing CTA and JSON-LD. About: compact branded intro/values/story with existing assets and official contact.
8. Verify page by page at 390px against reference, then 320/768/1280. Fix actual clipping and sticky overlap before final checks. Run lint/build once on final source, delegate code review, then update `docs/michio-design-tokens.md` and `docs/project-changelog.md`. No production deployment without separate authorization.

## Todo

- [x] Shell/tokens and seven destinations complete.
- [x] Home, category/shop, search and shared cards complete.
- [x] Product gallery/detail styling complete; behavior retained.
- [x] Blog list/category/article/about styling complete.
- [x] Mobile visual checks + functional/SEO regression checks complete.
- [x] Lint/build and independent review complete; docs reflect actual delivery.

## Success Criteria

| Check | Required result |
|---|---|
| Navigation | Seven header destinations, eight categories, all policy/footer paths; no dead cart/account route; keyboard Menu/Escape/outside behavior intact |
| Search | `?q=` submission; existing match count/order; blank query and no-results states; no fabricated blog-result tabs |
| Catalog | Shop page 1/2/invalid-page redirect; category default/popular/ascending/descending; counts/URLs and no price filter unchanged |
| Detail | Main image/thumb/swipe/lightbox; actual price/description; both contact actions; full related set; no quantity/cart checkout |
| Editorial | All post/category routes, dates/authors/disclosures/content/source links; Article/Breadcrumb/FAQ JSON-LD unchanged |
| Responsive/a11y | 390px first load/scroll, 320px narrow layout, tablet/desktop; no x-overflow; 44px controls, 16px inputs, visible focus, reduced motion, fixed bars clear content |
| Integrity | No changes to `data/**`, `src/lib/**`, `src/app/api/**`, admin, sitemap/robots or schema/metadata generation; preserve Google verification/canonicals |
| Tool checks | `npm run lint`; `npm run build` (supported `--webpack` fallback if local Turbopack port issue recurs); browser checks remain necessary |

## Risks and mitigation

- Mockups depict unsupported commerce/search/account/signup: use their visual language on current links/content only; no new feature wiring.
- Mockup taxonomy/content differ from live dataset: names, counts, prices, sales/review claims and dates always come from existing source; no mockup values copied.
- Shared changes affect policy/admin surfaces: scope storefront typography where needed; smoke-check those routes without modifying logic.
- Source screens contain embedded phone frames/partial neighboring screens, not reusable component artwork: do not crop them into production UI. Reuse approved standalone images; report decorative asset gaps.
- Existing long detail page contains JSON-LD beside JSX: retain data/metadata blocks exactly and isolate visual edits. Do not refactor domain logic to meet style goals.

## Security and next step

No authentication/API/data-store change. Preserve escaped rendering, validated routes and external-link protections. Handoff this plan to controller for implementation; final delivery is reviewable preview plus validation evidence.
