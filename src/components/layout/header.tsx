import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";
import { ProductMenu } from "@/components/layout/product-menu";

const primaryNav: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Trang chủ", href: "/" },
  { label: "Mua sỉ", href: LINKS.zalo, external: true },
  { label: "Bài viết", href: "/tin-tuc" },
  { label: "Về Michio", href: "/gioi-thieu" },
  { label: "Chính sách", href: "/chinh-sach-quyen-rieng-tu" },
  { label: "Liên hệ", href: LINKS.messenger },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_12px_rgba(17,17,22,0.06)]">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex min-h-[76px] items-center gap-4 py-2.5 md:gap-7">
          <Link href="/" aria-label="Trang chủ Michio Japan" className="shrink-0">
            <Logo variant="horizontal" />
          </Link>
          <form action="/tim-kiem" method="get" className="hidden min-w-0 max-w-[530px] flex-1 items-center gap-2 rounded-md border border-[var(--michio-border-strong)] bg-white px-3 py-2 md:flex">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="shrink-0 text-[var(--michio-text-subtle)]" aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            <input name="q" placeholder="Tìm sản phẩm..." className="michio-input min-h-0 min-w-0 flex-1 border-0 bg-transparent px-0 text-sm outline-none focus-visible:shadow-none" />
            <button type="submit" aria-label="Tìm kiếm" className="text-[var(--michio-text)] transition-colors hover:text-[var(--michio-primary)]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            </button>
          </form>
          <div className="ml-auto flex items-center gap-3 text-xs font-semibold text-[var(--michio-text)] md:gap-5">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="hidden items-center gap-1.5 transition-colors hover:text-[var(--michio-primary)] sm:inline-flex"><span className="h-2.5 w-2.5 rounded-full bg-[var(--michio-zalo)]" aria-hidden="true" /> Zalo</a>
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="hidden items-center gap-1.5 transition-colors hover:text-[var(--michio-primary)] sm:inline-flex"><span className="h-2.5 w-2.5 rounded-full bg-[var(--michio-primary)]" aria-hidden="true" /> Inbox</a>
            <a href={LINKS.hotline} className="michio-btn-primary inline-flex h-10 items-center rounded-md px-3 text-[11px] md:px-5 md:text-xs">Hotline: {LINKS.hotlineDisplay}</a>
          </div>
        </div>
        <form action="/tim-kiem" method="get" className="mb-3 flex items-center gap-2 rounded-md border border-[var(--michio-border-strong)] bg-white px-3 py-2 md:hidden">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="shrink-0 text-[var(--michio-text-subtle)]" aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
          <input name="q" placeholder="Tìm sản phẩm..." className="michio-input min-h-0 min-w-0 flex-1 border-0 bg-transparent px-0 text-sm outline-none focus-visible:shadow-none" autoComplete="off" />
          <button type="submit" className="michio-btn-navy rounded px-3 py-1.5 text-xs">Tìm</button>
        </form>
      </div>
      <nav aria-label="Điều hướng chính" className="bg-[var(--michio-navy)] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-0 overflow-x-auto px-4 scrollbar-none">
          {primaryNav.slice(0, 1).map((item) => {
            const className = "shrink-0 border-b-2 border-transparent px-4 py-3 text-xs font-semibold uppercase transition-colors hover:border-[var(--michio-primary)] hover:bg-white/5 hover:text-white focus-visible:outline-white md:px-6 md:text-sm";
            return <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
          <ProductMenu />
          {primaryNav.slice(1).map((item) => {
            const className = "shrink-0 border-b-2 border-transparent px-4 py-3 text-xs font-semibold uppercase transition-colors hover:border-[var(--michio-primary)] hover:bg-white/5 hover:text-white focus-visible:outline-white md:px-6 md:text-sm";
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
