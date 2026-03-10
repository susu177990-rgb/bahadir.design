"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-white/5 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#e8b86d]/30"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-5">
        <span className="mb-2 block text-xs text-[#e8b86d]">
          {project.category}
        </span>
        <h3 className="mb-2 text-lg font-medium text-[#fafafa] group-hover:text-[#e8b86d]">
          {project.title}
        </h3>
        {!compact && (
          <p className="text-sm text-[#a1a1a1]">{project.tagline}</p>
        )}
      </div>
    </Link>
  );
}
