---
title: "Phase 1: Thiết kế và triển khai cover"
status: todo
---

# Phase 1: Thiết kế và triển khai cover

## Overview

Ghép ảnh sản phẩm trong `public/products`, logo thương hiệu và tiêu đề bài viết thành 12 cover blog đồng nhất.

## Requirements

- [x] Sản phẩm trên cover liên quan trực tiếp tới nội dung bài.
- [x] Bố cục 16:9; logo và tiêu đề nằm trong vùng an toàn mobile.
- [x] Không thay đổi URL ảnh blog hiện tại.

## Implementation Steps

1. Lập bảng ánh xạ bài viết → 2–3 sản phẩm thật.
2. Tạo template nền thương hiệu, logo, nhãn chủ đề và tiêu đề.
3. Xuất đè 12 JPEG hiện tại ở 1920×1080.
4. Kiểm tra contact sheet, kích thước, dung lượng và build.

## Todo

- [x] Chọn ảnh nguồn.
- [x] Xuất 12 cover.
- [x] Kiểm tra trực quan và kỹ thuật.

## Success Criteria

12 cover nhận biết đúng chủ đề, đọc được trên mobile và không gây lỗi build.
