# Michio Japan — Typography & Color Tokens

## Nguyên tắc

Michio Japan dùng **nền trắng và hierarchy navy–rose**. Hình ảnh sản phẩm thật là điểm tập trung; màu sắc chỉ hỗ trợ điều hướng, trạng thái và chuyển đổi. Không dùng màu nền vàng/kem diện rộng, gradient neon, hoặc dùng màu làm tín hiệu duy nhất cho trạng thái.

## Typography

Website dùng **Be Vietnam Pro** cho nội dung tiếng Việt, form, điều hướng và dữ liệu sản phẩm. **Barlow Condensed** dùng cho display heading, tiêu đề section, nhãn thương hiệu và các cụm chữ cần cảm giác editorial/retail. Hai font đã được khai báo trong `src/app/layout.tsx` bằng `next/font/google` và được map vào `--font-sans`/`--font-display`.

| Vai trò | Class chuẩn | Kích thước | Weight | Line-height | Dùng cho |
|---|---|---:|---:|---:|---|
| Display hero | `.michio-h1` | `clamp(2rem, 4vw, 3.25rem)` | 700 | 1.02 | H1 hero, tiêu đề trang lớn |
| Section heading | `.michio-h2` | `clamp(1.5rem, 2.2vw, 2rem)` | 700 | 1.10 | H2 section, tên nhóm sản phẩm |
| Subheading | `.michio-h3` | `clamp(1.15rem, 1.6vw, 1.4rem)` | 600 | 1.20 | Card title lớn, heading phụ |
| Eyebrow | `.michio-eyebrow` | `12px` | 700 | 1.25 | Michio Journal, nhãn section, category label |
| Body | `.michio-body` | `15px` | 400 | 1.65 | Mô tả, intro, nội dung sản phẩm/blog |
| Body large | `.michio-body.text-base` | `16px` | 400 | 1.65 | Đoạn văn blog và nội dung đọc dài |
| Navigation | `.michio-nav-label` | `14px` | 600 | 1.25 | Category nav, card title ngắn |
| Price | `.michio-price` | `17px` / desktop `18px` | 700 | 1.20 | Giá bán chính |
| Caption | `.michio-caption` | `12px` | 500 | 1.40 | Metadata, địa chỉ, note, helper text |
| Utility/top bar | inline `12px` | `12px` | 400–600 | 1.25–1.67 | Freeship, hotline, cam kết ngắn |

## Color tokens

Các token được khai báo tại `src/app/globals.css`. Component mới phải dùng semantic token thay vì thêm mã HEX riêng trong JSX.

| Token | HEX | Vai trò |
|---|---|---|
| `--michio-primary` | `#B83B68` | Rose thương hiệu, CTA chính, giá, eyebrow, link nhấn |
| `--michio-primary-hover` | `#7F2348` | Hover/pressed của CTA rose |
| `--michio-primary-soft` | `#F4D9E2` | Chip, highlight nhỏ, header table, thông báo nhẹ |
| `--michio-primary-foreground` | `#FFFFFF` | Chữ trên nền rose |
| `--michio-navy` | `#13233F` | Heading, body foreground, top bar, CTA phụ đậm |
| `--michio-navy-strong` | `#0C172B` | Hover nền navy |
| `--michio-navy-foreground` | `#FFFFFF` | Chữ trên nền navy |
| `--michio-text` | `#171923` | Text chính trong thông tin/form |
| `--michio-text-muted` | `#526078` | Body phụ, mô tả, nội dung đọc |
| `--michio-text-subtle` | `#6B7280` | Caption, placeholder, metadata |
| `--michio-text-on-dark` | `#F8FAFC` | Chữ sáng trên navy |
| `--michio-bg` | `#FFFFFF` | Nền toàn site |
| `--michio-surface` | `#FFFFFF` | Card, input, surface chính |
| `--michio-surface-muted` | `#F8FAFC` | Khu phụ, placeholder ảnh, panel nhẹ |
| `--michio-surface-warm` | `#FFFAFC` | Panel rose rất nhẹ, không dùng làm nền toàn trang |
| `--michio-border` | `#E5E7EB` | Border mặc định |
| `--michio-border-strong` | `#CBD5E1` | Divider, focus-related contrast, border nhấn |
| `--michio-zalo` | `#0068FF` | CTA Zalo nhận diện nền tảng |
| `--michio-messenger` | `#13233F` | CTA Messenger, dùng navy |
| `--michio-success` | `#0F766E` | Trạng thái chính hãng/thành công |
| `--michio-warning` | `#A15C00` | Cảnh báo cần chú ý |
| `--michio-danger` | `#B42318` | Xóa, lỗi, hành động phá hủy |
| `--michio-focus` | `#9F2F58` | Focus ring accessible |

## Component mapping

| Thành phần | Nền | Chữ | Border/interaction |
|---|---|---|---|
| Body/site | `--michio-bg` | `--michio-text` | Không thêm nền màu diện rộng |
| Top bar | `--michio-navy` | `--michio-text-on-dark` | Dot/hover dùng `--michio-primary-soft` |
| Header | `--michio-surface` | `--michio-navy` | `--michio-border`, focus `--michio-focus` |
| Search input | `--michio-surface` | `--michio-text` | Border `--michio-border`, focus ring rose |
| Primary CTA | `--michio-primary` | `#FFFFFF` | Hover `--michio-primary-hover`, cao tối thiểu 44px |
| Secondary CTA | `--michio-surface` | `--michio-navy` | Border navy, hover `--michio-surface-muted` |
| Category chip | `--michio-surface-muted` | `--michio-navy` | Border `--michio-border`; active dùng navy |
| Product card | `--michio-surface` | `--michio-text` | Border `--michio-border`, shadow nhẹ khi hover |
| Product price | Không bắt buộc | `--michio-primary` | Giá gốc dùng `--michio-text-subtle` + line-through |
| Discount badge | `--michio-primary` | `#FFFFFF` | Không dùng màu duy nhất để truyền ý nghĩa |
| Authenticity status | Nền trong suốt | `--michio-success` | Luôn đi kèm chữ “Chính hãng” |
| Blog table header | `--michio-primary-soft` | `--michio-navy` | Border `--michio-border` |
| Blog answer/FAQ | `--michio-surface-warm` | `--michio-text-muted` | Border `--michio-border` |
| Dark trust band | `--michio-navy` | `--michio-text-on-dark` | CTA phụ nền trắng, chữ navy |
| Admin destructive action | `#FEF2F2` | `--michio-danger` | Border `#FECACA`; chỉ dùng cho xóa/lỗi |

## Usage examples

```tsx
<h1 className="michio-h1">Sống thật mỗi ngày với đồ Nhật chính hãng</h1>
<h2 className="michio-h2">Collagen làm đẹp</h2>
<p className="michio-body">Mô tả rõ ràng, dễ đọc và phù hợp với tiếng Việt.</p>

<a className="michio-btn-primary rounded-full px-5 py-3 text-sm">
  Chat Zalo — Tư vấn & đặt hàng
</a>

<a className="michio-btn-secondary rounded-full px-5 py-3 text-sm">
  Xem sản phẩm
</a>
```

Mọi focus state dùng `:focus-visible` với outline rose có offset; animation chỉ ở mức nhẹ khoảng 150–250ms và phải tôn trọng `prefers-reduced-motion`.
