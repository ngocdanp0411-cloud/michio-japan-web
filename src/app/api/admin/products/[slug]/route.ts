import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { readProducts, validateProductInput, writeProducts } from "@/lib/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();
  const { slug } = await params;
  const product = (await readProducts()).find((item) => item.slug === slug);
  if (!product) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();
  const { slug } = await params;
  const input = await req.json().catch(() => null);
  const parsed = validateProductInput(input);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const data = await readProducts();
  const index = data.findIndex((product) => product.slug === slug);
  if (index === -1) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  if (parsed.product.slug !== slug && data.some((product) => product.slug === parsed.product.slug)) {
    return NextResponse.json({ error: "Slug mới đã tồn tại" }, { status: 409 });
  }

  data[index] = parsed.product;
  const saved = await writeProducts(data);
  return NextResponse.json({ ok: true, product: parsed.product, storage: saved.mode });
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();
  const { slug } = await params;
  const data = await readProducts();
  const index = data.findIndex((product) => product.slug === slug);
  if (index === -1) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });

  const [deleted] = data.splice(index, 1);
  const saved = await writeProducts(data);
  return NextResponse.json({ ok: true, product: deleted, storage: saved.mode });
}
