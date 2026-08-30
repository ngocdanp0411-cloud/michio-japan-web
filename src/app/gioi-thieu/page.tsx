import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";

export const metadata = { title: "Giới thiệu về Michio Japan" };

const values = [
  ["01", "Nguồn gốc rõ ràng", "Hàng Nhật nội địa, tem phụ đầy đủ."],
  ["02", "Tư vấn tận tâm", "Hiểu nhu cầu để gợi ý đúng."],
  ["03", "Giá minh bạch", "Thông tin rõ ràng, giao hàng tinh tế."],
  ["04", "Đồng hành mỗi ngày", "Nhắc lịch và theo dõi hiệu quả sau mua."],
];

export default function Page() {
  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]"><div className="mx-auto max-w-[1280px] px-4 py-8 md:py-12"><p className="michio-eyebrow">Michio Japan / Câu chuyện thương hiệu</p><h1 className="michio-display mt-2 max-w-3xl text-5xl uppercase md:text-6xl">Chọn đúng đồ Nhật<br /><span className="text-[var(--michio-primary)]">Sống thật mỗi ngày</span></h1><p className="michio-body mt-4 max-w-[58ch] text-base md:text-lg">Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản cho những nhu cầu thật trong cuộc sống.</p></div></section>

      <main className="mx-auto max-w-[1280px] px-4 py-10 md:py-14">
        <section className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-14"><div><p className="michio-eyebrow">Về Michio Japan</p><h2 className="michio-h2 mt-2 uppercase">Một lựa chọn vừa đủ tin cậy</h2><div className="mt-5 space-y-4 text-[15px] leading-7 text-[var(--michio-text-muted)]"><p>Michio Japan chọn lọc kỹ lưỡng các sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Chúng tôi đồng hành cùng bạn xây thói quen chăm sóc bản thân mỗi ngày với sản phẩm chất lượng, thiết kế tinh tế và trải nghiệm mua sắm đáng tin cậy.</p><p>Thay vì đưa ra quá nhiều lựa chọn, Michio tập trung vào việc giải thích rõ sản phẩm, lắng nghe nhu cầu và kết nối khách hàng với tư vấn phù hợp qua Zalo hoặc Inbox Fanpage.</p></div><div className="mt-6 flex flex-wrap gap-3"><a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-11 items-center rounded px-5 text-sm uppercase">Nhắn Zalo</a><a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-11 items-center rounded bg-white px-5 text-sm uppercase">Inbox Fanpage</a></div></div><div className="overflow-hidden rounded-md bg-[var(--michio-surface-muted)] p-4 md:p-7"><Image src="/images/blog/collagen-nhat-dang-nuoc-vien-bot.jpg" alt="Sản phẩm Nhật Bản được Michio Japan chọn lọc" width={1200} height={675} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-video w-full rounded bg-[#fff8f6] object-contain" /></div></section>

        <section className="mt-12 grid gap-3 border-y border-[var(--michio-border)] py-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">{values.map(([number, title, text]) => <div key={number} className="border-[var(--michio-border)] p-3 sm:border-r last:border-r-0"><span className="font-display text-2xl font-bold text-[var(--michio-primary)]">{number}</span><h2 className="mt-2 text-sm font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-[var(--michio-text-muted)]">{text}</p></div>)}</section>

        <section className="mt-12 rounded-md bg-[var(--michio-navy)] p-6 text-white md:mt-16 md:p-9"><p className="michio-eyebrow text-white/70">Liên hệ Michio Japan</p><h2 className="michio-h2 mt-2 text-white uppercase">Tư vấn đúng nhu cầu của bạn</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">Hotline {LINKS.hotlineDisplay} · {LINKS.email} · Mở cửa 8h–21h T2–CN.<br />{LINKS.address}</p><Link href="/cua-hang" className="michio-btn-primary mt-5 inline-flex h-11 items-center rounded px-5 text-sm uppercase">Xem cửa hàng</Link></section>
      </main>
    </div>
  );
}
