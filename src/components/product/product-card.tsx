import Link from "next/link";
import { LINKS } from "@/lib/links";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/san-pham/${p.slug}`} className="relative aspect-square overflow-hidden bg-[var(--michio-pearl)]">
        {/* Tem chỉ chữ hồng, không nền - khít viền ngang */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 text-[8px] font-bold tracking-[0.18em] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          <span className="text-[var(--michio-deep-rose)]">MICHIO</span> <span className="text-[var(--michio-deep-rose)]">JAPAN</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-[1.03]" loading="lazy" />
        {discount !== null && (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--michio-deep-rose)] px-2 py-1 text-xs font-bold text-white shadow">
            -{discount}%
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium border shadow-sm">
          ⭐ {p.rating.toFixed(1)} · {p.ratingCount}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-2.5 md:p-3">
        <Link href={`/san-pham/${p.slug}`} className="line-clamp-2 min-h-[38px] md:min-h-[40px] text-[13px] md:text-sm font-medium leading-5 hover:text-[var(--michio-deep-rose)]">
          {p.name}
        </Link>
        <div className="mt-1 line-clamp-1 text-xs text-[var(--michio-deep-navy)]/60">{p.excerpt}</div>
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-[14px] md:text-[15px] font-bold text-[var(--michio-deep-rose)]">{formatPrice(p.price)}</span>
          {p.originalPrice && <span className="text-xs text-[var(--michio-taupe)] line-through">{formatPrice(p.originalPrice)}</span>}
        </div>
        {/* Mobile: 11px height tap >=44px, sticky feel */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--michio-deep-rose)] px-3 text-center text-xs font-semibold text-white hover:bg-[var(--michio-wine-pink)] active:scale-[0.98]">
            Zalo
          </a>
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--michio-deep-navy)] px-3 text-center text-xs font-semibold text-[var(--michio-deep-navy)] hover:bg-white active:scale-[0.98]">
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
