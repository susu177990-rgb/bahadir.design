import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "巴哈地尔 · AIGC 创作者",
  description:
    "用技术把 AI 视觉生产做成流水线。AI 绘画 · 绘本 · 视频 · 工作流 · 自动化",
  metadataBase: new URL("https://bahadir.design"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
