import Image from "next/image";
import Link from "next/link";
import { CategoryRail } from "@/components/product/category-rail";
import { ProductGrid } from "@/components/product/product-card";
import { LINKS } from "@/lib/links";
import { PRODUCTS } from "@/lib/products";
import { getBlogPosts } from "@/lib/blog";

const trustItems = [
  { number: "01", title: "100% HÀNG NHẬT NỘI ĐỊA", text: "Nhập trực tiếp từ Nhật Bản" },
  { number: "02", title: "CHÍNH HÃNG – NGUYÊN SEAL", text: "Giữ đúng sản phẩm gốc" },
  { number: "03", title: "CAM KẾT CHẤT LƯỢNG", text: "Đảm bảo an tâm khi lựa chọn" },
  { number: "04", title: "TƯ VẤN TẬN TÂM", text: "Hỗ trợ nhanh chóng mỗi ngày" },
];

const heroImages = [
  { src: "/products/anessa-perfect-uv-60ml/1.jpg", alt: "Kem chống nắng Anessa Perfect UV" },
  { src: "/products/kose-softymo-220g/kose-white.png", alt: "Sữa rửa mặt Kose Softymo" },
  { src: "/products/aqualabel-5in1-90g/1.jpg", alt: "Kem dưỡng da Aqualabel 5in1" },
];

function SectionHeading({ eyebrow, title, href, label = "Xem tất cả" }: { eyebrow?: string; title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-4">
      <div>
        {eyebrow && <p className="michio-eyebrow">{eyebrow}</p>}
        <h2 className="michio-h2 mt-1 uppercase">{title}</h2>
      </div>
      {href && <Link href={href} className="hidden shrink-0 text-sm font-semibold text-[var(--michio-primary)] hover:text-[var(--michio-primary-hover)] sm:inline-flex">{label} <span aria-hidden="true" className="ml-1">→</span></Link>}
    </div>
  );
}

