export type Category = {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "collagen",
    name: "Collagen làm đẹp",
    shortName: "Collagen",
    color: "#B83B68",
    icon: "sparkle",
  },
  {
    slug: "cham-soc-da",
    name: "Chăm sóc da",
    shortName: "Chăm sóc da",
    color: "#13233F",
    icon: "face",
  },
  {
    slug: "cham-soc-co-the",
    name: "Chăm sóc cơ thể",
    shortName: "Chăm sóc cơ thể",
    color: "#F4D9E2",
    icon: "body",
  },
  {
    slug: "cham-soc-suc-khoe",
    name: "Chăm sóc sức khoẻ",
    shortName: "Sức khoẻ",
    color: "#7F2348",
    icon: "health",
  },
  {
    slug: "me-va-be",
    name: "Mẹ và bé",
    shortName: "Mẹ & Bé",
    color: "#B8A9A4",
    icon: "baby",
  },
  {
    slug: "hang-tieu-dung",
    name: "Hàng tiêu dùng",
    shortName: "Tiêu dùng",
    color: "#171923",
    icon: "home",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<string, Category>;
