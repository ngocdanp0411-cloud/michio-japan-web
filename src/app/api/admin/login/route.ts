import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const correct = process.env.ADMIN_PASSWORD || "michio2024";
  if (password !== correct) {
    return NextResponse.json({ ok: false, error: "Sai mật khẩu" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  // simple cookie, httpOnly
  res.cookies.set("michio_admin", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  // also set a token for client check
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("michio_admin", "", { path: "/", maxAge: 0 });
  return res;
}
