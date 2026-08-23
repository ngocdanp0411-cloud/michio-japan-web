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
        <a href={LINKS.zalo} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full bg-[#0068FF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 h-11">
          <span className="h-2 w-2 rounded-full bg-white" /> Zalo
        </a>
        <a href={LINKS.messenger} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full bg-[var(--michio-deep-navy)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-black h-11">
          Messenger
        </a>
        <a href={LINKS.hotline} className="flex items-center gap-2 rounded-full bg-[var(--michio-deep-rose)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[var(--michio-wine-pink)] h-11">
          Gọi {LINKS.hotlineDisplay}
        </a>
      </div>

      {/* Mobile: show only on non-product pages (home, category) */}
      {!hideOnProductMobile && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="flex gap-2">
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="flex-1 inline-flex h-12 items-center justify-center rounded-full border bg-white text-sm font-semibold active:scale-[0.98]">Inbox</a>
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="flex-[1.5] inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-[var(--michio-deep-rose)] text-sm font-bold text-white shadow active:scale-[0.98]"><span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Zalo {LINKS.hotlineDisplay}</a>
          </div>
        </div>
      )}
    </>
  );
}
