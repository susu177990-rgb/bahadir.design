"use client";

import Link from "next/link";

export default function Header() {
  const navItems = [
    { label: "服务", href: "#services" },
    { label: "作品", href: "#works" },
    { label: "关于", href: "#about" },
    { label: "联系", href: "#contact" },
  ];

  return (
    <header className="absolute top-0 z-40 w-full mix-blend-difference">
      <div className="mx-auto flex w-full flex-row items-center justify-between px-[6vw] pt-8 lg:pt-10">
        {/* Left: Designation */}
        <div className="flex items-start">
          <span
            style={{
              display: "block",
              width: "fit-content",
              color: "#fff",
              fontWeight: 600,
              lineHeight: 1.3,
              fontSize: "12px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            AIGC 创作者 · 设计师
          </span>
        </div>

        {/* Right: Horizontal nav (mobile + desktop) */}
        <nav className="flex justify-end">
          <ul className="m-0 flex flex-row items-center gap-x-4 font-semibold text-[#fff] sm:gap-x-6 md:gap-x-10">
            {navItems.map((item) => (
              <li key={item.label} className="flex leading-snug">
                <Link
                  href={item.href}
                  className="group relative block h-fit cursor-none overflow-hidden select-none"
                  style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  <span className="block w-full translate-y-0 transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 block w-full translate-y-full transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] group-hover:translate-y-0"
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
