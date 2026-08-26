import type { Metadata } from "next";
import { Be_Vietnam_Pro, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyDock } from "@/components/layout/sticky-dock";

const beVN = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vn",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Michio Japan — Chọn đúng đồ Nhật, sống thật mỗi ngày",
    template: "%s | Michio Japan",
  },
  description:
    "Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Tư vấn tận tâm, 100% chính hãng, giao hàng tinh tế.",
  metadataBase: new URL("https://michiojapan.vn"),
  openGraph: {
    title: "Michio Japan — Chọn đúng đồ Nhật, sống thật mỗi ngày",
    description:
      "Sản phẩm Nhật Bản chính hãng — chăm sóc da, chăm sóc cơ thể, đồ dùng cá nhân, đồ gia dụng.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVN.variable} ${barlow.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--michio-deep-navy)] antialiased">
        <TopBar />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyDock />
      </body>
    </html>
  );
}
