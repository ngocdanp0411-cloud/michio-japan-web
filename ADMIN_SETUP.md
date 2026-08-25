# Michio Japan Admin

## Tính năng

Trang `/admin` cho phép admin đăng nhập, tìm kiếm sản phẩm, lọc theo danh mục, thêm sản phẩm, sửa thông tin, thay đổi giá/giá gốc, cập nhật excerpt và mô tả, đổi ảnh/gallery, ẩn sản phẩm khỏi storefront và xoá sản phẩm. Khu vực `Danh mục` cho phép thêm, sửa tên/màu/icon, bật/tắt hiển thị và xoá danh mục chưa có sản phẩm sử dụng.

## Biến môi trường bắt buộc

```env
ADMIN_PASSWORD=mat-khau-manh-khong-dung-mat-khau-mac-dinh
ADMIN_SESSION_SECRET=chuoi-ngau-nhien-dai-it-nhat-32-ky-tu
```

`ADMIN_SESSION_SECRET` dùng để ký cookie phiên. Không commit file `.env` vào GitHub. API danh mục và upload cũng dùng cùng cookie HMAC này.

## Lưu dữ liệu khi chạy local

Nếu không có biến GitHub, API ghi vào `data/products.json`. Sau khi chỉnh sửa local, cần reload/restart dev server để các trang server đọc lại dữ liệu.

## Lưu dữ liệu trên Vercel

Vercel runtime không nên được xem là nơi lưu file lâu dài. Để thay đổi từ `/admin` được giữ lại sau deploy, cấu hình thêm:

```env
GITHUB_TOKEN=github-token-co-quyen-contents-write
GITHUB_REPO=ngocdanp0411-cloud/michio-japan-web
GITHUB_BRANCH=main
```

Token chỉ cần quyền đọc/ghi nội dung repository. Cấu hình các biến này trong Vercel Project Settings → Environment Variables, không đưa token vào source code. Mỗi lần lưu sản phẩm, danh mục hoặc ảnh, API sẽ đọc phiên bản mới nhất trước khi commit lên branch đã cấu hình và Vercel sẽ tự build lại. Nếu dùng Preview Deployment, đặt `GITHUB_BRANCH` phù hợp để không ghi dữ liệu preview vào `main`.

## Khuyến nghị bảo mật

Dùng mật khẩu dài, không dùng `michio2024` hay mật khẩu dễ đoán. Bật Vercel Deployment Protection hoặc thêm allowlist IP nếu cần. Sau khi đưa lên production, kiểm tra `/api/admin/products` ở trạng thái chưa đăng nhập phải trả `401`, còn cookie `michio_admin` phải là cookie HttpOnly có chữ ký.

## Ghi chú ảnh

Admin hỗ trợ upload tối đa 8 ảnh/lần, mỗi ảnh tối đa 5 MB, với định dạng JPG, PNG, WebP, GIF hoặc AVIF. Khi có `GITHUB_TOKEN`, ảnh được commit vào `public/products/<slug>/` qua GitHub Contents API và trả về URL `/products/<slug>/...`; khi chạy local không có token, ảnh được ghi vào `public/products/`. Sau khi upload, bấm `Lưu sản phẩm` để lưu URL ảnh chính/gallery vào dữ liệu sản phẩm. Nên ưu tiên WebP/AVIF đã tối ưu trước khi upload.
