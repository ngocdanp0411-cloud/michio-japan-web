import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "public/images/blog");
const logoSource = path.join(root, "public/images/brand/michio-authentic-logo.jpg");
const boldFont = "/System/Library/Fonts/Supplemental/Arial Bold.ttf";
const regularFont = "/System/Library/Fonts/Supplemental/Arial.ttf";
const productImages = new Map(
  JSON.parse(readFileSync(path.join(root, "data/products.json"), "utf8"))
    .map(({ slug, image }) => [slug, path.join(root, "public", image)]),
);
const product = (slug) => productImages.get(slug) ?? "";

const covers = [
  ["cach-uong-collagen-dung-cach.jpg", "CẨM NANG COLLAGEN", "CÁCH UỐNG\nCOLLAGEN\nĐÚNG CÁCH", "Collagen nước hay viên — dùng sao cho đúng?", "#c61f3a", "#f5dce2", "#efbdc9", [
    "nuoc-uong-collagen-82x-the-pink-hop-10-chai-x-100ml", "vien-uong-collagen-dhc-2-050mg-goi-360-vien", "nuoc-uong-the-collagen-shiseido-10-chai-x-50ml"]],
  ["uong-collagen-luc-nao-tot.jpg", "CẨM NANG COLLAGEN", "UỐNG COLLAGEN\nLÚC NÀO TỐT?", "Lịch dùng dễ nhớ cho người mới bắt đầu.", "#c61f3a", "#f5dce2", "#efbdc9", [
    "nuoc-uong-the-collagen-shiseido-luxerich-10-chai-x-50ml", "vien-uong-the-collagen-shiseido-luxerich-126-vien"]],
  ["collagen-nhat-dang-nuoc-vien-bot.jpg", "SO SÁNH SẢN PHẨM", "COLLAGEN NƯỚC,\nVIÊN HAY BỘT?", "Chọn dạng phù hợp với thói quen và ngân sách.", "#ad2852", "#f3d4df", "#e8a9bd", [
    "nuoc-uong-collagen-82x-sakura-premium-chai-500ml", "vien-uong-collagen-dhc-2-050mg-goi-360-vien", "nuoc-uong-the-collagen-shiseido-10-chai-x-50ml"]],
  ["skincare-routine-toi-gian-cho-nguoi-moi.jpg", "SKINCARE CƠ BẢN", "SKINCARE TỐI GIẢN\nCHO NGƯỜI MỚI", "Ba bước dễ duy trì mỗi ngày.", "#1e6f8a", "#ddeff2", "#a8d7df", [
    "sua-rua-mat-kose-softymo-cleansing-foam-220g", "serum-vitano-c-vitamin-c-concentrated-60ml", "sua-chong-nang-anessa-perfect-uv-sunscreen-skincare-spf50-pa-60ml"]],
  ["thu-tu-skincare-sang-toi.jpg", "SKINCARE CƠ BẢN", "THỨ TỰ SKINCARE\nSÁNG VÀ TỐI", "Làm sạch, dưỡng ẩm và chống nắng đúng thứ tự.", "#b54f58", "#f4ddda", "#e9b5b2", [
    "dau-tay-trang-dhc-deep-cleansing-oil", "serum-vitano-c-vitamin-c-concentrated-60ml", "kem-duong-da-shiseido-aqualabel-5in1-90g", "sua-chong-nang-anessa-perfect-uv-sunscreen-skincare-spf50-pa-60ml"]],
  ["double-cleansing-la-gi.jpg", "LÀM SẠCH DA", "DOUBLE CLEANSING\nLÀ GÌ?", "Tẩy trang và rửa mặt mà không làm khô da.", "#bd821c", "#f5eedc", "#e9d39c", [
    "dau-tay-trang-dhc-deep-cleansing-oil", "sua-rua-mat-kose-softymo-cleansing-foam-220g"]],
  ["cach-chon-kem-chong-nang-nhat.jpg", "CHỐNG NẮNG", "CÁCH CHỌN KEM\nCHỐNG NẮNG NHẬT", "Hiểu SPF, PA và chọn đúng nhu cầu.", "#a87612", "#f4eacb", "#eacb74", [
    "sua-chong-nang-anessa-perfect-uv-sunscreen-skincare-spf50-pa-60ml", "gel-chong-nang-duong-am-skin-aqua-super-moisture-uv-spf50-pa", "kem-chong-nang-allie-gel-uv-ex-spf50-pa-90g"]],
  ["da-kho-nen-skincare-the-nao.jpg", "DƯỠNG ẨM", "ROUTINE DƯỠNG ẨM\nCHO DA KHÔ", "Làm sạch dịu và khóa ẩm đúng cách.", "#3f7d64", "#e0eee7", "#b7d6c8", [
    "kem-duong-da-lo-hoi-aloins-eaude-cream-s-185g", "kem-duong-da-hatomugi-moisturizing-conditioning-300g", "serum-high-class-moist-essence-60ml"]],
  ["omega-3-la-gi-cach-chon.jpg", "SỨC KHỎE", "CÁCH CHỌN\nOMEGA-3", "Phân biệt dầu cá và dầu nhuyễn thể.", "#1d4d75", "#dbe7f0", "#a9c8de", [
    "dau-ca-hoi-omega-3-pure-alaska-333mg", "dau-nhuyen-the-omega-3-kori", "vien-uong-dau-ca-omega-3-orihiro-180-vien"]],
  ["vitamin-tong-hop-cho-phu-nu.jpg", "VITAMIN", "VITAMIN TỔNG HỢP\nCHO PHỤ NỮ", "Đọc nhãn và chọn theo nhu cầu thực tế.", "#d86c1c", "#f7e4d3", "#edbe96", [
    "vien-uong-vitamin-tong-hop-dhc-60-ngay", "vien-uong-dhc-vitamin-b-mix-120-vien-60-ngay", "vien-uong-dhc-vitamin-c-120-vien-60-ngay"]],
  ["cach-kiem-tra-my-pham-nhat-chinh-hang.jpg", "MẸO MUA HÀNG", "KIỂM TRA MỸ PHẨM\nNHẬT CHÍNH HÃNG", "Bao bì, nguồn bán và mã lô cần kiểm tra.", "#b21f35", "#f4dde2", "#e6b0ba", [
    "sua-chong-nang-anessa-perfect-uv-sunscreen-skincare-spf50-pa-60ml", "dau-tay-trang-dhc-deep-cleansing-oil", "kem-duong-da-shiseido-aqualabel-5in1-90g"]],
  ["cach-bao-quan-my-pham-collagen.jpg", "BẢO QUẢN", "BẢO QUẢN MỸ PHẨM\nVÀ COLLAGEN", "Tránh nhiệt, ánh sáng và độ ẩm cao.", "#8a5d3b", "#eee4dc", "#d5bca9", [
    "kem-duong-da-shiseido-aqualabel-5in1-90g", "vien-uong-collagen-dhc-2-050mg-goi-360-vien", "nuoc-uong-collagen-82x-classic-chai-500ml"]],
];

