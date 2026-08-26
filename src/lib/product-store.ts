import fs from "node:fs/promises";
import path from "node:path";

import { ALL_CATEGORIES, type Category } from "@/lib/categories";

export type ProductRecord = {
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

type GitHubContentResponse = {
  content?: string;
  sha?: string;
  message?: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "products.json");
const CATEGORIES_PATH = path.join(process.cwd(), "data", "categories.json");
const GITHUB_PRODUCTS_PATH = "data/products.json";
const GITHUB_CATEGORIES_PATH = "data/categories.json";
const PUBLIC_PATH = path.join(process.cwd(), "public");

export const PRODUCT_CATEGORIES = ALL_CATEGORIES.map((category) => category.slug) as [string, ...string[]];

export function validateProductInput(input: unknown, categories: Category[] = ALL_CATEGORIES) {
  if (!input || typeof input !== "object") return { ok: false as const, error: "Payload không hợp lệ" };
  const value = input as Record<string, unknown>;
  const slug = typeof value.slug === "string" ? value.slug.trim().toLowerCase() : "";
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const category = typeof value.category === "string" ? value.category : "";
  const excerpt = typeof value.excerpt === "string" ? value.excerpt.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const image = typeof value.image === "string" ? value.image.trim() : "";
  const gallery = Array.isArray(value.gallery)
    ? value.gallery.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(0, 12)
    : [];
  const price = Number(value.price);
  const originalPrice = value.originalPrice === undefined || value.originalPrice === null || value.originalPrice === "" ? undefined : Number(value.originalPrice);
  const rating = value.rating === undefined ? 0 : Number(value.rating);
  const ratingCount = value.ratingCount === undefined ? 0 : Number(value.ratingCount);
  const active = value.active !== false;
  const categorySlugs = categories.map((item) => item.slug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false as const, error: "Slug chỉ được gồm chữ thường, số và dấu gạch ngang" };
  if (!name || name.length > 180) return { ok: false as const, error: "Tên sản phẩm bắt buộc và tối đa 180 ký tự" };
  if (!categorySlugs.includes(category)) return { ok: false as const, error: "Danh mục không hợp lệ" };
  if (!Number.isFinite(price) || price <= 0) return { ok: false as const, error: "Giá phải lớn hơn 0" };
  if (originalPrice !== undefined && (!Number.isFinite(originalPrice) || originalPrice <= 0)) return { ok: false as const, error: "Giá gốc không hợp lệ" };
  if (originalPrice !== undefined && originalPrice < price) return { ok: false as const, error: "Giá gốc phải lớn hơn hoặc bằng giá bán" };
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) return { ok: false as const, error: "Rating phải từ 0 đến 5" };
  if (!Number.isInteger(ratingCount) || ratingCount < 0) return { ok: false as const, error: "Số đánh giá phải là số nguyên không âm" };

  const product: ProductRecord = {
    slug,
    name,
    category,
    price: Math.round(price),
    ...(originalPrice !== undefined ? { originalPrice: Math.round(originalPrice) } : {}),
    rating: Math.round(rating * 10) / 10,
    ratingCount,
    image,
    ...(gallery.length ? { gallery } : {}),
    ...(originalPrice !== undefined && originalPrice > price ? { badge: `-${Math.round((1 - price / originalPrice) * 100)}%` } : {}),
    excerpt: excerpt.slice(0, 300),
    description: description.slice(0, 12000),
    active,
  };
  return { ok: true as const, product };
}

export function validateCategoryInput(input: unknown) {
  if (!input || typeof input !== "object") return { ok: false as const, error: "Payload không hợp lệ" };
  const value = input as Record<string, unknown>;
  const slug = typeof value.slug === "string" ? value.slug.trim().toLowerCase() : "";
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const shortName = typeof value.shortName === "string" ? value.shortName.trim() : name;
  const color = typeof value.color === "string" ? value.color.trim() : "#13233F";
  const icon = typeof value.icon === "string" ? value.icon.trim().toLowerCase() : "sparkle";
  const active = value.active !== false;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false as const, error: "Slug danh mục không hợp lệ" };
  if (!name || name.length > 80) return { ok: false as const, error: "Tên danh mục bắt buộc và tối đa 80 ký tự" };
  if (!shortName || shortName.length > 40) return { ok: false as const, error: "Tên ngắn bắt buộc và tối đa 40 ký tự" };
  if (!/^#[0-9a-f]{6}$/i.test(color)) return { ok: false as const, error: "Màu phải ở dạng HEX, ví dụ #B83B68" };
  if (!/^[a-z0-9-]{1,24}$/.test(icon)) return { ok: false as const, error: "Icon chỉ được gồm chữ thường, số và dấu gạch ngang" };

  return { ok: true as const, category: { slug, name, shortName, color: color.toUpperCase(), icon, active } satisfies Category };
}

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return { token, repo, branch: process.env.GITHUB_BRANCH || "main" };
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

