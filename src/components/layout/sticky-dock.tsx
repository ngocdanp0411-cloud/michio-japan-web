"use client";
import { LINKS } from "@/lib/links";
import { usePathname } from "next/navigation";

export function StickyDock() {
  const pathname = usePathname();
  // Hide on product detail mobile (has its own sticky CTA)
  const hideOnProductMobile = pathname?.startsWith("/san-pham");

  return (
    <>
      {/* Desktop only - mobile uses product sticky CTA */}
      <div className={`hidden md:flex fixed bottom-4 right-4 z-40 flex-col gap-2 ${hideOnProductMobile ? "md:hidden" : ""}`}>
        <a href={LINKS.zalo} target="_blank" rel="noopener" className="flex h-11 items-center gap-2 rounded-full bg-[var(--michio-zalo)] px-4 py-2.5 text-sm font-semibold leading-5 text-white shadow-lg transition-[filter] duration-200 hover:brightness-110">
          <span className="h-2 w-2 rounded-full bg-white" /> Zalo
        </a>
        <a href={LINKS.messenger} target="_blank" rel="noopener" className="flex h-11 items-center gap-2 rounded-full bg-[var(--michio-navy)] px-4 py-2.5 text-sm font-semibold leading-5 text-white shadow-lg transition-colors duration-200 hover:bg-[var(--michio-navy-strong)]">
          Messenger
        </a>
        <a href={LINKS.hotline} className="michio-btn-primary flex h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm shadow-lg">
          Gọi {LINKS.hotlineDisplay}
        </a>
      </div>

      {/* Mobile: show only on non-product pages (home, category) */}
      {!hideOnProductMobile && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--michio-border)] bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
          <div className="flex gap-2">
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-12 flex-1 items-center justify-center rounded-full text-sm active:scale-[0.98]">Inbox</a>
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-12 flex-[1.5] items-center justify-center gap-1.5 rounded-full text-sm shadow active:scale-[0.98]"><span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Zalo {LINKS.hotlineDisplay}</a>
          </div>
        </div>
      )}
    </>
  );
}