export default function HomePage() {
  const posts = getBlogPosts().slice(0, 3);
  const featured = PRODUCTS.slice(0, 5);

  return (
    <div>
      <section className="overflow-hidden border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:py-14">
          <div className="max-w-xl">
            <p className="michio-eyebrow">Michio Japan / Hàng Nhật nội địa</p>
            <h1 className="michio-display mt-4 text-[2.65rem] uppercase leading-[0.98] sm:text-5xl md:text-6xl">Sống thật mỗi ngày<br />với đồ <span className="text-[var(--michio-primary)]">Nhật nội địa</span></h1>
            <p className="michio-body mt-5 max-w-[48ch] text-base">Tuyển chọn hàng Nhật nội địa chất lượng cao, cho cuộc sống khỏe đẹp và những thói quen tốt mỗi ngày.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-12 items-center justify-center rounded px-6 text-sm uppercase">Mua hàng ngay</a>
              <Link href="/gioi-thieu" className="michio-btn-secondary inline-flex h-12 items-center justify-center rounded bg-white px-6 text-sm uppercase">Tìm hiểu thêm</Link>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-md border border-white/80 bg-white/70 p-4 md:min-h-[420px] md:p-7">
            <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-white/70 blur-2xl md:h-64 md:w-64" aria-hidden="true" />
            <div className="relative grid h-full grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="relative row-span-2 flex items-center justify-center overflow-hidden rounded bg-white p-3 shadow-sm">
                <Image src={heroImages[0].src} alt={heroImages[0].alt} width={720} height={720} priority sizes="(min-width: 1024px) 38vw, (min-width: 768px) 44vw, 78vw" quality={72} className="h-full max-h-[370px] w-full object-contain" />
              </div>
              {heroImages.slice(1).map((image) => (
                <div key={image.src} className="relative flex min-h-[130px] items-center justify-center overflow-hidden rounded bg-white p-3 shadow-sm">
                  <Image src={image.src} alt={image.alt} width={420} height={420} sizes="(min-width: 1024px) 18vw, (min-width: 768px) 22vw, 36vw" quality={62} className="h-full max-h-[175px] w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-5 max-w-[1180px] px-4">
        <div className="grid overflow-hidden rounded-lg border border-[var(--michio-border)] bg-white shadow-[0_10px_30px_rgba(17,17,22,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.number} className="border-b border-[var(--michio-border)] p-5 last:border-b-0 sm:nth-[2]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <span className="font-display text-2xl font-bold text-[var(--michio-primary)]">{item.number}</span>
              <h2 className="mt-2 text-xs font-bold leading-5 text-[var(--michio-text)]">{item.title}</h2>
              <p className="mt-1 text-xs text-[var(--michio-text-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4">
        <section className="py-12 md:py-16">
          <div className="text-center">
            <p className="michio-eyebrow">Khám phá theo nhu cầu</p>
            <h2 className="michio-h2 mt-1 uppercase">Danh mục nổi bật</h2>
          </div>
          <div className="mt-6"><CategoryRail /></div>
          <div className="mt-5 text-center sm:hidden"><Link href="/cua-hang" className="text-sm font-semibold text-[var(--michio-primary)]">Xem tất cả danh mục →</Link></div>
        </section>

        <section className="border-t border-[var(--michio-border)] py-12 md:py-16">
          <SectionHeading eyebrow="Chọn lọc từ Nhật Bản" title="Sản phẩm nổi bật" href="/cua-hang" />
          <div className="mt-5 flex gap-2 border-b border-[var(--michio-border)] pb-3 text-xs font-semibold">
            <span className="rounded-full bg-[var(--michio-primary)] px-4 py-2 text-white">Bán chạy</span>
            <span className="rounded-full border border-[var(--michio-border-strong)] px-4 py-2 text-[var(--michio-text-muted)]">Mới nhất</span>
            <span className="rounded-full border border-[var(--michio-border-strong)] px-4 py-2 text-[var(--michio-text-muted)]">Ưu đãi</span>
          </div>
          <div className="mt-5"><ProductGrid products={featured} /></div>
        </section>

        <section className="grid gap-8 border-t border-[var(--michio-border)] py-12 md:grid-cols-2 md:items-center md:gap-14 md:py-16">
          <div>
            <p className="michio-eyebrow">Câu chuyện Michio Japan</p>
            <h2 className="michio-h2 mt-2 uppercase">Về Michio Japan</h2>
            <p className="michio-body mt-4">Michio Japan tập trung vào những sản phẩm Nhật Bản được chọn theo nhu cầu thật, từ chăm sóc da, cơ thể đến sức khỏe và gia dụng.</p>
            <p className="michio-body mt-3">Mỗi lựa chọn đều đi cùng thông tin rõ ràng, tư vấn tận tâm và cách mua hàng đơn giản qua Zalo hoặc Inbox Fanpage.</p>
            <Link href="/gioi-thieu" className="michio-btn-primary mt-6 inline-flex h-11 items-center rounded px-5 text-sm uppercase">Tìm hiểu thêm về chúng tôi</Link>
          </div>
          <div className="relative overflow-hidden rounded-md bg-[var(--michio-surface-muted)] p-4 md:p-7">
            <Image src="/images/blog/cach-chon-kem-chong-nang-nhat.jpg" alt="Sản phẩm Nhật Bản được Michio Japan chọn lọc" width={1200} height={800} sizes="(min-width: 1024px) 50vw, 100vw" quality={70} className="aspect-[4/3] w-full rounded object-cover" />
            <span className="absolute bottom-7 right-7 rounded-full border-2 border-white bg-white p-1 shadow-md md:bottom-10 md:right-10"><Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan" width={58} height={58} quality={55} className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14" /></span>
          </div>
        </section>

        <section className="border-y border-[var(--michio-primary)] bg-[var(--michio-primary)] px-5 py-7 text-white md:flex md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="michio-h2 text-white uppercase">Nhận ưu đãi và tin tức mới nhất</h2>
            <p className="mt-1 text-sm text-white/80">Đọc đúng, chọn đúng và duy trì những thói quen tốt mỗi ngày.</p>
          </div>
          <a href={`mailto:${LINKS.email}?subject=Đăng ký nhận ưu đãi Michio Japan`} className="mt-4 inline-flex h-11 items-center justify-center rounded bg-white px-5 text-sm font-bold text-[var(--michio-primary)] md:mt-0">Đăng ký qua email</a>
        </section>

        <section className="border-t border-[var(--michio-border)] py-12 md:py-16">
          <SectionHeading eyebrow="Michio Journal" title="Tin tức và hướng dẫn" href="/tin-tuc" />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden rounded-md border border-[var(--michio-border)] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_10px_24px_rgba(17,17,22,0.08)]">
                <Image src={post.image} alt={post.title} width={900} height={520} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" quality={68} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                <div className="p-4"><p className="michio-eyebrow">Góc chăm sóc</p><h3 className="michio-h3 mt-2 line-clamp-2 text-xl">{post.title}</h3><p className="michio-body mt-2 line-clamp-2 text-sm">{post.description}</p><span className="mt-4 inline-flex text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết →</span></div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
