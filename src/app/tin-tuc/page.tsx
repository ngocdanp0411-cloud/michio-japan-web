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
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="max-w-2xl">
        <p className="michio-eyebrow">Michio Journal</p>
        <h1 className="michio-h1 mt-2 text-[2.5rem]">Tin tức – Bài viết</h1>
        <p className="michio-body mt-3 max-w-[62ch]">Hướng dẫn ngắn gọn về chăm sóc da, collagen, sức khỏe và cách chọn sản phẩm Nhật phù hợp với thói quen mỗi ngày.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="michio-card group overflow-hidden transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <Image src={post.image} alt={post.title} width={1200} height={675} className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
            <div className="p-5">
              <p className="michio-eyebrow">Góc chăm sóc</p>
              <h2 className="michio-h3 mt-2 line-clamp-2 text-[1.35rem]">{post.title}</h2>
              <p className="michio-body mt-2 line-clamp-3">{post.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--michio-primary)]">Đọc bài viết →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
