"use client";
import { LINKS } from "@/lib/links";
import { usePathname } from "next/navigation";

export function StickyDock() {
  const pathname = usePathname();
  const hideOnProductMobile = pathname?.startsWith("/san-pham");

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-40 hidden flex-col overflow-hidden border border-[var(--michio-border)] bg-white md:flex ${hideOnProductMobile ? "md:hidden" : ""}`}>
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-2 px-4 text-xs font-semibold text-[var(--michio-primary)] hover:bg-[var(--michio-primary-soft)]">
          Nhắn Zalo <span aria-hidden="true">↗</span>
        </a>
        <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center border-t border-[var(--michio-border)] px-4 text-xs font-medium text-[var(--michio-text)] hover:bg-[var(--michio-surface-muted)]">
          Fanpage <span className="ml-2" aria-hidden="true">↗</span>
        </a>
      </div>

      {!hideOnProductMobile && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--michio-border)] bg-white px-4 py-2 pb-[max(8px,env(safe-area-inset-bottom))] md:hidden">
          <div className="mx-auto flex max-w-[640px] gap-2">
            <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center border border-[var(--michio-border-strong)] bg-white text-sm font-semibold text-[var(--michio-text)] transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none">Inbox Fanpage</a>
            <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center bg-[var(--michio-primary)] text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none">Nhắn Zalo</a>
          </div>
        </div>
      )}
    </>
  );
}
