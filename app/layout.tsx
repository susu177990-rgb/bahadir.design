import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "巴哈地尔 · AIGC 创作者",
  description:
    "构建 AI 视觉生产流水线。AI 绘本 · 工具开发 · 视频 · 工作流自动化",
  metadataBase: new URL("https://bahadir.design"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${dmSans.variable} ${notoSansSC.variable} antialiased bg-[#e8e6e1]`}>{children}</body>
    </html>
  );
}
