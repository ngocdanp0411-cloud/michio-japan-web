import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-card";
import { CategoryRail } from "@/components/product/category-rail";
import { PRODUCTS } from "@/lib/products";
import { LINKS } from "@/lib/links";
import { getBlogPosts } from "@/lib/blog";

function Section({ title, slug, products }: { title: string; slug: string; products: typeof PRODUCTS }) {
  return (
    <section className="border-t border-[var(--michio-border)] py-10 first:border-t-0 md:py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="michio-eyebrow">Bộ sưu tập / {slug}</p>
          <h2 className="michio-h2 mt-1">{title}</h2>
        </div>
        <Link href={`/danh-muc/${slug}`} className="michio-btn-secondary shrink-0 rounded-md px-3 py-2 text-sm">
          Xem thêm <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mt-5">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default function HomePage() {
  const byCat = (cat: string) => PRODUCTS.filter((p) => p.category === cat).slice(0, 5);

  return (
    <div className="mx-auto max-w-[1280px] px-4">
      {/* Hero — real product editorial */}
      <section className="mt-4 overflow-hidden border border-[var(--michio-border)] bg-[var(--michio-surface)] md:mt-6">
        <div className="grid md:grid-cols-[0.92fr_1.08fr]">
          <div className="order-2 flex flex-col justify-center p-6 md:order-1 md:p-12 lg:p-14">
            <p className="michio-eyebrow">Michio Japan / Chọn lọc từ Nhật Bản</p>
            <h1 className="michio-h1 mt-4 max-w-[10ch]">
              Sống thật <span className="text-[var(--michio-primary)]">mỗi ngày</span> với đồ Nhật chính hãng
            </h1>
            <p className="michio-body mt-5 max-w-[48ch] text-base">
              Mỹ phẩm, thực phẩm bổ trợ và đồ gia dụng được chọn theo nhu cầu thật — có tem phụ, tư vấn rõ ràng và giao hàng tinh tế.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary inline-flex h-12 items-center justify-center rounded-md px-5 text-sm active:scale-[0.98]">
                Chat Zalo — {LINKS.hotlineDisplay}
              </a>
              <Link href="/cua-hang" className="michio-btn-secondary inline-flex h-12 items-center justify-center rounded-md px-5 text-sm">Xem cửa hàng</Link>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--michio-border)] pt-4">
              <div><strong className="block font-display text-2xl text-[var(--michio-navy)]">100%</strong><span className="michio-caption">Chính hãng</span></div>
              <div><strong className="block font-display text-2xl text-[var(--michio-navy)]">8–21h</strong><span className="michio-caption">Tư vấn mỗi ngày</span></div>
              <div><strong className="block font-display text-2xl text-[var(--michio-navy)]">499k</strong><span className="michio-caption">Mốc freeship HN</span></div>
            </div>
          </div>
          <div className="order-1 border-b border-[var(--michio-border)] bg-[var(--michio-surface-muted)] p-4 md:order-2 md:border-b-0 md:border-l md:p-7">
            <div className="flex items-center justify-between border-b border-[var(--michio-border)] pb-3">
              <p className="michio-eyebrow">Ảnh sản phẩm thật</p>
              <span className="michio-caption">01 — 03</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <figure className="relative row-span-2 flex min-h-[330px] items-end justify-center overflow-hidden border border-[var(--michio-border)] bg-white p-5">
                <Image src="/products/kose-softymo-220g/kose-white.png" alt="Sữa rửa mặt Kose Softymo White" width={620} height={620} priority sizes="(min-width: 768px) 30vw, 45vw" className="h-full max-h-[300px] w-full object-contain" />
                <figcaption className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--michio-text-subtle)]">Cleanse / Kose</figcaption>
              </figure>
              <figure className="relative flex min-h-[160px] items-center justify-center overflow-hidden border border-[var(--michio-border)] bg-white p-3">
                <Image src="/products/anessa-perfect-uv-60ml/1.jpg" alt="Kem chống nắng Anessa Perfect UV" width={420} height={420} sizes="(min-width: 768px) 20vw, 40vw" className="h-full max-h-[145px] w-full object-contain" />
                <figcaption className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--michio-text-subtle)]">Protect / Anessa</figcaption>
              </figure>
              <figure className="relative flex min-h-[160px] items-center justify-center overflow-hidden border border-[var(--michio-border)] bg-white p-3">
                <Image src="/products/aqualabel-5in1-90g/1.jpg" alt="Kem dưỡng da Shiseido Aqualabel 5in1" width={420} height={420} sizes="(min-width: 768px) 20vw, 40vw" className="h-full max-h-[145px] w-full object-contain" />
                <figcaption className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--michio-text-subtle)]">Care / Aqualabel</figcaption>
              </figure>
            </div>
            <p className="michio-caption mt-3">Giữ nguyên logo và bao bì gốc — không dựng sản phẩm minh họa.</p>
          </div>
        </div>
      </section>

      <div className="my-8 border-y border-[var(--michio-border)] py-4 md:my-10">
        <CategoryRail />
      </div>

      <Section title="Collagen làm đẹp" slug="collagen" products={byCat("collagen")} />
      <Section title="Mỹ phẩm chị em" slug="cham-soc-da" products={byCat("cham-soc-da")} />
      <Section title="Chăm sóc cơ thể" slug="cham-soc-co-the" products={byCat("cham-soc-co-the")} />
      <Section title="Chăm sóc sức khoẻ" slug="cham-soc-suc-khoe" products={byCat("cham-soc-suc-khoe")} />
      <Section title="Đồ dùng & gia dụng" slug="hang-tieu-dung" products={byCat("hang-tieu-dung")} />

      {/* Story + CTA */}
      <div className="my-10 border-y border-[var(--michio-navy)] bg-[var(--michio-navy)] p-6 text-white md:my-14 md:p-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="michio-h3 text-white">BẢO ĐẢM NGUỒN GỐC</div>
            <div className="mt-1 text-sm text-white/70">Chỉ chọn sản phẩm đạt chuẩn Nhật, tem phụ đầy đủ.</div>
          </div>
          <div className="text-center">
            <div className="michio-h3 text-white">TƯ VẤN TẬN TÂM</div>
            <div className="mt-1 text-sm text-white/70">Hiểu da, hiểu nhu cầu — gợi ý đúng, không ép mua.</div>
          </div>
          <div className="text-right md:text-left">
            <div className="michio-h3 text-white">ĐỒNG HÀNH MỖI NGÀY</div>
            <div className="mt-1 text-sm text-white/70">Nhắc lịch, theo dõi hiệu quả sau mua.</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-secondary rounded-md border-0 bg-white px-5 py-2.5 text-sm">Chat Zalo ngay</a>
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-white active:scale-[0.98]">Inbox Fanpage</a>
        </div>
      </div>

      {/* Tin tức */}
      <section className="border-t border-[var(--michio-border)] py-10 md:py-12">
        <div className="flex items-end justify-between">
          <h2 className="michio-h2">Tin tức – Bài viết</h2>
          <Link href="/tin-tuc" className="text-sm underline">Xem tất cả</Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {getBlogPosts().slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden border border-[var(--michio-border)] bg-white transition-[box-shadow,border-color] duration-200 hover:border-[var(--michio-border-strong)] hover:shadow-[0_12px_30px_rgba(19,35,63,0.08)]">
              <Image src={post.image} alt={post.title} width={800} height={450} sizes="(min-width: 768px) 33vw, 100vw" className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
              <div className="p-4">
                <div className="michio-nav-label line-clamp-2">{post.title}</div>
                <div className="michio-caption mt-1">Xem bài viết →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
