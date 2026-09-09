import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORY_MAP, getBlogPosts } from "@/lib/blog";
import { LINKS } from "@/lib/links";
import { PRODUCTS } from "@/lib/products";
import { CategoryRail } from "@/components/product/category-rail";
import { ProductGrid } from "@/components/product/product-card";

const featuredProducts = PRODUCTS.slice(0, 8);
const PROMOTION_BANNER = "/images/promotions/deal-nhat-xinh-yeu.webp";

function SectionHeading({ title, href, label = "Xem tất cả" }: { title: string; href: string; label?: string }) {
  return <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold tracking-[-0.025em] md:text-2xl">{title}</h2><Link href={href} className="inline-flex min-h-11 shrink-0 items-center text-xs font-semibold text-[var(--michio-primary)]">{label}<span aria-hidden="true" className="ml-1">→</span></Link></div>;
}

export function MujiHomePreview() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-8 md:px-8">
      <section aria-label="Ưu đãi nổi bật" className="pt-4 md:pt-6">
        <Link href="/danh-muc/my-pham-skincare" className="group relative block overflow-hidden rounded-[16px] bg-[var(--michio-primary-soft)]">
          <Image src={PROMOTION_BANNER} alt="Deal Nhật Xinh Yêu – chăm da và làm đẹp nội địa Nhật" width={1672} height={941} priority sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)" className="aspect-[16/9] w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.01] motion-reduce:transition-none" />
        </Link>
      </section>

      <section aria-label="Dịch vụ Michio" className="mt-3 grid grid-cols-4 divide-x divide-[var(--michio-border)] rounded-[14px] bg-[var(--michio-primary-soft)] px-1 py-3 text-center">
        {["Đồ Nhật chọn lọc", "Tư vấn tận tâm", "Đặt hàng trực tiếp", "Hỗ trợ qua Zalo"].map((item, index) => <div key={item} className="px-1.5"><span aria-hidden="true" className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[12px] font-bold text-[var(--michio-primary)]">{index + 1}</span><p className="text-[10px] font-medium leading-4 text-[var(--michio-text)] sm:text-xs">{item}</p></div>)}
      </section>

      <section aria-label="Danh mục nổi bật" className="py-7 md:py-10">
        <SectionHeading title="Danh mục nổi bật" href="/cua-hang" />
        <div className="mt-4"><CategoryRail /></div>
      </section>

      <section aria-label="Sản phẩm bán chạy" className="border-t border-[var(--michio-border)] py-7 md:py-10">
        <SectionHeading title="Sản phẩm bán chạy" href="/cua-hang" />
        <div className="mt-4"><ProductGrid products={featuredProducts} /></div>
      </section>

      <section aria-labelledby="contact-title" className="rounded-[16px] bg-[var(--michio-primary-soft)] px-4 py-5 md:flex md:items-center md:justify-between md:px-7">
        <div><p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--michio-primary)]">Cần Michio tư vấn?</p><h2 id="contact-title" className="mt-1 text-xl font-bold tracking-[-0.025em]">Chọn đúng sản phẩm, chốt đơn trực tiếp</h2><p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--michio-text-muted)]">Gửi tên hoặc đường dẫn sản phẩm, Michio sẽ hỗ trợ qua Zalo hoặc Fanpage.</p></div>
        <div className="mt-4 flex gap-2 md:mt-0 md:pl-6"><a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="michio-btn-primary inline-flex min-h-11 flex-1 items-center justify-center rounded-[10px] px-4 text-sm md:flex-none">Nhắn Zalo</a><a href={LINKS.messenger} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[10px] border border-[var(--michio-primary)] bg-white px-4 text-sm font-semibold text-[var(--michio-primary)] md:flex-none">Fanpage</a></div>
      </section>

      <section aria-label="Bài viết nổi bật" className="py-8 md:py-12">
        <SectionHeading title="Bài viết nổi bật" href="/tin-tuc" />
        <div className="mt-4 grid gap-3 md:grid-cols-3 md:gap-5">{posts.map((post) => <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group grid grid-cols-[112px_1fr] gap-3 border-b border-[var(--michio-border)] pb-3 md:block md:border-0 md:pb-0"><Image src={post.image} alt={post.title} width={600} height={338} sizes="(min-width: 768px) 33vw, 112px" quality={66} className="aspect-[4/3] w-full rounded-[10px] bg-[var(--michio-surface-muted)] object-contain md:aspect-video" /><div className="min-w-0 md:pt-3"><p className="text-[11px] font-medium text-[var(--michio-primary)]">{BLOG_CATEGORY_MAP[post.category]?.shortName ?? "Michio Journal"}</p><h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-5 group-hover:text-[var(--michio-primary)] md:text-base">{post.title}</h3></div></Link>)}</div>
      </section>
    </main>
  );
}
