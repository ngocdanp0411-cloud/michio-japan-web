import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;

  return (
    <div className="group flex flex-col overflow-hidden border border-[var(--michio-border)] bg-[var(--michio-surface)] transition-[box-shadow,border-color] duration-200 hover:border-[var(--michio-border-strong)] hover:shadow-[0_12px_30px_rgba(19,35,63,0.08)]">
      <Link href={`/san-pham/${p.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[var(--michio-surface-muted)]">
        {/* Tem chỉ chữ hồng, không nền - khít viền ngang */}
        <span className="pointer-events-none absolute left-2 top-2 z-10 text-[8px] font-bold tracking-[0.18em] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          <span className="text-[var(--michio-deep-rose)]">MICHIO</span> <span className="text-[var(--michio-deep-rose)]">JAPAN</span>
        </span>
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw" className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]" />
        {discount !== null && (
          <span className="absolute right-2 top-2 rounded-md bg-[var(--michio-primary)] px-2 py-1 text-xs font-bold leading-5 text-white shadow-sm">
            -{discount}%
          </span>
        )}
        <span aria-label={`Đánh giá ${p.rating.toFixed(1)} trên 5, ${p.ratingCount} lượt đánh giá`} className="absolute bottom-2 left-2 rounded-md border border-[var(--michio-border)] bg-white/95 px-2 py-1 text-[10px] font-medium leading-4 shadow-sm">
          <span aria-hidden="true">★</span> {p.rating.toFixed(1)} · {p.ratingCount}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3 md:p-4">
        <Link href={`/san-pham/${p.slug}`} className="line-clamp-2 min-h-[40px] text-[13px] font-semibold leading-5 transition-colors duration-200 hover:text-[var(--michio-primary)] md:min-h-[42px] md:text-sm">
          {p.name}
        </Link>
        <div className="michio-caption mt-1 line-clamp-1">{p.excerpt}</div>
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="michio-price md:text-lg">{formatPrice(p.price)}</span>
          {p.originalPrice && <span className="text-xs text-[var(--michio-taupe)] line-through">{formatPrice(p.originalPrice)}</span>}
        </div>
        {/* Mobile: 11px height tap >=44px, sticky feel */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-11 items-center justify-center rounded-md px-3 text-center text-xs active:scale-[0.98]">
            Zalo
          </a>
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-11 items-center justify-center rounded-md px-3 text-center text-xs active:scale-[0.98]">
            Inbox
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
