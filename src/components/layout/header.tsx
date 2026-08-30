import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";
import { ProductMenu } from "@/components/layout/product-menu";
import { CATEGORIES } from "@/lib/categories";
import { getCategoriesWithProducts } from "@/lib/products";

const primaryNav: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Trang chủ", href: "/" },
  { label: "Mua sỉ", href: LINKS.zalo, external: true },
  { label: "Bài viết", href: "/tin-tuc" },
  { label: "Về Michio", href: "/gioi-thieu" },
  { label: "Chính sách", href: "/chinh-sach-quyen-rieng-tu" },
  { label: "Liên hệ", href: LINKS.messenger },
];
const storefrontCategories = getCategoriesWithProducts(CATEGORIES);

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_12px_rgba(17,17,22,0.06)]">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex min-h-16 items-center gap-3 py-2 md:min-h-[76px] md:gap-7 md:py-2.5">
          <Link href="/" aria-label="Trang chủ Michio Japan" className="shrink-0">
            <span className="md:hidden"><Logo variant="icon" /></span>
            <span className="hidden md:inline-flex"><Logo variant="horizontal" /></span>
          </Link>
          <form action="/tim-kiem" method="get" role="search" className="flex min-w-0 max-w-[530px] flex-1 items-center gap-2 rounded-md border border-[var(--michio-border-strong)] bg-white pl-3 md:px-3 md:py-2">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="shrink-0 text-[var(--michio-text-subtle)]" aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            <input name="q" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm…" autoComplete="off" className="michio-input min-h-0 min-w-0 flex-1 border-0 bg-transparent px-0 text-sm outline-none focus-visible:shadow-none" />
            <button type="submit" aria-label="Tìm kiếm" className="michio-btn-navy inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-r-md text-white md:h-auto md:w-auto md:bg-transparent md:text-[var(--michio-text)] md:hover:bg-transparent md:hover:text-[var(--michio-primary)]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            </button>
          </form>
          <div className="ml-auto hidden items-center gap-3 text-xs font-semibold text-[var(--michio-text)] md:flex md:gap-5">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="hidden items-center gap-1.5 transition-colors hover:text-[var(--michio-primary)] sm:inline-flex"><span className="h-2.5 w-2.5 rounded-full bg-[var(--michio-zalo)]" aria-hidden="true" /> Zalo</a>
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="hidden items-center gap-1.5 transition-colors hover:text-[var(--michio-primary)] sm:inline-flex"><span className="h-2.5 w-2.5 rounded-full bg-[var(--michio-primary)]" aria-hidden="true" /> Inbox</a>
            <a href={LINKS.hotline} className="michio-btn-primary inline-flex h-10 items-center rounded-md px-3 text-[11px] md:px-5 md:text-xs">Hotline: {LINKS.hotlineDisplay}</a>
          </div>
        </div>
      </div>
      <nav aria-label="Điều hướng chính" className="bg-[var(--michio-navy)] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-0 px-2 md:px-4">
          {primaryNav.slice(0, 1).map((item) => {
            const className = "hidden shrink-0 border-b-2 border-transparent px-4 py-3 text-xs font-semibold uppercase transition-colors hover:border-[var(--michio-primary)] hover:bg-white/5 hover:text-white focus-visible:outline-white md:inline-flex md:px-6 md:text-sm";
            return <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
          <ProductMenu categories={storefrontCategories} />
          {primaryNav.slice(1).map((item) => {
            const className = `shrink-0 border-b-2 border-transparent px-3 py-3 text-[11px] font-semibold uppercase transition-colors hover:border-[var(--michio-primary)] hover:bg-white/5 hover:text-white focus-visible:outline-white md:px-6 md:text-sm ${item.label === "Mua sỉ" ? "inline-flex" : "hidden md:inline-flex"}`;
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
