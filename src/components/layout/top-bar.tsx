import { LINKS } from "@/lib/links";

export function TopBar() {
  const items = (
    <>
      <span className="inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--michio-deep-rose)]" /> Freeship nội thành Hà Nội cho đơn từ 499.000đ
      </span>
      <span className="opacity-60">|</span>
      <span>100% chính hãng</span>
      <span className="opacity-60">|</span>
      <span>Tư vấn tận tâm 8h–21h</span>
      <span className="opacity-60">|</span>
      <a href={LINKS.hotline} className="font-semibold hover:text-[var(--michio-soft-blush)]">
        Hotline: {LINKS.hotlineDisplay}
      </a>
      <span className="opacity-60">|</span>
      <span className="opacity-90">{LINKS.address}</span>
    </>
  );

  return (
    <div className="w-full bg-[var(--michio-deep-navy)] text-white text-[12px] leading-none overflow-hidden">
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
