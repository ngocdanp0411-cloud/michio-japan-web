import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";

const footerLinkClass = "text-sm text-white/70 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[var(--michio-navy)] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:py-12">
        <div className="grid gap-9 md:grid-cols-[1.35fr_1fr_1fr_1.1fr] md:gap-8">
          <div>
            <div className="inline-flex rounded-md bg-white p-1.5">
              <Logo variant="horizontal" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Đồng hành xây thói quen chăm sóc bản thân mỗi ngày.</p>
            <div className="mt-4 space-y-1.5 text-sm text-white/80">
              <div>Hotline: <a href={LINKS.hotline} className="font-semibold text-white hover:text-[var(--michio-primary)]">{LINKS.hotlineDisplay}</a></div>
              <div>Zalo: <a href={LINKS.zalo} target="_blank" rel="noopener" className="hover:text-white">{LINKS.hotlineDisplay}</a></div>
              <div className="leading-6">Địa chỉ: {LINKS.address}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">VỀ CHÚNG TÔI</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/gioi-thieu" className={footerLinkClass}>Giới thiệu</Link></li>
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>Cam kết chất lượng</Link></li>
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>Hướng dẫn mua hàng</Link></li>
              <li><Link href="/chinh-sach-quyen-rieng-tu" className={footerLinkClass}>Chính sách</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">HỖ TRỢ KHÁCH HÀNG</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>FAQ</Link></li>
              <li><Link href="/chinh-sach-van-chuyen" className={footerLinkClass}>Thanh toán & giao hàng</Link></li>
              <li><Link href="/chinh-sach-doi-tra" className={footerLinkClass}>Đổi trả & hoàn tiền</Link></li>
              <li><a href={LINKS.messenger} target="_blank" rel="noopener" className={footerLinkClass}>Liên hệ tư vấn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={LINKS.facebook} target="_blank" rel="noopener" className="inline-flex h-9 items-center rounded border border-white/25 px-3 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white/10">Facebook</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener" className="inline-flex h-9 items-center rounded border border-white/25 px-3 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white/10">Instagram</a>
            </div>
            <div className="mt-5 space-y-2 text-sm text-white/75">
              <a href={LINKS.zalo} target="_blank" rel="noopener" className="block hover:text-white">Chat Zalo →</a>
              <a href={LINKS.messenger} target="_blank" rel="noopener" className="block hover:text-white">Inbox Fanpage →</a>
              <a href={`mailto:${LINKS.email}`} className="block break-all hover:text-white">{LINKS.email}</a>
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-white/15" aria-hidden="true" />
        <div className="flex flex-col gap-2 text-xs text-white/45 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Michio Japan. Chọn đúng đồ Nhật – Sống thật mỗi ngày.</span>
          <span>Hàng Nhật nội địa • Tư vấn tận tâm • Giao hàng tinh tế</span>
        </div>
      </div>
    </footer>
  );
}
