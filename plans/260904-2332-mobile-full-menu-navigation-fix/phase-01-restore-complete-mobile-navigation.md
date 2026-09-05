---
title: "Restore Complete Mobile Navigation"
status: in-progress
---

# Restore Complete Mobile Navigation

## Root Cause

The overflow fix hid three lower-priority links below `lg`, but the category-only popup received no primary navigation data. `Về Michio` and `Chính sách` therefore had no mobile path.

## Implementation

1. Pass primary navigation items into `ProductMenu`.
2. Label the mobile trigger `Menu`; retain `Danh mục sản phẩm` on desktop.
3. Add a mobile-only main navigation section before product categories.
4. Cap popup height from its live top position and enable vertical scrolling.
5. Use disclosure navigation semantics while preserving Escape/outside close.

## Todo

- [x] Implement full mobile popup.
- [x] Test menu contents, close behavior and overflow across breakpoints.
- [x] Run lint/build and independent review.
- [ ] Deploy and verify production.
