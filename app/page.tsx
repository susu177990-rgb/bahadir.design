import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getFeaturedProjects } from "@/data/projects";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll className="mb-12">
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
              精选作品
            </h2>
            <p className="mb-12 text-2xl font-medium text-[#fafafa]">
              技术与视觉的交叉点
            </p>
          </RevealOnScroll>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <RevealOnScroll key={project.slug}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-[#e8b86d]/50 bg-transparent px-6 py-3 text-[#e8b86d] transition-colors hover:bg-[#e8b86d]/10"
            >
              查看全部项目
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
