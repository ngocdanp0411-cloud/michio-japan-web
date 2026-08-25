export type Product = {
  slug: string;
  name: string;
  category: string;
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

const ALL_PRODUCTS = data as Product[];
export const PRODUCTS: Product[] = ALL_PRODUCTS.filter((product) => product.active !== false);

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: string) {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function formatPrice(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " ₫";
}
