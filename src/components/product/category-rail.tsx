import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryRail() {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/danh-muc/${c.slug}`}
          className="michio-card flex min-h-[88px] flex-col items-center justify-center p-2.5 text-center transition-shadow duration-200 hover:border-[var(--michio-primary)]/40 hover:shadow-sm active:scale-[0.98] md:p-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] text-xs font-semibold text-[var(--michio-navy)] md:h-12 md:w-12">{c.shortName.slice(0,2)}</div>
          <div className="mt-2 line-clamp-2 text-[11px] font-semibold leading-4 md:text-xs">{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
