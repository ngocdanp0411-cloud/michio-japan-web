---
phase: 3
title: "Kiểm thử hồi quy"
status: pending
priority: P1
dependencies: [1, 2]
---

# Phase 3: Kiểm thử hồi quy

## Overview

Xác minh code và trải nghiệm thật trước khi bàn giao.

## Implementation Steps

1. Chạy ESLint và production build.
2. Kiểm tra `/`, `/cua-hang?page=1`, trang cuối và query page không hợp lệ.
3. Kiểm tra trang sản phẩm ở viewport 360×800 và 390×844.
4. So sánh số DOM/image của cửa hàng trước và sau.

## Success Criteria

- [x] Lint và build đạt.
- [x] Phân trang, CTA, header và gallery hoạt động trên mobile.
- [x] Không phát sinh horizontal overflow hoặc cảnh báo runtime mới.
