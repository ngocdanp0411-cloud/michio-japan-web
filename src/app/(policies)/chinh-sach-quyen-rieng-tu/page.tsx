import { LINKS } from "@/lib/links";

export const metadata = { title: "Chính sách quyền riêng tư" };
export default function Page() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <h1 className="font-display text-2xl font-bold tracking-wide">Chính sách quyền riêng tư</h1>
      <div className="michio-line my-6" />
      <div className="rounded-xl border bg-white p-6 text-sm leading-7 text-[var(--michio-deep-navy)]/75">
        <p>Michio Japan chỉ lưu thông tin phục vụ giao hàng và tư vấn. Không chia sẻ cho bên thứ ba khi chưa có đồng ý.</p>
        <p className="mt-4">Cần hỗ trợ nhanh? <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--michio-deep-rose)] underline">Chat Zalo 0965 909 206</a> hoặc <a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="underline">Inbox Fanpage</a>.</p>
      </div>
    </div>
  );
}
