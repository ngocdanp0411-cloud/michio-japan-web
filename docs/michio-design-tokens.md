# Michio Japan — Design system

Cập nhật 2026-09-08: cửa hàng Nhật hiện đại, mobile-first. Nền trắng, charcoal và một màu đỏ trầm; ảnh sản phẩm thật là trọng tâm.

## Chữ và màu

- Be Vietnam Pro cho toàn website, 400/500/600/700; heading 600, sentence case, line-height 1.2–1.4.
- Nội dung đọc 16px, dòng 1.65; nhãn phụ 12–14px; input ít nhất 16px.
- CTA / giá: `--michio-primary: #bd2835`, hover `#9d1f2a`, nền nhạt `#fbecef`.
- Charcoal: `--michio-navy: #222329`; nền trắng, panel hồng rất nhạt `#fcf5f6`; border `#e7e7e7`.
- Nguồn token chuẩn: `src/app/globals.css`. Không thêm các bảng màu riêng vào từng khối.

## Bố cục và tương tác

- Container tối đa 1280px; mobile 2 cột sản phẩm, 4 cột danh mục có ảnh; desktop tối đa 4 cột sản phẩm, 8 danh mục.
- Giữ artwork Deal Nhật Xinh Yêu ở hero và skincare, tỷ lệ 1672:941, không crop. Desktop ảnh chiếm phần lớn hero, CTA cạnh ảnh; mobile CTA dưới ảnh.
- Header trắng, thông báo giao hàng tĩnh; menu đầy đủ, đóng bằng nút/Escape/bấm ngoài, vùng chạm ≥44px.
- Mobile: thương hiệu + nút Menu cùng hàng, tìm kiếm rộng hàng dưới; menu hai cột giữ đủ 6 trang và 8 danh mục. Hero chữ ngắn, CTA ngang; ảnh danh mục 56px để đưa sản phẩm lên sớm.
- Thẻ sản phẩm: ảnh vuông object-contain, không chồng logo, giá rõ, liên hệ dạng link nhẹ. Footer sáng, CTA mobile có safe-area.
- Thẻ sản phẩm mobile có viền chung, khoảng cách 12px, tên trước đánh giá, giá và link “Tư vấn Zalo”; focus ảnh nằm trong viền để không bị cắt.
- Chuyển động: menu 200ms, hover ảnh 300ms, title vào 350ms; scroll reveal chỉ khi trình duyệt hỗ trợ CSS view timeline. Tắt/giảm theo prefers-reduced-motion; không carousel tự chạy hay thư viện animation mới.
- Kiểm tra mobile trước/sau cuộn, ảnh/crop/CTA/menu, trang danh mục/sản phẩm/blog/tìm kiếm; không chỉ dựa build.
