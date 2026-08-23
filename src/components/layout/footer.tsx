import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo variant="vertical" />
            <p className="mt-4 text-sm leading-6 text-[var(--michio-deep-navy)]/70">
              Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Đồng hành xây thói quen chăm sóc bản thân mỗi ngày.
            </p>
            <div className="mt-3 text-sm">
              <div>Hotline: <a href={LINKS.hotline} className="font-semibold text-[var(--michio-deep-rose)]">{LINKS.hotlineDisplay}</a></div>
              <div>Email: {LINKS.email}</div>
              <div>Địa chỉ: {LINKS.address}</div>
              <div className="text-xs text-[var(--michio-taupe)]">Mở cửa: 8h – 21h T2 đến CN</div>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wide">THÔNG TIN</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/gioi-thieu" className="hover:text-[var(--michio-deep-rose)]">Giới thiệu về Michio</Link></li>
              <li><Link href="/huong-dan-mua-hang" className="hover:text-[var(--michio-deep-rose)]">Hướng dẫn mua hàng</Link></li>
              <li><Link href="/chinh-sach-van-chuyen" className="hover:text-[var(--michio-deep-rose)]">Chính sách vận chuyển</Link></li>
              <li><Link href="/chinh-sach-doi-tra" className="hover:text-[var(--michio-deep-rose)]">Chính sách đổi trả</Link></li>
              <li><Link href="/chinh-sach-quyen-rieng-tu" className="hover:text-[var(--michio-deep-rose)]">Chính sách riêng tư</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wide">SẢN PHẨM</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link href={`/danh-muc/${c.slug}`} className="hover:text-[var(--michio-deep-rose)]">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wide">KẾT NỐI</h4>
            <div className="mt-3 flex gap-2">
              <a href={LINKS.facebook} target="_blank" rel="noopener" className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--michio-pearl)]">Facebook</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener" className="rounded-full border px-3 py-1.5 text-sm hover:bg-[var(--michio-pearl)]">Instagram</a>
            </div>
            <div className="mt-4 rounded-xl border bg-[var(--michio-pearl)] p-3 text-xs leading-5">
              <div className="font-semibold">Cam kết</div>
              <div>• 100% chính hãng • Tư vấn tận tâm • Giao tinh tế</div>
            </div>
          </div>
        </div>
        <div className="michio-line my-8" />
        <div className="flex flex-col gap-2 text-xs text-[var(--michio-taupe)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Michio Japan. Chọn đúng đồ Nhật – Sống thật mỗi ngày.</span>
          <span>Thiết kế rebrand: Deep Rose • Deep Navy • Soft Blush • Taupe</span>
        </div>
      </div>
    </footer>
  );
}
