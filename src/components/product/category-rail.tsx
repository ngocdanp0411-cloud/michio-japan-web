import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryRail() {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/danh-muc/${c.slug}`}
          className="group flex min-h-[96px] flex-col items-center justify-center border border-[var(--michio-border)] bg-[var(--michio-surface)] p-2.5 text-center transition-[border-color,background-color,transform] duration-200 hover:border-[var(--michio-primary)] hover:bg-[var(--michio-surface-warm)] active:scale-[0.98] md:p-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] text-xs font-semibold text-[var(--michio-navy)] transition-colors duration-200 group-hover:border-[var(--michio-primary)] group-hover:text-[var(--michio-primary)] md:h-12 md:w-12">{c.shortName.slice(0,2)}</div>
          <div className="michio-nav-label mt-2 line-clamp-2 text-[11px] leading-4 transition-colors duration-200 group-hover:text-[var(--michio-primary)] md:text-xs">{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
