import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, BLOG_CATEGORY_MAP, getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Tin tức và hướng dẫn chăm sóc",
  alternates: { canonical: "/tin-tuc" },
  description: "Kiến thức collagen, skincare Nhật, thực phẩm bổ sung và hướng dẫn mua hàng từ Michio Japan.",
};

const formatDate = (date: string) => new Intl.DateTimeFormat("vi-VN").format(new Date(date));

export default function Page() {
  const posts = getBlogPosts();

  return (
    <main className="mx-auto max-w-[1120px] px-4 pb-14 pt-7 md:px-6 md:pb-20 md:pt-12">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--michio-primary)]">Michio Journal</p>
        <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-[var(--michio-navy)] md:text-4xl">Bài viết</h1>
        <p className="mt-2 text-[15px] leading-6 text-[var(--michio-text-muted)] md:text-base">Hướng dẫn ngắn gọn về chăm sóc da, collagen, sức khỏe và cách chọn sản phẩm Nhật phù hợp với thói quen mỗi ngày.</p>
      </header>

      <nav aria-label="Các chuyên mục bài viết" className="-mx-4 mt-5 flex gap-6 overflow-x-auto border-b border-[var(--michio-border)] px-4 scrollbar-none md:mx-0 md:px-0">
        <Link href="/tin-tuc" aria-current="page" className="flex min-h-11 shrink-0 items-center border-b-2 border-[var(--michio-primary)] text-sm font-semibold text-[var(--michio-primary)]">Tất cả</Link>
        {BLOG_CATEGORIES.map((category) => (
          <Link key={category.slug} href={`/tin-tuc/chuyen-muc/${category.slug}`} className="flex min-h-11 shrink-0 items-center border-b-2 border-transparent text-sm font-medium text-[var(--michio-text-muted)] transition-colors hover:text-[var(--michio-primary)]">{category.shortName}</Link>
        ))}
      </nav>

      <section aria-labelledby="latest-posts-title" className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <h2 id="latest-posts-title" className="text-lg font-bold text-[var(--michio-navy)] md:text-xl">Bài viết mới nhất</h2>
          <span className="text-xs text-[var(--michio-text-subtle)]">{posts.length} bài viết</span>
        </div>

        <div className="mt-3 divide-y divide-[var(--michio-border)] border-y border-[var(--michio-border)]">
          {posts.map((post, index) => {
            const category = BLOG_CATEGORY_MAP[post.category];
            return (
              <article key={post.slug}>
                <Link href={`/tin-tuc/${post.slug}`} className="group grid min-h-[120px] grid-cols-[112px_minmax(0,1fr)] gap-4 py-4 transition-colors hover:bg-[var(--michio-primary-soft)] sm:grid-cols-[152px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:px-3">
                  <div className="overflow-hidden rounded-xl bg-[var(--michio-surface-warm)]">
                    <Image src={post.image} alt={post.title} width={440} height={248} priority={index === 0} sizes="(min-width: 768px) 220px, (min-width: 640px) 152px, 112px" quality={68} className="aspect-[4/3] h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025] sm:aspect-video" />
                  </div>
                  <div className="min-w-0 self-center py-0.5">
                    <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--michio-primary)]">{category?.shortName ?? "Michio Journal"}</p>
                    <h3 className="mt-1 line-clamp-3 text-[15px] font-semibold leading-[1.42] text-[var(--michio-navy)] transition-colors group-hover:text-[var(--michio-primary)] sm:text-base md:text-lg">{post.title}</h3>
                    <p className="mt-1.5 text-xs text-[var(--michio-text-subtle)]">{formatDate(post.publishedAt)}</p>
                    <p className="mt-2 hidden line-clamp-2 text-sm leading-6 text-[var(--michio-text-muted)] md:block">{post.description}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
