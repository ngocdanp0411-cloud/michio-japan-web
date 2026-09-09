# Project changelog

## 2026-09-09 — Eight-screen storefront visual system

- Applied the supplied Michio mobile UI hierarchy across home, shop/category, product, search, blog/article and About pages; cart screenshot used as spacing/style reference only.
- Added one shared seven-destination header/menu and five-item mobile navigation mapped to existing pages, Zalo and Fanpage; no cart, account or checkout feature added.
- Consolidated red/white/pale-pink tokens, compact cards and list density while retaining actual product/blog images, names, prices, slugs and existing search/sort/pagination behavior.
- Validation: ESLint, TypeScript and Webpack production build passed; data/library/API checksums unchanged; representative mobile routes visually checked.

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
