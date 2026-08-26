import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Tin tức và hướng dẫn chăm sóc | Michio Japan",
  description: "Kiến thức collagen, skincare Nhật, thực phẩm bổ sung và hướng dẫn mua hàng từ Michio Japan.",
};

export default function Page() {
  const posts = getBlogPosts();
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 md:py-14">
      <header className="max-w-3xl border-l-2 border-[var(--michio-primary)] pl-5 md:pl-7">
        <p className="michio-eyebrow">Michio Journal / Kiến thức thực tế</p>
        <h1 className="michio-h1 mt-3">Tin tức – Bài viết</h1>
        <p className="michio-body mt-5 max-w-[62ch] text-base md:text-lg">Hướng dẫn ngắn gọn về chăm sóc da, collagen, sức khỏe và cách chọn sản phẩm Nhật phù hợp với thói quen mỗi ngày.</p>
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="group overflow-hidden border border-[var(--michio-border)] bg-[var(--michio-surface)] transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--michio-border-strong)] hover:shadow-[0_12px_30px_rgba(19,35,63,0.08)]">
            <Image src={post.image} alt={post.title} width={1200} height={675} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
            <div className="p-5">
              <p className="michio-eyebrow">Góc chăm sóc / 2026</p>
              <h2 className="michio-h3 mt-2 line-clamp-2 text-[1.35rem]">{post.title}</h2>
              <p className="michio-body mt-2 line-clamp-3">{post.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--michio-primary)] transition-colors group-hover:text-[var(--michio-primary-hover)]">Đọc bài viết <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
