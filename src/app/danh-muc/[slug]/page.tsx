import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-card";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return {};
  return { title: cat.name };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) notFound();
  const products = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 md:py-14">
      <header className="border-l-2 border-[var(--michio-primary)] pl-5 md:pl-7">
        <p className="michio-eyebrow">Danh mục / Michio Japan</p>
        <h1 className="michio-h1 mt-3">{cat.name}</h1>
        <p className="michio-body mt-4 max-w-[60ch]">{products.length} sản phẩm được chọn lọc — Chọn đúng đồ Nhật, sống thật mỗi ngày.</p>
      </header>
      <div className="mt-10">
        {products.length ? <ProductGrid products={products} /> : <div className="border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-10 text-center text-sm text-[var(--michio-text-muted)]">Chưa có sản phẩm trong danh mục này.</div>}
      </div>
    </div>
  );
}
