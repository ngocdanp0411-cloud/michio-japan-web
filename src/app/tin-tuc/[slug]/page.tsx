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
      author: { "@type": "Organization", name: SITE_NAME },
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
      <main className="mx-auto max-w-[1280px] px-4 py-7 md:py-10">
        <nav aria-label="Breadcrumb" className="michio-caption flex flex-wrap items-center gap-2"><Link href="/" className="hover:text-[var(--michio-primary)]">Trang chủ</Link><span>/</span><Link href="/tin-tuc" className="hover:text-[var(--michio-primary)]">Bài viết</Link><span>/</span><span className="line-clamp-1">{post.title}</span></nav>

        <header className="mx-auto mt-7 max-w-4xl text-center md:mt-10"><Link href={`/tin-tuc/chuyen-muc/${post.category}`} className="michio-eyebrow hover:underline">{category?.name ?? "Michio Journal"}</Link><h1 className="michio-display mt-3 text-4xl uppercase md:text-6xl">{post.title}</h1><div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--michio-text-subtle)]"><span>{new Intl.DateTimeFormat("vi-VN").format(new Date(post.publishedAt))}</span><span aria-hidden="true">•</span><span>Tác giả: Michio Japan</span></div><p className="michio-body mx-auto mt-5 max-w-2xl text-base md:text-lg">{post.description}</p>{post.aiAssisted && <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-[var(--michio-text-subtle)]">Bài viết được AI hỗ trợ tổng hợp từ các nguồn được dẫn và chỉ nhằm mục đích cung cấp thông tin.</p>}</header>

        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-md border border-[var(--michio-border)] bg-[#fff8f6] md:mt-10"><Image src={post.image} alt={post.title} width={1600} height={900} priority sizes="(min-width: 1024px) 960px, (min-width: 768px) 80vw, 100vw" quality={72} className="aspect-video w-full object-contain" /></div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,760px)_240px] lg:justify-center lg:gap-14"><article className="min-w-0 rounded-md border border-[var(--michio-border)] bg-white p-5 md:p-9"><BlogContent content={post.content} /></article><aside className="h-fit lg:sticky lg:top-28"><div className="border-t-2 border-[var(--michio-primary)] bg-[var(--michio-surface-muted)] p-5"><p className="michio-eyebrow">Michio note</p><p className="mt-3 text-sm leading-6 text-[var(--michio-text-muted)]">Đọc kỹ nhãn sản phẩm và chọn theo thói quen có thể duy trì mỗi ngày.</p></div><div className="mt-8"><p className="michio-eyebrow">Bài viết liên quan</p><div className="mt-4 space-y-4">{related.map((item) => <Link key={item.slug} href={`/tin-tuc/${item.slug}`} className="group block"><Image src={item.image} alt={item.title} width={320} height={180} sizes="240px" quality={62} className="aspect-video w-full rounded bg-[#fff8f6] object-contain transition-transform duration-300 group-hover:scale-[1.02]" /><h2 className="mt-2 line-clamp-2 text-sm font-bold leading-5 group-hover:text-[var(--michio-primary)]">{item.title}</h2></Link>)}</div></div></aside></div>

        <section className="mx-auto mt-12 max-w-5xl border-y border-[var(--michio-primary)] bg-[var(--michio-primary)] p-6 text-white md:mt-16 md:p-8"><h2 className="michio-h2 text-white uppercase">Chọn sản phẩm phù hợp với thói quen của bạn</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">Tham khảo các sản phẩm Nhật được chọn lọc tại Michio Japan và đọc kỹ thông tin trên nhãn trước khi mua.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/cua-hang" className="inline-flex h-11 items-center rounded bg-white px-5 text-sm font-bold uppercase text-[var(--michio-primary)]">Xem sản phẩm</Link><a href={LINKS.zalo} target="_blank" rel="noopener" className="inline-flex h-11 items-center rounded border border-white/60 px-5 text-sm font-bold uppercase text-white hover:bg-white/10">Nhắn Zalo</a></div></section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemas }) }} />
    </div>
  );
}
