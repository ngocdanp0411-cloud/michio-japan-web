# Audit & redesign — 2026-09-07

## Đã xử lý

- Giao diện thiếu thống nhất: thay typography, header/footer sáng, giảm khung/shadow, thẻ sản phẩm và danh mục có ảnh rõ hơn; giữ dữ liệu/CTA chính thức.
- Hero cũ chưa push: thay bằng bản mới mobile-first, giữ artwork gốc, desktop CTA không nằm dưới ảnh quá cao.
- Canonical kế thừa trang chủ: trang blog index, giới thiệu và 4 policy/guide đã có canonical riêng; bỏ canonical mặc định ở layout.
- Sắp xếp danh mục có nút áp dụng nhìn thấy, input 16px; sticky sidebar tránh header; trang tìm kiếm/policy có main landmark.
- Animation nhẹ, giảm chuyển động theo cài đặt hệ thống, không thêm dependency.

## Kiểm tra

- Lint pass; build production Webpack pass (374 trang tính cả nội dung local chưa commit). Turbopack trên máy bị chặn mở cổng; không đổi cấu hình build Vercel vì lỗi này.
- Browser: homepage 320/375/390/768/1024/1440px; menu mở/cuộn tới đủ 8 danh mục; ảnh đại diện tải được.
- Trang mẫu: skincare, sản phẩm Kose, cửa hàng, blog index/article, tìm kiếm Kose; không tràn ngang trong các lượt kiểm tra. Homepage/skincare giữ tỷ lệ ảnh gốc.
- Cả 323 sản phẩm active có file ảnh local. Đây là kiểm tra tồn tại file, không phải kết luận mọi ảnh đều tối ưu dung lượng.
- Review độc lập; đã sửa các vấn đề main landmark và sticky offset phát hiện sau review.

## Chưa xác minh / ngoài phạm vi lần này

- Nguồn rating/reviewCount và tồn kho thực tế: đang dùng dữ liệu cũ; chưa đủ bằng chứng để xác nhận các đánh giá hoặc InStock trong schema.
- Sitemap dùng ngày sinh trang cho nhiều lastModified; cần thay bằng ngày sửa nội dung thực khi có dữ liệu.
- Chưa đo Core Web Vitals thực tế, Lighthouse, Search Console hoặc thử trên iPhone vật lý; không đưa điểm hiệu năng/SEO giả định.
- Instagram/email hiện tại cần chủ shop xác nhận nếu muốn đổi; Fanpage/Messenger đã đúng MichioJapanGroup.

Các bài blog untracked và plan cũ không thuộc commit giao diện này.
