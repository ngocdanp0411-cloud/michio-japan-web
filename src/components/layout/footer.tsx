import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";

const footerLinkClass = "inline-flex min-h-11 items-center text-sm leading-5 text-[var(--michio-text-muted)] transition-colors hover:text-[var(--michio-primary)]";
const socialLinkClass = "inline-flex min-h-11 items-center rounded-full border border-[var(--michio-border-strong)] bg-white px-4 text-xs font-semibold transition-colors hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--michio-border)] bg-[var(--michio-surface-warm)] pb-[calc(64px+env(safe-area-inset-bottom))] text-[var(--michio-text)] md:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 py-9 md:px-8 md:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.45fr_0.9fr_1.1fr_0.9fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Trang chủ Michio Japan">
              <Logo variant="icon" className="[&_img]:!h-10 [&_img]:!w-10" />
              <span className="leading-none"><span className="block text-lg font-bold tracking-[-0.035em] text-[var(--michio-primary)]">Michio Japan</span><span className="mt-1 block text-[10px] font-medium text-[var(--michio-text-muted)]">Đồ Nhật – Sống thật mỗi ngày</span></span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--michio-text-muted)]">Sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Tư vấn và đặt hàng trực tiếp qua Zalo hoặc Fanpage.</p>
            <div className="mt-3 text-sm text-[var(--michio-text-muted)]">
              <p>Hotline: <a href={LINKS.hotline} className="inline-flex min-h-11 items-center font-semibold text-[var(--michio-text)] hover:text-[var(--michio-primary)]">{LINKS.hotlineDisplay}</a></p>
              <p className="max-w-sm leading-6">Địa chỉ: {LINKS.address}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold">Michio Japan</h2>
            <ul className="mt-2">
              <li><Link href="/gioi-thieu" className={footerLinkClass}>Về Michio</Link></li>
              <li><Link href="/cua-hang" className={footerLinkClass}>Danh mục sản phẩm</Link></li>
              <li><Link href="/tin-tuc" className={footerLinkClass}>Bài viết</Link></li>
              <li><a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Mua sỉ</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold">Hỗ trợ khách hàng</h2>
            <ul className="mt-2">
              <li><Link href="/huong-dan-mua-hang" className={footerLinkClass}>Hướng dẫn mua hàng</Link></li>
              <li><Link href="/chinh-sach-van-chuyen" className={footerLinkClass}>Chính sách vận chuyển</Link></li>
              <li><Link href="/chinh-sach-doi-tra" className={footerLinkClass}>Chính sách đổi trả</Link></li>
              <li><Link href="/chinh-sach-quyen-rieng-tu" className={footerLinkClass}>Chính sách quyền riêng tư</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-sm font-bold">Kết nối với Michio</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>Facebook</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>Instagram</a>
            </div>
            <div className="mt-2 flex flex-col items-start">
              <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Chat Zalo →</a>
              <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Inbox Fanpage →</a>
              <a href={`mailto:${LINKS.email}`} className={`${footerLinkClass} break-all`}>{LINKS.email}</a>
            </div>
          </div>
        </div>

        <div className="my-7 h-px bg-[var(--michio-border)]" aria-hidden="true" />
        <div className="flex flex-col gap-1 text-xs leading-5 text-[var(--michio-text-subtle)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Michio Japan. Đồ Nhật – Sống thật mỗi ngày.</span>
          <span>Đặt hàng trực tiếp qua Zalo hoặc Fanpage.</span>
        </div>
      </div>
    </footer>
  );
}
