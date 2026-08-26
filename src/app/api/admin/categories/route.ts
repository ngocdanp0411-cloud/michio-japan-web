import { NextResponse } from "next/server";

import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { readCategories, validateCategoryInput, writeCategories } from "@/lib/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const categories = await readCategories();
  return NextResponse.json({ categories, total: categories.length });
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const parsed = validateCategoryInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const categories = await readCategories();
  if (categories.some((category) => category.slug === parsed.category.slug)) {
    return NextResponse.json({ error: "Slug danh mục đã tồn tại" }, { status: 409 });
  }
  categories.push(parsed.category);
  const saved = await writeCategories(categories);
  return NextResponse.json({ ok: true, category: parsed.category, storage: saved.mode }, { status: 201 });
}
