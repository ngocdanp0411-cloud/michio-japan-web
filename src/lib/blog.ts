import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  publishedAt: string;
  aiAssisted: boolean;
  author: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  faqs: { question: string; answer: string }[];
  content: string;
};

export type BlogCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  searchIntent: string;
  accent: string;
  productCategory: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "collagen-lam-dep",
    name: "Collagen & Làm đẹp",
    shortName: "Collagen",
    description: "Cách chọn, thời điểm dùng và lưu ý an toàn khi bổ sung collagen.",
    searchIntent: "uống collagen, chọn collagen, chăm sóc da từ bên trong",
    accent: "#c61f3a",
    productCategory: "collagen",
  },
  {
    slug: "skincare-nhat-ban",
    name: "Skincare Nhật & Chống nắng",
    shortName: "Skincare Nhật",
    description: "Routine dễ áp dụng, làm sạch, dưỡng ẩm và chống nắng theo từng loại da.",
    searchIntent: "routine skincare, mỹ phẩm Nhật, kem chống nắng Nhật",
    accent: "#1e6f8a",
    productCategory: "cham-soc-da",
  },
  {
    slug: "vitamin-suc-khoe",
    name: "Vitamin & Sức khỏe",
    shortName: "Sức khỏe",
    description: "Hướng dẫn đọc nhãn, chọn vitamin và thực phẩm bổ sung đúng nhu cầu.",
    searchIntent: "vitamin tổng hợp, omega-3, thực phẩm bổ sung Nhật",
    accent: "#1d4d75",
    productCategory: "cham-soc-suc-khoe",
  },
  {
    slug: "me-va-be-nhat-ban",
    name: "Mẹ & Bé Nhật Bản",
    shortName: "Mẹ & Bé",
    description: "Checklist chọn đồ dùng Nhật thiết thực cho mẹ và bé trong từng giai đoạn.",
    searchIntent: "đồ Nhật cho mẹ và bé, chăm sóc mẹ bé, đồ dùng em bé Nhật",
    accent: "#a65b72",
    productCategory: "me-va-be",
  },
  {
    slug: "kinh-nghiem-hang-nhat",
    name: "Kinh nghiệm Hàng Nhật",
    shortName: "Kinh nghiệm mua",
    description: "Cách kiểm tra nguồn gốc, bảo quản và mua hàng Nhật phù hợp ngân sách.",
    searchIntent: "hàng Nhật chính hãng, cách kiểm tra mỹ phẩm Nhật, bảo quản mỹ phẩm",
    accent: "#8a5d3b",
    productCategory: "hang-tieu-dung",
  },
];

export const BLOG_CATEGORY_MAP = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [category.slug, category]),
) as Record<string, BlogCategory>;

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

function readFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { fields: {} as Record<string, string | string[]>, content: raw };

  const fields: Record<string, string | string[]> = {};
  let activeList: string[] | null = null;
  for (const line of match[1].split("\n")) {
    const listItem = line.match(/^\s+-\s+\"?(.*?)\"?\s*$/);
    if (listItem && activeList) {
      activeList.push(listItem[1]);
      continue;
    }
    const field = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!field) continue;
    const [, key, value] = field;
    if (value.trim() === "") {
      activeList = [];
      fields[key] = activeList;
    } else {
      activeList = null;
      fields[key] = value.trim().replace(/^\"|\"$/g, "");
    }
  }
  return { fields, content: match[2].trim() };
}

function slugFromFile(fileName: string) {
  return fileName.replace(/^\d+-/, "").replace(/\.md$/, "");
}

function extractFaqs(content: string) {
  return [...content.matchAll(/^Q\d+:\s*(.+?)\s*\n+\s*A\d+:\s*([\s\S]+?)(?=\n+(?:Q\d+:|##\s)|$)/gm)].map((match) => ({
    question: match[1].trim().replace(/\s+/g, " "),
    answer: match[2].trim().replace(/\s+/g, " "),
  }));
}

function readPost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { fields, content } = readFrontmatter(raw);
  const slug = slugFromFile(fileName);
  const heading = content.match(/^#\s+(.+)$/m)?.[1] ?? slug;
  const articleContent = content.replace(/^#\s+.+(?:\n+|$)/, "").trim();
  const description = String(fields.description ?? "Đọc bài viết mới từ Michio Japan.");
  return {
    slug,
    title: heading,
    description,
    image: `/images/blog/${slug}.jpg`,
    category: String(fields.category ?? "kinh-nghiem-hang-nhat"),
    publishedAt: String(fields.published_at ?? "2026-01-01"),
    aiAssisted: String(fields.ai_assisted ?? "false") === "true",
    author: String(fields.author ?? "Michio Japan"),
    primaryKeyword: String(fields.primary_keyword ?? ""),
    secondaryKeywords: Array.isArray(fields.secondary_keywords) ? fields.secondary_keywords : [],
    faqs: extractFaqs(articleContent),
    content: articleContent,
  };
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((fileName) => /^\d+-.+\.md$/.test(fileName))
    .map(readPost)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string) {
  return getBlogPosts().filter((post) => post.category === category);
}
