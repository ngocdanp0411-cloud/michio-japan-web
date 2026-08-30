---
phase: 2
title: "Phân trang cửa hàng và danh mục"
status: pending
priority: P1
dependencies: [1]
---

# Phase 2: Phân trang cửa hàng và danh mục

## Overview

Giới hạn DOM mobile và không dẫn khách vào danh mục trống.

## Related Code Files

- Modify: `src/app/cua-hang/page.tsx`
- Modify: `src/lib/categories.ts`
- Modify: consumers of `CATEGORIES` if required

## Implementation Steps

1. Đọc `page` từ `searchParams`, chuẩn hóa về khoảng hợp lệ.
2. Render 24 sản phẩm/trang và tạo điều hướng Trước/Sau cùng số trang.
3. Tắt prefetch cho các link sản phẩm trong grid lớn nếu cần.
4. Chỉ hiển thị danh mục có ít nhất một sản phẩm active trên storefront.

## Success Criteria

- [x] Mỗi trang cửa hàng có tối đa 24 sản phẩm.
- [x] URL phản ánh trang hiện tại và xử lý query sai an toàn.
- [x] Không còn danh mục trống trong điều hướng storefront.
