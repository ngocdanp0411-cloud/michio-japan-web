import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";

export function CategoryRail() {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
      {CATEGORIES.map((category) => {
        const preview = PRODUCTS.find((product) => product.category === category.slug)?.image;
        return (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            className="group flex min-h-[118px] flex-col items-center justify-center rounded-md border border-[var(--michio-border)] bg-white p-2 text-center transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_8px_20px_rgba(17,17,22,0.08)] active:scale-[0.98] md:min-h-[140px] md:p-3"
          >
            <span className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded bg-[var(--michio-surface-muted)] md:h-20">
              {preview ? <Image src={preview} alt="" fill sizes="(min-width: 768px) 130px, 30vw" className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" /> : <span className="text-xs font-bold text-[var(--michio-primary)]">{category.shortName}</span>}
            </span>
            <span className="michio-nav-label mt-2 line-clamp-2 text-[11px] leading-4 transition-colors duration-200 group-hover:text-[var(--michio-primary)] md:text-xs">{category.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
