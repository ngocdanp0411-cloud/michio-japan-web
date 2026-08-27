"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const startX = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const src = images[active] ?? images[0];

  useEffect(() => {
    if (!lightbox) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [lightbox]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) setActive((v) => Math.min(v + 1, images.length - 1));
      else setActive((v) => Math.max(v - 1, 0));
    }
    startX.current = null;
  };

  return (
    <>
      <div className="michio-card p-2.5 md:p-3">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setLightbox(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="group relative block w-full cursor-zoom-in touch-pan-y overflow-hidden rounded-lg"
          aria-label={`Xem ảnh lớn của ${name}, vuốt để đổi ảnh`}
          aria-expanded={lightbox}
          aria-controls="product-lightbox"
        >
          <span className="pointer-events-none absolute left-3 top-3 z-10 h-11 w-11 overflow-hidden rounded-full border border-white bg-white/95 shadow-sm">
            <Image src="/images/brand/michio-authentic-logo.jpg" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          </span>
          <Image src={src} alt={name} width={1200} height={1200} priority sizes="(min-width: 768px) 50vw, 100vw" className="aspect-square w-full rounded-lg object-cover" />
          <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs leading-5 text-white opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
            Nhấn để phóng to • Vuốt để đổi
          </span>
          {/* dots for mobile */}
          <div aria-hidden="true" className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
            {images.slice(0, 4).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-[var(--michio-primary)] w-4" : "bg-white/70"}`} />
            ))}
          </div>
        </button>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 overflow-hidden rounded-lg border-2 transition duration-200 active:scale-[0.98] md:h-auto ${i === active ? "border-[var(--michio-primary)] opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}
              aria-label={`Xem ảnh ${i + 1} của ${name}`}
              aria-current={i === active ? "true" : undefined}
            >
                  <Image src={s} alt="" width={160} height={160} sizes="96px" className="aspect-square w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          id="product-lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh lớn của ${name}`}
          onClick={() => setLightbox(false)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setLightbox(false)}
            className="michio-btn-secondary absolute right-4 top-4 rounded-full border-0 bg-white px-3 py-1.5 text-sm"
            aria-label="Đóng"
          >
            ✕ Đóng
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw]">
            <Image src={src} alt={name} width={1600} height={1600} sizes="90vw" className="max-h-[85vh] max-w-[90vw] rounded-xl bg-white p-2 object-contain" onClick={(e) => e.stopPropagation()} />
            <span className="pointer-events-none absolute left-5 top-5 h-14 w-14 overflow-hidden rounded-full border border-white bg-white/95 shadow-md">
              <Image src="/images/brand/michio-authentic-logo.jpg" alt="" width={56} height={56} className="h-14 w-14 object-contain" />
            </span>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2">
            {images.slice(0, 4).map((s, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Xem ảnh ${i + 1} của ${name} trong lightbox`}
                aria-current={i === active ? "true" : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition duration-200 active:scale-[0.96] ${i === active ? "border-white opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                      <Image src={s} alt="" width={96} height={96} sizes="48px" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
