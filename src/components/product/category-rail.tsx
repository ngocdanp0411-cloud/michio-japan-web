import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { getCategoriesWithProducts, getProductsByCategory } from "@/lib/products";

const categoryPreviews: Record<string, string> = {
  "dau-goi-sua-tam": "bo-dau-goi-xa-tsubaki-premium",
  "me-va-be": "sua-tam-goi-cho-tre-pigeon-baby-soap",
  "do-nha-bep": "bo-dao-keo-seki-nhat-4-mon",
  "cham-soc-suc-khoe": "vien-uong-dau-ca-omega-3-orihiro-180-vien",
  "do-cho-nam": "kem-nhuom-toc-bigen-cho-nam-40g",
};

export function CategoryRail() {
  const categories = getCategoriesWithProducts(CATEGORIES);

  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-6 lg:grid-cols-8 lg:gap-5">
      {categories.map((category) => {
        const products = getProductsByCategory(category.slug);
        const preview = products.find((product) => product.slug === categoryPreviews[category.slug]) ?? products[0];
        return (
        <Link
          key={category.slug}
          href={`/danh-muc/${category.slug}`}
          className="group flex min-w-0 flex-col items-center gap-3 text-center"
        >
          <span className="relative aspect-square w-full max-w-28 overflow-hidden rounded-full border border-[var(--michio-border)] bg-white transition-colors group-hover:border-[var(--michio-primary)]">
            <Image src={preview.image} alt="" fill sizes="(min-width: 640px) 112px, 22vw" quality={68} className="object-contain p-3 transition-transform duration-300 motion-safe:group-hover:scale-110" />
          </span>
          <span className="text-xs font-medium leading-5 text-[var(--michio-text)] transition-colors duration-200 group-hover:text-[var(--michio-primary)] sm:text-sm">
            {category.name}
          </span>
        </Link>
      ); })}
    </div>
  );
}
