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
    <div className="grid grid-cols-4 gap-x-2 gap-y-3 lg:grid-cols-8 lg:gap-5">
      {categories.map((category) => {
        const products = getProductsByCategory(category.slug);
        const preview = products.find((product) => product.slug === categoryPreviews[category.slug]) ?? products[0];
        return (
        <Link
          key={category.slug}
          href={`/danh-muc/${category.slug}`}
          className="group flex min-w-0 flex-col items-center gap-1.5 text-center lg:gap-3"
        >
          <span className="relative h-14 w-14 overflow-hidden rounded-lg bg-[var(--michio-surface-muted)] lg:h-24 lg:w-24">
            <Image src={preview.image} alt="" fill sizes="(min-width: 1024px) 96px, 56px" quality={68} className="object-contain p-2 mix-blend-multiply transition-transform duration-300 motion-safe:group-hover:scale-110" />
          </span>
          <span className="text-xs font-medium leading-4 text-[var(--michio-text)] transition-colors duration-200 group-hover:text-[var(--michio-primary)] lg:text-sm lg:leading-5">
            {category.name}
          </span>
        </Link>
      ); })}
    </div>
  );
}
