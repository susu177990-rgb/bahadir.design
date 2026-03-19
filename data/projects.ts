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
  videos?: string[]; // Used for multi-video projects like AI Video
}

const autoPicturebookImage = "/image/02.webp?v=20260319-1347";

export const projects: Project[] = [
  {
    slug: "ruiguang-picturebook",
    title: "AI 儿童绘本",
    shortName: "瑞光红枫",
    category: "绘本与AI绘画",
    tagline: "风格化数字儿童绘本与视觉呈现，探索高品质场景与角色的协同。",
    thumbnail: "/image/01_1.webp",
    featured: true,
    images: ["/image/01_1.webp", "/image/01_2.webp", "/image/01_3.webp", "/image/01_4.webp", "/image/01_5.webp", "/image/01_6.webp", "/image/01_7.webp", "/image/01_8.webp", "/image/01_9.webp"],
    background: "主导并建立高标准视觉风格库，参与《豆豆与噗噗的奇幻之旅》等系列儿童数字绘本制作。\n目前已与团队合作完成 30+ 本，个人独立全流程完成 5 本精品绘本。",
    role: "核心视觉设计与管线主导。\n深度负责全局视觉风格定义、分镜需求拆解，并通过高阶提示词与后期重绘技术，极致解决角色特征与长篇场景的一致性难题。",
  },
  {
    slug: "auto-picturebook",
    title: "自动化AI儿童绘本生成软件",
    shortName: "自动化绘本",
    category: "产品与工具",
    tagline: "全自动化一体化管线，制作效力提升 20 倍且不降质。",
    thumbnail: autoPicturebookImage,
    featured: true,
    images: [autoPicturebookImage],
    background: "端到端全自动批量生成工具，将非标创作转化为高效工业流：\n写故事剧本 → 画风提取 → 设计角色 → 制作分页 → 自动配文，实现全流程一体化运作。",
    role: "核心架构与全栈开发。\n封装设定、拆解、生成三阶段工作流，通过并发调度引擎实现 20 倍效力提升，同时确保每一页都具备高水准艺术质感。",
  },
  {
    slug: "otato-art",
    title: "otato.cn\notato.art",
    shortName: "oTATo",
    category: "产品与工具",
    tagline: "极速落地的多功能 AI 摄影 SaaS 平台，从开发到上线仅用时 1 周。",
    thumbnail: "/image/03.webp",
    featured: true,
    images: ["/image/03.webp"],
    background: "独立设计并开发的多功能一体化 AI 摄影 SaaS 平台。实现了极速交付与增长：\n1 周内完成从代码实现到正式发布；上线 2 周内实现营收 1000+，积累 30+ 用户且包含 5 名深度高活跃用户。",
    role: "全栈独立开发与产品运营。\n以“便宜高效质量好”获得用户高度认可，多名活跃用户利用该平台生成的视觉素材在抖音等平台实现了快速涨粉与流量变现。",
  },
  {
    slug: "qupi-tudou",
    title: "虚拟博主\n去皮土豆oTATo",
    shortName: "去皮土豆oTATo",
    category: "产品与工具",
    tagline: "实战孵化虚拟博主 IP，人物高度一致且极具商业价值。",
    thumbnail: "/image/04.webp",
    featured: false,
    images: ["/image/04.webp"],
    background: "从零成功孵化「去皮土豆」等虚拟数字人穿搭博主 IP。\n2 个月内抖音平台快速涨粉 2W，小红书涨粉 1W 转化矩阵。\n抖音：[@去皮土豆oTATo](https://v.douyin.com/6ERViDuBM6U/)\n小红书：[@去皮土豆oTATo](https://xhslink.com/m/3zfTZqAyLvY)",
    role: "IP 操盘手与 AI 视觉生成。\n通过核心技术攻克实现了人物形象的高度一致性，展现出极高的商业应用潜力，目前已成功建立多个商业合作案例。",
  },
  {
    slug: "ai-video",
    title: "AI 视频",
    shortName: "AI 视频",
    category: "AI视频",
    tagline: "商业赛事、平台打榜作品及独立 MV 创作。",
    thumbnail: "https://placehold.co/800x500/e8e6e1/5a574e?text=AI+Video",
    featured: true,
    background: "1. 美团一对一急送大赛-《极速天际线》\n2. 抖音 AI 浪潮计划《他骑着家走》\n3. 原创 AI MV《失重未来》",
    role: "与搭档[@超级大糍粑](https://v.douyin.com/fNPc5MYt3A4/)合作共同完成。我在其中负责了 部分分镜和视频片段的生成，以及主要的剪辑工作",
    videos: [
      "/video/05_1.mp4",
      "/video/05_2.MP4",
      "/video/05_3.MP4"
    ]
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
