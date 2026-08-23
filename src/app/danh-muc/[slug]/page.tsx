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
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="rounded-xl border bg-white p-5">
        <div className="text-xs tracking-[0.14em] text-[var(--michio-taupe)]">DANH MỤC</div>
        <h1 className="font-display text-2xl font-bold tracking-wide">{cat.name}</h1>
        <p className="mt-1 text-sm text-[var(--michio-deep-navy)]/60">{products.length} sản phẩm • Chọn đúng đồ Nhật – Sống thật mỗi ngày.</p>
      </div>
      <div className="mt-6">
        {products.length ? <ProductGrid products={products} /> : <div className="rounded-xl border bg-white p-10 text-center text-sm">Chưa có sản phẩm trong danh mục này.</div>}
      </div>
    </div>
  );
}
