"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";

const CLOSE_DELAY = 140;

export function ProductMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 16, width: 320 });

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, CLOSE_DELAY);
  };

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscapeOrOutside = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setOpen(false);
        return;
      }

      const target = event.target as Node;
      if (!triggerRef.current?.parentElement?.contains(target)) setOpen(false);
    };

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(320, window.innerWidth - 32);
      setMenuPosition({
        top: rect.bottom,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)),
        width,
      });
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
  }, [open]);

  return (
    <div
      className="group relative shrink-0"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="product-category-menu"
        onClick={() => {
          cancelClose();
          setOpen((value) => !value);
        }}
        className="flex min-h-[46px] items-center gap-3 border-x-2 border-[var(--michio-primary)] bg-black px-4 py-2 text-left text-xs font-extrabold uppercase text-white transition-colors hover:bg-[var(--michio-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:min-h-[52px] md:gap-4 md:px-5 md:text-sm"
      >
        <span className="flex w-7 flex-col gap-1" aria-hidden="true">
          <span className="h-1 w-7 rounded-full bg-white" />
          <span className="h-1 w-7 rounded-full bg-white" />
          <span className="h-1 w-7 rounded-full bg-white" />
        </span>
        <span className="whitespace-nowrap">Danh mục sản phẩm</span>
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
          className={`ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="product-category-menu"
        role="menu"
        aria-label="Danh mục sản phẩm"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{ top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }}
        className={`fixed z-[70] origin-top rounded-b-md border border-t-0 border-[var(--michio-border-strong)] bg-white p-2 text-[var(--michio-text)] shadow-[0_14px_30px_rgba(17,17,22,0.16)] transition-all duration-200 ${open ? "visible pointer-events-auto translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <Link
          href="/cua-hang"
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center justify-between rounded px-3 py-3 text-sm font-extrabold uppercase text-[var(--michio-primary)] transition-colors hover:bg-[var(--michio-primary-soft)]"
        >
          Tất cả sản phẩm
          <span aria-hidden="true">→</span>
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded px-3 py-2.5 text-sm font-bold uppercase transition-colors hover:bg-[var(--michio-surface-muted)] hover:text-[var(--michio-primary)]"
          >
            {category.name}
            <span aria-hidden="true" className="text-[var(--michio-text-subtle)]">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