async function readLocalJson<T>(filePath: string) {
  return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
}

async function readGitHubJson<T>(config: ReturnType<typeof githubConfig>, filePath: string) {
  if (!config) throw new Error("GitHub storage chưa được cấu hình");
  const response = await fetch(`https://api.github.com/repos/${config.repo}/contents/${filePath}?ref=${encodeURIComponent(config.branch)}`, {
    headers: githubHeaders(config.token),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub read failed (${response.status})`);
  const payload = (await response.json()) as GitHubContentResponse;
  if (!payload.content || !payload.sha) throw new Error("GitHub response thiếu content hoặc sha");
  const json = Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { data: JSON.parse(json) as T, sha: payload.sha };
}

async function writeGitHubFile(config: NonNullable<ReturnType<typeof githubConfig>>, filePath: string, content: Buffer, message: string, sha?: string) {
  const response = await fetch(`https://api.github.com/repos/${config.repo}/contents/${filePath}`, {
    method: "PUT",
    headers: githubHeaders(config.token),
    body: JSON.stringify({
      message,
      content: content.toString("base64"),
      ...(sha ? { sha } : {}),
      branch: config.branch,
    }),
  });
  if (!response.ok) {
    const detail = (await response.json().catch(() => ({}))) as GitHubContentResponse;
    throw new Error(detail.message || `GitHub write failed (${response.status})`);
  }
}

export async function readProducts() {
  const config = githubConfig();
  if (!config) return readLocalJson<ProductRecord[]>(DATA_PATH);

  try {
    return (await readGitHubJson<ProductRecord[]>(config, GITHUB_PRODUCTS_PATH)).data;
  } catch (error) {
    console.error("[Admin storage] GitHub read products failed; using bundled catalog:", error);
    return readLocalJson<ProductRecord[]>(DATA_PATH);
  }
}

export async function writeProducts(products: ProductRecord[]) {
  const config = githubConfig();
  const content = Buffer.from(JSON.stringify(products, null, 2) + "\n", "utf8");
  if (!config) {
    await fs.writeFile(DATA_PATH, content, "utf8");
    return { mode: "local" as const };
  }
  const current = await readGitHubJson<ProductRecord[]>(config, GITHUB_PRODUCTS_PATH);
  await writeGitHubFile(config, GITHUB_PRODUCTS_PATH, content, "chore(admin): update products", current.sha);
  return { mode: "github" as const };
}

export async function readCategories() {
  const config = githubConfig();
  if (!config) return readLocalJson<Category[]>(CATEGORIES_PATH);

  try {
    return (await readGitHubJson<Category[]>(config, GITHUB_CATEGORIES_PATH)).data;
  } catch (error) {
    console.error("[Admin storage] GitHub read categories failed; using bundled categories:", error);
    return readLocalJson<Category[]>(CATEGORIES_PATH);
  }
}

export async function writeCategories(categories: Category[]) {
  const config = githubConfig();
  const content = Buffer.from(JSON.stringify(categories, null, 2) + "\n", "utf8");
  if (!config) {
    await fs.writeFile(CATEGORIES_PATH, content, "utf8");
    return { mode: "local" as const };
  }
  const current = await readGitHubJson<Category[]>(config, GITHUB_CATEGORIES_PATH);
  await writeGitHubFile(config, GITHUB_CATEGORIES_PATH, content, "chore(admin): update categories", current.sha);
  return { mode: "github" as const };
}

function safeImagePath(slug: string, filename: string) {
  const extension = path.extname(filename).toLowerCase();
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
  const normalizedName = path.basename(filename, extension).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "image";
  const suffix = crypto.randomUUID().slice(0, 8);
  return { relativePath: `products/${slug}/${normalizedName}-${suffix}${extension}`, extension, allowed: allowedExtensions.has(extension) };
}

export async function uploadProductImage(slug: string, file: File) {
  const maxBytes = 5 * 1024 * 1024;
  if (!file.type.startsWith("image/")) throw new Error("Chỉ chấp nhận file hình ảnh");
  if (file.size <= 0 || file.size > maxBytes) throw new Error("Ảnh phải lớn hơn 0 và không vượt quá 5 MB");
  const imagePath = safeImagePath(slug, file.name);
  if (!imagePath.allowed) throw new Error("Định dạng ảnh hỗ trợ: JPG, PNG, WebP, GIF hoặc AVIF");
  const buffer = Buffer.from(await file.arrayBuffer());
  const config = githubConfig();
  if (!config) {
    const target = path.join(PUBLIC_PATH, imagePath.relativePath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, buffer);
    return { mode: "local" as const, url: `/${imagePath.relativePath}` };
  }
  await writeGitHubFile(config, `public/${imagePath.relativePath}`, buffer, `chore(admin): upload product image for ${slug}`);
  return { mode: "github" as const, url: `/${imagePath.relativePath}` };
}
