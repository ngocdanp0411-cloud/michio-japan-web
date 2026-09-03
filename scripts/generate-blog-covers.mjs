import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function required(name) {
  const value = option(name)?.trim();
  if (!value) throw new Error(`Thiếu tham số ${name}`);
  return value;
}

const outputDir = path.resolve(root, option("--output-dir") ?? "public/images/blog");
const font = [
  "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf",
].find(existsSync);
const slug = required("--slug");
const illustration = path.resolve(root, required("--illustration"));
const category = required("--category").toUpperCase();
const title = required("--title").toUpperCase();

if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Slug không hợp lệ.");
if (!existsSync(illustration)) throw new Error(`Không tìm thấy minh hoạ: ${illustration}`);
if (!font) throw new Error("Không tìm thấy font sans-serif hỗ trợ tiếng Việt.");
if (title.length > 42) throw new Error("Keyword trên cover phải ngắn hơn 43 ký tự.");

mkdirSync(outputDir, { recursive: true });
const output = path.join(outputDir, `${slug}.jpg`);
const categoryWidth = Math.min(510, Math.max(230, category.length * 21 + 70));
const categorySize = category.length > 18 ? "25" : "29";
const titleSize = title.length > 32 ? "88" : title.length > 23 ? "98" : "112";

execFileSync("magick", [
  illustration,
  "-resize", "1920x1080^",
  "-gravity", "center",
  "-extent", "1920x1080",
  "-fill", "#D71920",
  "-draw", `roundrectangle 112,174 ${112 + categoryWidth},242 34,34`,
  "-font", font,
  "-fill", "#FFF7F8",
  "-pointsize", categorySize,
  "-gravity", "northwest",
  "-annotate", "+148+191", category,
  "-fill", "#111116",
  "-pointsize", titleSize,
  "-interline-spacing", "-8",
  "-size", "760x400",
  "-gravity", "west",
  `caption:${title}`,
  "-gravity", "northwest",
  "-geometry", "+108+310",
  "-composite",
  "-fill", "#111116",
  "-draw", "roundrectangle 112,730 680,742 6,6",
  "-strip",
  "-quality", "90",
  output,
]);

console.log(`Generated ${output}`);
