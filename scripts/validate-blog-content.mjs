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
const editorialAuthors = new Set([
  "Ban biên tập Michio Japan",
  "Nhóm Collagen Michio Japan",
  "Nhóm Skincare Michio Japan",
  "Nhóm Sức khỏe Michio Japan",
  "Nhóm Mẹ & Bé Michio Japan",
  "Nhóm Hàng Nhật Michio Japan",
]);
const requiredFields = ["title", "description", "slug", "category", "published_at", "ai_assisted", "primary_keyword"];
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

function normalize(value = "") {
  return value.toLocaleLowerCase("vi").replace(/[^a-z0-9à-ỹ\s-]/gi, "").replace(/\s+/g, " ").trim();
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
  if (fields.ai_assisted && !/^(true|false)$/.test(fields.ai_assisted)) errors.push(`${file}: ai_assisted chỉ nhận true hoặc false`);
  if (!existsSync(path.join(root, "public", "images", "blog", `${fileSlug}.jpg`))) errors.push(`${file}: thiếu ảnh cover`);

  const keyword = fields.primary_keyword?.toLocaleLowerCase("vi");
  if (keyword) {
    if (seenKeywords.has(keyword)) errors.push(`${file}: trùng primary_keyword với ${seenKeywords.get(keyword)}`);
    seenKeywords.set(keyword, file);
  }

  if (fields.ai_assisted === "true") {
    if (!fields.author || !editorialAuthors.has(fields.author)) errors.push(`${file}: author AI phải là vai trò biên tập Michio Japan đã duyệt`);
    const sources = content.match(/https:\/\/[^\s)]+/g) ?? [];
    const sections = content.match(/^##\s+/gm) ?? [];
    const h1s = [...content.matchAll(/^#\s+(.+)$/gm)].map((match) => match[1].trim());
    const quickAnswer = content.match(/^Trả lời nhanh\s*\n+([\s\S]*?)(?=^##\s+)/im)?.[1] ?? "";
    const quickItems = quickAnswer.match(/^-\s+.+$/gm) ?? [];
    const faqQuestions = content.match(/^Q\d+:\s+.+$/gm) ?? [];
    const faqAnswers = content.match(/^A\d+:\s+.+$/gm) ?? [];
    const intro = content.replace(/^#\s+.+\n+/, "").split(/^Trả lời nhanh\s*$/im)[0].trim();
    const introSentences = intro.split(/[.!?]+(?:\s|$)/).filter((sentence) => sentence.trim()).length;

    if (h1s.length !== 1) errors.push(`${file}: bài AI phải có đúng một H1 trong file`);
    if (h1s[0] && normalize(h1s[0]) !== normalize(fields.title)) errors.push(`${file}: H1 phải khớp title`);
    if (h1s[0] && fields.primary_keyword && !normalize(h1s[0]).includes(normalize(fields.primary_keyword))) errors.push(`${file}: H1 chưa chứa primary_keyword tự nhiên`);
    if (introSentences < 2 || introSentences > 4) errors.push(`${file}: sapo cần 2–4 câu trả lời trực tiếp`);
    if (quickItems.length < 3 || quickItems.length > 5) errors.push(`${file}: Trả lời nhanh cần 3–5 ý`);
    if (sources.length < 2) errors.push(`${file}: bài AI cần ít nhất 2 nguồn trực tiếp`);
    if (sections.length < 7) errors.push(`${file}: bài AI cần ít nhất 7 H2 theo search intent`);
    if (!/^###\s+/m.test(content)) errors.push(`${file}: bài AI cần H3 để làm rõ ít nhất một H2`);
    if (!/^##\s+Góc nhìn từ danh mục Michio/im.test(content)) errors.push(`${file}: thiếu thông tin riêng từ danh mục Michio`);
    if (!/^##\s+(?:Sản phẩm|Giải pháp|Bước tiếp theo)/im.test(content)) errors.push(`${file}: thiếu phần sản phẩm hoặc bước tiếp theo`);
    if (!/^##\s+FAQ/im.test(content) || faqQuestions.length < 3 || faqQuestions.length > 5 || faqQuestions.length !== faqAnswers.length) errors.push(`${file}: FAQ cần 3–5 cặp Q/A đầy đủ`);
    if (!/^##\s+Kết luận/im.test(content)) errors.push(`${file}: thiếu kết luận và CTA`);
    if (!/^##\s+Nguồn tham khảo/im.test(content)) errors.push(`${file}: thiếu mục nguồn tham khảo`);
    if (!/\/(danh-muc|san-pham)\//.test(content)) errors.push(`${file}: bài AI thiếu liên kết sản phẩm hoặc danh mục nội bộ`);
    if (/chữa khỏi|cam kết hiệu quả|hiệu quả 100%|thay thế thuốc/i.test(content)) errors.push(`${file}: chứa tuyên bố sức khỏe không được phép`);
    if (/chúng tôi (?:đã )?(?:thử nghiệm|test|khảo sát)|dữ liệu bán hàng (?:cho thấy|ghi nhận)|\d+\s+khách hàng (?:cho biết|phản hồi)/i.test(content)) errors.push(`${file}: có dấu hiệu bịa trải nghiệm hoặc dữ liệu nội bộ`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Blog hợp lệ: ${files.length} bài, ${seenKeywords.size} từ khóa chính duy nhất.`);
