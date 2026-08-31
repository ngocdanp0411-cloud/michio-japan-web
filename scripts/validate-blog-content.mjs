import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "data", "blog");
const categories = new Set([
  "collagen-lam-dep",
  "skincare-nhat-ban",
  "vitamin-suc-khoe",
  "me-va-be-nhat-ban",
  "kinh-nghiem-hang-nhat",
]);
const requiredFields = ["title", "description", "slug", "category", "published_at", "primary_keyword"];
const seenKeywords = new Map();
const errors = [];

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { fields: {}, content: raw };
  const fields = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-z_]+):\s*(.*)$/);
    if (field && field[2].trim()) fields[field[1]] = field[2].trim().replace(/^"|"$/g, "");
  }
  return { fields, content: match[2].trim() };
}

const files = readdirSync(blogDir).filter((file) => /^\d+-.+\.md$/.test(file)).sort();
for (const file of files) {
  const { fields, content } = parseFrontmatter(readFileSync(path.join(blogDir, file), "utf8"));
  const fileSlug = file.replace(/^\d+-/, "").replace(/\.md$/, "");
  for (const field of requiredFields) {
    if (!fields[field]) errors.push(`${file}: thiếu ${field}`);
  }
  if (fields.slug && fields.slug !== fileSlug) errors.push(`${file}: slug không khớp tên file`);
  if (fields.category && !categories.has(fields.category)) errors.push(`${file}: chuyên mục không hợp lệ`);
  if (fields.published_at && !/^\d{4}-\d{2}-\d{2}$/.test(fields.published_at)) errors.push(`${file}: published_at phải theo YYYY-MM-DD`);
  if (!existsSync(path.join(root, "public", "images", "blog", `${fileSlug}.jpg`))) errors.push(`${file}: thiếu ảnh cover`);

  const keyword = fields.primary_keyword?.toLocaleLowerCase("vi");
  if (keyword) {
    if (seenKeywords.has(keyword)) errors.push(`${file}: trùng primary_keyword với ${seenKeywords.get(keyword)}`);
    seenKeywords.set(keyword, file);
  }

  if (fields.ai_assisted === "true") {
    const sources = content.match(/https:\/\/[^\s)]+/g) ?? [];
    const sections = content.match(/^##\s+/gm) ?? [];
    if (sources.length < 2) errors.push(`${file}: bài AI cần ít nhất 2 nguồn trực tiếp`);
    if (sections.length < 5) errors.push(`${file}: bài AI cần ít nhất 5 phần nội dung hữu ích`);
    if (!/\/(danh-muc|san-pham)\//.test(content)) errors.push(`${file}: bài AI thiếu liên kết sản phẩm hoặc danh mục nội bộ`);
    if (/chữa khỏi|cam kết hiệu quả|hiệu quả 100%|thay thế thuốc/i.test(content)) errors.push(`${file}: chứa tuyên bố sức khỏe không được phép`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Blog hợp lệ: ${files.length} bài, ${seenKeywords.size} từ khóa chính duy nhất.`);
