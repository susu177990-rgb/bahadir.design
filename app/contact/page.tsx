import RevealOnScroll from "@/components/RevealOnScroll";

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <RevealOnScroll>
        <h1 className="mb-4 text-3xl font-semibold text-[#fafafa] md:text-4xl">
          联系
        </h1>
        <p className="mb-16 text-[#a1a1a1]">
          有合作意向或想聊聊，欢迎直接联系。
        </p>
      </RevealOnScroll>

      <div className="space-y-8">
        <RevealOnScroll>
          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
              邮箱
            </h2>
            <a
              href="mailto:1779916397@qq.com"
              className="text-lg text-[#fafafa] transition-colors hover:text-[#e8b86d]"
            >
              1779916397@qq.com
            </a>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
              电话
            </h2>
            <a
              href="tel:13565685912"
              className="text-lg text-[#fafafa] transition-colors hover:text-[#e8b86d]"
            >
              135 6568 5912
            </a>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
              作品集
            </h2>
            <a
              href="https://bahadir.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-[#fafafa] transition-colors hover:text-[#e8b86d]"
            >
              bahadir.design
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
