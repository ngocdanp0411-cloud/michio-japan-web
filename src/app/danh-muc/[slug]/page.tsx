import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-card";
import { absoluteUrl, limitDescription, limitTitle } from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return {};
  const title = limitTitle(`${cat.name} Nhật Bản`);
  const description = limitDescription(`Khám phá sản phẩm ${cat.name.toLowerCase()} Nhật Bản được Michio Japan chọn lọc cho nhu cầu chăm sóc mỗi ngày.`);
  return { title, description, alternates: { canonical: absoluteUrl(`/danh-muc/${slug}`) } };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string; max?: string }> }) {
  const { slug } = await params;
  const query = await searchParams;
  const cat = CATEGORY_MAP[slug];
  if (!cat) notFound();

  const allProducts = getProductsByCategory(slug);
  const maxPrice = query.max ? Number(query.max) : undefined;
  let products = maxPrice ? allProducts.filter((product) => product.price <= maxPrice) : allProducts;
  if (query.sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  if (query.sort === "popular") products = [...products].sort((a, b) => b.ratingCount - a.ratingCount);
  const preview = allProducts[0]?.image;

  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-4 py-7 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12 md:py-10">
          <div>
            <nav aria-label="Breadcrumb" className="michio-caption flex flex-wrap items-center gap-2"><Link href="/" className="hover:text-[var(--michio-primary)]">Trang chủ</Link><span>/</span><Link href="/cua-hang" className="hover:text-[var(--michio-primary)]">Sản phẩm</Link><span>/</span><span>{cat.name}</span></nav>
            <p className="michio-eyebrow mt-6">Danh mục / Michio Japan</p>
            <h1 className="michio-display mt-2 text-5xl uppercase md:text-6xl">{cat.name}</h1>
            <p className="michio-body mt-3 max-w-[50ch]">Sản phẩm {cat.name.toLowerCase()} Nhật Bản được chọn lọc theo nhu cầu thật, thông tin rõ ràng và tư vấn tận tâm.</p>
          </div>
          <div className="relative flex min-h-[190px] items-center justify-center overflow-hidden rounded-md bg-white p-4 md:min-h-[245px]">
            {preview ? <Image src={preview} alt={`Sản phẩm ${cat.name}`} width={640} height={420} sizes="(min-width: 768px) 48vw, 100vw" className="h-full max-h-[220px] w-full object-contain" /> : <span className="michio-h2">{cat.name}</span>}
            <span className="absolute bottom-3 right-3 rounded-full border-2 border-white bg-white p-1 shadow"><Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan" width={48} height={48} className="h-10 w-10 rounded-full object-cover" /></span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-md border border-[var(--michio-border)] bg-white p-4 lg:sticky lg:top-28">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.14em]">Danh mục</h2>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.map((category) => <li key={category.slug}><Link href={`/danh-muc/${category.slug}`} className={`text-sm transition-colors hover:text-[var(--michio-primary)] ${category.slug === slug ? "font-bold text-[var(--michio-primary)]" : "text-[var(--michio-text-muted)]"}`}>{category.name} <span className="text-xs text-[var(--michio-text-subtle)]">({getProductsByCategory(category.slug).length})</span></Link></li>)}
              </ul>
            </div>
            <div className="my-5 h-px bg-[var(--michio-border)]" />
            <form method="get" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em]">Khoảng giá</h2>
              {[{ label: "Tất cả", value: "" }, { label: "Dưới 200.000 ₫", value: "200000" }, { label: "200.000 – 500.000 ₫", value: "500000" }, { label: "500.000 – 1.000.000 ₫", value: "1000000" }].map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2 text-xs text-[var(--michio-text-muted)]"><input type="radio" name="max" value={option.value} defaultChecked={(query.max ?? "") === option.value} /> {option.label}</label>)}
              <input type="hidden" name="sort" value={query.sort ?? ""} />
              <button type="submit" className="michio-btn-primary mt-2 inline-flex h-10 w-full items-center justify-center rounded text-xs uppercase">Áp dụng</button>
            </form>
          </aside>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--michio-border)] pb-4">
              <div><p className="text-sm text-[var(--michio-text-muted)]">Hiển thị <strong className="text-[var(--michio-text)]">{products.length}</strong>/{allProducts.length} sản phẩm</p></div>
              <form method="get" className="flex items-center gap-2 text-xs"><label htmlFor="sort" className="text-[var(--michio-text-subtle)]">Sắp xếp:</label><select id="sort" name="sort" defaultValue={query.sort ?? ""} className="michio-input h-10 min-h-0 rounded px-3 text-xs"><option value="">Mặc định</option><option value="popular">Bán chạy</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option></select>{query.max && <input type="hidden" name="max" value={query.max} />}<button type="submit" className="sr-only">Áp dụng sắp xếp</button></form>
            </div>
            <div className="mt-5">{products.length ? <ProductGrid products={products} columns="category" /> : <div className="rounded-md border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-10 text-center text-sm text-[var(--michio-text-muted)]">Chưa có sản phẩm trong khoảng giá này.</div>}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
