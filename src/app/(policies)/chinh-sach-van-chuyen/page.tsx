import { LINKS } from "@/lib/links";

export const metadata = { title: "Chính sách vận chuyển" };
export default function Page() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <h1 className="font-display text-2xl font-bold tracking-wide">Chính sách vận chuyển</h1>
      <div className="michio-line my-6" />
      <div className="rounded-xl border bg-white p-6 text-sm leading-7 text-[var(--michio-deep-navy)]/75">
        <p>Freeship nội thành Hà Nội cho đơn từ 499.000đ. Giao 1–3 ngày nội thành, 2–5 ngày toàn quốc. Kiểm tra trước khi nhận.</p>
        <p className="mt-4">Cần hỗ trợ nhanh? <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--michio-deep-rose)] underline">Chat Zalo 0965 909 206</a> hoặc <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="underline">Inbox Fanpage</a>.</p>
      </div>
    </div>
  );
}
