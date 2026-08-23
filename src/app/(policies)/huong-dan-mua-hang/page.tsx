export const metadata = { title: "Hướng dẫn mua hàng" };
export default function Page() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <h1 className="font-display text-2xl font-bold tracking-wide">Hướng dẫn mua hàng</h1>
      <div className="michio-line my-6" />
      <div className="rounded-xl border bg-white p-6 text-sm leading-7 text-[var(--michio-deep-navy)]/75">
        <p>Chọn sản phẩm → Chat Zalo 0965 909 206 hoặc Inbox Fanpage → Xác nhận thông tin → Giao hàng, kiểm tra, thanh toán khi nhận.</p>
        <p className="mt-4">Cần hỗ trợ nhanh? <a href="https://zalo.me/0965909206" target="_blank" className="font-semibold text-[var(--michio-deep-rose)] underline">Chat Zalo 0965 909 206</a> hoặc <a href="https://m.me/japonstorevn" target="_blank" className="underline">Inbox Fanpage</a>.</p>
      </div>
    </div>
  );
}
