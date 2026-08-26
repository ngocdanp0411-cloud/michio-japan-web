import Link from "next/link";
import { LINKS } from "@/lib/links";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;

  return (
    <div className="michio-card group flex flex-col overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link href={`/san-pham/${p.slug}`} className="relative aspect-square overflow-hidden bg-[var(--michio-surface-muted)]">
        {/* Tem chỉ chữ hồng, không nền - khít viền ngang */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 text-[8px] font-bold tracking-[0.18em] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          <span className="text-[var(--michio-deep-rose)]">MICHIO</span> <span className="text-[var(--michio-deep-rose)]">JAPAN</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-[1.03]" loading="lazy" />
        {discount !== null && (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--michio-primary)] px-2 py-1 text-xs font-bold leading-5 text-white shadow-sm">
            -{discount}%
          </span>
        )}
        <span aria-label={`Đánh giá ${p.rating.toFixed(1)} trên 5, ${p.ratingCount} lượt đánh giá`} className="absolute bottom-2 right-2 rounded-full border border-[var(--michio-border)] bg-white/95 px-2 py-1 text-[10px] font-medium leading-4 shadow-sm">
          <span aria-hidden="true">★</span> {p.rating.toFixed(1)} · {p.ratingCount}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-2.5 md:p-3">
        <Link href={`/san-pham/${p.slug}`} className="line-clamp-2 min-h-[38px] text-[13px] font-semibold leading-5 transition-colors duration-200 hover:text-[var(--michio-primary)] md:min-h-[40px] md:text-sm">
          {p.name}
        </Link>
        <div className="michio-caption mt-1 line-clamp-1">{p.excerpt}</div>
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="michio-price md:text-lg">{formatPrice(p.price)}</span>
          {p.originalPrice && <span className="text-xs text-[var(--michio-taupe)] line-through">{formatPrice(p.originalPrice)}</span>}
        </div>
        {/* Mobile: 11px height tap >=44px, sticky feel */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-11 items-center justify-center rounded-full px-3 text-center text-xs active:scale-[0.98]">
            Zalo
          </a>
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-11 items-center justify-center rounded-full px-3 text-center text-xs active:scale-[0.98]">
            Inbox
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:gap-3 md:grid-cols-3 lg:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
