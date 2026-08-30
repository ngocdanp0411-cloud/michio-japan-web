---
title: "Michio Japan Mobile Storefront Optimization"
status: in-progress
priority: P1
created: 2026-08-30
---

# Michio Japan Mobile Storefront Optimization

## Overview

Tối ưu mobile cho luồng xem sản phẩm → nhắn Zalo/Fanpage, giữ nguyên thương hiệu và không thêm giỏ hàng hoặc thanh toán online.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Mobile header, CTA và media](./phase-01-mobile-header-cta-and-media-cleanup.md) | In progress |
| 2 | [Phân trang cửa hàng và danh mục](./phase-02-shop-pagination-and-category-filtering.md) | Pending |
| 3 | [Kiểm thử hồi quy](./phase-03-regression-validation-and-release-safety.md) | Pending |

## Dependencies

- Next.js 16 App Router `searchParams` là Promise.
- Dữ liệu sản phẩm và danh mục tiếp tục lấy từ JSON hiện tại.

## Success Criteria

- [ ] Header mobile gọn, điều hướng rõ, CTA không che nội dung.
- [ ] `/cua-hang` chỉ render tối đa 24 sản phẩm mỗi trang.
- [ ] Không còn control giả hoặc cảnh báo quality ảnh đã biết.
- [ ] Lint, build và kiểm tra mobile 360/390px đạt.
