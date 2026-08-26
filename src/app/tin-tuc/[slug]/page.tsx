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
    <article className="mx-auto max-w-[920px] px-4 py-8">
      <Link href="/tin-tuc" className="text-sm font-semibold text-[var(--michio-primary)] transition-colors duration-200 hover:text-[var(--michio-primary-hover)]">← Tin tức</Link>
      <header className="mt-5">
        <p className="michio-eyebrow">Michio Journal</p>
        <h1 className="michio-h1 mt-2 max-w-[22ch]">{post.title}</h1>
        <p className="michio-body mt-4 max-w-3xl text-base">{post.description}</p>
      </header>
      <Image src={post.image} alt={post.title} width={1600} height={900} priority className="mt-7 aspect-video w-full rounded-xl border border-[var(--michio-border)] object-cover" />
      <div className="michio-card mt-8 p-5 md:p-8">
        <BlogContent content={post.content} />
      </div>
      <div className="mt-8 rounded-2xl bg-[var(--michio-deep-navy)] p-6 text-white">
        <h2 className="michio-h2 text-white">Chọn sản phẩm phù hợp với thói quen của bạn</h2>
        <p className="mt-2 text-sm leading-6 text-white/75">Tham khảo các sản phẩm Nhật được chọn lọc tại Michio Japan và đọc kỹ thông tin trên nhãn trước khi mua.</p>
        <Link href="/" className="michio-btn-secondary mt-4 inline-flex rounded-full border-0 bg-white px-5 py-2.5 text-sm">Về trang chủ Michio Japan</Link>
      </div>
    </article>
  );
}
