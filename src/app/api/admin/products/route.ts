import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

function isAuthed(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("michio_admin=1");
}

function readData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = readData();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const cat = searchParams.get("cat") || "";
  let filtered = data;
  if (q) {
    filtered = filtered.filter((p: any) => `${p.name} ${p.slug} ${p.excerpt}`.toLowerCase().includes(q));
  }
  if (cat) {
    filtered = filtered.filter((p: any) => p.category === cat);
  }
  return NextResponse.json({ products: filtered, total: data.length });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = readData();
  // validate slug unique
  if (data.find((p: any) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 });
  }
  // basic validation
  if (!body.slug || !body.name || !body.price) {
    return NextResponse.json({ error: "Thiếu trường bắt buộc" }, { status: 400 });
  }
  // auto badge
  if (body.originalPrice && body.originalPrice > body.price) {
    const disc = Math.round((1 - body.price / body.originalPrice) * 100);
    body.badge = `-${disc}%`;
  }
  data.unshift(body);
  writeData(data);
  return NextResponse.json({ ok: true, product: body });
}
