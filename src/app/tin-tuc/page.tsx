import Image from "next/image";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_MAP,
  getBlogPosts,
  getBlogPostsByCategory,
} from "@/lib/blog";

export const metadata = {
  title: "Tin tức và hướng dẫn chăm sóc",
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
          <p className="michio-body mt-3 max-w-[58ch] text-base md:text-lg">
            Hướng dẫn ngắn gọn về chăm sóc da, collagen, sức khỏe và cách chọn sản phẩm Nhật phù hợp với thói quen mỗi ngày.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <section aria-labelledby="blog-categories-title">
          <div className="flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-4">
            <div><p className="michio-eyebrow">Tìm đúng nội dung</p><h2 id="blog-categories-title" className="michio-h2 mt-1 uppercase">Khám phá chuyên mục</h2></div>
            <span className="michio-caption">5 chủ đề</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {BLOG_CATEGORIES.map((category) => {
              const count = getBlogPostsByCategory(category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/tin-tuc/chuyen-muc/${category.slug}`}
                  className="group rounded-md border border-t-4 border-[var(--michio-border)] bg-white p-4 transition-[box-shadow,transform] duration-200 last:col-span-2 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,17,22,0.08)] lg:last:col-span-1"
                  style={{ borderTopColor: category.accent }}
                >
                  <span className="michio-caption">{count > 0 ? `${count} bài viết` : "Sắp có bài mới"}</span>
                  <h3 className="mt-2 text-base font-bold leading-5 group-hover:text-[var(--michio-primary)]">{category.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--michio-text-muted)]">{category.description}</p>
                  <span className="mt-4 inline-flex text-xs font-semibold text-[var(--michio-primary)]">Xem chuyên mục →</span>
                </Link>
              );
            })}
          </div>
        </section>

        {featured && (
          <section className="mt-12 grid gap-6 border-t border-[var(--michio-border)] pt-8 md:mt-16 md:pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Link href={`/tin-tuc/${featured.slug}`} className="group overflow-hidden rounded-md border border-[var(--michio-border)] bg-white">
              <Image src={featured.image} alt={featured.title} width={1600} height={900} priority sizes="(min-width: 1024px) 65vw, 100vw" quality={72} className="aspect-video w-full bg-[#fff8f6] object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>
            <div>
              <Link href={`/tin-tuc/chuyen-muc/${featured.category}`} className="michio-eyebrow hover:underline">
                {BLOG_CATEGORY_MAP[featured.category]?.name ?? "Michio Journal"}
              </Link>
              <h2 className="michio-h2 mt-2 text-3xl uppercase md:text-4xl">{featured.title}</h2>
              <p className="michio-body mt-4 text-base">{featured.description}</p>
              <Link href={`/tin-tuc/${featured.slug}`} className="michio-btn-primary mt-6 inline-flex h-11 items-center rounded px-5 text-sm uppercase">Đọc bài viết</Link>
            </div>
          </section>
        )}

        <section className="mt-12 border-t border-[var(--michio-border)] pt-8 md:mt-16 md:pt-10">
          <div className="flex items-end justify-between gap-4">
            <div><p className="michio-eyebrow">Tất cả nội dung</p><h2 className="michio-h2 mt-1 uppercase">Bài viết mới nhất</h2></div>
            <span className="michio-caption">{posts.length} bài viết</span>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => {
              const category = BLOG_CATEGORY_MAP[post.category];
              return (
                <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden rounded-md border border-[var(--michio-border)] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_10px_24px_rgba(17,17,22,0.08)]">
                  <Image src={post.image} alt={post.title} width={1200} height={675} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" quality={68} className="aspect-video w-full bg-[#fff8f6] object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                  <div className="p-5">
                    <p className="michio-eyebrow">{category?.shortName ?? "Michio Journal"}</p>
                    <h3 className="michio-h3 mt-2 line-clamp-2 text-xl">{post.title}</h3>
                    <p className="michio-body mt-2 line-clamp-3 text-sm">{post.description}</p>
                    <span className="mt-5 inline-flex text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
