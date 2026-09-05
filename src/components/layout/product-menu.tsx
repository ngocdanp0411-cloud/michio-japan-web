"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/categories";

type NavigationItem = { label: string; href: string; external?: boolean };

export function ProductMenu({
  categories = [],
  navigationItems = [],
}: {
  categories?: Category[];
  navigationItems?: NavigationItem[];
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 12, width: 320, maxHeight: 480 });

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mobile = window.innerWidth < 1024;
    const inset = mobile ? 12 : 16;
    const bottomClearance = window.innerWidth < 768 ? 88 : 12;
    const width = Math.min(mobile ? 360 : 320, window.innerWidth - inset * 2);
    setMenuPosition({
      top: rect.bottom,
      left: Math.max(inset, Math.min(rect.left, window.innerWidth - width - inset)),
      width,
      maxHeight: Math.max(120, window.innerHeight - rect.bottom - bottomClearance),
    });
  }, []);

  const openMenu = () => {
    updatePosition();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const closeOnEscapeOrOutside = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
        return;
      }

      const target = event.target as Node;
      if (!triggerRef.current?.parentElement?.contains(target)) setOpen(false);
    };

    updatePosition();
    document.addEventListener("keydown", closeOnEscapeOrOutside);
    document.addEventListener("pointerdown", closeOnEscapeOrOutside);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("keydown", closeOnEscapeOrOutside);
      document.removeEventListener("pointerdown", closeOnEscapeOrOutside);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  return (
    <div className="group relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation-menu"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            openMenu();
          }
        }}
        className="flex min-h-[46px] items-center gap-2 border-x-2 border-[var(--michio-primary)] bg-black px-2 py-2 text-left text-[11px] font-extrabold uppercase text-white transition-colors hover:bg-[var(--michio-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:min-h-[52px] md:gap-4 md:px-5 md:text-sm"
      >
        <span className="flex w-5 flex-col gap-1 md:w-7" aria-hidden="true">
          <span className="h-0.5 w-5 rounded-full bg-white md:h-1 md:w-7" />
          <span className="h-0.5 w-5 rounded-full bg-white md:h-1 md:w-7" />
          <span className="h-0.5 w-5 rounded-full bg-white md:h-1 md:w-7" />
        </span>
        <span className="whitespace-nowrap lg:hidden">Menu</span>
        <span className="hidden whitespace-nowrap lg:inline">Danh mục sản phẩm</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`ml-auto hidden transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="site-navigation-menu"
        aria-label="Menu website và danh mục sản phẩm"
        style={{ ...menuPosition }}
        className={`fixed z-[70] origin-top overflow-y-auto overscroll-contain rounded-b-md border border-t-0 border-[var(--michio-border-strong)] bg-white p-2 text-[var(--michio-text)] shadow-[0_14px_30px_rgba(17,17,22,0.16)] transition-all duration-200 ${open ? "visible pointer-events-auto translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <div role="group" aria-label="Điều hướng website" className="border-b border-[var(--michio-border)] pb-2 lg:hidden">
          <p className="px-3 pb-1 pt-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--michio-primary)]">Khám phá Michio</p>
          {navigationItems.map((item) => {
            const className = "flex items-center justify-between rounded px-3 py-2.5 text-sm font-bold uppercase transition-colors hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]";
            const label = <>{item.label}<span aria-hidden="true" className="text-[var(--michio-text-subtle)]">›</span></>;
            return item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={className}>{label}</a>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className={className}>{label}</Link>
            );
          })}
        </div>
        <div role="group" aria-label="Danh mục sản phẩm" className="pt-2">
          <p className="px-3 pb-1 pt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--michio-primary)]">Danh mục sản phẩm</p>
        <Link
          href="/cua-hang"
          onClick={() => setOpen(false)}
          className="flex items-center justify-between rounded px-3 py-3 text-sm font-extrabold uppercase text-[var(--michio-primary)] transition-colors hover:bg-[var(--michio-primary-soft)]"
        >
          Tất cả sản phẩm
          <span aria-hidden="true">→</span>
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded px-3 py-2.5 text-sm font-bold uppercase transition-colors hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]"
          >
            {category.name}
            <span aria-hidden="true" className="text-[var(--michio-text-subtle)]">›</span>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
