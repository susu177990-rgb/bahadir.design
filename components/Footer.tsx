import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="text-sm text-[#a1a1a1] transition-colors hover:text-[#e8b86d]"
          >
            bahadir.design
          </Link>
          <div className="flex gap-8">
            <Link
              href="/projects"
              className="text-sm text-[#a1a1a1] transition-colors hover:text-[#fafafa]"
            >
              项目
            </Link>
            <Link
              href="/about"
              className="text-sm text-[#a1a1a1] transition-colors hover:text-[#fafafa]"
            >
              关于
            </Link>
            <Link
              href="/contact"
              className="text-sm text-[#a1a1a1] transition-colors hover:text-[#fafafa]"
            >
              联系
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
