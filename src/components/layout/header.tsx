import Link from "next/link";
import { ProductMenu } from "@/components/layout/product-menu";
import { Logo } from "@/components/ui/logo";
import { CATEGORIES } from "@/lib/categories";
import { LINKS } from "@/lib/links";
import { getCategoriesWithProducts } from "@/lib/products";

const primaryNav: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Trang chủ", href: "/" },
  { label: "Danh mục sản phẩm", href: "/cua-hang" },
  { label: "Mua sỉ", href: LINKS.zalo, external: true },
  { label: "Bài viết", href: "/tin-tuc" },
  { label: "Về Michio", href: "/gioi-thieu" },
  { label: "Chính sách", href: "/chinh-sach-quyen-rieng-tu" },
  { label: "Liên hệ", href: LINKS.messenger, external: true },
];

const storefrontCategories = getCategoriesWithProducts(CATEGORIES);

function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="m16 16 4.3 4.3" />
    </svg>
  );
}

function Brand() {
  return (
    <Link href="/" aria-label="Trang chủ Michio Japan" className="flex min-w-0 items-center gap-2">
      <Logo variant="icon" className="[&_img]:!h-9 [&_img]:!w-9" />
      <span className="min-w-0 leading-none">
        <span className="block whitespace-nowrap text-[17px] font-bold tracking-[-0.035em] text-[var(--michio-primary)] md:text-lg">Michio Japan</span>
        <span className="mt-1 block whitespace-nowrap text-[9px] font-medium text-[var(--michio-text-muted)]">Đồ Nhật – Sống thật mỗi ngày</span>
      </span>
    </Link>
  );
}

function SearchForm({ desktop = false }: { desktop?: boolean }) {
  return (
    <form action="/tim-kiem" method="get" role="search" className={`group flex min-w-0 items-center rounded-full border border-transparent bg-[var(--michio-surface-muted)] focus-within:border-[var(--michio-primary)] focus-within:bg-white ${desktop ? "h-11 max-w-[440px] flex-1" : "h-11 w-full"}`}>
      <span className="ml-3.5 shrink-0 text-[var(--michio-text)]"><SearchIcon /></span>
      <input name="q" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm, thương hiệu..." autoComplete="off" className="h-full min-w-0 flex-1 border-0 bg-transparent px-2.5 text-base text-[var(--michio-text)] outline-none placeholder:text-sm placeholder:text-[var(--michio-text-subtle)]" />
      <button type="submit" className="inline-flex h-full min-w-11 shrink-0 items-center justify-center rounded-full px-3 text-xs font-semibold text-[var(--michio-primary)] opacity-0 transition-opacity group-focus-within:opacity-100 motion-reduce:transition-none">Tìm</button>
    </form>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--michio-border)] bg-white/95 text-[var(--michio-text)] backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-4 lg:hidden">
        <div className="flex min-h-16 items-center justify-between gap-2">
          <Brand />
          <div className="flex shrink-0 items-center gap-1">
            <Link href="/tim-kiem" aria-label="Mở trang tìm kiếm" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]"><SearchIcon /></Link>
            <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          </div>
        </div>
        <div className="pb-3"><SearchForm /></div>
      </div>

      <div className="mx-auto hidden max-w-[1280px] items-center gap-7 px-8 py-3 lg:flex">
        <Brand />
        <SearchForm desktop />
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[var(--michio-primary-soft)] px-5 text-sm font-semibold text-[var(--michio-primary)] hover:bg-[var(--michio-primary)] hover:text-white">Tư vấn Zalo</a>
        <a href={LINKS.hotline} className="flex min-h-11 shrink-0 flex-col justify-center text-right text-xs leading-5 text-[var(--michio-text-muted)]"><span>Hotline</span><span className="font-semibold text-[var(--michio-text)]">{LINKS.hotlineDisplay}</span></a>
      </div>

      <nav aria-label="Điều hướng chính" className="hidden border-t border-[var(--michio-border)] lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center px-8">
          <Link href="/" className="inline-flex min-h-12 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]">Trang chủ</Link>
          <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          {primaryNav.slice(2).map((item) => {
            const className = "inline-flex min-h-12 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]";
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
