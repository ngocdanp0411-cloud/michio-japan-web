import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const discount = p.originalPrice && p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : null;

  return (
    <article className="group flex min-w-0 flex-col rounded-[14px] border border-[var(--michio-border)] bg-white p-2.5 transition-[border-color,transform] duration-200 hover:border-[var(--michio-border-strong)] motion-reduce:transition-none">
      <Link href={`/san-pham/${p.slug}`} prefetch={false} className="relative block aspect-square overflow-hidden rounded-[10px] bg-[var(--michio-surface-muted)] focus-visible:-outline-offset-4">
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1280px) 288px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw" quality={68} className="object-contain p-3 transition-transform duration-200 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none" />
        {discount !== null && <span className="absolute left-2 top-2 rounded-full bg-[var(--michio-primary)] px-2 py-1 text-[11px] font-semibold leading-4 text-white">-{discount}%</span>}
      </Link>
      <div className="flex flex-1 flex-col pt-2.5">
        <Link href={`/san-pham/${p.slug}`} prefetch={false} className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 text-[var(--michio-text)] transition-colors duration-200 hover:text-[var(--michio-primary)] motion-reduce:transition-none">{p.name}</Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-[15px] font-bold tabular-nums text-[var(--michio-primary)]">{formatPrice(p.price)}</span>
          {p.originalPrice && <span className="text-[11px] tabular-nums text-[var(--michio-text-subtle)] line-through">{formatPrice(p.originalPrice)}</span>}
        </div>
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" aria-label={`Tư vấn Zalo về ${p.name}`} className="mt-2 inline-flex min-h-11 items-center justify-center rounded-[10px] bg-[var(--michio-primary-soft)] px-2 text-xs font-semibold text-[var(--michio-primary)] transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none">Tư vấn Zalo</a>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[]; columns?: "home" | "category" }) {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>;
}
