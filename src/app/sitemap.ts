import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { CATEGORY_MAP } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/cua-hang", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tin-tuc", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/gioi-thieu", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/huong-dan-mua-hang", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/chinh-sach-doi-tra", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/chinh-sach-quyen-rieng-tu", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/chinh-sach-van-chuyen", priority: 0.3, changeFrequency: "yearly" as const },
  ];
  const categoryRoutes = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: absoluteUrl(`/danh-muc/${slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const productRoutes = PRODUCTS.map((product) => ({
    url: absoluteUrl(`/san-pham/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const blogRoutes = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/tin-tuc/${post.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route.path), lastModified: now, changeFrequency: route.changeFrequency, priority: route.priority })),
    ...categoryRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
