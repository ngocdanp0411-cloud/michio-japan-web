import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductBySlug, formatPrice } from "@/lib/products";
import { CATEGORY_MAP } from "@/lib/categories";
import { LINKS } from "@/lib/links";
import { ProductGrid } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDescription } from "@/components/product/product-description";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return { title: p.name, description: p.excerpt };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();
  const cat = CATEGORY_MAP[p.category];
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 5);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="michio-caption">
        <Link href="/" className="hover:underline">Trang chủ</Link> <span className="mx-1">/</span>
        <Link href={`/danh-muc/${p.category}`} className="hover:underline">{cat?.name ?? p.category}</Link> <span className="mx-1">/</span>
        <span className="text-[var(--michio-text-subtle)]">{p.name}</span>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <ProductGallery images={p.gallery ?? [p.image]} name={p.name} />

        <div className="pb-24 md:pb-0">
          <div className="michio-chip inline-flex rounded-full px-3 py-1">{cat?.name}</div>
          <h1 className="michio-h1 mt-2 text-[2rem] md:text-[2.5rem]">{p.name}</h1>
          <div className="mt-2 text-sm leading-6 text-[var(--michio-text-muted)]">⭐ {p.rating.toFixed(1)} · {p.ratingCount} đánh giá <span className="mx-2 text-[var(--michio-border-strong)]">|</span> <span className="font-semibold text-[var(--michio-success)]">✓ Chính hãng</span></div>

          <div className="michio-card mt-4 flex flex-wrap items-baseline gap-2 bg-[var(--michio-surface-warm)] p-4">
            <span className="text-2xl font-bold leading-7 text-[var(--michio-primary)]">{formatPrice(p.price)}</span>
            {p.originalPrice && <span className="text-sm leading-5 text-[var(--michio-text-subtle)] line-through">{formatPrice(p.originalPrice)}</span>}
            {p.badge && <span className="rounded-full bg-[var(--michio-primary)] px-2.5 py-1 text-xs font-bold leading-5 text-white">{p.badge} • Freeship 499k</span>}
          </div>

          <ProductDescription text={p.description} />

          {/* Desktop CTA */}
          <div className="mt-6 hidden md:grid gap-2">
            <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary rounded-full px-5 py-3.5 text-center text-sm active:scale-[0.98]">
              Chat Zalo — Tư vấn & đặt hàng
            </a>
            <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary rounded-full px-5 py-3.5 text-center text-sm">
              Inbox Fanpage
            </a>
            <a href={LINKS.hotline} className="michio-btn-secondary rounded-full px-5 py-3 text-center text-sm">Gọi {LINKS.hotlineDisplay}</a>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--michio-border)] bg-[var(--michio-surface-muted)] p-4 text-sm leading-6">
            <div className="font-semibold">Cam kết Michio Japan</div>
            <ul className="mt-1 list-disc pl-4 text-[var(--michio-deep-navy)]/70">
              <li>100% chính hãng, tem phụ rõ ràng</li>
              <li>Tư vấn đúng nhu cầu — không ép mua</li>
              <li>Giao hàng tinh tế, hộp/túi Michio</li>
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10 pb-24 md:pb-0">
          <h2 className="michio-h2">Sản phẩm liên quan</h2>
          <div className="mt-4"><ProductGrid products={related} /></div>
        </div>
      )}

      {/* Mobile sticky bottom CTA - thumb zone */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 p-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
        <div className="mx-auto flex max-w-[640px] gap-2">
          <a href={LINKS.messenger} target="_blank" rel="noopener" className="michio-btn-secondary flex-1 inline-flex h-12 items-center justify-center rounded-full text-sm active:scale-[0.98]">
            Inbox
          </a>
          <a href={LINKS.zalo} target="_blank" rel="noopener" className="michio-btn-primary flex-[1.6] inline-flex h-12 items-center justify-center gap-1.5 rounded-full text-sm shadow active:scale-[0.98]">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Chat Zalo — {LINKS.hotlineDisplay}
          </a>
        </div>
        <div className="michio-caption mt-1.5 text-center">Freeship nội thành HN 499k • {LINKS.address}</div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.image,
            brand: { "@type": "Brand", name: "Michio Japan" },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
              url: `https://michiojapan.vn/san-pham/${p.slug}`,
              seller: { "@type": "Organization", name: "Michio Japan" },
            },
          }),
        }}
      />
    </div>
  );
}
