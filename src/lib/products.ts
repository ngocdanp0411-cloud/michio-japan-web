export type Product = {
  slug: string;
  name: string;
  category: string;
  categories?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  image: string;
  gallery?: string[];
  badge?: string;
  excerpt: string;
  description: string;
  active?: boolean;
};

import data from "../../data/products.json";

const CATEGORY_ORDER = [
  "my-pham-skincare",
  "dau-goi-sua-tam",
  "do-tieu-dung",
  "me-va-be",
  "do-nha-bep",
  "cham-soc-suc-khoe",
  "do-cho-nam",
] as const;
const CURRENT_CATEGORIES = new Set<string>(CATEGORY_ORDER);

function includesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

export function resolveProductCategories(
  product: Pick<Product, "name" | "category" | "categories">,
) {
  const explicitCategories = product.categories?.filter(
    (category, index, values) =>
      CURRENT_CATEGORIES.has(category) && values.indexOf(category) === index,
  );
  if (explicitCategories?.length) return explicitCategories;

  const matches = new Set<string>();
  const name = product.name
    .toLowerCase()
    .replaceAll("&#038;", "&")
    .replaceAll("&#8211;", "-");
  if (
    includesAny(name, [
      "sữa rửa mặt",
      "rửa mặt",
      "tẩy trang",
      "nước hoa hồng",
      "serum",
      "mặt nạ",
      "kem dưỡng",
      "kem ngày",
      "chống nắng",
      "xịt khoáng",
      "trị mụn",
      "trị nám",
      "tàn nhang",
      "phấn ",
      "phấn nước",
      "son dưỡng",
      "dưỡng mi",
      "tẩy tế bào chết",
      "tẩy da chết",
      "collagen",
      "placenta",
      "nhau thai",
      "trắng da",
      "mờ thâm",
      "lỗ chân lông",
      "trị sẹo",
      "thâm quầng mắt",
      "giấy thấm dầu",
      "cc cream",
      "bb ",
      "skincare",
      "nước thần",
      "trang điểm",
      "skii",
    ])
  )
    matches.add("my-pham-skincare");
  if (
    includesAny(name, [
      "dầu gội",
      "gội xả",
      "ủ tóc",
      "nhuộm tóc",
      "đen tóc",
      "rụng tóc",
      "phục hồi tóc",
      "sữa tắm",
      "tắm gội",
      "tắm trắng",
      "dưỡng thể",
      "tẩy lông",
      "hôi nách",
      "khử mùi",
      "vệ sinh phụ nữ",
      "vệ sinh ph",
      "thơm cơ thể",
      "tăng vòng",
      "nứt nẻ chân tay",
      "dưỡng da tay",
      "bột tắm",
      "body lotion",
      "white body",
      "body soap",
    ])
  )
    matches.add("dau-goi-sua-tam");
  if (
    includesAny(name, [
      "kem đánh răng",
      "bàn chải",
      "diệt gián",
      "diệt kiến",
      "diệt chuột",
      "đuổi muỗi",
      "tẩy lồng máy giặt",
      "xả vải",
      "giặt xả",
      "thơm bồn cầu",
      "gel lau kính",
      "khẩu trang",
      "quần tất",
      "kính râm",
      "chíp dán",
      "nước súc miệng",
      "kẹp mi",
    ])
  )
    matches.add("do-tieu-dung");
  if (
    includesAny(name, [
      "cho bé",
      "cho trẻ",
      "trẻ biếng ăn",
      "trẻ em",
      "baby",
      "kids",
      "pigeon",
      "arau",
      "paburon",
      "tăng chiều cao",
      "canxi cá tuyết",
      "kẹo dẻo bổ sung dha",
      "kẹo bổ sung canxi",
      "nước nhỏ mắt taisho",
      "polybaby",
      "muỗi đốt muhi",
      "skin vape",
      "trà tía tô",
      "papazeri",
    ])
  )
    matches.add("me-va-be");
  if (
    includesAny(name, [
      "bột ngọt",
      "hạt nêm",
      "dao kéo",
      "thớt",
      "rong biển",
      "nước cốt hầm xương",
      "ngũ cốc",
      "rượu mơ",
      "uji matcha",
      "trà đậu đen",
    ])
  )
    matches.add("do-nha-bep");
  if (
    includesAny(name, [
      "viên uống",
      "viên bổ",
      "canxi",
      "omega",
      "dầu cá",
      "bổ sung",
      "thanh lọc",
      "giảm đau",
      "trị đau",
      "cao dán",
      "dầu cù là",
      "an cung",
      "thuốc",
      "men tiêu hóa",
      "lợi khuẩn",
      "đau xương khớp",
      "bổ mắt",
      "bổ gan",
      "bổ não",
      "huyết áp",
      "tiểu đường",
      "cholesterol",
    ])
  )
    matches.add("cham-soc-suc-khoe");
  if (
    includesAny(name, [
      "máy cạo râu",
      "cho nam",
      "nam pharmaact",
      "bao cao su",
      "sinh lý",
      "bổ thận",
      "tráng dương",
      "tinh chất hàu",
      "maca",
      "gokubuto",
      "genkido",
      "cai thuốc lá",
    ])
  )
    matches.add("do-cho-nam");

  if (!matches.size && CURRENT_CATEGORIES.has(product.category))
    matches.add(product.category);
  if (!matches.size) matches.add("cham-soc-suc-khoe");
  return CATEGORY_ORDER.filter((category) => matches.has(category));
}

export function resolveProductCategory(
  product: Pick<Product, "name" | "category" | "categories">,
) {
  return resolveProductCategories(product)[0] ?? "cham-soc-suc-khoe";
}

export function normalizeProductCategory<T extends Product>(product: T): T {
  const categories = resolveProductCategories(product);
  return { ...product, category: categories[0] ?? "cham-soc-suc-khoe", categories };
}

const ALL_PRODUCTS = (data as Product[]).map(normalizeProductCategory);
export const PRODUCTS: Product[] = ALL_PRODUCTS.filter(
  (product) => product.active !== false,
);
const FAVORITE_PRODUCTS = [...PRODUCTS]
  .sort((a, b) => b.ratingCount - a.ratingCount || b.rating - a.rating)
  .slice(0, 24);

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: string) {
  if (cat === "ua-thich") return FAVORITE_PRODUCTS;
  return PRODUCTS.filter(
    (p) => p.categories?.includes(cat) || p.category === cat,
  );
}

export function getCategoriesWithProducts<T extends { slug: string }>(
  categories: T[],
) {
  return categories.filter(
    (category) => getProductsByCategory(category.slug).length > 0,
  );
}

export function formatPrice(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " ₫";
}
