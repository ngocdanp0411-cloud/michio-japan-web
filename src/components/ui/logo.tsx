function MichioM({ size = 42, id }: { size?: number; id: string }) {
  const h = Math.round((size * 44) / 60);
  return (
    <svg width={size} height={h} viewBox="0 0 60 44" fill="none" aria-hidden>
      <defs>
        <clipPath id={id}>
          <path d="M6 36 L6 6 L26 26 L34 6 L54 6 L34 36 L26 36 L46 14 L38 14 L26 28 L14 14 L6 14 Z" />
        </clipPath>
      </defs>
      {/* M shape - left navy */}
      <rect x="0" y="0" width="60" height="44" fill="var(--michio-navy)" clipPath={`url(#${id})`} />
      {/* Right half pink overlay */}
      <rect x="30" y="0" width="30" height="44" fill="var(--michio-primary)" clipPath={`url(#${id})`} />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "vertical" | "icon";
  className?: string;
}) {
  if (variant === "icon") {
    return (
      <div className={`flex items-center gap-2 ${className}`} aria-label="Michio Japan">
        <MichioM size={36} id="michio-m-icon" />
      </div>
    );
  }
  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <MichioM size={44} id="michio-m-vertical" />
        <div className="mt-1 font-display text-[15px] font-bold tracking-[0.32em] leading-none text-[var(--michio-navy)]">MICHIO</div>
        <div className="font-display text-[15px] font-semibold tracking-[0.32em] leading-none text-[var(--michio-primary)]">JAPAN</div>
        <div className="mt-1 text-[7px] tracking-[0.12em] text-[var(--michio-text-subtle)]">CHỌN ĐÚNG ĐỒ NHẬT – SỐNG THẬT MỖI NGÀY.</div>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MichioM size={42} id="michio-m-horizontal" />
      <div className="leading-none">
        <div className="flex gap-2 font-display text-[19px] font-bold tracking-[0.22em]">
          <span className="text-[var(--michio-navy)]">MICHIO</span>
          <span className="text-[var(--michio-primary)]">JAPAN</span>
        </div>
        <div className="text-[8.5px] tracking-[0.14em] text-[var(--michio-navy)] opacity-70">CHỌN ĐÚNG ĐỒ NHẬT – SỐNG THẬT MỖI NGÀY.</div>
      </div>
    </div>
  );
}
