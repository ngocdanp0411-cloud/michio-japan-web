import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryRail() {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/danh-muc/${c.slug}`}
          className="rounded-xl border bg-white p-2.5 md:p-3 text-center hover:border-[var(--michio-deep-rose)]/40 hover:shadow-sm active:scale-[0.98] min-h-[88px] flex flex-col items-center justify-center"
        >
          <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border bg-[var(--michio-pearl)] text-xs font-semibold shrink-0">{c.shortName.slice(0,2)}</div>
          <div className="mt-2 text-[11px] md:text-xs font-medium leading-3 md:leading-4 line-clamp-2">{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
