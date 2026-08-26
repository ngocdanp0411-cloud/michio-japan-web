import { NextResponse } from "next/server";

import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { uploadProductImage } from "@/lib/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  const slug = formData?.get("slug");
  if (!(file instanceof File)) return NextResponse.json({ error: "Thiếu file ảnh" }, { status: 400 });
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Slug sản phẩm không hợp lệ" }, { status: 400 });
  }

  try {
    const uploaded = await uploadProductImage(slug, file);
    return NextResponse.json({ ok: true, ...uploaded });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể upload ảnh";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
