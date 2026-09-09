import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/blog-content";
import { BLOG_CATEGORY_MAP, getBlogPost, getBlogPosts } from "@/lib/blog";
import { LINKS } from "@/lib/links";
import { absoluteUrl, limitDescription, limitTitle, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/tin-tuc/${post.slug}`);
  const title = limitTitle(post.title);
  const description = limitDescription(post.description);
  const image = absoluteUrl(post.image);
  return { title, description, keywords: [post.primaryKeyword, ...post.secondaryKeywords, "Michio Journal"].filter(Boolean), alternates: { canonical: url }, robots: { index: true, follow: true }, openGraph: { title, description, url, siteName: SITE_NAME, locale: "vi_VN", type: "article", publishedTime: post.publishedAt, images: [{ url: image, alt: post.title }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const category = BLOG_CATEGORY_MAP[post.category];
  const candidates = getBlogPosts().filter((item) => item.slug !== post.slug);
  const related = [
    ...candidates.filter((item) => item.category === post.category),
    ...candidates.filter((item) => item.category !== post.category),
  ].slice(0, 3);
  const schemas = [
    {
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: absoluteUrl(post.image),
      mainEntityOfPage: absoluteUrl(`/tin-tuc/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      articleSection: category?.name,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/michio-authentic-logo.jpg") } },
      inLanguage: "vi-VN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Bài viết", item: absoluteUrl("/tin-tuc") },
        { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/tin-tuc/${post.slug}`) },
      ],
    },
    ...(post.faqs.length ? [{ "@type": "FAQPage", mainEntity: post.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] : []),
  ];

  return (
    <div>
      <main className="mx-auto max-w-[1120px] px-4 pb-14 pt-4 md:px-6 md:pb-20 md:pt-8">
        <article className="mx-auto max-w-[760px]">
          <nav aria-label="Breadcrumb" className="-ml-2">
            <Link href="/tin-tuc" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-[var(--michio-navy)] transition-colors hover:bg-[var(--michio-primary-soft)] hover:text-[var(--michio-primary)]">
              <span aria-hidden="true" className="text-xl leading-none">‹</span> Bài viết
            </Link>
          </nav>

          <header className="mt-2 text-left">
            <Link href={`/tin-tuc/chuyen-muc/${post.category}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--michio-primary)] hover:underline">{category?.name ?? "Michio Journal"}</Link>
            <h1 className="mt-2 text-balance text-[1.75rem] font-bold leading-[1.22] tracking-[-0.03em] text-[var(--michio-navy)] md:text-[2.65rem]">{post.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-[var(--michio-text-subtle)]">
              <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("vi-VN").format(new Date(post.publishedAt))}</time>
              <span aria-hidden="true">·</span><span>Tác giả: {post.author}</span>
            </div>
            <p className="mt-4 text-[15px] leading-6 text-[var(--michio-text-muted)] md:text-base">{post.description}</p>
            {post.aiAssisted && <p className="mt-3 rounded-lg bg-[var(--michio-primary-soft)] px-3 py-2 text-xs leading-5 text-[var(--michio-text-subtle)]">Bài viết được AI hỗ trợ tổng hợp từ các nguồn được dẫn và chỉ nhằm mục đích cung cấp thông tin.</p>}
          </header>

          <div className="mt-6 overflow-hidden rounded-xl bg-[var(--michio-surface-warm)] md:mt-8">
            <Image src={post.image} alt={post.title} width={1600} height={900} priority sizes="(min-width: 768px) 760px, 100vw" quality={72} className="aspect-video w-full object-contain" />
          </div>

          <div className="mt-7 md:mt-9"><BlogContent content={post.content} /></div>

          <section className="mt-10 rounded-2xl bg-[var(--michio-primary)] p-5 text-white md:p-7">
            <h2 className="text-xl font-bold leading-snug text-white">Chọn sản phẩm phù hợp với thói quen của bạn</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">Tham khảo các sản phẩm Nhật được chọn lọc tại Michio Japan và đọc kỹ thông tin trên nhãn trước khi mua.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/cua-hang" className="inline-flex min-h-11 items-center rounded-lg bg-white px-5 text-sm font-semibold text-[var(--michio-primary)]">Xem sản phẩm</Link>
              <a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-lg border border-white/70 px-5 text-sm font-semibold text-white hover:bg-white/10">Nhắn Zalo</a>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <aside aria-labelledby="related-posts-title" className="mx-auto mt-12 max-w-[920px] border-t border-[var(--michio-border)] pt-7 md:mt-16">
            <h2 id="related-posts-title" className="text-xl font-bold text-[var(--michio-navy)]">Bài viết liên quan</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/tin-tuc/${item.slug}`} className="group grid grid-cols-[112px_minmax(0,1fr)] gap-3 rounded-xl py-2 md:block md:py-0">
                  <Image src={item.image} alt={item.title} width={440} height={248} sizes="(min-width: 768px) 30vw, 112px" quality={62} className="aspect-[4/3] w-full rounded-xl bg-[var(--michio-surface-warm)] object-contain md:aspect-video" />
                  <h3 className="line-clamp-3 self-center text-sm font-semibold leading-5 text-[var(--michio-navy)] group-hover:text-[var(--michio-primary)] md:mt-2 md:text-base">{item.title}</h3>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemas }) }} />
    </div>
  );
}
