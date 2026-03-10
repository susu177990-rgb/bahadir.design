import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "巴哈地尔 · AIGC 创作者",
  description:
    "用技术把 AI 视觉生产做成流水线。AI 绘画、绘本、视频 · 工作流 · 自动化",
  metadataBase: new URL("https://bahadir.design"),
  openGraph: {
    url: "https://bahadir.design",
    title: "巴哈地尔 · AIGC 创作者",
    description: "用技术把 AI 视觉生产做成流水线",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
