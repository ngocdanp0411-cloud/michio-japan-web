import { NextResponse } from "next/server";

import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { readCategories, readProducts, validateCategoryInput, writeCategories } from "@/lib/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function PUT(req: Request, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();
  const { slug } = await params;
  const parsed = validateCategoryInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  if (parsed.category.slug !== slug) return NextResponse.json({ error: "Không thể đổi slug danh mục; hãy tạo danh mục mới để đổi đường dẫn" }, { status: 400 });

  const categories = await readCategories();
  const index = categories.findIndex((category) => category.slug === slug);
  if (index === -1) return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 });
  categories[index] = parsed.category;
  const saved = await writeCategories(categories);
  return NextResponse.json({ ok: true, category: parsed.category, storage: saved.mode });
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();
  const { slug } = await params;
  const [categories, products] = await Promise.all([readCategories(), readProducts()]);
  const index = categories.findIndex((category) => category.slug === slug);
  if (index === -1) return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 });
  if (products.some((product) => product.category === slug)) {
    return NextResponse.json({ error: "Không thể xóa danh mục đang có sản phẩm; hãy chuyển sản phẩm sang danh mục khác trước" }, { status: 409 });
  }

  const [deleted] = categories.splice(index, 1);
  const saved = await writeCategories(categories);
  return NextResponse.json({ ok: true, category: deleted, storage: saved.mode });
}
