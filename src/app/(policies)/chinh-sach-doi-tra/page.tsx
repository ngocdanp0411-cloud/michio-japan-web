export const metadata = { title: "Chính sách đổi trả" };
export default function Page() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <h1 className="font-display text-2xl font-bold tracking-wide">Chính sách đổi trả</h1>
      <div className="michio-line my-6" />
      <div className="rounded-xl border bg-white p-6 text-sm leading-7 text-[var(--michio-deep-navy)]/75">
        <p>Đổi trả trong 7 ngày nếu lỗi NSX, còn tem, chưa qua sử dụng. Liên hệ Zalo/Fanpage để được hỗ trợ.</p>
        <p className="mt-4">Cần hỗ trợ nhanh? <a href="https://zalo.me/0965909206" target="_blank" className="font-semibold text-[var(--michio-deep-rose)] underline">Chat Zalo 0965 909 206</a> hoặc <a href="https://m.me/japonstorevn" target="_blank" className="underline">Inbox Fanpage</a>.</p>
      </div>
    </div>
  );
}
