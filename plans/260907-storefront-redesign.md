---
title: "Michio Japan storefront redesign"
status: in_progress
priority: P2
created: 2026-09-07
---

# Storefront redesign

Modern Japanese editorial retail: warm white, charcoal, restrained red; sans typography in sentence case, generous but compact mobile spacing. Reuse existing dependencies and real product imagery.

## Constraints

- Preserve original promo artwork and its native 1672:941 ratio on homepage and skincare category; no cropping, distortion or replacement.
- Preserve all navigation, eight category entry points, ordering, product/blog data, prices and Zalo/Facebook destinations; no cart/checkout or price filter.
- Keep Google verification and current routing. Do not modify ratings, review counts or stock claims without confirmed source data.
- Coordinate distinct file ownership; preserve concurrent edits. Read bundled Next.js guides before code changes.

## TODO — implement in order

- [x] Update `src/app/globals.css`: warm surfaces, readable charcoal text, red accents, consistent spacing/borders, sentence-case headings and existing sans fonts.
- [x] Rework `src/components/layout/header.tsx`: white header, clear wordmark, useful search, complete desktop navigation and mobile menu with all category links.
- [x] Simplify `src/components/layout/top-bar.tsx` into compact static notice; keep header/notice ordering intentional across breakpoints.
- [x] Rebuild `src/app/page.tsx`: short campaign title, full-width uncropped banner and clear skincare CTA; image-led category grid; featured products before longer trust/story sections; compact journal section.
- [x] Update shared category presentation only where needed; preserve category destinations/order and use existing product assets without invented category imagery.
- [x] Refresh `src/components/product/product-card.tsx`: consistent contained product imagery, readable product name/price, compact existing labels, accessible full-card links; maintain shop/category behavior.
- [x] Clean `src/components/layout/footer.tsx` and `sticky-dock.tsx`: concise information, official destinations, clear touch targets; ensure product sticky CTA and global dock never overlap or obscure content.
- [x] Add restrained transform/opacity transitions for navigation, cards and initial section entry; no animation dependency, layout-shifting motion or continuous marquee. Respect `prefers-reduced-motion`; essential content visible without animation/JS.
- [x] Fix canonical scope: keep homepage canonical and give each affected static page its own URL (`tin-tuc`, `gioi-thieu`, purchase guide and policies); preserve existing product/category/blog canonicals and pagination logic.
- [x] Verify responsive layouts at narrow mobile, standard mobile, tablet and desktop; inspect first load and after scroll, original banner ratio on homepage/skincare, search, menu, CTA and footer destinations.
- [x] Check keyboard focus, contrast, reduced motion, image sizing/loading and absence of horizontal overflow; review representative shop, category, product and article pages after shared-style changes.
- [x] Run lint/build once on final code, resolve real failures, then review diff for regressions and unrelated edits. Verify rendered canonical URLs.
- [x] Update existing changelog/roadmap and durable memory for approved design changes; record completed validation and outstanding limitations.

## Acceptance

- Hero remains dominant on mobile; product discovery is reachable before long informational sections.
- All existing destinations/data remain accessible; no new dependencies or fabricated claims.
- Shared styles remain readable across all representative routes; touch controls are at least 44px where practical.
- Lint/build pass; visual checks confirm uncropped artwork, working navigation and unobstructed CTAs.

## Dependencies and unresolved questions

Use current promo/mobile-navigation implementation as baseline; earlier promo/mobile optimization plan metadata still says in-progress and must not be treated as a code rollback request. No blocking design question; rating/stock provenance remains outside this redesign scope.

- [ ] Push and verify production deployment. Local lint/build and browser checks passed; see docs/storefront-audit-2026-09-07.md.
