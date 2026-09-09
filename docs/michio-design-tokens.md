# Michio Japan — Design system

Cập nhật 2026-09-09: bộ 8 màn hình Michio là chuẩn giao diện storefront. Mobile-first 390px, nội dung product-first, trắng/đen/đỏ Michio và hồng nhạt tiết chế.

## Chữ và màu

- Be Vietnam Pro cho toàn website, 400/500/600/700; heading 700, sentence case, line-height 1.18–1.4.
- Nội dung đọc 16px, dòng 1.65; nhãn phụ 12–14px; input ít nhất 16px.
- CTA / giá: `--michio-primary: #e3062f`, hover `#c90028`, nền nhạt `#fff0f3`.
- Charcoal: `--michio-navy: #17181c`; nền trắng, panel hồng rất nhạt `#fff5f6`; border `#ececef`.
- Nguồn token chuẩn: `src/app/globals.css`. Không thêm các bảng màu riêng vào từng khối.

## Bố cục và tương tác

- Container tối đa 1280px; mobile 2 cột sản phẩm, 4 cột danh mục có ảnh; desktop tối đa 4 cột sản phẩm, 8 danh mục.
- Giữ artwork Deal Nhật Xinh Yêu ở hero và skincare, tỷ lệ 1672:941, không crop. Desktop ảnh chiếm phần lớn hero, CTA cạnh ảnh; mobile CTA dưới ảnh.
- Header trắng gồm logo/wordmark, slogan “Đồ Nhật – Sống thật mỗi ngày”, tìm kiếm pill và Menu; menu giữ đủ 7 điểm đến cùng 8 danh mục, đóng bằng nút/Escape/bấm ngoài, vùng chạm ≥44px.
- Mobile có bottom navigation 5 mục: Trang chủ, Danh mục, Mua sỉ/Zalo, Bài viết, Liên hệ/Fanpage. Trang sản phẩm dùng thanh CTA Zalo/Fanpage riêng; không có giỏ hàng hoặc tài khoản.
- Thẻ sản phẩm: ảnh vuông object-contain trên nền xám nhạt, radius 10–14px, tên/giá thật và CTA “Tư vấn Zalo”. Mobile 2 cột, khoảng cách 12px.
- Danh sách tìm kiếm/bài viết/danh mục dùng hàng ngang gọn, viền nhẹ và mật độ theo mockup; không thêm tab hoặc tính năng không tồn tại.
- Chuyển động: menu 200ms, hover ảnh 300ms, title vào 350ms; scroll reveal chỉ khi trình duyệt hỗ trợ CSS view timeline. Tắt/giảm theo prefers-reduced-motion; không carousel tự chạy hay thư viện animation mới.
- Kiểm tra mobile trước/sau cuộn, ảnh/crop/CTA/menu, trang danh mục/sản phẩm/blog/tìm kiếm; không chỉ dựa build.
