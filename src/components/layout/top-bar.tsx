export function TopBar() {
  return (
    <div className="border-b border-[var(--michio-border)] bg-[var(--michio-surface-muted)] text-[var(--michio-text-muted)]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center px-3 py-1.5 text-center text-[11px] leading-4 sm:text-xs md:justify-between md:px-4">
        <p>Freeship nội thành Hà Nội cho đơn từ <span className="font-semibold text-[var(--michio-text)]">499.000đ</span></p>
        <span className="hidden text-[11px] md:inline">Hàng Nhật nội địa · Tư vấn tận tâm</span>
      </div>
    </div>
  );
}
