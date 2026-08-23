import { PRODUCTS } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-card";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const results = query ? PRODUCTS.filter((p) => `${p.name} ${p.excerpt} ${p.category}`.toLowerCase().includes(query)) : [];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="font-display text-xl font-semibold">Tìm kiếm{query ? `: "${q}"` : ""}</h1>
      <form action="/tim-kiem" className="mt-3 flex gap-2">
        <input name="q" defaultValue={q} placeholder="Nhập từ khóa..." className="flex-1 rounded-full border bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--michio-deep-rose)]/20" />
        <button className="rounded-full bg-[var(--michio-deep-navy)] px-5 py-2.5 text-sm font-semibold text-white">Tìm</button>
      </form>
      <div className="mt-6">
        {!query ? (
          <div className="rounded-xl border bg-white p-10 text-center text-sm text-[var(--michio-taupe)]">Nhập từ khóa để tìm sản phẩm.</div>
        ) : results.length ? (
          <ProductGrid products={results} />
        ) : (
          <div className="rounded-xl border bg-white p-10 text-center text-sm">Không tìm thấy sản phẩm cho &quot;{q}&quot;.</div>
        )}
      </div>
    </div>
  );
}
