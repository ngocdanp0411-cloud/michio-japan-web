import type { Metadata } from "next";
import { Be_Vietnam_Pro, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { Footer } from "@/components/layout/footer";
import { StickyDock } from "@/components/layout/sticky-dock";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

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
    "Michio Japan chọn lọc sản phẩm chăm sóc cá nhân, làm đẹp và đồ gia dụng từ Nhật Bản. Tư vấn tận tâm, hàng Nhật nội địa, giao hàng tinh tế.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: { google: "3x9LISOpF3onhsEoBj88nc6Vsqd4oFm-puCV0o2pCGI" },
  openGraph: {
    title: "Michio Japan — Chọn đúng đồ Nhật, sống thật mỗi ngày",
    description:
      "Sản phẩm Nhật Bản nội địa — chăm sóc da, chăm sóc cơ thể, đồ dùng cá nhân, đồ gia dụng.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "vi_VN",
    type: "website",
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1125, height: 1126, alt: "Michio Japan — Hàng Nhật nội địa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michio Japan — Chọn đúng đồ Nhật, sống thật mỗi ngày",
    description: "Sản phẩm Nhật Bản nội địa và tư vấn chọn đúng theo nhu cầu.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVN.variable} ${barlow.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--michio-navy)] antialiased">
        <Header />
        <TopBar />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyDock />
      </body>
    </html>
  );
}
