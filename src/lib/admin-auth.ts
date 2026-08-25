import "server-only";

import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "michio_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET hoặc ADMIN_PASSWORD chưa được cấu hình");
  }
  return secret;
}

function tokenFor(subject: string) {
  return crypto.createHmac("sha256", getSecret()).update(subject).digest("hex");
}

function signedToken() {
  return `admin.${tokenFor("michio-admin")}`;
}

export function isAdminRequest(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]+)`));
  const received = match?.[1];
  if (!received) return false;

  const expected = signedToken();
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

export function setAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, signedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
