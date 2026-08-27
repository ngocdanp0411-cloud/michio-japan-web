import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryRail() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/danh-muc/${category.slug}`}
          className="group flex min-h-[92px] items-center justify-center rounded-lg border border-[#e8e8e8] bg-white px-3 py-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_8px_18px_rgba(0,0,0,0.09)] active:scale-[0.98] md:min-h-[118px] md:px-4"
        >
          <span className="font-display text-base font-extrabold uppercase leading-tight text-[var(--michio-text)] transition-colors duration-200 group-hover:text-[var(--michio-primary)] md:text-lg">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
