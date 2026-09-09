import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CATEGORIES, BLOG_CATEGORY_MAP, getBlogPostsByCategory } from "@/lib/blog";
import { absoluteUrl, limitDescription, limitTitle } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORY_MAP[slug];
  if (!category) return {};
  return {
    title: limitTitle(`${category.name} | Michio Journal`),
    description: limitDescription(category.description),
    alternates: { canonical: absoluteUrl(`/tin-tuc/chuyen-muc/${slug}`) },
  };
}

const formatDate = (date: string) => new Intl.DateTimeFormat("vi-VN").format(new Date(date));

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = BLOG_CATEGORY_MAP[slug];
  if (!category) notFound();
  const posts = getBlogPostsByCategory(slug);

  return (
    <main className="mx-auto max-w-[1120px] px-4 pb-14 pt-7 md:px-6 md:pb-20 md:pt-12">
      <nav aria-label="Breadcrumb" className="flex min-h-11 items-center gap-2 text-xs text-[var(--michio-text-subtle)]">
        <Link href="/tin-tuc" className="font-medium hover:text-[var(--michio-primary)]">Bài viết</Link>
        <span aria-hidden="true">/</span><span>{category.name}</span>
      </nav>

      <header className="mt-2 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--michio-primary)]">Michio Journal</p>
        <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-[var(--michio-navy)] md:text-4xl">{category.name}</h1>
        <p className="mt-2 text-[15px] leading-6 text-[var(--michio-text-muted)] md:text-base">{category.description}</p>
      </header>

      <nav aria-label="Các chuyên mục bài viết" className="-mx-4 mt-5 flex gap-6 overflow-x-auto border-b border-[var(--michio-border)] px-4 scrollbar-none md:mx-0 md:px-0">
        <Link href="/tin-tuc" className="flex min-h-11 shrink-0 items-center border-b-2 border-transparent text-sm font-medium text-[var(--michio-text-muted)] hover:text-[var(--michio-primary)]">Tất cả</Link>
        {BLOG_CATEGORIES.map((item) => (
          <Link key={item.slug} href={`/tin-tuc/chuyen-muc/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined} className={`flex min-h-11 shrink-0 items-center border-b-2 text-sm ${item.slug === slug ? "border-[var(--michio-primary)] font-semibold text-[var(--michio-primary)]" : "border-transparent font-medium text-[var(--michio-text-muted)] hover:text-[var(--michio-primary)]"}`}>{item.shortName}</Link>
        ))}
      </nav>

      <section aria-labelledby="category-posts-title" className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <h2 id="category-posts-title" className="text-lg font-bold text-[var(--michio-navy)] md:text-xl">Bài viết mới nhất</h2>
          <span className="text-xs text-[var(--michio-text-subtle)]">{posts.length} bài viết</span>
        </div>

        {posts.length > 0 ? (
          <div className="mt-3 divide-y divide-[var(--michio-border)] border-y border-[var(--michio-border)]">
            {posts.map((post, index) => (
              <article key={post.slug}>
                <Link href={`/tin-tuc/${post.slug}`} className="group grid min-h-[120px] grid-cols-[112px_minmax(0,1fr)] gap-4 py-4 transition-colors hover:bg-[var(--michio-primary-soft)] sm:grid-cols-[152px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:px-3">
                  <div className="overflow-hidden rounded-xl bg-[var(--michio-surface-warm)]">
                    <Image src={post.image} alt={post.title} width={440} height={248} priority={index === 0} sizes="(min-width: 768px) 220px, (min-width: 640px) 152px, 112px" quality={68} className="aspect-[4/3] h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025] sm:aspect-video" />
                  </div>
                  <div className="min-w-0 self-center py-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--michio-primary)]">{category.shortName}</p>
                    <h2 className="mt-1 line-clamp-3 text-[15px] font-semibold leading-[1.42] text-[var(--michio-navy)] transition-colors group-hover:text-[var(--michio-primary)] sm:text-base md:text-lg">{post.title}</h2>
                    <p className="mt-1.5 text-xs text-[var(--michio-text-subtle)]">{formatDate(post.publishedAt)}</p>
                    <p className="mt-2 hidden line-clamp-2 text-sm leading-6 text-[var(--michio-text-muted)] md:block">{post.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-8 text-center">
            <h2 className="text-lg font-semibold text-[var(--michio-navy)]">Bài mới đang được cập nhật</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--michio-text-muted)]">Michio sẽ bổ sung hướng dẫn thực tế cho chuyên mục này trong các ngày tới.</p>
          </div>
        )}
      </section>

      <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-[var(--michio-primary-soft)] p-5 sm:flex-row sm:items-center sm:justify-between md:p-7">
        <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--michio-primary)]">Sản phẩm liên quan</p><h2 className="mt-1 text-lg font-bold text-[var(--michio-navy)]">Chọn đúng theo nhu cầu</h2></div>
        <Link href={`/danh-muc/${category.productCategory}`} className="michio-btn-primary inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm">Xem sản phẩm</Link>
      </section>
    </main>
  );
}
