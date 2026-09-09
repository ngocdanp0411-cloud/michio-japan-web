import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";
import { PRODUCTS, formatPrice } from "@/lib/products";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const results = query ? PRODUCTS.filter((product) => `${product.name} ${product.excerpt} ${product.category}`.toLowerCase().includes(query)) : [];

  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-5 md:px-8 md:py-8">
      <h1 className="text-[1.65rem] font-bold tracking-[-0.035em]">Tìm kiếm</h1>
      <form action="/tim-kiem" role="search" className="mt-4 flex h-12 items-center rounded-full bg-[var(--michio-surface-muted)] px-4 focus-within:ring-2 focus-within:ring-[var(--michio-primary)]/20">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
        <input name="q" aria-label="Từ khóa tìm sản phẩm" defaultValue={q} placeholder="Tìm sản phẩm, thương hiệu..." className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base outline-none" />
        <button type="submit" className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--michio-primary)]">Tìm</button>
      </form>

      <section aria-live="polite" className="mt-6">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-3"><div><p className="text-xs font-medium text-[var(--michio-primary)]">Kết quả tìm kiếm</p><h2 className="mt-1 text-lg font-bold">Sản phẩm ({results.length})</h2></div>{query && <Link href="/cua-hang" className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--michio-primary)]">Xem tất cả →</Link>}</div>
        {!query ? <div className="mt-4 rounded-[14px] bg-[var(--michio-surface-muted)] p-8 text-center text-sm text-[var(--michio-text-muted)]">Nhập từ khóa để tìm sản phẩm.</div> : results.length ? <div className="divide-y divide-[var(--michio-border)]">{results.map((product) => <article key={product.slug} className="grid grid-cols-[82px_1fr_48px] items-center gap-3 py-3">
          <Link href={`/san-pham/${product.slug}`} className="relative aspect-square overflow-hidden rounded-[10px] bg-[var(--michio-surface-muted)]"><Image src={product.image} alt={product.name} fill sizes="82px" quality={62} className="object-contain p-2" /></Link>
          <div className="min-w-0"><Link href={`/san-pham/${product.slug}`} className="line-clamp-2 text-[13px] font-medium leading-5 hover:text-[var(--michio-primary)]">{product.name}</Link><p className="mt-1 text-[15px] font-bold tabular-nums text-[var(--michio-primary)]">{formatPrice(product.price)}</p>{product.originalPrice && <p className="text-[11px] tabular-nums text-[var(--michio-text-subtle)] line-through">{formatPrice(product.originalPrice)}</p>}</div>
          <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" aria-label={`Tư vấn Zalo về ${product.name}`} className="inline-flex h-11 min-w-11 items-center justify-center rounded-[10px] bg-[var(--michio-primary-soft)] px-2 text-[11px] font-bold text-[var(--michio-primary)]">Zalo</a>
        </article>)}</div> : <div className="mt-4 rounded-[14px] bg-[var(--michio-surface-muted)] p-8 text-center text-sm">Không tìm thấy sản phẩm cho &quot;{q}&quot;.</div>}
      </section>
    </main>
  );
}
