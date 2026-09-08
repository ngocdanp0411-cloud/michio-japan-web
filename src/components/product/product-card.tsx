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
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[var(--michio-border)] bg-white">
      <Link href={`/san-pham/${p.slug}`} prefetch={false} className="relative aspect-square overflow-hidden bg-white focus-visible:-outline-offset-4">
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1280px) 288px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw" quality={68} className="object-contain p-4 transition-transform duration-300 motion-safe:group-hover:scale-[1.04]" />
        {discount !== null && (
          <span className="absolute right-2 top-2 rounded bg-[var(--michio-primary-soft)] px-2 py-1 text-xs font-semibold leading-5 text-[var(--michio-primary)]">
            -{discount}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-2">
        <Link href={`/san-pham/${p.slug}`} prefetch={false} className="line-clamp-2 min-h-11 text-sm font-medium leading-[1.6] transition-colors duration-200 hover:text-[var(--michio-primary)]">
          {p.name}
        </Link>
        <p aria-label={`Đánh giá ${p.rating.toFixed(1)} trên 5, ${p.ratingCount} lượt đánh giá`} className="mt-2 text-xs text-[var(--michio-text-muted)]"><span aria-hidden="true" className="text-[var(--michio-primary)]">★</span> {p.rating.toFixed(1)} <span className="text-[var(--michio-text-subtle)]">({p.ratingCount})</span></p>
        <div className="mb-3 mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="michio-price md:text-lg">{formatPrice(p.price)}</span>
          {p.originalPrice && <span className="text-xs text-[var(--michio-taupe)] line-through">{formatPrice(p.originalPrice)}</span>}
        </div>
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-[var(--michio-border)] text-xs font-medium hover:text-[var(--michio-primary)]">
          Tư vấn Zalo <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function ProductGrid({ products, columns = "home" }: { products: Product[]; columns?: "home" | "category" }) {
  const gridClass = columns === "category"
    ? "grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
    : "grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5";
  return (
    <div className={`grid ${gridClass}`}>
      {products.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
