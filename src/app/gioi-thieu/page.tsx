import { LINKS } from "@/lib/links";

export const metadata = { title: "Giới thiệu về Michio Japan" };

export default function Page() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <h1 className="font-display text-3xl font-bold tracking-wide">Giới thiệu về Michio Japan</h1>
      <div className="michio-line my-6" />
      <div className="prose prose-sm max-w-none leading-7 text-[var(--michio-deep-navy)]/80">
        <p className="font-display text-lg font-semibold tracking-wide">CHỌN ĐÚNG ĐỒ NHẬT – SỐNG THẬT MỖI NGÀY.</p>
        <p>
          Michio Japan chọn lọc kỹ lưỡng các sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Chúng tôi đồng hành cùng bạn xây thói quen chăm sóc bản thân mỗi ngày — với sản phẩm chất lượng, thiết kế tinh tế và trải nghiệm mua sắm đáng tin cậy.
        </p>
        <ul>
          <li><b>Bảo đảm nguồn gốc:</b> 100% chính hãng, tem phụ đầy đủ.</li>
          <li><b>Tư vấn tận tâm:</b> Hiểu da, hiểu nhu cầu — gợi ý đúng.</li>
          <li><b>Tin cậy:</b> Giá minh bạch, giao nhanh.</li>
          <li><b>Tinh tế:</b> Đóng gói hộp/túi Michio, quà tặng chu đáo.</li>
          <li><b>Đồng hành:</b> Nhắc lịch, theo dõi hiệu quả sau mua.</li>
        </ul>
        <p>Liên hệ: {LINKS.address} • Hotline {LINKS.hotlineDisplay} • {LINKS.email} • Mở cửa 8h–21h T2-CN.</p>
      </div>
    </div>
  );
}
