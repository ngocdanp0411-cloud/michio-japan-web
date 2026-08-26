import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/blog-content";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return post
    ? { title: `${post.title} | Michio Japan`, description: post.description }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[1120px] px-4 py-8 md:py-12">
      <Link href="/tin-tuc" className="michio-caption inline-flex items-center gap-2 font-semibold text-[var(--michio-primary)] transition-colors duration-200 hover:text-[var(--michio-primary-hover)]"><span aria-hidden="true">←</span> Tin tức</Link>
      <header className="mt-6 max-w-4xl border-l-2 border-[var(--michio-primary)] pl-5 md:pl-7">
        <p className="michio-eyebrow">Michio Journal / Hướng dẫn chọn đúng</p>
        <h1 className="michio-h1 mt-3 max-w-[22ch]">{post.title}</h1>
        <p className="michio-body mt-5 max-w-3xl text-base md:text-lg">{post.description}</p>
      </header>
      <div className="relative mt-9">
        <Image src={post.image} alt={post.title} width={1600} height={900} priority sizes="(min-width: 1120px) 1120px, 100vw" className="aspect-video w-full border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] object-cover" />
        <Image src="/images/brand/michio-authentic-logo.jpg" alt="" width={88} height={88} className="absolute bottom-4 right-4 h-14 w-14 rounded-full border-2 border-white bg-white object-cover shadow-md md:h-16 md:w-16" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="michio-card p-5 md:p-9">
        <BlogContent content={post.content} />
      </div>
        <aside className="h-fit border-t-2 border-[var(--michio-primary)] bg-[var(--michio-surface-muted)] p-5 lg:sticky lg:top-32">
          <p className="michio-eyebrow">Michio note</p>
          <p className="mt-3 text-sm leading-6 text-[var(--michio-text-muted)]">Đọc kỹ nhãn sản phẩm và chọn theo thói quen có thể duy trì mỗi ngày.</p>
        </aside>
      </div>
      <div className="mt-10 border-y border-[var(--michio-navy)] bg-[var(--michio-navy)] p-6 text-white md:p-8">
        <h2 className="michio-h2 text-white">Chọn sản phẩm phù hợp với thói quen của bạn</h2>
        <p className="mt-2 text-sm leading-6 text-white/75">Tham khảo các sản phẩm Nhật được chọn lọc tại Michio Japan và đọc kỹ thông tin trên nhãn trước khi mua.</p>
        <Link href="/" className="michio-btn-secondary mt-4 inline-flex rounded-md border-0 bg-white px-5 py-2.5 text-sm">Về trang chủ Michio Japan</Link>
      </div>
    </article>
  );
}
