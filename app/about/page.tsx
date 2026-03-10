import SkillTag from "@/components/SkillTag";
import RevealOnScroll from "@/components/RevealOnScroll";

const skills = [
  "AIGC",
  "Vibe Coding",
  "MJ / SD",
  "提示词工程",
  "角色一致性",
  "AI 视频",
  "Sora / Runway / Pika",
  "JSON 提示词",
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <RevealOnScroll>
        <h1 className="mb-4 text-3xl font-semibold text-[#fafafa] md:text-4xl">
          关于
        </h1>
        <p className="mb-12 text-[#e8b86d]">巴哈地尔</p>
      </RevealOnScroll>

      <div className="space-y-8">
        <RevealOnScroll>
          <p className="max-w-2xl text-lg leading-relaxed text-[#a1a1a1]">
            我是巴哈地尔，做 AI 视觉，也搭系统。擅长把非标准化创作转化为可复用的流水线，在不降质的前提下提升效率。
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="max-w-2xl text-lg leading-relaxed text-[#a1a1a1]">
            主要做绘本、AI 绘画和视频，熟悉 Vibe Coding、提示词工程和自动化工具。喜欢用技术把零散、非标的创作流程，整理成可复用的流水线。
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
          技能
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mt-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
          简历
        </h2>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-[#e8b86d] px-6 py-3 text-[#0c0c0c] transition-opacity hover:opacity-90"
        >
          下载简历
        </a>
      </RevealOnScroll>
    </div>
  );
}
