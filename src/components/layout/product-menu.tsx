"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
  const menuId = useId();
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
        aria-controls={menuId}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            openMenu();
          }
        }}
        className={`flex min-h-11 items-center gap-2 px-3 py-2 text-left text-xs font-semibold hover:text-[var(--michio-primary)] lg:min-h-12 lg:gap-3 lg:px-4 lg:text-sm ${open ? "bg-[var(--michio-primary-soft)] text-[var(--michio-primary)]" : "text-[var(--michio-text)]"}`}
      >
        <span className="relative h-5 w-5 shrink-0" aria-hidden="true">
          <span className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${open ? "opacity-0" : ""}`} />
          <span className={`absolute bottom-1 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </span>
        <span className="min-w-8 whitespace-nowrap lg:hidden">{open ? "Đóng" : "Menu"}</span>
        <span className="hidden min-w-[155px] whitespace-nowrap lg:inline">{open ? "Đóng danh mục" : "Danh mục sản phẩm"}</span>
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
          className={`ml-auto hidden transition-transform duration-200 motion-reduce:transition-none lg:block ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={menuId}
        aria-label="Menu website và danh mục sản phẩm"
        aria-hidden={!open}
        inert={!open}
        style={{ ...menuPosition }}
        className={`fixed z-[70] origin-top overflow-y-auto overscroll-contain rounded-b-xl border border-[var(--michio-border)] bg-white p-2 text-[var(--michio-text)] shadow-[0_12px_28px_rgba(17,17,22,0.10)] transition-[transform,opacity] duration-200 motion-reduce:transition-none ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <div role="group" aria-label="Điều hướng website" className="grid grid-cols-2 border-b border-[var(--michio-border)] pb-2 lg:hidden">
          <p className="col-span-2 px-3 pb-1 pt-2 text-xs font-semibold text-[var(--michio-primary)]">Khám phá Michio</p>
          {navigationItems.map((item) => {
            const className = "flex min-h-11 items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]";
            const label = <>{item.label}<span aria-hidden="true" className="text-[var(--michio-text-subtle)]">›</span></>;
            return item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={className}>{label}</a>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className={className}>{label}</Link>
            );
          })}
        </div>
        <div role="group" aria-label="Danh mục sản phẩm" className="grid grid-cols-2 gap-1 pt-2 lg:grid-cols-1">
          <p className="col-span-2 px-3 pb-1 pt-1 text-xs font-semibold text-[var(--michio-primary)] lg:col-span-1">Danh mục sản phẩm</p>
        <Link
          href="/cua-hang"
          onClick={() => setOpen(false)}
          className="col-span-2 flex min-h-11 items-center justify-between rounded-md bg-[var(--michio-primary-soft)] px-3 py-2 text-sm font-semibold text-[var(--michio-primary)] lg:col-span-1"
        >
          Tất cả sản phẩm
          <span aria-hidden="true">→</span>
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]"
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
