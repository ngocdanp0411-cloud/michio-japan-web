import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

function isAuthed(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("michio_admin=1");
}
function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}
function writeData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const data = readData();
  const p = data.find((x: any) => x.slug === slug);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: p });
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const body = await req.json();
  const data = readData();
  const idx = data.findIndex((x: any) => x.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // if slug changed and collides
  if (body.slug !== slug && data.find((x: any) => x.slug === body.slug)) {
    return NextResponse.json({ error: "Slug mới đã tồn tại" }, { status: 400 });
  }
  if (body.originalPrice && body.originalPrice > body.price) {
    const disc = Math.round((1 - body.price / body.originalPrice) * 100);
    body.badge = `-${disc}%`;
  } else if (!body.originalPrice) {
    body.badge = undefined;
  }
  data[idx] = { ...data[idx], ...body };
  writeData(data);
  return NextResponse.json({ ok: true, product: data[idx] });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const data = readData();
  const idx = data.findIndex((x: any) => x.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.splice(idx, 1);
  writeData(data);
  return NextResponse.json({ ok: true });
}
