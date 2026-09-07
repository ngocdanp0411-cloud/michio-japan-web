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
const mobilePrimaryNav = new Set(["Bài viết", "Liên hệ"]);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--michio-border)] bg-white text-[var(--michio-text)]">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex min-h-16 items-center gap-3 py-2 md:min-h-[88px] md:gap-6 md:py-3">
          <Link href="/" aria-label="Trang chủ Michio Japan" className="flex shrink-0 items-center gap-3">
            <span className="md:hidden"><Logo variant="icon" /></span>
            <span className="hidden md:inline-flex"><Logo variant="horizontal" /></span>
            <span className="hidden md:block">
              <span className="block text-lg font-bold tracking-[0.08em]">MICHIO JAPAN</span>
              <span className="mt-1 block text-[11px] tracking-[0.12em] text-[var(--michio-text-subtle)]">HÀNG NHẬT NỘI ĐỊA</span>
            </span>
          </Link>
          <form action="/tim-kiem" method="get" role="search" className="flex min-w-0 max-w-[530px] flex-1 items-center rounded-lg border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] pl-3 focus-within:border-[var(--michio-primary)]">
            <input name="q" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm…" autoComplete="off" className="h-11 min-w-0 flex-1 border-0 bg-transparent text-base outline-none" />
            <button type="submit" aria-label="Tìm kiếm" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-r-lg text-[var(--michio-text)] hover:text-[var(--michio-primary)]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            </button>
          </form>
          <div className="ml-auto hidden shrink-0 items-center gap-5 md:flex">
            <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center text-sm font-medium hover:text-[var(--michio-primary)] xl:inline-flex">Tư vấn qua Zalo</a>
            <a href={LINKS.hotline} className="flex min-h-11 flex-col justify-center hover:text-[var(--michio-primary)]"><span className="text-[11px] text-[var(--michio-text-subtle)]">Hotline tư vấn</span><span className="mt-0.5 text-sm font-semibold tracking-wide">{LINKS.hotlineDisplay}</span></a>
          </div>
        </div>
      </div>
      <nav aria-label="Điều hướng chính" className="border-t border-[var(--michio-border)] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-0 px-2 md:gap-1 md:px-4">
          {primaryNav.slice(0, 1).map((item) => {
            const className = "hidden min-h-12 shrink-0 items-center border-b-2 border-transparent px-4 text-sm font-medium hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)] lg:inline-flex";
            return <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
          <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          <Link href="/cua-hang" className="inline-flex min-h-11 shrink-0 items-center px-3 text-xs font-semibold text-[var(--michio-primary)] lg:hidden">Cửa hàng</Link>
          {primaryNav.slice(1).map((item) => {
            const mobileVisibility = mobilePrimaryNav.has(item.label) ? "inline-flex" : "hidden lg:inline-flex";
            const className = `${mobileVisibility} min-h-11 shrink-0 items-center border-b-2 border-transparent px-3 text-xs font-medium hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)] lg:min-h-12 lg:px-4 lg:text-sm`;
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
