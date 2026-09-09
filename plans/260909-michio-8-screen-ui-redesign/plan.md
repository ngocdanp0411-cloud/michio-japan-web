---
title: "Michio 8 screen UI redesign"
description: "Restyle existing storefront to supplied eight-screen reference; preserve behavior, data, APIs, SEO and routes."
status: completed
priority: P2
effort: ""
branch: codex/muji-home-preview
tags: [frontend, refactor]
created: 2026-09-09
---

# Michio 8 screen UI redesign

## Overview

Visual authority: `/Users/phamngocdan/Downloads/michio_ui_codex_8_screens/00-overview.png` and `01-home.png`–`08-cart.png`, all inspected. New screenshot set supersedes the earlier MUJI-only visual direction for this task. Start at 390px; implement real responsive components, not a screenshot embedded as the page.

Current stack: Next.js 16.3.2, React 19.2.8, Tailwind 4, Be Vietnam Pro. Data/SEO helpers already exist. Change presentation only; reuse those helpers and existing images.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Match reference hierarchy, red/white/pale-pink palette, compact mobile header, rounded search/cards and image-led content | P2 |
| 2 | Preserve all existing product/blog content, classifications, prices, queries, pagination, gallery behavior, API contracts and SEO | P1 |
| 3 | Keep seven header destinations, eight actual categories, Zalo/Fanpage ordering; no cart or account feature | P1 |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Start](./phase-01-start.md) | Complete |

One implementation phase contains ordered work packages with exclusive ownership guidance and final checks. No dependency installation or infrastructure work needed.

## Reference-to-route mapping

| Reference | Existing target | Adaptation boundary |
|---|---|---|
| 01 Home | `/` | Campaign, compact benefit row, eight category entries, real featured products, article previews. Newsletter visual may frame existing contact CTA; no signup backend/form. |
| 02 Category | `/cua-hang`, `/danh-muc/[slug]` | Eight image-led category rows/tiles above existing shop list. Preserve all products, pagination and category sort. Do not replace current taxonomy with mockup labels. |
| 03 Product | `/san-pham/[slug]` | Large contained gallery, thumbnails, title/price/description, related items. Keep Zalo/Fanpage CTA instead of quantity/add-to-cart. |
| 04 Search | `/tim-kiem?q=…` | Rounded query field, compact product result rows/count. Existing search is products-only: no new article search or nonfunctional result tabs. |
| 05 Blog list | `/tin-tuc`, `/tin-tuc/chuyen-muc/[slug]` | Compact title, real category links styled as tabs, image/text/date rows; preserve every post and category destination. |
| 06 Article | `/tin-tuc/[slug]` | Left-aligned title/meta, uncropped cover, readable single-column body. Preserve complete content, sources, author, disclosure, FAQs and schemas. |
| 07 About | `/gioi-thieu` | Brand intro, soft visual backdrop, values/story/contact; retain existing text and official contact details. |
| 08 Cart | No new route | Visual reference only for rows, separators, red CTA and spacing. No cart, quantity, coupons, checkout, badges or account routes. |

## Non-negotiable boundaries

- Header destinations: Trang chủ `/`; Cửa hàng `/cua-hang`; Mua sỉ `LINKS.zalo`; Bài viết `/tin-tuc`; Về Michio `/gioi-thieu`; Chính sách `/chinh-sach-quyen-rieng-tu`; Liên hệ `LINKS.messenger`. All seven in mobile Menu, visible desktop navigation as space permits.
- Keep eight real categories in their existing order and all policy/footer destinations. Mobile bottom chrome may restyle current contact actions; never show dead cart/account affordances.
- Keep `data/**`, `src/lib/**`, `src/app/api/**`, admin, sitemap, robots and metadata/schema-generating code unchanged. Preserve GET field names, redirects, sorting, per-page limits and existing selection order.
- Reuse original product/brand/promotion/blog assets; `object-contain` for packs and text-bearing artwork. Mockup content is illustrative: do not copy fake prices, discount percentages, review/sales counts, dates, trust claims or categories.
- This plan creates no source changes. Implementation remains on an isolated preview branch; no production deployment inferred. Latest task authorizes all listed screen styles; previous homepage-only preview is historical, not a reason to omit requested screens.

## Dependencies

Existing approved content/assets and working route behavior are the baseline. Earlier storefront redesign is complete; no blocking plan dependency. Missing source artwork for cherry-blossom/about illustrations is a visual gap, not permission to crop entire screenshots or invent products.

## Success Criteria

- [x] All seven applicable screen types reviewed at 390px; 320px shell and responsive fallbacks checked.
- [x] Header seven destinations, eight category links, search queries/empty states, sort/pagination, gallery and contact CTAs behave as before.
- [x] Controls ≥44×44px; inputs ≥16px; keyboard focus, Escape/outside menu close, reduced motion and safe-area offsets work; no hidden content/overflow.
- [x] No cart/account/newsletter/search feature added; no product/blog/API/SEO data changed; canonical, Google verification and JSON-LD retained.
- [x] Lint and production build pass; visual comparison completed on representative live local routes.
- [x] Final diff reviewed; design-token and changelog docs updated.

## Unresolved questions

None blocking. Decorative source illustrations are not separate files in the supplied folder; use existing approved assets and report remaining visual difference.

<!-- slug: michio-8-screen-ui-redesign -->