const layouts = {
  2: [[830, 360, "680x600"], [1280, 165, "500x700"]],
  3: [[805, 370, "690x590"], [1235, 160, "450x670"], [1360, 555, "590x470"]],
  4: [[830, 190, "480x430"], [1220, 145, "440x440"], [900, 575, "480x420"], [1390, 545, "480x430"]],
};

function run(args) {
  execFileSync("magick", args, { stdio: "inherit" });
}

function render([file, category, title, subtitle, accent, soft, circle, products]) {
  const temp = mkdtempSync(path.join(tmpdir(), "michio-cover-"));
  const logo = path.join(temp, "logo.png");
  run([logoSource, "-alpha", "on", "-fuzz", "6%", "-transparent", "white", "-trim", "+repage", "-resize", "130x130>", logo]);

  const positions = layouts[products.length];
  const cutouts = products.map((slug, index) => {
    const source = product(slug);
    if (!existsSync(source)) throw new Error(`Missing product: ${source}`);
    const output = path.join(temp, `product-${index}.png`);
    run([source, "-bordercolor", "white", "-border", "1", "-alpha", "on", "-fuzz", "7%", "-fill", "none", "-draw", "alpha 0,0 floodfill", "-shave", "1x1", "-trim", "+repage", "-resize", `${positions[index][2]}>`, output]);
    return output;
  });

  const titleSize = title.replaceAll("\n", "").length > 30 ? "76" : "88";
  const args = [
    "-size", "1920x1080", "xc:#fff8f6",
    "-fill", soft, "-draw", "circle 1480,540 2160,540",
    "-fill", circle, "-draw", "circle 1680,260 1900,260",
    "-fill", "#172238", "-draw", "roundrectangle 0,0 1920,30 0,0",
    "-fill", accent, "-draw", "roundrectangle 275,92 700,156 32,32",
    "-fill", accent, "-draw", "roundrectangle 110,752 480,765 6,6",
    "(", logo, ")", "-gravity", "northwest", "-geometry", "+110+60", "-composite",
    "(", "-background", "none", "-fill", "white", "-font", boldFont, "-pointsize", "26", `label:${category}`, ")", "-gravity", "northwest", "-geometry", "+305+108", "-composite",
    "(", "-background", "none", "-fill", "#172238", "-font", boldFont, "-pointsize", titleSize, "-interline-spacing", "-6", "-size", "720x420", "-gravity", "west", `caption:${title}`, ")", "-gravity", "northwest", "-geometry", "+110+245", "-composite",
    "(", "-background", "none", "-fill", "#4d5567", "-font", regularFont, "-pointsize", "32", `label:${subtitle}`, ")", "-gravity", "northwest", "-geometry", "+110+815", "-composite",
    "(", "-background", "none", "-fill", accent, "-font", boldFont, "-pointsize", "27", "label:MICHIO JOURNAL  •  HÀNG NHẬT NỘI ĐỊA", ")", "-gravity", "northwest", "-geometry", "+110+950", "-composite",
  ];

  cutouts.forEach((cutout, index) => {
    const [x, y] = positions[index];
    args.push("(", cutout, "(", "+clone", "-background", "#4b3340", "-shadow", "35x14+0+28", ")", "+swap", "-background", "none", "-layers", "merge", "+repage", ")", "-gravity", "northwest", "-geometry", `+${x}+${y}`, "-composite");
  });

  args.push("-strip", "-quality", "90", path.join(blogDir, file));
  run(args);
  rmSync(temp, { recursive: true, force: true });
  console.log(`Generated ${file}`);
}

covers.forEach(render);
