import Link from "next/link";
import { redirect } from "next/navigation";
import { CategoryRail } from "@/components/product/category-rail";
import { ProductGrid } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/products";

const PRODUCTS_PER_PAGE = 24;

function parsePage(value: string | undefined, totalPages: number) {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.min(parsed, totalPages);
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const query = await searchParams;
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE));
  const currentPage = parsePage(rawPage, totalPages);
  return { title: currentPage === 1 ? "Cửa hàng hàng Nhật nội địa" : `Cửa hàng hàng Nhật nội địa — Trang ${currentPage}`, alternates: { canonical: currentPage === 1 ? "/cua-hang" : `/cua-hang?page=${currentPage}` } };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const query = await searchParams;
  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE));
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const currentPage = parsePage(rawPage, totalPages);
  const isCanonicalPage = query.page === undefined ? currentPage === 1 : typeof query.page === "string" && currentPage > 1 && query.page === String(currentPage);
  if (!isCanonicalPage) redirect(currentPage === 1 ? "/cua-hang" : `/cua-hang?page=${currentPage}`);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = PRODUCTS.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const first = PRODUCTS.length ? startIndex + 1 : 0;
  const last = Math.min(startIndex + PRODUCTS_PER_PAGE, PRODUCTS.length);

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-8 md:py-8">
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--michio-text-subtle)]"><Link href="/">Trang chủ</Link><span className="mx-2">›</span><span className="text-[var(--michio-primary)]">Danh mục sản phẩm</span></nav>
      <header className="mt-4"><h1 className="text-[1.65rem] font-bold tracking-[-0.035em] md:text-4xl">Danh mục sản phẩm</h1><p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--michio-text-muted)]">Chọn nhóm sản phẩm phù hợp với nhu cầu của bạn.</p></header>

      <section aria-label="Các danh mục" className="mt-5 max-w-3xl"><CategoryRail rows /></section>

      <section aria-labelledby="all-products-title" className="mt-9 border-t border-[var(--michio-border)] pt-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-medium text-[var(--michio-primary)]">Trang {currentPage}/{totalPages}</p><h2 id="all-products-title" className="mt-1 text-xl font-bold tracking-[-0.025em]">Tất cả sản phẩm</h2></div><span className="text-xs tabular-nums text-[var(--michio-text-subtle)]">{first}–{last}/{PRODUCTS.length}</span></div>
        <div className="mt-4"><ProductGrid products={visibleProducts} /></div>
      </section>

      {totalPages > 1 && <nav aria-label="Phân trang sản phẩm" className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--michio-border)] pt-6">
        {currentPage > 1 ? <Link href={currentPage === 2 ? "/cua-hang" : `/cua-hang?page=${currentPage - 1}`} prefetch={false} rel="prev" className="michio-btn-secondary inline-flex min-h-11 items-center justify-center rounded-[10px] px-4 text-sm">← Trang trước</Link> : <span aria-hidden="true" />}
        <span className="text-xs text-[var(--michio-text-subtle)]">{currentPage}/{totalPages}</span>
        {currentPage < totalPages ? <Link href={`/cua-hang?page=${currentPage + 1}`} prefetch={false} rel="next" className="michio-btn-primary inline-flex min-h-11 items-center justify-center rounded-[10px] px-4 text-sm">Trang sau →</Link> : <span aria-hidden="true" />}
      </nav>}
    </main>
  );
}
