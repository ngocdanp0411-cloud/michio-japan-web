"use client";
import { useState, useRef } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const startX = useRef<number | null>(null);
  const src = images[active] ?? images[0];

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
      <div className="rounded-xl border bg-white p-2.5 md:p-3">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="group relative block w-full cursor-zoom-in touch-pan-y overflow-hidden rounded-lg"
          aria-label="Xem ảnh lớn, vuốt để đổi ảnh"
        >
          {/* Tem chỉ chữ hồng gallery - không nền */}
          <span className="pointer-events-none absolute left-3 top-3 z-10 text-xs font-bold tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            <span className="text-[var(--michio-deep-rose)]">MICHIO</span> <span className="text-[var(--michio-deep-rose)]">JAPAN</span>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={name} className="aspect-square w-full rounded-lg object-cover" />
          <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white md:opacity-0 md:group-hover:opacity-100 transition">
            Nhấn để phóng to • Vuốt để đổi
          </span>
          {/* dots for mobile */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {images.slice(0, 4).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-[var(--michio-deep-rose)] w-4" : "bg-white/70"}`} />
            ))}
          </div>
        </button>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-lg border-2 ${i === active ? "border-[var(--michio-deep-rose)]" : "border-transparent opacity-70 hover:opacity-100"} h-16 md:h-auto`}
              aria-label={`Xem ảnh ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-semibold"
            aria-label="Đóng"
          >
            ✕ Đóng
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={name} className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain bg-white p-2" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2">
            {images.slice(0, 4).map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`h-12 w-12 overflow-hidden rounded-lg border-2 ${i === active ? "border-white" : "border-transparent opacity-70"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
