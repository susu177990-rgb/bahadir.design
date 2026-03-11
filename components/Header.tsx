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
      <div className="mx-auto flex w-full flex-col items-start justify-between gap-y-4 px-[6vw] pt-8 md:flex-row md:items-center lg:pt-10">

        {/* Left Side: Designation */}
        <div className="flex w-full items-start md:w-auto">
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

        {/* Right Side: Navigation */}
        <nav className="flex w-full justify-start md:w-auto md:justify-end">
          <ul className="m-0 flex flex-col items-start justify-start gap-y-2 font-semibold text-[#fff] md:flex-row md:items-center md:gap-x-10 md:gap-y-0">
            {navItems.map((item) => (
              <li key={item.label} className="flex leading-normal md:leading-snug">
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
