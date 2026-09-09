import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDescription } from "@/components/product/product-description";
import { CATEGORY_MAP } from "@/lib/categories";
import { LINKS } from "@/lib/links";
import { PRODUCTS, formatPrice, getProductBySlug } from "@/lib/products";
import {
  absoluteUrl,
  limitDescription,
  limitTitle,
  SITE_NAME,
} from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const url = absoluteUrl(`/san-pham/${p.slug}`);
  const title = limitTitle(p.name);
  const description = limitDescription(p.excerpt);
  const image = absoluteUrl(p.image);
  return {
    title,
    description,
    keywords: [p.name, ...(p.categories ?? [p.category]), "hàng Nhật nội địa", "Michio Japan"],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",
      images: [{ url: image, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();
  const cat = CATEGORY_MAP[p.category];
  const productCategories = p.categories?.length ? p.categories : [p.category];
  const related = PRODUCTS.filter(
    (x) =>
      x.slug !== p.slug &&
      (x.categories ?? [x.category]).some((category) =>
        productCategories.includes(category),
      ),
  ).slice(0, 5);
  const discount =
    p.originalPrice && p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;

  return (
    <div>
      <main className="mx-auto max-w-[1280px] px-4 py-4 md:px-8 md:py-10">
        <nav
          aria-label="Breadcrumb"
          className="hidden flex-wrap items-center gap-2 text-xs text-[var(--michio-text-subtle)] md:flex"
        >
          <Link href="/" className="hover:text-[var(--michio-primary)]">
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            href={`/danh-muc/${p.category}`}
            className="hover:text-[var(--michio-primary)]"
          >
            {cat?.name ?? p.category}
          </Link>
          <span>/</span>
          <span className="line-clamp-1">{p.name}</span>
        </nav>

        <div className="grid gap-5 md:mt-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <ProductGallery images={p.gallery ?? [p.image]} name={p.name} />

          <section className="min-w-0">
            <p className="text-xs font-semibold text-[var(--michio-primary)]">
              {cat?.name ?? p.category} / Michio Japan
            </p>
            <h1 className="mt-2 text-pretty text-xl font-bold leading-[1.35] tracking-[-0.025em] md:text-4xl">
              {p.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-[var(--michio-border)] pb-3 text-xs">
              <span
                className="tracking-[0.08em] text-[#f39a1e]"
                aria-hidden="true"
              >
                ★★★★★
              </span>
              <span>
                {p.rating.toFixed(1)} ({p.ratingCount} đánh giá)
              </span>
              <span className="text-[var(--michio-text-subtle)]">|</span>
              <span className="text-[var(--michio-text-muted)]">
                Tư vấn qua Zalo/Fanpage
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums text-[var(--michio-primary)] md:text-3xl">
                {formatPrice(p.price)}
              </span>
              {p.originalPrice && (
                <span className="text-sm text-[var(--michio-text-subtle)] line-through">
                  {formatPrice(p.originalPrice)}
                </span>
              )}
              {discount !== null && (
                <span className="rounded-full bg-[var(--michio-primary-soft)] px-2 py-1 text-xs font-semibold text-[var(--michio-primary)]">
                  -{discount}%
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--michio-text-muted)]">{p.excerpt}</p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                "Hàng Nhật nội địa",
                "Chính hãng – nguyên seal",
                "Tư vấn chọn đúng nhu cầu",
                "Giao hàng toàn quốc",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[10px] bg-[var(--michio-surface-muted)] p-2.5 text-xs font-medium leading-5 text-[var(--michio-text)]"
                >
                  <span className="mr-2 text-[var(--michio-primary)]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <a
                href={LINKS.zalo}
                target="_blank"
                rel="noopener"
                className="michio-btn-primary inline-flex min-h-12 items-center justify-center rounded-[12px] px-2 text-sm"
              >
                Nhắn Zalo tư vấn
              </a>
              <a
                href={LINKS.messenger}
                target="_blank"
                rel="noopener"
                className="michio-btn-secondary inline-flex min-h-12 items-center justify-center rounded-[12px] bg-white px-2 text-sm"
              >
                Inbox Fanpage
              </a>
            </div>
            <p className="michio-caption mt-3">
              Không thanh toán online — Michio tư vấn và chốt đơn trực tiếp qua
              Zalo/Fanpage.
            </p>

            <div className="mt-5 grid gap-2 border-t border-[var(--michio-border)] pt-4 text-xs leading-5 text-[var(--michio-text-muted)] sm:grid-cols-2">
              <div>
                Đánh giá:{" "}
                <span className="font-semibold text-[var(--michio-text)]">
                  {p.rating.toFixed(1)}/5 ({p.ratingCount})
                </span>
              </div>
              <div>
                Danh mục:{" "}
                {productCategories.map((category, index) => (
                  <span key={category}>
                    {index > 0 && ", "}
                    <Link
                      href={`/danh-muc/${category}`}
                      className="font-semibold text-[var(--michio-primary)]"
                    >
                      {CATEGORY_MAP[category]?.name ?? category}
                    </Link>
                  </span>
                ))}
              </div>
              <div>
                Hotline:{" "}
                <a
                  href={LINKS.hotline}
                  className="font-semibold text-[var(--michio-text)]"
                >
                  {LINKS.hotlineDisplay}
                </a>
              </div>
              <div>
                Thời gian tư vấn:{" "}
                <span className="font-semibold text-[var(--michio-text)]">
                  8h – 21h
                </span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 border-t border-[var(--michio-border)] pt-6 md:mt-16">
          <h2 className="border-b border-[var(--michio-border)] pb-3 text-lg font-bold">
            Mô tả sản phẩm
          </h2>
          <div className="mx-auto mt-4 max-w-3xl rounded-[14px] bg-[var(--michio-surface-muted)] p-4 md:p-6">
            <ProductDescription text={p.description} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-10 border-t border-[var(--michio-border)] pt-6 md:mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[var(--michio-primary)]">Gợi ý cùng danh mục</p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.025em]">Sản phẩm liên quan</h2>
              </div>
              <Link
                href={`/danh-muc/${p.category}`}
                className="hidden text-sm font-semibold text-[var(--michio-primary)] sm:inline-flex"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="mt-5">
              <ProductGrid products={related} />
            </div>
          </section>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--michio-border)] bg-white/95 p-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[640px] gap-2">
          <a
            href={LINKS.messenger}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-[12px] border border-[var(--michio-primary)] bg-white text-xs font-semibold text-[var(--michio-primary)]"
          >
            Inbox Fanpage
          </a>
          <a
            href={LINKS.zalo}
            target="_blank"
            rel="noopener"
            className="michio-btn-primary inline-flex h-12 flex-[1.15] items-center justify-center rounded-[12px] text-xs font-semibold"
          >
            Nhắn Zalo
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: [
              absoluteUrl(p.image),
              ...(p.gallery ?? []).map(absoluteUrl),
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: p.rating,
              reviewCount: p.ratingCount,
              bestRating: 5,
              worstRating: 1,
            },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
              url: absoluteUrl(`/san-pham/${p.slug}`),
              seller: { "@type": "Organization", name: SITE_NAME },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: cat?.name ?? p.category,
                item: absoluteUrl(`/danh-muc/${p.category}`),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: p.name,
                item: absoluteUrl(`/san-pham/${p.slug}`),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
