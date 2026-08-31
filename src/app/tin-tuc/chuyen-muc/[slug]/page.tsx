import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_MAP,
  getBlogPostsByCategory,
} from "@/lib/blog";
import { absoluteUrl, limitDescription, limitTitle } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORY_MAP[slug];
  if (!category) return {};
  return {
    title: limitTitle(`${category.name} | Michio Journal`),
    description: limitDescription(category.description),
    alternates: { canonical: absoluteUrl(`/tin-tuc/chuyen-muc/${slug}`) },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = BLOG_CATEGORY_MAP[slug];
  if (!category) notFound();
  const posts = getBlogPostsByCategory(slug);

  return (
    <div>
      <section className="border-b border-[var(--michio-border)] bg-[var(--michio-primary-soft)]">
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="michio-caption flex flex-wrap gap-2">
            <Link href="/tin-tuc">Bài viết</Link><span>/</span><span>{category.name}</span>
          </nav>
          <p className="michio-eyebrow mt-6">Michio Journal / Chuyên mục</p>
          <h1 className="michio-display mt-2 max-w-4xl text-4xl uppercase md:text-6xl">{category.name}</h1>
          <p className="michio-body mt-4 max-w-[64ch] text-base md:text-lg">{category.description}</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <nav aria-label="Các chuyên mục bài viết" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BLOG_CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              href={`/tin-tuc/chuyen-muc/${item.slug}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${item.slug === slug ? "border-[var(--michio-primary)] bg-[var(--michio-primary)] text-white" : "border-[var(--michio-border-strong)] bg-white text-[var(--michio-text-muted)]"}`}
            >
              {item.shortName}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-[var(--michio-border)] pb-4">
          <div><p className="michio-eyebrow">Nội dung theo chủ đề</p><h2 className="michio-h2 mt-1 uppercase">Bài viết mới nhất</h2></div>
          <span className="michio-caption">{posts.length} bài viết</span>
        </div>

        {posts.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden rounded-md border border-[var(--michio-border)] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-primary)] hover:shadow-[0_10px_24px_rgba(17,17,22,0.08)]">
                <Image src={post.image} alt={post.title} width={1200} height={675} priority={index === 0} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" quality={68} className="aspect-video w-full bg-[#fff8f6] object-contain" />
                <div className="p-5">
                  <p className="michio-eyebrow">{category.shortName}</p>
                  <h2 className="michio-h3 mt-2 line-clamp-2 text-xl">{post.title}</h2>
                  <p className="michio-body mt-2 line-clamp-3 text-sm">{post.description}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-md border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-8 text-center">
            <h2 className="michio-h3">Bài mới đang được cập nhật</h2>
            <p className="michio-body mx-auto mt-2 max-w-xl">Michio sẽ bổ sung hướng dẫn thực tế cho chuyên mục này trong các ngày tới.</p>
          </div>
        )}

        <section className="mt-10 flex flex-col gap-4 rounded-md bg-[var(--michio-navy)] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div><p className="michio-eyebrow text-white/70">Sản phẩm liên quan</p><h2 className="michio-h2 mt-1 text-white uppercase">Chọn đúng theo nhu cầu</h2></div>
          <Link href={`/danh-muc/${category.productCategory}`} className="michio-btn-primary inline-flex h-11 items-center justify-center rounded px-5 text-sm uppercase">Xem sản phẩm</Link>
        </section>
      </main>
    </div>
  );
}
