import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { readCategories, readProducts, validateProductInput, writeProducts } from "@/lib/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();

  const data = await readProducts();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const cat = searchParams.get("cat") || "";
  const filtered = data.filter((product) => {
    const matchesQuery = !q || `${product.name} ${product.slug} ${product.excerpt}`.toLowerCase().includes(q);
    const matchesCategory = !cat || product.category === cat;
    return matchesQuery && matchesCategory;
  });

  return NextResponse.json({ products: filtered, total: data.length });
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();

  const input = await req.json().catch(() => null);
  const parsed = validateProductInput(input, await readCategories());
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const data = await readProducts();
  if (data.some((product) => product.slug === parsed.product.slug)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 409 });
  }

  data.unshift(parsed.product);
  const saved = await writeProducts(data);
  return NextResponse.json({ ok: true, product: parsed.product, storage: saved.mode }, { status: 201 });
}
