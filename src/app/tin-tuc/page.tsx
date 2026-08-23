import Link from "next/link";
export const metadata = { title: "Tin tức" };
const POSTS = [
  { slug: "tu-the-nam-giam-mo-bung", title: "Các tư thế nằm giảm mỡ bụng hiệu quả của người Nhật" },
  { slug: "tpcn-tot-cho-phu-nu", title: "Những thực phẩm chức năng tốt cho phụ nữ" },
  { slug: "tao-vang-spirulina", title: "Viên uống tảo vàng Spirulina EX Nhật Bản" },
];
export default function Page() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="font-display text-2xl font-semibold">Tin tức – Bài viết</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {POSTS.map((n) => (
          <Link key={n.slug} href={`/tin-tuc/${n.slug}`} className="rounded-xl border bg-white p-4 hover:shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${n.slug}/400/240`} alt={n.title} className="h-36 w-full rounded-lg object-cover" />
            <div className="mt-3 text-sm font-medium">{n.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
