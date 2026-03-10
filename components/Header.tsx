"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0c0c0c]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-medium text-[#fafafa] transition-colors hover:text-[#e8b86d]"
        >
          巴哈地尔
        </Link>
        <nav className="flex gap-6 sm:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#a1a1a1] transition-colors hover:text-[#fafafa]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
