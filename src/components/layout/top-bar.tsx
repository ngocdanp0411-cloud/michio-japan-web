export function TopBar() {
  return (
    <div className="hidden border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)] text-[var(--michio-text-muted)] md:block">
      <div className="mx-auto flex min-h-8 max-w-[1280px] items-center justify-between px-8 text-[11px]">
        <p>Miễn phí giao hàng nội thành Hà Nội cho đơn từ <span className="font-semibold text-[var(--michio-text)]">499.000đ</span></p>
        <span>Hàng Nhật nội địa · Tư vấn tận tâm</span>
      </div>
    </div>
  );
}
