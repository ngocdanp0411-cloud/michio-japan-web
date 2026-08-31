import data from "../../data/categories.json";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  active?: boolean;
};

export const FAVORITES_CATEGORY: Category = {
  slug: "ua-thich",
  name: "Ưa thích",
  shortName: "Ưa thích",
  color: "#B83B68",
  icon: "heart",
  active: true,
};

export const ASSIGNABLE_CATEGORIES = data as Category[];
export const ALL_CATEGORIES = [FAVORITES_CATEGORY, ...ASSIGNABLE_CATEGORIES];
export const CATEGORIES: Category[] = ALL_CATEGORIES.filter((category) => category.active !== false);
export const CATEGORY_MAP = Object.fromEntries(
  ALL_CATEGORIES.map((category) => [category.slug, category])
) as Record<string, Category>;
