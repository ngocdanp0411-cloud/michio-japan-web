import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { getCategoriesWithProducts, getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-card";
import { absoluteUrl, limitDescription, limitTitle } from "@/lib/seo";

const storefrontCategories = getCategoriesWithProducts(CATEGORIES);
const PRODUCTS_PER_PAGE = 24;
const PROMOTION_BANNER = "/images/promotions/deal-nhat-xinh-yeu.webp";
const PROMOTION_ALT = "Deal Nhật Xinh Yêu – chăm da và làm đẹp nội địa Nhật, ưu đãi nổi bật";
const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  collagen: "my-pham-skincare",
  "cham-soc-da": "my-pham-skincare",
  "cham-soc-co-the": "dau-goi-sua-tam",
  "hang-tieu-dung": "do-tieu-dung",
};

type CategoryQuery = { sort?: string; page?: string };

function pageHref(slug: string, page: number, query: CategoryQuery) {
  const params = new URLSearchParams();
  if (query.sort) params.set("sort", query.sort);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return `/danh-muc/${slug}${search ? `?${search}` : ""}`;
}

export function generateStaticParams() {
  return storefrontCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return {};
  const title = limitTitle(`${cat.name} Nhật Bản`);
  const description = limitDescription(`Khám phá sản phẩm ${cat.name.toLowerCase()} Nhật Bản được Michio Japan chọn lọc cho nhu cầu chăm sóc mỗi ngày.`);
  return { title, description, alternates: { canonical: absoluteUrl(`/danh-muc/${slug}`) } };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<CategoryQuery> }) {
  const { slug } = await params;
  const query = await searchParams;
  const cat = CATEGORY_MAP[slug];
  const newSlug = LEGACY_CATEGORY_REDIRECTS[slug];
  if (!cat && newSlug) permanentRedirect(pageHref(newSlug, Number.parseInt(query.page ?? "1", 10), query));
  if (!cat) notFound();

  const allProducts = getProductsByCategory(slug);
  let sortedProducts = allProducts;
  if (query.sort === "price-asc") sortedProducts = [...sortedProducts].sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") sortedProducts = [...sortedProducts].sort((a, b) => b.price - a.price);
  if (query.sort === "popular") sortedProducts = [...sortedProducts].sort((a, b) => b.ratingCount - a.ratingCount);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  const requestedPage = Number.parseInt(query.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const preview = allProducts[0]?.image;
  const isSkincare = slug === "my-pham-skincare";

  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-white">
        <div className={`mx-auto grid max-w-[1280px] gap-4 px-4 py-5 md:items-center md:gap-8 md:py-7 ${isSkincare ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-[1fr_160px]"}`}>
          <div className={isSkincare ? "order-2 md:order-1" : undefined}>
            <nav aria-label="Breadcrumb" className="michio-caption flex flex-wrap items-center gap-2"><Link href="/" className="hover:text-[var(--michio-primary)]">Trang chủ</Link><span>/</span><Link href="/cua-hang" className="hover:text-[var(--michio-primary)]">Sản phẩm</Link><span>/</span><span>{cat.name}</span></nav>
            <h1 className="michio-display mt-3 text-[1.75rem] leading-tight md:text-4xl">{cat.name}</h1>
            <p className="michio-body mt-2 max-w-[55ch] text-sm">Khám phá {cat.name.toLowerCase()} Nhật Bản, chọn theo nhu cầu của bạn.</p>
          </div>
          <div className={`items-center justify-center overflow-hidden rounded-xl bg-white ${isSkincare ? "order-1 flex md:order-2" : "hidden h-28 p-2 md:flex"}`}>
            {isSkincare ? (
              <Image src={PROMOTION_BANNER} alt={PROMOTION_ALT} width={1672} height={941} preload sizes="(min-width: 1280px) 637px, (min-width: 768px) 52vw, calc(100vw - 32px)" className="aspect-[1672/941] h-auto w-full object-contain" />
            ) : preview ? (
              <Image src={preview} alt={`Sản phẩm ${cat.name}`} width={160} height={112} sizes="160px" className="h-full w-full object-contain" />
            ) : (
              <span className="michio-h2">{cat.name}</span>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-5 md:py-8">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-8">
          <aside className="h-fit lg:sticky lg:top-40">
            <div>
              <h2 className="text-sm font-semibold">Danh mục</h2>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {storefrontCategories.map((category) => <li key={category.slug}><Link href={`/danh-muc/${category.slug}`} aria-current={category.slug === slug ? "page" : undefined} className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 py-2 text-xs transition-colors hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)] lg:flex lg:rounded-lg lg:text-sm ${category.slug === slug ? "border-[var(--michio-primary)] bg-[var(--michio-primary-soft)] font-semibold text-[var(--michio-primary)]" : "border-[var(--michio-border)] bg-white text-[var(--michio-text-muted)]"}`}>{category.name} <span className="text-xs">({getProductsByCategory(category.slug).length})</span></Link></li>)}
              </ul>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--michio-border)] pb-4">
              <div><p className="text-sm text-[var(--michio-text-muted)]">Hiển thị <strong className="text-[var(--michio-text)]">{sortedProducts.length ? startIndex + 1 : 0}–{Math.min(startIndex + products.length, sortedProducts.length)}</strong>/{sortedProducts.length} sản phẩm</p></div>
              <form method="get" className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <label htmlFor="sort" className="w-full text-xs text-[var(--michio-text-muted)]">Sắp xếp sản phẩm</label>
                <select id="sort" name="sort" defaultValue={query.sort ?? ""} className="michio-input min-h-11 min-w-0 flex-1 rounded-lg px-3 text-base sm:flex-none"><option value="">Mặc định</option><option value="popular">Bán chạy</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option></select>
                <button type="submit" className="michio-btn-primary inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg px-4 text-sm">Áp dụng</button>
              </form>
            </div>
            <div className="mt-5">{products.length ? <ProductGrid products={products} columns="category" /> : <div className="rounded-md border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-10 text-center text-sm text-[var(--michio-text-muted)]">Chưa có sản phẩm trong danh mục này.</div>}</div>
            {totalPages > 1 && (
              <nav aria-label="Phân trang danh mục" className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--michio-border)] pt-6">
                {currentPage > 1 ? <Link href={pageHref(slug, currentPage - 1, query)} className="michio-btn-secondary inline-flex h-11 items-center justify-center rounded-md px-4 text-sm">← Trang trước</Link> : <span aria-hidden="true" />}
                <span className="michio-caption text-center">Trang {currentPage}/{totalPages}</span>
                {currentPage < totalPages ? <Link href={pageHref(slug, currentPage + 1, query)} className="michio-btn-primary inline-flex h-11 items-center justify-center rounded-md px-4 text-sm">Trang sau →</Link> : <span aria-hidden="true" />}
              </nav>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
