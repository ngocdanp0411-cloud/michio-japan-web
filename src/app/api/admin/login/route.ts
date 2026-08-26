import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { clearAdminCookie, setAdminCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export async function POST(req: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) {
    return NextResponse.json({ ok: false, error: "Admin chưa được cấu hình ADMIN_PASSWORD trên server" }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : "";
  if (!safeEqual(password, configuredPassword)) {
    return NextResponse.json({ ok: false, error: "Sai mật khẩu" }, { status: 401 });
  }

  return setAdminCookie(NextResponse.json({ ok: true }));
}

export async function DELETE() {
  return clearAdminCookie(NextResponse.json({ ok: true }));
}
