---
phase: 1
title: "Mobile header, CTA và media"
status: in-progress
priority: P1
dependencies: []
---

# Phase 1: Mobile header, CTA và media

## Overview

Giảm diện tích chrome trên mobile và làm rõ đường dẫn chốt đơn.

## Related Code Files

- Modify: `src/components/layout/header.tsx`
- Modify: `src/components/product/product-card.tsx`
- Modify: `src/components/product/product-gallery.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/san-pham/[slug]/page.tsx`
- Modify: `next.config.ts`

## Implementation Steps

1. Chuyển header mobile thành hàng gọn với tìm kiếm/menu dễ dùng; giữ desktop hiện tại.
2. Giữ một CTA Zalo rõ nghĩa trên card; Fanpage vẫn có trong dock cố định.
3. Đổi CTA trang chủ thành “Nhắn Zalo đặt hàng”.
4. Xóa các tab giả, dùng `object-contain` cho ảnh chi tiết và sửa quality allowlist.

## Success Criteria

- [x] Header mobile giảm đáng kể chiều cao khi cuộn.
- [x] CTA rõ ràng, vùng chạm tối thiểu 44px.
- [x] Không có control nhìn tương tác nhưng không hoạt động.
