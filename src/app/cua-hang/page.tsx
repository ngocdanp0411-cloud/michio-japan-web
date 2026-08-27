import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";

export const metadata = { title: "Cửa hàng hàng Nhật nội địa" };

export default function ShopPage() {
  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 md:grid-cols-[1fr_1fr] md:items-center md:py-12">
          <div><p className="michio-eyebrow">Michio Japan / Khám phá sản phẩm</p><h1 className="michio-display mt-2 text-5xl uppercase md:text-6xl">Cửa hàng</h1><p className="michio-body mt-3 max-w-[52ch] text-base">Tất cả sản phẩm Nhật Bản được Michio Japan chọn lọc cho cuộc sống khỏe đẹp và những thói quen tốt mỗi ngày.</p></div>
          <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-md bg-white p-4"><Image src={PRODUCTS[0]?.image ?? "/images/brand/michio-authentic-logo.jpg"} alt="Sản phẩm Nhật Bản tại Michio Japan" width={640} height={420} sizes="(min-width: 768px) 50vw, 100vw" className="h-full max-h-[220px] w-full object-contain" /><span className="absolute bottom-3 right-3 rounded-full border-2 border-white bg-white p-1 shadow"><Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan" width={48} height={48} className="h-10 w-10 rounded-full object-cover" /></span></div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <nav aria-label="Danh mục sản phẩm" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">{CATEGORIES.map((category) => <Link key={category.slug} href={`/danh-muc/${category.slug}`} className="shrink-0 rounded-full border border-[var(--michio-border-strong)] bg-white px-4 py-2 text-sm font-semibold text-[var(--michio-text-muted)] transition-colors hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]">{category.name}</Link>)}</nav>
        <div className="mt-8 flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-4"><div><p className="michio-eyebrow">Tất cả sản phẩm</p><h2 className="michio-h2 mt-1 uppercase">Danh sách sản phẩm</h2></div><span className="michio-caption">{PRODUCTS.length} sản phẩm</span></div>
        <div className="mt-5"><ProductGrid products={PRODUCTS} columns="category" /></div>
      </main>
    </div>
  );
}
