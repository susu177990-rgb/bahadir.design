export type ProjectCategory = "绘本与AI绘画" | "产品与工具" | "AI视频";

export interface Project {
  slug: string;
  title: string;
  shortName?: string; // 项目简称，如 NURA
  category: ProjectCategory;
  tagline: string;
  thumbnail: string;
  featured?: boolean;
  background?: string;
  role?: string;
  approach?: string;
  result?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "ruiguang-picturebook",
    title: "AI 绘本量产",
    shortName: "瑞光红枫",
    category: "绘本与AI绘画",
    tagline: "工作流革命，团队绘本产出效率提升 20 倍",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=AI+Picturebook",
    featured: true,
    background:
      "面对传统儿童绘本制作周期长、场景与角色一致性难以把控的痛点，需主导公司绘本业务线并大幅提升整体团队产能。",
    role: "主导核心儿童绘本产品线，负责视觉设定、工作流设计与团队协作。",
    approach:
      "深度拆解传统手绘与排版流程，引入高阶 AI 视觉提示词工程（角色特征与多页场景连贯性），将非标准化创作转化为标准化流水线。",
    result: "《豆豆与噗噗的奇幻之旅》系列推向市场获得好评；团队绘本产出效率提升 20 倍。",
  },
  {
    slug: "otato-art",
    title: "AI 真人摄影生成",
    shortName: "oTATo.art",
    category: "产品与工具",
    tagline: "高度集成 AI 真人摄影一键式生成网站",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=oTATo.art",
    featured: true,
    background: "独立开发上线的 AI 摄影生成平台。",
    role: "全栈独立开发，从 0 到 1 完成产品架构与上线。",
    approach: "Vibe Coding + 自动化工具，将 AI 摄影与提示词系统产品化。",
    result: "产品上线，支持一键式 AI 真人摄影生成。",
  },
  {
    slug: "auto-picturebook",
    title: "全自动绘本生成软件",
    shortName: "自动化绘本",
    category: "产品与工具",
    tagline: "三阶段工作流、拆解引擎、并发调度打包成工业化软件",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=Auto+Picturebook",
    featured: true,
    background: "将绘本生产流水线进一步产品化，开发全自动儿童绘本生成软件。",
    role: "核心开发，负责工作流设计、拆解引擎与并发调度。",
    approach: "Prompt → Vibe Coding → 批量生成，三阶段工作流工业化封装。",
    result: "开发中，目标实现全自动绘本生成。",
  },
  {
    slug: "qupi-tudou",
    title: "虚拟穿搭博主 IP",
    shortName: "去皮土豆",
    category: "产品与工具",
    tagline: "虚拟穿搭博主 IP 孵化，2 个月抖音 2W 粉",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=Tudou",
    featured: false,
    background: "从零孵化虚拟穿搭博主 IP。",
    role: "IP 操盘与内容生产。",
    approach: "AI 视觉 + 自媒体运营，快速起号。",
    result: "2 个月内抖音涨粉 2W，小红书涨粉 1W。",
  },
  {
    slug: "ai-video-mv",
    title: "AI 视频 MV",
    shortName: "失重",
    category: "AI视频",
    tagline: "AI 视频 MV 制作",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=AI+Video",
    featured: false,
  },
  {
    slug: "meituan-ai-video",
    title: "美团 AI 视频大赛",
    shortName: "急送",
    category: "AI视频",
    tagline: "商业比赛参赛作品",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=Meituan",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
