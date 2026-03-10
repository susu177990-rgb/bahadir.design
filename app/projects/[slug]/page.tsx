import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <Link
        href="/projects"
        className="mb-12 inline-block text-sm text-[#a1a1a1] transition-colors hover:text-[#e8b86d]"
      >
        ← 返回项目
      </Link>

      <div className="mb-8">
        <span className="mb-2 block text-sm text-[#e8b86d]">
          {project.category}
        </span>
        <h1 className="mb-4 text-3xl font-semibold text-[#fafafa] md:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-[#a1a1a1]">{project.tagline}</p>
      </div>

      <div className="relative mb-16 aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {project.background && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
            背景
          </h2>
          <p className="text-[#a1a1a1] leading-relaxed">
            {project.background}
          </p>
        </section>
      )}

      {project.role && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
            我的角色
          </h2>
          <p className="text-[#a1a1a1] leading-relaxed">{project.role}</p>
        </section>
      )}

      {project.approach && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
            技术 / 方法
          </h2>
          <p className="text-[#a1a1a1] leading-relaxed">{project.approach}</p>
        </section>
      )}

      {project.result && (
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#e8b86d]">
            成果
          </h2>
          <p className="text-[#a1a1a1] leading-relaxed">{project.result}</p>
        </section>
      )}
    </div>
  );
}
