import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getCategoriesWithProducts, getProductsByCategory } from "@/lib/products";

export function CategoryRail({ rows = false }: { rows?: boolean }) {
  const categories = getCategoriesWithProducts(CATEGORIES);

  if (rows) {
    return <div className="space-y-2">{categories.map((category) => {
      const preview = getProductsByCategory(category.slug)[0];
      return <Link key={category.slug} href={`/danh-muc/${category.slug}`} className="group grid min-h-[78px] grid-cols-[68px_1fr_28px] items-center gap-3 rounded-[14px] border border-[var(--michio-border)] bg-white p-2.5 transition-colors duration-200 hover:border-[var(--michio-primary)] motion-reduce:transition-none">
        <span className="relative aspect-square overflow-hidden rounded-[10px] bg-[var(--michio-primary-soft)]"><Image src={preview.image} alt="" fill sizes="68px" quality={62} className="object-contain p-1.5" /></span>
        <span className="min-w-0"><strong className="block text-sm font-semibold leading-5 group-hover:text-[var(--michio-primary)]">{category.name}</strong><span className="mt-0.5 block text-xs text-[var(--michio-text-muted)]">{getProductsByCategory(category.slug).length} sản phẩm</span></span>
        <span aria-hidden="true" className="text-xl text-[var(--michio-text-subtle)]">›</span>
      </Link>;
    })}</div>;
  }

  return <div className="grid grid-cols-4 gap-x-2 gap-y-4 lg:grid-cols-8 lg:gap-5">{categories.map((category) => {
    const preview = getProductsByCategory(category.slug)[0];
    return <Link key={category.slug} href={`/danh-muc/${category.slug}`} className="group flex min-w-0 flex-col items-center gap-2 text-center">
      <span className="relative aspect-square w-full max-w-[76px] overflow-hidden rounded-full bg-[var(--michio-primary-soft)] ring-1 ring-[var(--michio-border)]"><Image src={preview.image} alt="" fill sizes="76px" quality={62} className="object-contain p-2 transition-transform duration-200 motion-safe:group-hover:scale-105 motion-reduce:transition-none" /></span>
      <span className="line-clamp-2 text-[11px] font-medium leading-4 text-[var(--michio-text)] group-hover:text-[var(--michio-primary)] sm:text-xs">{category.name}</span>
    </Link>;
  })}</div>;
}
