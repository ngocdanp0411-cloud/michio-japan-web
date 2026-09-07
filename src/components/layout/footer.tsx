import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";

const footerLinkClass = "inline-flex min-h-11 items-center text-sm leading-5 text-[var(--michio-text-muted)] hover:text-[var(--michio-primary)]";
const socialLinkClass = "inline-flex min-h-11 items-center rounded-md border border-[var(--michio-border)] bg-white px-3 text-xs font-semibold hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--michio-border)] bg-[var(--michio-surface-muted)] text-[var(--michio-text)]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-3">
              <Logo variant="horizontal" />
              <span className="text-base font-bold tracking-[0.08em]">MICHIO JAPAN</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--michio-text-muted)]">Sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Tư vấn và đặt hàng trực tiếp qua Zalo hoặc Fanpage.</p>
            <div className="mt-3 text-sm text-[var(--michio-text-muted)]">
              <div>Hotline: <a href={LINKS.hotline} className="inline-flex min-h-11 items-center font-semibold text-[var(--michio-text)] hover:text-[var(--michio-primary)]">{LINKS.hotlineDisplay}</a></div>
              <div>Zalo: <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>{LINKS.hotlineDisplay}</a></div>
              <div className="mt-1 max-w-sm leading-6">Địa chỉ: {LINKS.address}</div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Về Michio Japan</h2>
            <ul className="mt-3">
              <li><Link href="/gioi-thieu" className={footerLinkClass}>Giới thiệu</Link></li>
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>Cam kết chất lượng</Link></li>
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>Hướng dẫn mua hàng</Link></li>
              <li><Link href="/chinh-sach-quyen-rieng-tu" className={footerLinkClass}>Chính sách</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Hỗ trợ khách hàng</h2>
            <ul className="mt-3">
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>FAQ</Link></li>
              <li><Link href="/chinh-sach-van-chuyen" className={footerLinkClass}>Thanh toán & giao hàng</Link></li>
              <li><Link href="/chinh-sach-doi-tra" className={footerLinkClass}>Đổi trả & hoàn tiền</Link></li>
              <li><a href={LINKS.messenger} target="_blank" rel="noopener" className={footerLinkClass}>Liên hệ tư vấn</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-sm font-semibold">Kết nối với Michio</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>Facebook</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>Instagram</a>
            </div>
            <div className="mt-3 flex flex-col items-start text-sm">
              <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Chat Zalo →</a>
              <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Inbox Fanpage →</a>
              <a href={`mailto:${LINKS.email}`} className={`${footerLinkClass} break-all`}>{LINKS.email}</a>
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-[var(--michio-border)]" aria-hidden="true" />
        <div className="flex flex-col gap-2 text-xs leading-5 text-[var(--michio-text-subtle)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Michio Japan. Chọn đúng đồ Nhật – Sống thật mỗi ngày.</span>
          <Link href="/chinh-sach-quyen-rieng-tu" className="inline-flex min-h-11 items-center hover:text-[var(--michio-primary)] md:min-h-0">Chính sách quyền riêng tư</Link>
        </div>
      </div>
    </footer>
  );
}
