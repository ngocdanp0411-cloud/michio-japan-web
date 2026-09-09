import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { BLOG_CATEGORY_MAP, getBlogPosts } from "@/lib/blog";
import { LINKS } from "@/lib/links";
import { formatPrice, PRODUCTS, type Product } from "@/lib/products";

const featuredProducts = PRODUCTS.slice(0, 8);
const heroProducts = [featuredProducts[0], featuredProducts[4], featuredProducts[3]];

function HeroArtwork() {
  return (
    <div className="relative min-h-[248px] overflow-hidden border border-[var(--michio-border)] bg-[#efede7] md:min-h-[430px]">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[28%] bg-[#e5e2da]" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 h-[34%] w-[44%] bg-[var(--michio-primary)]" />
      <span className="absolute left-4 top-4 text-[10px] font-medium tracking-[0.16em] text-[var(--michio-text-muted)]">SKINCARE / NHẬT BẢN</span>
      <Link href="/danh-muc/my-pham-skincare" className="absolute right-3 top-3 z-10 inline-flex min-h-11 items-center border border-[var(--michio-primary)] bg-[var(--michio-primary)] px-3 text-xs font-semibold text-white transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none">Khám phá <span aria-hidden="true" className="ml-2">→</span></Link>
      <Image src={heroProducts[0].image} alt="" width={520} height={520} preload sizes="(min-width: 768px) 260px, 38vw" className="absolute bottom-4 left-[5%] w-[34%] object-contain" />
      <Image src={heroProducts[1].image} alt="" width={700} height={700} preload sizes="(min-width: 768px) 330px, 48vw" className="absolute bottom-0 left-1/2 w-[48%] -translate-x-1/2 object-contain" />
      <Image src={heroProducts[2].image} alt="" width={520} height={520} preload sizes="(min-width: 768px) 250px, 35vw" className="absolute bottom-[8%] right-[2%] w-[34%] object-contain" />
    </div>
  );
}

function ProductTile({ product }: { product: Product }) {
  return (
    <article className="flex min-w-0 flex-col border-t border-[var(--michio-border)] pt-3">
      <Link href={`/san-pham/${product.slug}`} prefetch={false} className="group block bg-[#f5f4f0] focus-visible:-outline-offset-4">
        <Image src={product.image} alt={product.name} width={600} height={600} sizes="(min-width: 1280px) 288px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw" quality={68} className="aspect-square w-full object-contain p-4 transition-transform duration-200 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none" />
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <Link href={`/san-pham/${product.slug}`} prefetch={false} className="line-clamp-2 min-h-11 text-sm font-medium leading-5 text-[var(--michio-text)] transition-colors duration-200 hover:text-[var(--michio-primary)] motion-reduce:transition-none">{product.name}</Link>
        <p className="mt-2 text-base font-semibold tabular-nums text-[var(--michio-primary)]">{formatPrice(product.price)}</p>
        <a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" aria-label={`Tư vấn Zalo về ${product.name}`} className="mt-2 inline-flex min-h-11 items-center border-b border-[var(--michio-border)] text-xs font-semibold text-[var(--michio-text-muted)] transition-colors duration-200 hover:text-[var(--michio-primary)] motion-reduce:transition-none">Tư vấn Zalo <span aria-hidden="true" className="ml-2">→</span></a>
      </div>
    </article>
  );
}

export function MujiHomePreview() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="hero-title" className="grid border-b border-[var(--michio-border)] py-7 md:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] md:items-center md:gap-12 md:py-14">
        <div className="relative z-10 pb-7 md:pb-0">
          <p className="text-xs font-medium tracking-[0.12em] text-[var(--michio-text-muted)]">MICHIO JAPAN / CHỌN LỌC MỖI NGÀY</p>
          <h1 id="hero-title" className="mt-4 max-w-[10ch] text-balance text-[2rem] font-semibold leading-[1.12] tracking-[-0.045em] text-[var(--michio-text)] sm:text-[2.4rem] md:max-w-[12ch] md:text-[3.5rem]">Đồ Nhật. Mỗi ngày.</h1>
          <p className="mt-5 max-w-[33ch] text-[15px] leading-6 text-[var(--michio-text-muted)] md:text-base">Sản phẩm chăm sóc và đồ dùng Nhật Bản được Michio chọn theo nhu cầu thật của bạn.</p>
        </div>
        <HeroArtwork />
      </section>

      <section aria-labelledby="categories-title" className="border-b border-[var(--michio-border)] py-8 md:py-12">
        <div className="flex items-end justify-between gap-4"><h2 id="categories-title" className="text-xl font-semibold tracking-[-0.035em] md:text-2xl">Danh mục mua sắm</h2><Link href="/cua-hang" className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--michio-primary)]">Xem toàn bộ <span aria-hidden="true" className="ml-2">→</span></Link></div>
        <div className="mt-5 grid grid-cols-4 border-l border-t border-[var(--michio-border)] md:grid-cols-8">
          {CATEGORIES.map((category, index) => <Link key={category.slug} href={`/danh-muc/${category.slug}`} className="group flex min-h-[88px] min-w-0 flex-col justify-between border-b border-r border-[var(--michio-border)] p-3 transition-colors duration-200 hover:bg-[#f3f2ef] motion-reduce:transition-none"><span className="text-[10px] tabular-nums text-[var(--michio-text-subtle)]">0{index + 1}</span><span className="text-balance text-xs font-medium leading-4 transition-colors duration-200 group-hover:text-[var(--michio-primary)] motion-reduce:transition-none">{category.name}</span></Link>)}
        </div>
      </section>

      <section aria-labelledby="featured-title" className="py-8 md:py-12">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs text-[var(--michio-text-muted)]">Gợi ý từ Michio</p><h2 id="featured-title" className="mt-1 text-xl font-semibold tracking-[-0.035em] md:text-2xl">Sản phẩm chọn lọc</h2></div><Link href="/cua-hang" className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--michio-primary)]">Xem thêm <span aria-hidden="true" className="ml-2">→</span></Link></div>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4"><>{featuredProducts.map((product) => <ProductTile key={product.slug} product={product} />)}</></div>
      </section>

      <section aria-labelledby="ordering-title" className="border-y border-[var(--michio-border)] py-8 md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-12">
        <div><p className="text-xs text-[var(--michio-text-muted)]">Đặt hàng trực tiếp</p><h2 id="ordering-title" className="mt-2 max-w-[12ch] text-2xl font-semibold leading-tight tracking-[-0.04em]">Chọn món phù hợp, rồi nhắn Michio.</h2><a href={LINKS.zalo} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center border-b border-[var(--michio-primary)] text-sm font-semibold text-[var(--michio-primary)]">Nhắn Zalo để được tư vấn <span aria-hidden="true" className="ml-3">→</span></a></div>
        <ol className="mt-8 divide-y divide-[var(--michio-border)] border-t border-[var(--michio-border)] md:mt-0">{[["01", "Chọn sản phẩm", "Xem hình, thông tin và giá trên website."], ["02", "Nhắn Michio", "Gửi tên hoặc link sản phẩm qua Zalo hoặc Fanpage."], ["03", "Xác nhận & nhận hàng", "Chốt sản phẩm, phí ship và địa chỉ giao hàng."]].map(([number, title, text]) => <li key={number} className="grid grid-cols-[34px_1fr] gap-3 py-4"><span className="text-xs font-medium text-[var(--michio-primary)]">{number}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[var(--michio-text-muted)]">{text}</p></div></li>)}</ol>
      </section>

      <section aria-labelledby="journal-title" className="py-10 md:py-14"><div className="flex items-end justify-between gap-4"><div><p className="text-xs text-[var(--michio-text-muted)]">Michio Journal</p><h2 id="journal-title" className="mt-1 text-xl font-semibold tracking-[-0.035em] md:text-2xl">Đọc để chọn đúng hơn</h2></div><Link href="/tin-tuc" className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--michio-primary)]">Tất cả bài viết <span aria-hidden="true" className="ml-2">→</span></Link></div><div className="mt-5 grid gap-8 md:grid-cols-3 md:gap-5">{posts.map((post) => <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group border-t border-[var(--michio-border)] pt-3"><Image src={post.image} alt={post.title} width={1200} height={675} sizes="(min-width: 1280px) 390px, (min-width: 768px) 33vw, 100vw" quality={68} className="aspect-video w-full bg-[#f5f4f0] object-contain" /><p className="mt-4 text-[11px] font-medium tracking-[0.1em] text-[var(--michio-text-muted)]">{BLOG_CATEGORY_MAP[post.category]?.shortName ?? "Michio Journal"}</p><h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-[var(--michio-primary)] motion-reduce:transition-none">{post.title}</h3><span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết <span aria-hidden="true" className="ml-3">→</span></span></Link>)}</div></section>
    </main>
  );
}
