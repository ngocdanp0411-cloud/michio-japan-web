"use client";
import { LINKS } from "@/lib/links";
import { usePathname } from "next/navigation";

export function StickyDock() {
  const pathname = usePathname();
  const hideOnProductMobile = pathname?.startsWith("/san-pham");

  return (
    <>
      <div className={`fixed bottom-4 right-4 z-40 hidden flex-col gap-2 md:flex ${hideOnProductMobile ? "md:hidden" : ""}`}>
        <a href={LINKS.zalo} target="_blank" rel="noopener" className="flex h-11 items-center gap-2 rounded-md bg-[var(--michio-zalo)] px-4 text-sm font-semibold text-white shadow-lg transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]">
          <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" /> Nhắn Zalo
        </a>
        <a href={LINKS.messenger} target="_blank" rel="noopener" className="flex h-11 items-center gap-2 rounded-md bg-[var(--michio-navy)] px-4 text-sm font-semibold text-white shadow-lg transition-[background-color,transform] duration-200 hover:bg-[var(--michio-navy-strong)] active:scale-[0.98]">
          Inbox Fanpage
        </a>
        <a href={LINKS.hotline} className="michio-btn-primary flex h-11 items-center justify-center rounded-md px-4 text-sm shadow-lg active:scale-[0.98]">Gọi {LINKS.hotlineDisplay}</a>
      </div>

      {!hideOnProductMobile && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--michio-border)] bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(17,17,22,0.08)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-[640px] gap-2">
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="inline-flex h-12 flex-1 items-center justify-center rounded-md border border-[var(--michio-navy)] bg-white text-sm font-semibold text-[var(--michio-navy)] active:scale-[0.98]">Inbox Fanpage</a>
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-12 flex-[1.15] items-center justify-center gap-1.5 rounded-md text-sm shadow active:scale-[0.98]"><span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" /> Nhắn Zalo</a>
          </div>
        </div>
      )}
    </>
  );
}
