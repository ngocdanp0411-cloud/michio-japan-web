import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-card";
import { CategoryRail } from "@/components/product/category-rail";
import { PRODUCTS } from "@/lib/products";
import { LINKS } from "@/lib/links";
import { getBlogPosts } from "@/lib/blog";

function Section({ title, slug, products }: { title: string; slug: string; products: typeof PRODUCTS }) {
  return (
    <section className="py-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="michio-h2">{title}</h2>
          <div className="mt-1 h-1 w-12 rounded-full bg-[var(--michio-primary)]" />
        </div>
        <Link href={`/danh-muc/${slug}`} className="michio-btn-secondary rounded-full px-3 py-1.5 text-sm hover:border-[var(--michio-primary)]">
          Xem thêm →
        </Link>
      </div>
      <div className="mt-4">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default function HomePage() {
  const byCat = (cat: string) => PRODUCTS.filter((p) => p.category === cat).slice(0, 5);

  return (
    <div className="mx-auto max-w-[1280px] px-4">
      {/* Hero - mobile: image first, thumb CTA */}
      <div className="mt-4 md:mt-6 overflow-hidden rounded-2xl border bg-white">
        <div className="grid md:grid-cols-2">
          <div className="order-2 md:order-1 p-5 md:p-10">
            <div className="michio-chip inline-flex items-center gap-2 rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[var(--michio-primary)]" /> MICHIO JAPAN — Chọn đúng đồ Nhật
            </div>
            <h1 className="michio-h1 mt-3">
              Sống thật <span className="text-[var(--michio-primary)]">mỗi ngày</span> với đồ Nhật chính hãng
            </h1>
            <p className="michio-body mt-2.5 max-w-[52ch]">
              Chọn lọc mỹ phẩm, thực phẩm bổ trợ và đồ gia dụng đạt chuẩn Nhật. Freeship nội thành HN 499k.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
              <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary col-span-2 inline-flex h-12 items-center justify-center rounded-full px-5 text-sm md:col-auto active:scale-[0.98]">
                Chat Zalo — {LINKS.hotlineDisplay}
              </a>
              <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary inline-flex h-12 items-center justify-center rounded-full px-5 text-sm active:scale-[0.98]">
                Inbox
              </a>
              <Link href="/cua-hang" className="michio-btn-secondary inline-flex h-12 items-center justify-center rounded-full px-5 text-sm">Cửa hàng</Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="michio-chip rounded-full px-3 py-1.5">✓ Chính hãng</span>
              <span className="michio-chip rounded-full px-3 py-1.5">✓ Freeship 499k</span>
              <span className="michio-chip rounded-full px-3 py-1.5">✓ Tư vấn 8h–21h</span>
            </div>
          </div>
          <div className="order-1 md:order-2 relative min-h-[260px] md:min-h-[320px] bg-gradient-to-br from-[var(--michio-soft-blush)] to-white p-4 md:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/michiohero/700/500" alt="Michio Japan hero" className="h-full w-full rounded-xl object-cover border shadow-sm aspect-[4/3] md:aspect-auto" loading="eager" />
            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto rounded-xl border bg-white/95 px-3 py-2.5 text-xs shadow md:px-4">
              <div className="font-semibold leading-5 line-clamp-1">{LINKS.address} • 8h–21h</div>
              <div className="text-[var(--michio-text-subtle)]">Hotline {LINKS.hotlineDisplay}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="michio-line my-6" />
      <CategoryRail />
      <div className="michio-line-dashed my-6" />

      <Section title="Collagen làm đẹp" slug="collagen" products={byCat("collagen")} />
      <Section title="Mỹ phẩm chị em" slug="cham-soc-da" products={byCat("cham-soc-da")} />
      <Section title="Chăm sóc cơ thể" slug="cham-soc-co-the" products={byCat("cham-soc-co-the")} />
      <Section title="Chăm sóc sức khoẻ" slug="cham-soc-suc-khoe" products={byCat("cham-soc-suc-khoe")} />
      <Section title="Đồ dùng & gia dụng" slug="hang-tieu-dung" products={byCat("hang-tieu-dung")} />

      {/* Story + CTA */}
      <div className="my-8 rounded-2xl border bg-[var(--michio-navy)] p-6 text-white md:p-8">
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
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-secondary rounded-full border-0 bg-white px-5 py-2.5 text-sm">Chat Zalo ngay</a>
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10">Inbox Fanpage</a>
        </div>
      </div>

      {/* Tin tức */}
      <section className="py-4">
        <div className="flex items-end justify-between">
          <h2 className="michio-h2">Tin tức – Bài viết</h2>
          <Link href="/tin-tuc" className="text-sm underline">Xem tất cả</Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {getBlogPosts().slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden rounded-xl border bg-white hover:shadow-sm">
              <Image src={post.image} alt={post.title} width={800} height={450} className="h-36 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
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
