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
const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = { collagen: "my-pham-skincare", "cham-soc-da": "my-pham-skincare", "cham-soc-co-the": "dau-goi-sua-tam", "hang-tieu-dung": "do-tieu-dung" };
type CategoryQuery = { sort?: string; page?: string };

function pageHref(slug: string, page: number, query: CategoryQuery) {
  const params = new URLSearchParams();
  if (query.sort) params.set("sort", query.sort);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return `/danh-muc/${slug}${search ? `?${search}` : ""}`;
}

export function generateStaticParams() { return storefrontCategories.map((category) => ({ slug: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return {};
  return { title: limitTitle(`${cat.name} Nhật Bản`), description: limitDescription(`Khám phá sản phẩm ${cat.name.toLowerCase()} Nhật Bản được Michio Japan chọn lọc cho nhu cầu chăm sóc mỗi ngày.`), alternates: { canonical: absoluteUrl(`/danh-muc/${slug}`) } };
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
    <main className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-8 md:py-8">
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--michio-text-subtle)]"><Link href="/">Trang chủ</Link><span className="mx-2">›</span><Link href="/cua-hang">Danh mục</Link><span className="mx-2">›</span><span className="text-[var(--michio-primary)]">{cat.name}</span></nav>

      <section className="mt-4 overflow-hidden rounded-[16px] bg-[var(--michio-primary-soft)] md:grid md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="px-4 py-5 md:px-8"><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--michio-primary)]">Michio Japan</p><h1 className="mt-1 text-[1.65rem] font-bold tracking-[-0.035em] md:text-4xl">{cat.name}</h1><p className="mt-2 max-w-[52ch] text-sm leading-6 text-[var(--michio-text-muted)]">Khám phá {cat.name.toLowerCase()} Nhật Bản, chọn theo nhu cầu của bạn.</p></div>
        <div className="relative min-h-[150px] bg-white/55 md:min-h-[230px]">{isSkincare ? <Image src={PROMOTION_BANNER} alt="Deal Nhật Xinh Yêu – chăm da và làm đẹp nội địa Nhật" fill priority sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" /> : preview ? <Image src={preview} alt={`Sản phẩm ${cat.name}`} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-contain p-4" /> : null}</div>
      </section>

      <nav aria-label="Danh mục sản phẩm" className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">{storefrontCategories.map((category) => <Link key={category.slug} href={`/danh-muc/${category.slug}`} aria-current={category.slug === slug ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-3 text-xs font-medium ${category.slug === slug ? "border-[var(--michio-primary)] bg-[var(--michio-primary)] text-white" : "border-[var(--michio-border)] bg-white text-[var(--michio-text-muted)]"}`}>{category.name}</Link>)}</nav>

      <section className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--michio-border)] pb-4"><p className="text-sm text-[var(--michio-text-muted)]"><strong className="text-[var(--michio-text)]">{sortedProducts.length ? startIndex + 1 : 0}–{Math.min(startIndex + products.length, sortedProducts.length)}</strong>/{sortedProducts.length} sản phẩm</p><form method="get" className="flex items-end gap-2"><div><label htmlFor="sort" className="block text-[11px] text-[var(--michio-text-subtle)]">Sắp xếp</label><select id="sort" name="sort" defaultValue={query.sort ?? ""} className="michio-input mt-1 min-h-11 rounded-[10px] px-3 text-base"><option value="">Mặc định</option><option value="popular">Bán chạy</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option></select></div><button type="submit" className="michio-btn-primary inline-flex min-h-11 items-center rounded-[10px] px-4 text-sm">Áp dụng</button></form></div>
        <div className="mt-4">{products.length ? <ProductGrid products={products} /> : <div className="rounded-[14px] bg-[var(--michio-surface-muted)] p-10 text-center text-sm text-[var(--michio-text-muted)]">Chưa có sản phẩm trong danh mục này.</div>}</div>
      </section>

      {totalPages > 1 && <nav aria-label="Phân trang danh mục" className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--michio-border)] pt-6">{currentPage > 1 ? <Link href={pageHref(slug, currentPage - 1, query)} className="michio-btn-secondary inline-flex min-h-11 items-center rounded-[10px] px-4 text-sm">← Trang trước</Link> : <span aria-hidden="true" />}<span className="text-xs text-[var(--michio-text-subtle)]">{currentPage}/{totalPages}</span>{currentPage < totalPages ? <Link href={pageHref(slug, currentPage + 1, query)} className="michio-btn-primary inline-flex min-h-11 items-center rounded-[10px] px-4 text-sm">Trang sau →</Link> : <span aria-hidden="true" />}</nav>}
    </main>
  );
}
