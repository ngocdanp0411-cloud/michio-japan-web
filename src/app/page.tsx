import Image from "next/image";
import Link from "next/link";
import { CategoryRail } from "@/components/product/category-rail";
import { ProductGrid } from "@/components/product/product-card";
import { LINKS } from "@/lib/links";
import { PRODUCTS } from "@/lib/products";
import { BLOG_CATEGORY_MAP, getBlogPosts } from "@/lib/blog";

export const metadata = { alternates: { canonical: "/" } };

function SectionHeading({ eyebrow, title, href, label = "Xem tất cả" }: { eyebrow: string; title: string; href?: string; label?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div><p className="michio-eyebrow">{eyebrow}</p><h2 className="michio-h2 mt-2">{title}</h2></div>
      {href && <Link href={href} className="michio-text-link inline-flex min-h-11 items-center gap-3 text-sm font-medium">{label}<span aria-hidden="true">↗</span></Link>}
    </div>
  );
}

export default function HomePage() {
  const posts = getBlogPosts().slice(0, 3);
  const featured = PRODUCTS.slice(0, 8);

  return (
    <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="hero-title" className="pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="michio-enter mb-5 flex items-end justify-between gap-8 md:mb-7">
          <div>
            <p className="michio-eyebrow">Michio Japan · Hàng Nhật nội địa</p>
            <h1 id="hero-title" className="mt-3 text-balance text-[clamp(1.7rem,3.6vw,3.4rem)] font-semibold leading-[1.18] tracking-[-0.045em]">Chăm chút mỗi ngày,<br className="sm:hidden" /> theo cách Nhật.</h1>
          </div>
          <p className="hidden max-w-[29ch] text-sm leading-6 text-[var(--michio-text-muted)] lg:block">Từ bước chăm da đến góc bếp nhỏ. Tìm đồ Nhật phù hợp với cuộc sống của bạn.</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-[var(--michio-border)] bg-[var(--michio-surface-warm)] md:rounded-2xl lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)]">
          <Link href="/danh-muc/my-pham-skincare" aria-label="Khám phá bộ sưu tập mỹ phẩm skincare Nhật Bản" className="block focus-visible:-outline-offset-4">
            <Image src="/images/promotions/deal-nhat-xinh-yeu.webp" alt="Deal Nhật Xinh Yêu – chăm da và làm đẹp nội địa Nhật, ưu đãi nổi bật" width={1672} height={941} preload sizes="(min-width: 1280px) 912px, (min-width: 1024px) 70vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)" className="h-auto w-full object-contain" />
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 lg:flex-col lg:items-start lg:justify-center lg:gap-6">
            <div><p className="text-xs text-[var(--michio-text-muted)]">Bộ sưu tập chăm da & làm đẹp</p><h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-2xl">Một chút chăm sóc. Một ngày xinh hơn.</h2></div>
            <Link href="/danh-muc/my-pham-skincare" className="michio-btn-primary inline-flex min-h-12 w-full items-center justify-center gap-5 rounded-lg px-6 text-sm sm:w-auto">Khám phá skincare <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs leading-5 text-[var(--michio-text-muted)] sm:justify-start">
          <span>Hàng Nhật nội địa</span><span>Tư vấn chọn sản phẩm</span><span>Đặt hàng qua Zalo / Fanpage</span>
        </div>
      </section>

      <section aria-labelledby="categories-title" className="border-t border-[var(--michio-border)] py-8 md:py-12">
        <h2 id="categories-title" className="michio-h2">Bạn đang tìm gì?</h2>
        <div className="mt-6"><CategoryRail /></div>
      </section>

      <section className="border-t border-[var(--michio-border)] py-8 md:py-12">
        <SectionHeading eyebrow="Gợi ý từ Michio" title="Đồ Nhật cho mỗi ngày" href="/cua-hang" label="Xem cửa hàng" />
        <div className="mt-6"><ProductGrid products={featured} /></div>
      </section>

      <section className="michio-reveal my-4 grid gap-8 rounded-2xl bg-[var(--michio-surface-warm)] p-6 md:my-8 md:grid-cols-2 md:gap-16 md:p-10">
        <div>
          <p className="michio-eyebrow">Mua hàng thật đơn giản</p>
          <h2 className="michio-h2 mt-3">Chưa biết chọn gì?<br />Cứ hỏi Michio.</h2>
          <p className="michio-body mt-4 max-w-[46ch]">Kể cho Michio điều bạn đang cần. Chúng mình sẽ cùng bạn chọn sản phẩm phù hợp, xác nhận giá và tư vấn cách dùng trước khi đặt hàng.</p>
          <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="michio-text-link mt-4 inline-flex min-h-12 items-center gap-5 text-sm font-semibold">Nhắn Zalo cho Michio <span aria-hidden="true">↗</span></a>
        </div>
        <ol className="divide-y divide-[var(--michio-border)]">
          {[
            ["Chọn sản phẩm", "Xem hình ảnh, thông tin và giá ngay trên website."],
            ["Nhắn Michio", "Gửi tên hoặc link sản phẩm qua Zalo, Fanpage."],
            ["Xác nhận & nhận hàng", "Thống nhất sản phẩm, phí ship và địa chỉ giao hàng."],
          ].map(([title, text], i) => <li key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0"><span className="pt-1 text-xs text-[var(--michio-primary)]">0{i + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[var(--michio-text-muted)]">{text}</p></div></li>)}
        </ol>
      </section>

      <section className="michio-reveal py-10 md:py-14">
        <SectionHeading eyebrow="Michio Journal" title="Đọc một chút, chọn đúng hơn" href="/tin-tuc" label="Tất cả bài viết" />
        <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group">
              <div className="overflow-hidden rounded-xl bg-[var(--michio-surface-warm)]"><Image src={post.image} alt={post.title} width={1200} height={675} sizes="(min-width: 1280px) 390px, (min-width: 768px) 33vw, 100vw" quality={68} className="aspect-video w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.025]" /></div>
              <p className="michio-eyebrow mt-4">{BLOG_CATEGORY_MAP[post.category]?.shortName ?? "Michio Journal"}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-[var(--michio-primary)]">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--michio-text-muted)]">{post.description}</p>
              <span className="mt-3 inline-flex min-h-11 items-center text-sm font-medium">Đọc bài viết <span aria-hidden="true" className="ml-3">↗</span></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
