import data from "../../data/categories.json";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  active?: boolean;
};

export const ALL_CATEGORIES = data as Category[];
export const CATEGORIES: Category[] = ALL_CATEGORIES.filter((category) => category.active !== false);
export const CATEGORY_MAP = Object.fromEntries(
  ALL_CATEGORIES.map((category) => [category.slug, category])
) as Record<string, Category>;
