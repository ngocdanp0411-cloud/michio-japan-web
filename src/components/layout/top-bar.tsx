import { LINKS } from "@/lib/links";

export function TopBar() {
  const items = (
    <>
      <span className="inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--michio-primary)]" /> Freeship nội thành Hà Nội cho đơn từ 499.000đ
      </span>
      <span className="opacity-60">|</span>
      <span>100% chính hãng</span>
      <span className="opacity-60">|</span>
      <span>Tư vấn tận tâm 8h–21h</span>
      <span className="opacity-60">|</span>
      <a href={LINKS.hotline} className="font-semibold transition-colors duration-200 hover:text-[var(--michio-primary-soft)]">
        Hotline: {LINKS.hotlineDisplay}
      </a>
      <span className="opacity-60">|</span>
      <span className="opacity-90">{LINKS.address}</span>
    </>
  );

  return (
    <div className="w-full overflow-hidden bg-[var(--michio-navy)] text-[12px] leading-5 text-[var(--michio-text-on-dark)]">
      <div className="relative flex overflow-hidden py-2.5 select-none">
        <div className="michio-marquee flex w-max shrink-0 items-center gap-6 pr-6 whitespace-nowrap">
          <span className="flex items-center gap-6">{items}</span>
          <span className="flex items-center gap-6" aria-hidden="true">
            {items}
          </span>
        </div>
        {/* duplicate track for seamless loop */}
        <div className="michio-marquee flex w-max shrink-0 items-center gap-6 pr-6 whitespace-nowrap" aria-hidden="true">
          <span className="flex items-center gap-6">{items}</span>
          <span className="flex items-center gap-6" aria-hidden="true">
            {items}
          </span>
        </div>
      </div>
    </div>
  );
}
