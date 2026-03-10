import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bahadir · AIGC Creator",
  description:
    "Building AI visual production pipelines. AI Illustration · Picturebooks · Video · Workflow Automation",
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
