import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductGrid } from "@/components/product/product-card";
import { getCategoriesWithProducts, PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";

const PRODUCTS_PER_PAGE = 24;
const storefrontCategories = getCategoriesWithProducts(CATEGORIES);

function parsePage(value: string | undefined, totalPages: number) {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.min(parsed, totalPages);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const query = await searchParams;
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE));
  const currentPage = parsePage(rawPage, totalPages);

  return {
    title: currentPage === 1 ? "Cửa hàng hàng Nhật nội địa" : `Cửa hàng hàng Nhật nội địa — Trang ${currentPage}`,
    alternates: { canonical: currentPage === 1 ? "/cua-hang" : `/cua-hang?page=${currentPage}` },
  };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const query = await searchParams;
  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE));
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const currentPage = parsePage(rawPage, totalPages);
  const isCanonicalPage = query.page === undefined
    ? currentPage === 1
    : typeof query.page === "string" && currentPage > 1 && query.page === String(currentPage);

  if (!isCanonicalPage) {
    redirect(currentPage === 1 ? "/cua-hang" : `/cua-hang?page=${currentPage}`);
  }

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = PRODUCTS.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const firstProductNumber = PRODUCTS.length ? startIndex + 1 : 0;
  const lastProductNumber = Math.min(startIndex + PRODUCTS_PER_PAGE, PRODUCTS.length);

  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 md:grid-cols-[1fr_1fr] md:items-center md:py-12">
          <div><p className="michio-eyebrow">Michio Japan / Khám phá sản phẩm</p><h1 className="michio-display mt-2 text-5xl uppercase md:text-6xl">Cửa hàng</h1><p className="michio-body mt-3 max-w-[52ch] text-base">Tất cả sản phẩm Nhật Bản được Michio Japan chọn lọc cho cuộc sống khỏe đẹp và những thói quen tốt mỗi ngày.</p></div>
          <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-md bg-white p-4"><Image src={PRODUCTS[0]?.image ?? "/images/brand/michio-authentic-logo.jpg"} alt="Sản phẩm Nhật Bản tại Michio Japan" width={640} height={420} sizes="(min-width: 768px) 50vw, 100vw" className="h-full max-h-[220px] w-full object-contain" /><span className="absolute bottom-3 right-3 rounded-full border-2 border-white bg-white p-1 shadow"><Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan" width={48} height={48} className="h-10 w-10 rounded-full object-cover" /></span></div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <nav aria-label="Danh mục sản phẩm" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">{storefrontCategories.map((category) => <Link key={category.slug} href={`/danh-muc/${category.slug}`} className="shrink-0 rounded-full border border-[var(--michio-border-strong)] bg-white px-4 py-2 text-sm font-semibold text-[var(--michio-text-muted)] transition-colors hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]">{category.name}</Link>)}</nav>
        <div className="mt-8 flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-4"><div><p className="michio-eyebrow">Tất cả sản phẩm</p><h2 className="michio-h2 mt-1 uppercase">Danh sách sản phẩm</h2></div><span className="michio-caption text-right">{firstProductNumber}–{lastProductNumber}/{PRODUCTS.length} sản phẩm</span></div>
        <div className="mt-5"><ProductGrid products={visibleProducts} columns="category" /></div>

        {totalPages > 1 && (
          <nav aria-label="Phân trang sản phẩm" className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--michio-border)] pt-6">
            {currentPage > 1 ? (
              <Link href={currentPage === 2 ? "/cua-hang" : `/cua-hang?page=${currentPage - 1}`} prefetch={false} rel="prev" className="michio-btn-secondary inline-flex h-11 items-center justify-center rounded-md px-4 text-sm">← Trang trước</Link>
            ) : <span aria-hidden="true" />}
            <span className="michio-caption text-center">Trang {currentPage}/{totalPages}</span>
            {currentPage < totalPages ? (
              <Link href={`/cua-hang?page=${currentPage + 1}`} prefetch={false} rel="next" className="michio-btn-primary inline-flex h-11 items-center justify-center rounded-md px-4 text-sm">Trang sau →</Link>
            ) : <span aria-hidden="true" />}
          </nav>
        )}
      </main>
    </div>
  );
}
