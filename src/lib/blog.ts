import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  content: string;
};

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

function readPost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { fields, content } = readFrontmatter(raw);
  const slug = slugFromFile(fileName);
  const heading = content.match(/^#\s+(.+)$/m)?.[1] ?? slug;
  const description = String(fields.description ?? "Đọc bài viết mới từ Michio Japan.");
  return {
    slug,
    title: heading,
    description,
    image: `/images/blog/${slug}.jpg`,
    primaryKeyword: String(fields.primary_keyword ?? ""),
    secondaryKeywords: Array.isArray(fields.secondary_keywords) ? fields.secondary_keywords : [],
    content,
  };
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((fileName) => /^\d+-.+\.md$/.test(fileName))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map(readPost);
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
