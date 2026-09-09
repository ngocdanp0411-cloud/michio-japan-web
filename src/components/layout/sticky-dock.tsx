"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/lib/links";

type DockIconName = "home" | "grid" | "chat" | "article" | "contact";
type DockItem = { label: string; href: string; icon: DockIconName; external?: boolean };

const items: DockItem[] = [
  { label: "Trang chủ", href: "/", icon: "home" },
  { label: "Danh mục", href: "/cua-hang", icon: "grid" },
  { label: "Mua sỉ", href: LINKS.zalo, icon: "chat", external: true },
  { label: "Bài viết", href: "/tin-tuc", icon: "article" },
  { label: "Liên hệ", href: LINKS.messenger, icon: "contact", external: true },
];

function DockIcon({ name }: { name: DockIconName }) {
  const paths = {
    home: <><path d="m3.5 11 8.5-7 8.5 7" /><path d="M5.5 10v10h13V10M9.5 20v-6h5v6" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    chat: <><path d="M4 5.5h16v11H9l-5 3v-14Z" /><path d="M8 10h8M8 13h5" /></>,
    article: <><rect x="5" y="3.5" width="14" height="17" rx="1.5" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    contact: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" /></>,
  };
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function StickyDock() {
  const pathname = usePathname();
  const hideOnProductMobile = pathname?.startsWith("/san-pham");

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden overflow-hidden rounded-2xl border border-[var(--michio-border)] bg-white shadow-[0_12px_36px_rgba(20,20,24,0.12)] md:flex">
        <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center px-4 text-xs font-semibold text-[var(--michio-text)] hover:bg-[var(--michio-surface-muted)]">Inbox Fanpage</a>
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center bg-[var(--michio-primary)] px-5 text-xs font-semibold text-white hover:bg-[var(--michio-primary-hover)]">Nhắn Zalo</a>
      </div>

      {!hideOnProductMobile && (
        <nav aria-label="Điều hướng nhanh" className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--michio-border)] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_22px_rgba(20,20,24,0.06)] backdrop-blur md:hidden">
          <div className="mx-auto grid h-16 max-w-[480px] grid-cols-5 px-1">
            {items.map((item) => {
              const active = !item.external && (item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href));
              const className = `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-medium leading-none transition-colors duration-200 motion-reduce:transition-none ${active ? "text-[var(--michio-primary)]" : "text-[var(--michio-text-muted)] hover:text-[var(--michio-primary)]"}`;
              const content = <><DockIcon name={item.icon} /><span className="truncate">{item.label}</span></>;
              return item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
              ) : (
                <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className={className}>{content}</Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
