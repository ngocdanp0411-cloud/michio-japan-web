import { ProductGrid } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";

export const metadata = { title: "Cửa hàng" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="font-display text-2xl font-semibold tracking-wide">Cửa hàng</h1>
      <p className="mt-1 text-sm text-[var(--michio-deep-navy)]/60">Tất cả sản phẩm Michio Japan — chọn đúng đồ Nhật, sống thật mỗi ngày.</p>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/danh-muc/${c.slug}`} className="shrink-0 rounded-full border bg-white px-3 py-1.5 text-sm hover:border-[var(--michio-deep-rose)]">
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <ProductGrid products={PRODUCTS} />
      </div>
    </div>
  );
}
