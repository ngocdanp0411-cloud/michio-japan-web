# Michio Japan Admin

## Tính năng

Trang `/admin` cho phép admin đăng nhập, tìm kiếm sản phẩm, lọc theo danh mục, thêm sản phẩm, sửa thông tin, thay đổi giá/giá gốc, cập nhật mô tả, đổi ảnh/gallery, ẩn sản phẩm khỏi storefront và xoá sản phẩm.

## Biến môi trường bắt buộc

```env
ADMIN_PASSWORD=mat-khau-manh-khong-dung-mat-khau-mac-dinh
ADMIN_SESSION_SECRET=chuoi-ngau-nhien-dai-it-nhat-32-ky-tu
```

`ADMIN_SESSION_SECRET` dùng để ký cookie phiên. Không commit file `.env` vào GitHub.

## Lưu dữ liệu khi chạy local

Nếu không có biến GitHub, API ghi vào `data/products.json`. Sau khi chỉnh sửa local, cần reload/restart dev server để các trang server đọc lại dữ liệu.

## Lưu dữ liệu trên Vercel

Vercel runtime không nên được xem là nơi lưu file lâu dài. Để thay đổi từ `/admin` được giữ lại sau deploy, cấu hình thêm:

```env
GITHUB_TOKEN=github-token-co-quyen-contents-write
GITHUB_REPO=ngocdanp0411-cloud/michio-japan-web
GITHUB_BRANCH=main
```

Token chỉ cần quyền đọc/ghi nội dung repository. Cấu hình các biến này trong Vercel Project Settings → Environment Variables, không đưa token vào source code. Mỗi lần lưu sản phẩm, API sẽ đọc phiên bản mới nhất của `data/products.json`, commit thay đổi lên branch đã cấu hình và Vercel sẽ tự build lại.

## Khuyến nghị bảo mật

Dùng mật khẩu dài, không dùng `michio2024` hay mật khẩu dễ đoán. Bật Vercel Deployment Protection hoặc thêm allowlist IP nếu cần. Sau khi đưa lên production, kiểm tra `/api/admin/products` ở trạng thái chưa đăng nhập phải trả `401`, còn cookie `michio_admin` phải là cookie HttpOnly có chữ ký.

## Ghi chú ảnh

Admin hiện nhận URL ảnh hoặc đường dẫn asset trong repository. Không upload ảnh nhị phân qua API này. Với production, nên đưa ảnh lên CDN/object storage và lưu URL tối ưu WebP/AVIF trong trường `image`/`gallery`.
