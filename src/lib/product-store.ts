import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

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
const GITHUB_PATH = "data/products.json";
export const PRODUCT_CATEGORIES = ["collagen", "cham-soc-da", "cham-soc-co-the", "cham-soc-suc-khoe", "me-va-be", "hang-tieu-dung"] as const;

export function validateProductInput(input: unknown) {
  if (!input || typeof input !== "object") return { ok: false as const, error: "Payload không hợp lệ" };
  const value = input as Record<string, unknown>;
  const slug = typeof value.slug === "string" ? value.slug.trim().toLowerCase() : "";
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const category = typeof value.category === "string" ? value.category : "";
  const excerpt = typeof value.excerpt === "string" ? value.excerpt.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const image = typeof value.image === "string" ? value.image.trim() : "";
  const gallery = Array.isArray(value.gallery) ? value.gallery.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean) : [];
  const price = Number(value.price);
  const originalPrice = value.originalPrice === undefined || value.originalPrice === null || value.originalPrice === "" ? undefined : Number(value.originalPrice);
  const rating = value.rating === undefined ? 0 : Number(value.rating);
  const ratingCount = value.ratingCount === undefined ? 0 : Number(value.ratingCount);
  const active = value.active !== false;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false as const, error: "Slug chỉ được gồm chữ thường, số và dấu gạch ngang" };
  if (!name) return { ok: false as const, error: "Tên sản phẩm là bắt buộc" };
  if (!PRODUCT_CATEGORIES.includes(category as (typeof PRODUCT_CATEGORIES)[number])) return { ok: false as const, error: "Danh mục không hợp lệ" };
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
    excerpt,
    description,
    active,
  };
  return { ok: true as const, product };
}

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return { token, repo };
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

async function readLocal() {
  return JSON.parse(await fs.readFile(DATA_PATH, "utf8")) as ProductRecord[];
}

async function readGitHub(config: { token: string; repo: string }) {
  const response = await fetch(`https://api.github.com/repos/${config.repo}/contents/${GITHUB_PATH}`, {
    headers: githubHeaders(config.token),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status})`);
  }
  const payload = (await response.json()) as GitHubContentResponse;
  if (!payload.content || !payload.sha) throw new Error("GitHub response thiếu content hoặc sha");
  const json = Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { products: JSON.parse(json) as ProductRecord[], sha: payload.sha };
}

export async function readProducts() {
  const config = githubConfig();
  if (config) return (await readGitHub(config)).products;
  return readLocal();
}

export async function writeProducts(products: ProductRecord[]) {
  const config = githubConfig();
  if (!config) {
    await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2) + "\n", "utf8");
    return { mode: "local" as const };
  }

  const current = await readGitHub(config);
  const response = await fetch(`https://api.github.com/repos/${config.repo}/contents/${GITHUB_PATH}`, {
    method: "PUT",
    headers: githubHeaders(config.token),
    body: JSON.stringify({
      message: "chore(admin): update products",
      content: Buffer.from(JSON.stringify(products, null, 2) + "\n", "utf8").toString("base64"),
      sha: current.sha,
      branch: process.env.GITHUB_BRANCH || "main",
    }),
  });
  if (!response.ok) {
    const detail = (await response.json().catch(() => ({}))) as GitHubContentResponse;
    throw new Error(detail.message || `GitHub write failed (${response.status})`);
  }
  return { mode: "github" as const };
}
