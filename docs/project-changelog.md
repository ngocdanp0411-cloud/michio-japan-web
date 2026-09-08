# Project changelog

## 2026-09-08 — Compact mobile shopping layout

- Rebuilt mobile header with visible wordmark, full-width search and compact two-column menu; retained every navigation/category destination.
- Shortened hero copy and category tiles; first product starts at ~837px instead of ~1317px on a 390px viewport.
- Unified product-card borders and spacing; clearer name/price hierarchy and explicit Zalo destination, inset keyboard focus.
- Validation: lint and Webpack production build passed; browser checks at 320/390/1024/1440px, search submission and representative category/product screens. Original artwork preserved; no data or dependency changes.

## 2026-09-07 — Storefront redesign

- Unified white/charcoal/red storefront, readable Vietnamese sans typography, image-led categories and restrained product cards.
- Updated homepage, shared navigation/footer/contact dock and compact catalog intros; preserved original campaign artwork, product data and routes.
- Added lightweight reduced-motion-aware animation; repaired visible sort submission, main landmarks, sticky offsets and static-page canonicals.
- Validation: lint and Webpack production build passed; responsive browser checks 320–1440px. Details: [audit](storefront-audit-2026-09-07.md).
