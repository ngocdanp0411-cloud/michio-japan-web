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
  { label: "Liên hệ", href: LINKS.messenger, external: true },
];
const storefrontCategories = getCategoriesWithProducts(CATEGORIES);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--michio-border)] bg-white text-[var(--michio-text)]">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-2 lg:flex lg:min-h-[88px] lg:gap-6 lg:py-3">
          <Link href="/" aria-label="Trang chủ Michio Japan" className="flex min-w-0 shrink-0 items-center gap-2 lg:gap-3">
            <span className="lg:hidden"><Logo variant="icon" /></span>
            <span className="hidden lg:inline-flex"><Logo variant="horizontal" /></span>
            <span>
              <span className="block text-[15px] font-bold tracking-[0.06em] lg:text-lg">MICHIO JAPAN</span>
              <span className="mt-0.5 block text-[10px] tracking-[0.1em] text-[var(--michio-text-subtle)] lg:mt-1 lg:text-[11px]">ĐỒ NHẬT CHO MỖI NGÀY</span>
            </span>
          </Link>
          <div className="justify-self-end lg:hidden"><ProductMenu categories={storefrontCategories} navigationItems={primaryNav} /></div>
          <form action="/tim-kiem" method="get" role="search" className="col-span-2 flex min-w-0 flex-1 items-center rounded-lg border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] pl-3 focus-within:border-[var(--michio-primary)] lg:max-w-[530px]">
            <input name="q" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm, thương hiệu…" autoComplete="off" className="h-11 min-w-0 flex-1 border-0 bg-transparent text-base outline-none" />
            <button type="submit" aria-label="Tìm kiếm" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-r-lg text-[var(--michio-text)] hover:text-[var(--michio-primary)]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            </button>
          </form>
          <div className="ml-auto hidden shrink-0 items-center gap-5 lg:flex">
            <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center text-sm font-medium hover:text-[var(--michio-primary)] xl:inline-flex">Tư vấn qua Zalo</a>
            <a href={LINKS.hotline} className="flex min-h-11 flex-col justify-center hover:text-[var(--michio-primary)]"><span className="text-[11px] text-[var(--michio-text-subtle)]">Hotline tư vấn</span><span className="mt-0.5 text-sm font-semibold tracking-wide">{LINKS.hotlineDisplay}</span></a>
          </div>
        </div>
      </div>
      <nav aria-label="Điều hướng chính" className="hidden border-t border-[var(--michio-border)] bg-white lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center gap-0 px-2 md:gap-1 md:px-4">
          {primaryNav.slice(0, 1).map((item) => {
            const className = "hidden min-h-12 shrink-0 items-center border-b-2 border-transparent px-4 text-sm font-medium hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)] lg:inline-flex";
            return <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
          <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          {primaryNav.slice(1).map((item) => {
            const className = "inline-flex min-h-12 shrink-0 items-center border-b-2 border-transparent px-4 text-sm font-medium hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]";
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
