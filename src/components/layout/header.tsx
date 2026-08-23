import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";
import { CATEGORIES } from "@/lib/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--michio-pearl)]/95 backdrop-blur border-b">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Top row */}
        <div className="flex items-center gap-3 py-3 md:gap-6">
          <Link href="/" aria-label="Trang chủ" className="shrink-0">
            <Logo variant="horizontal" />
          </Link>

          {/* Desktop search */}
          <form action="/tim-kiem" method="get" className="hidden md:flex flex-1 max-w-[560px] items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[var(--michio-deep-rose)]/20">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="opacity-50"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            <input
              name="q"
              placeholder="Tìm collagen, Hatomugi, dầu gội..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--michio-taupe)]"
            />
            <button type="submit" className="rounded-full bg-[var(--michio-deep-navy)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--michio-ink)]">Tìm kiếm</button>
          </form>

          {/* Desktop CTAs */}
          <div className="ml-auto hidden sm:flex items-center gap-2">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--michio-deep-rose)] px-5 text-sm font-semibold text-white hover:bg-[var(--michio-wine-pink)]">
              Chat Zalo
            </a>
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--michio-deep-navy)] px-5 text-sm font-semibold text-[var(--michio-deep-navy)] hover:bg-white">
              Inbox
            </a>
          </div>

          {/* Mobile call + inbox */}
          <div className="ml-auto flex sm:hidden items-center gap-2">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex h-10 items-center justify-center rounded-full bg-[#0068FF] px-3.5 text-xs font-semibold text-white">Zalo</a>
            <a href={LINKS.hotline} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--michio-deep-rose)] text-white" aria-label={`Gọi ${LINKS.hotlineDisplay}`}>📞</a>
          </div>
        </div>

        {/* Mobile search - full width, easy thumb reach */}
        <form action="/tim-kiem" method="get" className="flex md:hidden items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm mb-3">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="opacity-40 shrink-0"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
          <input
            name="q"
            placeholder="Bạn cần tìm gì? (ví dụ: Kose, Collagen, Hatomugi)"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[var(--michio-taupe)]"
            autoComplete="off"
          />
          <button type="submit" className="shrink-0 rounded-full bg-[var(--michio-deep-navy)] px-4 py-1.5 text-xs font-semibold text-white active:scale-95">Tìm</button>
        </form>

        {/* Category scroll - thumb friendly, snap */}
        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-none border-t py-2.5 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
          <Link href="/cua-hang" className="shrink-0 snap-start rounded-full bg-[var(--michio-deep-navy)] px-4 py-2 text-sm font-semibold text-white">Tất cả</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/danh-muc/${c.slug}`} className="shrink-0 snap-start rounded-full bg-white border px-4 py-2 text-sm active:bg-[var(--michio-soft-blush)]">
              {c.shortName}
            </Link>
          ))}
          <Link href="/tin-tuc" className="shrink-0 snap-start rounded-full bg-white border px-4 py-2 text-sm">Tin tức</Link>
        </nav>
      </div>
    </header>
  );
}
