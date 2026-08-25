import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Protect /admin (except login API)
  if (pathname.startsWith("/admin")) {
    // Allow the login page itself to be visited without cookie, but API will check
    // We just let it through, client will handle auth via API
    return NextResponse.next();
  }
  // Protect /api/admin
  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/login") return NextResponse.next();
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("michio_admin=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
