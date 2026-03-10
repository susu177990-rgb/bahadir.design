import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";

const categories: ProjectCategory[] = [
  "绘本与AI绘画",
  "产品与工具",
  "AI视频",
];

export default function Projects() {
  const byCategory = categories.map((cat) => ({
    category: cat,
    items: projects.filter((p) => p.category === cat),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <RevealOnScroll>
        <h1 className="mb-4 text-3xl font-semibold text-[#fafafa] md:text-4xl">
          项目
        </h1>
        <p className="mb-16 text-[#a1a1a1]">
          绘本、工具、AI 视频 —— 技术与视觉的交叉点
        </p>
      </RevealOnScroll>

      <div className="space-y-20">
        {byCategory.map(
          ({ category, items }) =>
            items.length > 0 && (
              <RevealOnScroll key={category}>
                <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
                  {category}
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </RevealOnScroll>
            )
        )}
      </div>
    </div>
  );
}
