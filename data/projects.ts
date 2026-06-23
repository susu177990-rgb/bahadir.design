export interface ProjectLink {
  label: string;
  href: string;
}

export interface MediaItem {
  src: string;
  alt: string;
}

export interface PlaceholderPreview {
  type: "placeholder";
  label: string;
  needed: string;
  note: string;
}

export interface SkillRow {
  index: string;
  name: string;
  type: string;
  description: string;
  command: string;
  href: string;
}

export type PortfolioPreview =
  | PlaceholderPreview
  | {
      type: "images";
      label: string;
      items: MediaItem[];
    }
  | {
      type: "videos";
      label: string;
      items: MediaItem[];
    }
  | {
      type: "skills";
      label: string;
      rows: SkillRow[];
    };

export interface PortfolioContentBlock {
  label: string;
  body?: string;
  items?: string[];
}

export interface PortfolioGroup {
  slug: string;
  marker: string;
  title: string;
  titleLink?: string;
  eyebrow: string;
  intro: string;
  contentBlocks: PortfolioContentBlock[];
  links?: ProjectLink[];
  preview: PortfolioPreview;
}

export interface PortfolioSection {
  marker: string;
  title: string;
  subtitle: string;
  thesis: string;
  groups: PortfolioGroup[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  thumbnail: string;
  featured?: boolean;
}

const placeholder = (label: string, needed: string, note: string): PlaceholderPreview => ({
  type: "placeholder",
  label,
  needed,
  note,
});

const picturebookImages: MediaItem[] = [
  "/image/03-01.webp",
].map((src, index) => ({
  src,
  alt: `儿童绘本案例画面 ${index + 1}`,
}));

export const portfolioSections: PortfolioSection[] = [
  {
    marker: "一",
    title: "AIGC 制作案例",
    subtitle: "视频 / 社媒 / 绘本 / 提效增质",
    thesis: "这一章按制作类型整理 AIGC 案例。重点不是把每个作品讲成项目介绍，而是说明我在制作链路里如何把模糊需求落成可交付素材、稳定质量并沉淀流程。",
    groups: [
      {
        slug: "aigc-ai-video",
        marker: "1",
        title: "AI Video",
        eyebrow: "TVC · MV · 短剧 · 实拍 + AI 后期",
        intro: "作为 AI 影像制作执行，把导演或团队给到的脚本、参考图和模糊画面意图，翻译成可生成、可筛选、可进入剪辑流程的视频素材。",
        contentBlocks: [
          {
            label: "我的角色",
            body: "不是导演、创意或美术主导，而是负责 AI 视频生成执行：理解创作意图，拆成镜头语言，再把画面真正做出来。",
          },
          {
            label: "收到的输入",
            items: [
              "导演或团队给出的脚本、分镜方向、参考图、情绪关键词和画面要求。",
              "很多时候输入并不完整，需要把抽象描述补足为主体、场景、光线、运动和风格条件。",
            ],
          },
          {
            label: "执行内容",
            items: [
              "把模糊脚本翻译成 AI 可生成的镜头提示词和画面清单。",
              "反复生成、筛选、修正，处理动作不稳、主体变形、风格漂移和镜头不可剪的问题。",
              "根据剪辑需求补齐可用片段，而不是只追求单条生成结果好看。",
            ],
          },
          {
            label: "交付方式",
            body: "交付可进入剪辑 / 后期流程的视频素材片段，并配合导演、剪辑和后期继续修正画面可用性。",
          },
        ],
        preview: {
          type: "videos",
          label: "已有视频预览 / AI Video",
          items: [
            { src: "/video/ai-video/01-01.mp4", alt: "AI Video 案例片段 01" },
            { src: "/video/ai-video/01-02.mp4", alt: "AI Video 案例片段 02" },
            { src: "/video/ai-video/01-03.mp4", alt: "AI Video 案例片段 03" },
            { src: "/video/ai-video/01-04.mp4", alt: "AI Video 案例片段 04" },
            { src: "/video/ai-video/01-05.mp4", alt: "AI Video 案例片段 05" },
            { src: "/video/ai-video/01-06.mp4", alt: "AI Video 案例片段 06" },
            { src: "/video/ai-video/01-07.mp4", alt: "AI Video 案例片段 07" },
            { src: "/video/ai-video/01-08.mp4", alt: "AI Video 案例片段 08" },
            { src: "/video/ai-video/01-09.mp4", alt: "AI Video 案例片段 09" },
            { src: "/video/ai-video/01-10.mp4", alt: "AI Video 案例片段 10" },
          ],
        },
      },
      {
        slug: "aigc-social-media",
        marker: "2",
        title: "虚拟模特 / 社媒内容",
        eyebrow: "去皮土豆 oTATo · AI 模特矩阵",
        intro: "把 AI 模特从单张图推进到可持续更新的社媒账号内容，重点控制人物一致性、穿搭场景和平台传播效率。",
        contentBlocks: [
          {
            label: "账号结果",
            body: "从零孵化「去皮土豆 oTATo」虚拟数字人穿搭博主 IP，2 个月内抖音平台快速涨粉 2W，小红书涨粉 1W。",
          },
          {
            label: "人物控制",
            items: [
              "建立稳定人物资产，让虚拟模特在不同服装、姿态、场景下仍然像同一个人。",
              "控制脸、身材、妆发、穿搭气质和拍摄风格，避免每次生成都变成新角色。",
            ],
          },
          {
            label: "内容生产",
            body: "围绕穿搭、种草、生活方式和平台热点持续生成内容，把 AI 模特从视觉样张推进到账号运营素材。",
          },
          {
            label: "商业价值",
            body: "证明 AI 虚拟模特可以承担穿搭展示、品牌种草和账号矩阵内容生产，具备持续商业化空间。",
          },
        ],
        links: [
          { label: "抖音", href: "https://v.douyin.com/6ERViDuBM6U/" },
          { label: "小红书", href: "https://xhslink.com/m/3zfTZqAyLvY" },
        ],
        preview: {
          type: "images",
          label: "已有图片预览 / 社媒",
          items: [{ src: "/image/02-01.webp", alt: "去皮土豆 oTATo 虚拟模特案例图" }],
        },
      },
      {
        slug: "aigc-picturebook",
        marker: "3",
        title: "儿童绘本",
        eyebrow: "商业绘本 · 角色一致性 · 分页叙事",
        intro: "用 AI 完成长篇儿童绘本视觉生产，核心不是单张插画，而是几十页里的角色、风格、场景和叙事节奏持续稳定。",
        contentBlocks: [
          {
            label: "制作规模",
            body: "参与并主导 30+ 本商业化 AI 绘本制作，个人独立完成 5 本精品绘本。",
          },
          {
            label: "一致性控制",
            items: [
              "先建立角色设定、风格边界和场景规则，再进入分页画面生产。",
              "重点控制人物反复出现时的外形、比例、服装、情绪和画面语言。",
            ],
          },
          {
            label: "分页流程",
            body: "把故事拆成页图节奏、关键动作和画面重点，再通过提示词、局部重绘和后期修正控制最终质量。",
          },
          {
            label: "交付沉淀",
            body: "形成可持续生产的绘本视觉管线，适合团队协作、批量制作和商业绘本交付。",
          },
        ],
        preview: {
          type: "images",
          label: "已有图片预览 / 儿童绘本",
          items: picturebookImages,
        },
      },
      {
        slug: "aigc-efficiency-quality",
        marker: "4",
        title: "提效增质",
        eyebrow: "提示词开发 · Skill 工作流 · 质量控制",
        intro: "这是 AIGC 制作里最关键的底层能力：把不可控的生成手感变成可复用、可检查、可交接的生产流程。",
        contentBlocks: [
          {
            label: "为什么重要",
            body: "AIGC 项目容易依赖个人手感，换项目、换成员后质量会波动。真正有价值的是把经验拆成规则，让效率提升和质量控制同时成立。",
          },
          {
            label: "我沉淀了什么",
            items: [
              "Prompt Library：把风格、镜头、角色、图像逆向和质量标准整理成可复用资产。",
              "Skill 工作流：把复杂制作步骤封装成可安装、可调用的工作模块。",
              "视觉协议：把输入、判断、生成、复核和修正变成明确检查点。",
            ],
          },
          {
            label: "如何复用",
            body: "同一套流程可以用于批量视觉生产、视频分镜、图像逆向、风格控制和团队交接，减少项目从零摸索的时间。",
          },
          {
            label: "适用场景",
            body: "适合需要持续产出、多人协作、风格统一和质量稳定的 AIGC 项目。",
          },
        ],
        links: [
          { label: "seedance-director-skill", href: "https://github.com/susu177990-rgb/seedance-director-skill" },
        ],
        preview: {
          type: "images",
          label: "已有截图预览 / 提效增质",
          items: [{ src: "/image/04-01.webp", alt: "AI 提效增质流程截图" }],
        },
      },
    ],
  },
  {
    marker: "二",
    title: "Vibe Coding 开发案例",
    subtitle: "产品 / 工具 / Agent / 网站 / Skill",
    thesis: "这一章按开发项目整理案例。重点不是列技术栈，而是说明我如何用 AI 辅助开发把真实需求做成可上线、可维护、可继续迭代的系统。",
    groups: [
      {
        slug: "otato-cn",
        marker: "1",
        title: "OTATO.CN",
        titleLink: "https://otato.cn/",
        eyebrow: "AI 模特生产平台",
        intro: "把 AI 模特生产从临时流程做成面向真实用户的商业平台。",
        contentBlocks: [
          {
            label: "做成了什么",
            body: "一个可访问的 AI 模特生产平台，面向真实用户而不是内部 Demo。",
          },
          {
            label: "核心流程",
            items: [
              "围绕人物资产、服装、动作、场景和后续编辑组织生成链路。",
              "把复杂 AI 生图流程转成用户能理解、能重复使用的产品体验。",
            ],
          },
          {
            label: "开发重点",
            body: "负责产品定位、前端工作台、后端能力、用户资产、上线部署和持续迭代。",
          },
          {
            label: "当前状态",
            body: "产品已上线；私有仓库不展示代码链接，页面只展示产品入口和产品截图。",
          },
        ],
        preview: {
          type: "images",
          label: "已有截图预览 / OTATO.CN",
          items: [{ src: "/image/05-01.webp", alt: "OTATO.CN AI 模特生产平台界面截图" }],
        },
      },
      {
        slug: "otato-art",
        marker: "2",
        title: "OTATO.ART",
        titleLink: "https://otato.art/",
        eyebrow: "AI 内容创作工作台",
        intro: "把对话、图片、视频、剧本、画布、画廊和提示词预设放进同一个长期创作工作台。",
        contentBlocks: [
          {
            label: "产品定位",
            body: "它不是单次生成工具，而是用于长期创作项目的工作台，用来沉淀素材、预设、画廊和项目上下文。",
          },
          {
            label: "系统组成",
            items: [
              "多媒体创作入口：对话、图片、视频、剧本和画布。",
              "资产管理：项目、预设、画廊和提示词材料。",
              "开源维护：用 GitHub 管理功能演进和代码结构。",
            ],
          },
          {
            label: "开发重点",
            body: "用 Next.js、React、Supabase 等技术组织全栈结构，把内容生产过程集中到同一界面。",
          },
          {
            label: "当前状态",
            body: "公开开源，可继续作为长期项目和视觉资产沉淀工具迭代。",
          },
        ],
        links: [
          { label: "GitHub", href: "https://github.com/susu177990-rgb/otato.art" },
        ],
        preview: {
          type: "images",
          label: "已有截图预览 / OTATO.ART",
          items: [{ src: "/image/06-01.webp", alt: "OTATO.ART 工作台界面截图" }],
        },
      },
      {
        slug: "ai-picturebook-tool",
        marker: "3",
        title: "自动化 AI 儿童绘本制作工具",
        titleLink: "https://ai-picture-book.zeabur.app/",
        eyebrow: "剧本解析 · 风格提取 · 分页插画",
        intro: "把 AI 绘本制作经验做成自动化工具，让高重复、高判断密度的流程变得可执行。",
        contentBlocks: [
          {
            label: "工具价值",
            body: "把手工绘本流程拆成稳定阶段，降低角色、风格和分页质量的波动。",
          },
          {
            label: "核心能力",
            items: [
              "剧本解析、风格提取、角色审核、分页插画和 ZIP 交付。",
              "每一步都能追踪状态，避免自动化放大错误。",
            ],
          },
          {
            label: "开发重点",
            body: "负责工具架构、核心流程、状态管理和导出交付设计。",
          },
          {
            label: "效率结果",
            body: "绘本制作效率提升 20 倍且不降质，形成可继续迭代的自动化绘本制作工具。",
          },
        ],
        links: [
          { label: "GitHub", href: "https://github.com/susu177990-rgb/ai-picture-book" },
        ],
        preview: {
          type: "images",
          label: "已有截图预览 / 自动化绘本工具",
          items: [{ src: "/image/07-01.webp", alt: "自动化 AI 儿童绘本制作工具界面截图" }],
        },
      },
      {
        slug: "fuelmusic",
        marker: "4",
        title: "福乐音乐工作室官网",
        titleLink: "https://fuelmusic.cn/",
        eyebrow: "官网 · 音频分析 · 垂直工具",
        intro: "把音乐工作室官网和在线音频分析工具结合起来，让业务展示和实用工具在同一站点里完成。",
        contentBlocks: [
          {
            label: "站点定位",
            body: "不是只展示品牌的官网，而是把音乐工作室业务介绍和可直接使用的音频工具放在一起。",
          },
          {
            label: "工具能力",
            items: [
              "支持 BPM、调性、LUFS、真峰值等专业指标分析。",
              "覆盖前端上传、后端处理、结果展示和部署稳定性。",
            ],
          },
          {
            label: "开发方式",
            body: "用 Next.js 组织网站与交互，用 Python / Essentia 承载音频分析，并兼顾传统服务器和容器部署。",
          },
          {
            label: "案例意义",
            body: "证明开发能力可以落到 AIGC 之外的垂直业务工具。",
          },
        ],
        links: [
          { label: "GitHub", href: "https://github.com/susu177990-rgb/fuelmusic.cn" },
        ],
        preview: {
          type: "images",
          label: "已有截图预览 / 福乐音乐",
          items: [{ src: "/image/08-01.webp", alt: "福乐音乐工作室官网与音频分析界面截图" }],
        },
      },
      {
        slug: "skill-collection",
        marker: "5",
        title: "Skill 合集",
        eyebrow: "可安装模块 · Prompt Library · GitHub",
        intro: "把 AIGC 制作方法和开发经验做成可安装、可维护、可组合的 Skill 与仓库合集。",
        contentBlocks: [
          {
            label: "核心价值",
            body: "方法如果只保存在个人经验里，很难迁移到新项目或团队协作。Skill 的价值是把经验变成可安装模块。",
          },
          {
            label: "模块内容",
            items: [
              "Seedance 视频生成工作流、故事板、图像逆向、风格控制和提示词资产。",
              "Prompt Library 承载更大范围的视觉协议和提示词资产。",
            ],
          },
          {
            label: "维护方式",
            body: "每个 Skill 都定义用途、输入、输出和适用边界，并用 GitHub 管理版本。",
          },
          {
            label: "连接作用",
            body: "这是 AIGC 制作方法和 Vibe Coding 开发能力之间的连接层。",
          },
        ],
        preview: {
          type: "skills",
          label: "SKILLS & PROMPT SYSTEMS",
          rows: [
            {
              index: "01",
              name: "seedance-director-skill",
              type: "Video",
              description: "导演级 Seedance 视频提示词、分镜、表演与生成稳定性系统。",
              command: "npx skills add susu177990-rgb/seedance-director-skill",
              href: "https://github.com/susu177990-rgb/seedance-director-skill",
            },
            {
              index: "02",
              name: "XHS-write-image-skill",
              type: "Content",
              description: "主题或长文转小红书封面、多页正文图与可复用视觉档案。",
              command: "npx skills add susu177990-rgb/XHS-write-image-skill",
              href: "https://github.com/susu177990-rgb/XHS-write-image-skill",
            },
            {
              index: "03",
              name: "universal-gpt-image-2-storyboard-skill",
              type: "Storyboard",
              description: "素材锁定、导演推断、提示词审阅与确认生图的预制作导演板。",
              command: "npx skills add susu177990-rgb/universal-gpt-image-2-storyboard-skill",
              href: "https://github.com/susu177990-rgb/universal-gpt-image-2-storyboard-skill",
            },
            {
              index: "04",
              name: "universal-image-reverse-prompt-skill",
              type: "Vision",
              description: "将图像拆成事实、推断、不确定项和重建提示词的结构化 JSON。",
              command: "npx skills add susu177990-rgb/universal-image-reverse-prompt-skill",
              href: "https://github.com/susu177990-rgb/universal-image-reverse-prompt-skill",
            },
            {
              index: "05",
              name: "3x3-storyboard-skill",
              type: "Storyboard",
              description: "将创意转化为结构明确、连续一致的 3×3 九宫格故事板。",
              command: "npx skills add susu177990-rgb/3x3-storyboard-skill",
              href: "https://github.com/susu177990-rgb/3x3-storyboard-skill",
            },
            {
              index: "06",
              name: "ai-liveaction-pipeline-skill",
              type: "Pipeline",
              description: "从视觉设计到镜头生产的 AI 实拍化工作流与交付管线。",
              command: "npx skills add susu177990-rgb/ai-liveaction-pipeline-skill",
              href: "https://github.com/susu177990-rgb/ai-liveaction-pipeline-skill",
            },
            {
              index: "07",
              name: "style-dna-prompt-skill",
              type: "Style",
              description: "从参考素材提炼可迁移、可复用的视觉风格 DNA 与控制协议。",
              command: "npx skills add susu177990-rgb/style-dna-prompt-skill",
              href: "https://github.com/susu177990-rgb/style-dna-prompt-skill",
            },
          ],
        },
      },
    ],
  },
];

export const projects: Project[] = portfolioSections.flatMap((section) =>
  section.groups.map((group) => ({
    slug: group.slug,
    title: group.title,
    category: section.title,
    tagline: group.intro,
    thumbnail: group.preview.type === "images" || group.preview.type === "videos"
      ? group.preview.items[0]?.src ?? ""
      : "",
    featured: true,
  }))
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
