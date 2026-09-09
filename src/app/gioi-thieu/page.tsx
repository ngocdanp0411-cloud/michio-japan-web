import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";

export const metadata = { title: "Giới thiệu về Michio Japan", alternates: { canonical: "/gioi-thieu" } };

const values = [
  ["01", "Nguồn gốc rõ ràng", "Hàng Nhật nội địa, tem phụ đầy đủ."],
  ["02", "Tư vấn tận tâm", "Hiểu nhu cầu để gợi ý đúng."],
  ["03", "Giá minh bạch", "Thông tin rõ ràng, giao hàng tinh tế."],
  ["04", "Đồng hành mỗi ngày", "Nhắc lịch và theo dõi hiệu quả sau mua."],
];

export default function Page() {
  return (
    <main className="pb-14 md:pb-20">
      <section className="overflow-hidden bg-[var(--michio-primary-soft)]">
        <div className="mx-auto grid max-w-[1120px] gap-5 px-4 py-7 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12 md:px-6 md:py-14">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--michio-primary)]">Câu chuyện thương hiệu</p>
            <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-[-0.035em] text-[var(--michio-primary)] md:text-5xl">Michio Japan</h1>
            <p className="mt-1 text-base font-semibold text-[var(--michio-navy)] md:text-lg">Đồ Nhật – Sống thật mỗi ngày</p>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-6 text-[var(--michio-text-muted)] md:text-base md:leading-7">Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản cho những nhu cầu thật trong cuộc sống.</p>
          </div>
          <div className="mx-auto w-full max-w-[260px] rounded-full bg-white/70 p-5 shadow-[0_18px_45px_rgba(189,40,53,0.08)] md:max-w-[330px] md:p-7">
            <Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan - Hàng Nhật nội địa" width={1125} height={1125} priority sizes="(min-width: 768px) 330px, 260px" className="aspect-square w-full rounded-full object-contain mix-blend-multiply" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-4 md:px-6">
        <section className="py-9 md:py-14">
          <div className="grid gap-7 md:grid-cols-[1fr_0.95fr] md:items-center md:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--michio-primary)]">Về Michio Japan</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--michio-navy)] md:text-3xl">Một lựa chọn vừa đủ tin cậy</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-[var(--michio-text-muted)] md:text-base">
                <p>Michio Japan chọn lọc kỹ lưỡng các sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Chúng tôi đồng hành cùng bạn xây thói quen chăm sóc bản thân mỗi ngày với sản phẩm chất lượng, thiết kế tinh tế và trải nghiệm mua sắm đáng tin cậy.</p>
                <p>Thay vì đưa ra quá nhiều lựa chọn, Michio tập trung vào việc giải thích rõ sản phẩm, lắng nghe nhu cầu và kết nối khách hàng với tư vấn phù hợp qua Zalo hoặc Inbox Fanpage.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex min-h-11 items-center rounded-lg px-5 text-sm">Nhắn Zalo</a>
                <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex min-h-11 items-center rounded-lg bg-white px-5 text-sm">Inbox Fanpage</a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-[var(--michio-surface-muted)]">
              <Image src="/images/blog/collagen-nhat-dang-nuoc-vien-bot.jpg" alt="Sản phẩm Nhật Bản được Michio Japan chọn lọc" width={1200} height={675} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-video w-full bg-[var(--michio-surface-warm)] object-contain" />
            </div>
          </div>
        </section>

        <section aria-labelledby="values-title" className="border-y border-[var(--michio-border)] py-8 md:py-10">
          <h2 id="values-title" className="text-xl font-bold text-[var(--michio-navy)] md:text-2xl">Điều Michio trân trọng</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4">
            {values.map(([number, title, text]) => (
              <div key={number} className="min-w-0">
                <span className="text-sm font-bold text-[var(--michio-primary)]">{number}</span>
                <h3 className="mt-2 text-[15px] font-bold leading-5 text-[var(--michio-navy)]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--michio-text-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9 rounded-2xl bg-[var(--michio-primary-soft)] p-5 md:mt-12 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--michio-primary)]">Liên hệ Michio Japan</p>
          <h2 className="mt-2 text-xl font-bold leading-snug text-[var(--michio-navy)] md:text-2xl">Tư vấn đúng nhu cầu của bạn</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--michio-text-muted)]">Hotline {LINKS.hotlineDisplay} · {LINKS.email} · Mở cửa 8h–21h T2–CN.<br />{LINKS.address}</p>
          <Link href="/cua-hang" className="michio-btn-primary mt-5 inline-flex min-h-11 items-center rounded-lg px-5 text-sm">Xem cửa hàng</Link>
        </section>
      </div>
    </main>
  );
}
