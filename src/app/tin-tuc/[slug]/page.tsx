import { notFound } from "next/navigation";
import Link from "next/link";
const POSTS: Record<string, { title: string; body: string }> = {
  "tu-the-nam-giam-mo-bung": { title: "Các tư thế nằm giảm mỡ bụng hiệu quả của người Nhật", body: "Người Nhật chú trọng tư thế nằm và hít thở sâu để hỗ trợ săn chắc cơ bụng. Kết hợp khăn cuộn lưng, hít thở bằng bụng và duy trì đều đặn sẽ hỗ trợ giảm mỡ." },
  "tpcn-tot-cho-phu-nu": { title: "Những thực phẩm chức năng tốt cho phụ nữ", body: "Collagen, sắt, vitamin E, tảo Spirulina và placenta là nhóm được quan tâm. Chọn đúng liều và nguồn gốc Nhật giúp hỗ trợ da, tóc và sức khỏe." },
  "tao-vang-spirulina": { title: "Viên uống tảo vàng Spirulina EX Nhật Bản", body: "Spirulina EX giàu protein, phycocyanin và vi chất — hỗ trợ dinh dưỡng, đề kháng và làm đẹp từ bên trong." },
};
export function generateStaticParams() { return Object.keys(POSTS).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS[slug];
  return p ? { title: p.title } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS[slug];
  if (!p) notFound();
  return (
    <div className="mx-auto max-w-[820px] px-4 py-10">
      <Link href="/tin-tuc" className="text-sm underline">← Tin tức</Link>
      <h1 className="mt-2 font-display text-2xl font-bold">{p.title}</h1>
      <div className="michio-line my-6" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://picsum.photos/seed/${slug}/800/450`} alt={p.title} className="w-full rounded-xl border object-cover" />
      <p className="mt-6 text-sm leading-7 text-[var(--michio-deep-navy)]/75">{p.body}</p>
    </div>
  );
}
