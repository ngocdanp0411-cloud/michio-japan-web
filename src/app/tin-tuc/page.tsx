import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Tin tức và hướng dẫn chăm sóc | Michio Japan",
  description: "Kiến thức collagen, skincare Nhật, thực phẩm bổ sung và hướng dẫn mua hàng từ Michio Japan.",
};

export default function Page() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;
  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
          <p className="michio-eyebrow">Michio Journal / Kiến thức thực tế</p>
          <h1 className="michio-display mt-2 text-5xl uppercase md:text-6xl">Bài viết</h1>
          <p className="michio-body mt-3 max-w-[58ch] text-base md:text-lg">Hướng dẫn ngắn gọn về chăm sóc da, collagen, sức khỏe và cách chọn sản phẩm Nhật phù hợp với thói quen mỗi ngày.</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {featured && <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><Link href={`/tin-tuc/${featured.slug}`} className="group relative overflow-hidden rounded-md border border-[var(--michio-border)] bg-white"><Image src={featured.image} alt={featured.title} width={1400} height={800} priority sizes="(min-width: 1024px) 65vw, 100vw" quality={72} className="h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-[360px]" /><span className="absolute bottom-4 right-4 rounded-full border-2 border-white bg-white p-1 shadow"><Image src="/images/brand/michio-authentic-logo.jpg" alt="Michio Japan" width={58} height={58} quality={55} className="h-12 w-12 rounded-full object-cover" /></span></Link><div><p className="michio-eyebrow">Bài viết nổi bật</p><h2 className="michio-h2 mt-2 text-3xl uppercase md:text-4xl">{featured.title}</h2><p className="michio-body mt-4 text-base">{featured.description}</p><Link href={`/tin-tuc/${featured.slug}`} className="michio-btn-primary mt-6 inline-flex h-11 items-center rounded px-5 text-sm uppercase">Đọc bài viết</Link></div></section>}

        <section className="mt-12 border-t border-[var(--michio-border)] pt-8 md:mt-16 md:pt-10"><div className="flex items-end justify-between gap-4"><div><p className="michio-eyebrow">Tất cả nội dung</p><h2 className="michio-h2 mt-1 uppercase">Bài viết liên quan</h2></div><span className="michio-caption">{posts.length} bài viết</span></div><div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{rest.map((post) => <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden rounded-md border border-[var(--michio-border)] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_10px_24px_rgba(17,17,22,0.08)]"><div className="relative"><Image src={post.image} alt={post.title} width={1200} height={675} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" quality={68} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" /><span className="absolute bottom-3 right-3 rounded-full border border-white bg-white p-1 shadow"><Image src="/images/brand/michio-authentic-logo.jpg" alt="" width={42} height={42} quality={55} className="h-8 w-8 rounded-full object-cover" /></span></div><div className="p-5"><p className="michio-eyebrow">Michio Journal</p><h3 className="michio-h3 mt-2 line-clamp-2 text-xl">{post.title}</h3><p className="michio-body mt-2 line-clamp-3 text-sm">{post.description}</p><span className="mt-5 inline-flex text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết →</span></div></Link>)}</div></section>
      </main>
    </div>
  );
}
