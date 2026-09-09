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

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  return (
    <form action="/tim-kiem" method="get" role="search" className={`flex min-w-0 items-center border border-[var(--michio-border-strong)] bg-white focus-within:border-[var(--michio-text)] ${mobile ? "h-12" : "h-11 max-w-[520px] flex-1"}`}>
      <input name="q" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm, thương hiệu" autoComplete="off" className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base outline-none placeholder:text-[var(--michio-text-subtle)]" />
      <button type="submit" aria-label="Tìm kiếm" className="inline-flex h-full w-12 shrink-0 items-center justify-center border-l border-[var(--michio-border)] text-[var(--michio-text)] transition-colors duration-200 hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)] motion-reduce:transition-none">
        <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><circle cx={11} cy={11} r={6.5} /><path d="m16 16 4.5 4.5" /></svg>
      </button>
    </form>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--michio-border)] bg-white text-[var(--michio-text)]">
      <div className="mx-auto max-w-[1280px] px-4 lg:hidden">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-2">
          <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          <Link href="/" aria-label="Trang chủ Michio Japan" className="flex min-w-0 items-center justify-center gap-2">
            <Logo variant="icon" />
            <span className="min-w-0 leading-none"><span className="block whitespace-nowrap text-[13px] font-semibold tracking-[0.08em]">MICHIO JAPAN</span><span className="mt-1 block whitespace-nowrap text-[9px] tracking-[0.08em] text-[var(--michio-text-subtle)]">ĐỒ NHẬT MỖI NGÀY</span></span>
          </Link>
          <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold text-[var(--michio-primary)]">Zalo</a>
        </div>
        <div className="pb-3"><SearchForm mobile /></div>
      </div>

      <div className="mx-auto hidden max-w-[1280px] items-center gap-7 px-8 py-4 lg:flex">
        <Link href="/" aria-label="Trang chủ Michio Japan" className="flex shrink-0 items-center gap-3">
          <Logo variant="horizontal" />
          <span className="leading-none"><span className="block text-base font-semibold tracking-[0.08em]">MICHIO JAPAN</span><span className="mt-1 block text-[10px] tracking-[0.1em] text-[var(--michio-text-subtle)]">ĐỒ NHẬT CHO MỖI NGÀY</span></span>
        </Link>
        <SearchForm />
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center border-b border-[var(--michio-primary)] text-sm font-semibold text-[var(--michio-primary)]">Tư vấn Zalo</a>
        <a href={LINKS.hotline} className="flex min-h-11 shrink-0 flex-col justify-center text-right text-xs leading-5 text-[var(--michio-text-muted)]"><span className="block">Hotline</span><span className="font-semibold text-[var(--michio-text)]">{LINKS.hotlineDisplay}</span></a>
      </div>

      <nav aria-label="Điều hướng chính" className="hidden border-t border-[var(--michio-border)] lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center px-8">
          {primaryNav.slice(0, 1).map((item) => <Link key={item.label} href={item.href} className="inline-flex min-h-12 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]">{item.label}</Link>)}
          <ProductMenu categories={storefrontCategories} navigationItems={primaryNav} />
          {primaryNav.slice(1).map((item) => {
            const className = "inline-flex min-h-12 items-center border-b-2 border-transparent px-4 text-sm font-medium transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]";
            return item.external ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{item.label}</a> : <Link key={item.label} href={item.href} className={className}>{item.label}</Link>;
          })}
        </div>
      </nav>
    </header>
  );
}
