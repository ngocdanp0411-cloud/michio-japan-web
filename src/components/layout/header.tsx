import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LINKS } from "@/lib/links";
import { CATEGORIES } from "@/lib/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--michio-border)] bg-[var(--michio-surface)]/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Top row */}
        <div className="flex items-center gap-3 py-3 md:gap-6">
          <Link href="/" aria-label="Trang chủ" className="shrink-0">
            <Logo variant="horizontal" />
          </Link>

          {/* Desktop search */}
          <form action="/tim-kiem" method="get" className="hidden md:flex max-w-[560px] flex-1 items-center gap-2 rounded-md border border-[var(--michio-border)] bg-[var(--michio-surface)] px-3 py-1.5 transition-shadow focus-within:border-[var(--michio-focus)] focus-within:shadow-[0_0_0_4px_rgba(159,47,88,0.12)]">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="opacity-50"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
            <input
              name="q"
              placeholder="Tìm collagen, Hatomugi, dầu gội..."
              className="michio-input min-h-0 flex-1 border-0 bg-transparent text-sm leading-5 outline-none placeholder:text-[var(--michio-text-subtle)] focus-visible:outline-0"
            />
            <button type="submit" className="michio-btn-navy rounded-full px-4 py-1.5 text-xs leading-5">Tìm kiếm</button>
          </form>

          {/* Desktop CTAs */}
          <div className="ml-auto hidden sm:flex items-center gap-2">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm leading-5">
              Chat Zalo
            </a>
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm leading-5">
              Inbox
            </a>
          </div>

          {/* Mobile call + inbox */}
          <div className="ml-auto flex sm:hidden items-center gap-2">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--michio-zalo)] px-3.5 text-xs font-semibold leading-5 text-white transition-colors hover:bg-[#0057d9] active:scale-[0.98]">Zalo</a>
            <a href={LINKS.hotline} className="michio-btn-primary inline-flex h-10 items-center justify-center rounded-md px-3 text-xs" aria-label={`Gọi ${LINKS.hotlineDisplay}`}>Gọi</a>
          </div>
        </div>

        {/* Mobile search - full width, easy thumb reach */}
        <form action="/tim-kiem" method="get" className="mb-3 flex items-center gap-2 rounded-md border border-[var(--michio-border)] bg-[var(--michio-surface)] px-3 py-2 shadow-sm md:hidden">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="opacity-40 shrink-0"><circle cx={11} cy={11} r={7} /><path d="M20 20L16 16" /></svg>
          <input
            name="q"
            placeholder="Bạn cần tìm gì? (ví dụ: Kose, Collagen, Hatomugi)"
            className="michio-input min-h-0 flex-1 border-0 bg-transparent text-[15px] leading-6 outline-none placeholder:text-[var(--michio-text-subtle)] focus-visible:outline-0"
            autoComplete="off"
          />
          <button type="submit" className="michio-btn-navy shrink-0 rounded-full px-4 py-1.5 text-xs leading-5 active:scale-95">Tìm</button>
        </form>

        {/* Category scroll - thumb friendly, snap */}
        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-none border-t py-2.5 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
          <Link href="/cua-hang" className="michio-nav-label shrink-0 snap-start border-b-2 border-[var(--michio-primary)] px-2.5 py-3 text-[var(--michio-navy)]">Tất cả</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/danh-muc/${c.slug}`} className="michio-nav-label shrink-0 snap-start border-b-2 border-transparent px-2.5 py-3 text-[var(--michio-navy)] transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)] active:bg-[var(--michio-primary-soft)]">
              {c.shortName}
            </Link>
          ))}
          <Link href="/tin-tuc" className="michio-nav-label shrink-0 snap-start border-b-2 border-transparent px-2.5 py-3 text-[var(--michio-navy)] transition-colors duration-200 hover:border-[var(--michio-primary)] hover:text-[var(--michio-primary)]">Tin tức</Link>
        </nav>
      </div>
    </header>
  );
}
