"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import { portfolioSections, type PortfolioContentBlock, type PortfolioGroup, type PortfolioPreview, type PortfolioSection } from "@/data/projects";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately check if already in viewport (e.g. on page load)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.98)",
        transition: `opacity 1.2s ${delay}s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s ${delay}s cubic-bezier(0.19, 1, 0.22, 1)`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Staggered Text Reveal (For Hero) ─────────────────────────────────────────
function StaggeredText({ text, delayOffset = 0, style: customStyle }: { text: string; delayOffset?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  const letters = text.split("");

  return (
    <div ref={ref} style={{ overflow: "hidden", display: "inline-flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", verticalAlign: "top", paddingBottom: "0.15em", marginBottom: "-0.15em", ...customStyle }}>
      {letters.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            minWidth: char === " " ? "0.3em" : "auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(100%)",
            transition: `opacity 0.8s ${delayOffset + i * 0.05}s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s ${delayOffset + i * 0.05}s cubic-bezier(0.25, 1, 0.5, 1)`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

// ─── Services Stack (标题与能力卡同一滚动系统) ───────────────────────────────────
function ServicesStack({
  services,
  intro,
}: {
  services: typeof servicesData;
  intro: React.ReactNode;
}) {
  const headerLeadVh = 72;
  const cardStepVh = 72;
  const stackHoldVh = 128;
  const cardLiftGapPx = 180;
  const cardBaseTopVh = 34;

  // 采用 CSS Absolute + Sticky 的嵌套架构：
  // 1. 标题区和能力卡都放进同一个 relative 容器里。
  // 2. 标题区单独 sticky 在上方，能力卡在其下方依次进入。
  // 3. 到容器底部时，标题区与能力卡被同一个 bottom 边界一起带走。
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          height: `${headerLeadVh + (services.length - 1) * cardStepVh + stackHoldVh}vh`,
          width: "100%",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: `${services.length * cardLiftGapPx}px`,
          left: 0,
          right: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "8vh",
            zIndex: 5,
            background: "var(--bg-dark)",
            pointerEvents: "auto",
            paddingBottom: "5vh",
          }}
        >
          {intro}
        </div>
      </div>

      {services.map((s, i) => (
        <div
          key={s.num}
          style={{
            position: "absolute",
            top: `${headerLeadVh + i * cardStepVh}vh`,
            bottom: `${(services.length - 1 - i) * 150}px`,
            left: 0,
            right: 0,
            pointerEvents: "none", // 避免占位的绝对定位层遮挡事件
          }}
        >
          <div
            className={`services-sticky-card-${i}`}
            style={{
              position: "sticky",
              top: `calc(${cardBaseTopVh}vh + ${i * cardLiftGapPx}px)`,
              background: "var(--bg-dark)",
              zIndex: i + 10,
              pointerEvents: "auto", // 恢复卡片自身的事件相交
              borderTop: "1px solid rgba(212,208,200,0.1)",
              paddingTop: "clamp(56px, 7vh, 90px)",
              paddingBottom: "22vh",
              minHeight: "85vh",
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: "clamp(40px, 6vw, 100px)",
              boxShadow: i > 0 ? "0 -20px 40px rgba(10,10,10,0.4)" : "none",
            }}
          >
            <Reveal delay={0}>
              <div>
                <span style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, color: "var(--text)", lineHeight: 1, display: "block" }}>
                  {s.num}
                </span>
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--text)", marginBottom: "3vh", letterSpacing: "-0.03em" }}>
                  {s.title}
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "4vh", maxWidth: 540 }}>
                  {s.desc}
                </p>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(212,208,200,0.08)" }}>
                {s.tech.map(([n, t], index) => (
                  <Reveal key={n} delay={0.3 + index * 0.1}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 0", borderBottom: "1px solid rgba(212,208,200,0.08)", position: "relative", overflow: "hidden" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", fontFamily: "monospace", minWidth: 30 }}>{n}</span>
                      <span style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 600, color: "var(--text)" }}>{t}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Services data ────────────────────────────────────────────────────────────
const servicesData = [
  {
    num: "一",
    title: "AIGC 制作能力",
    desc: "对应后面的 AIGC 制作案例。重点不是单张生成，而是把 AI 视频执行、虚拟模特、绘本和提效流程做成可交付的内容生产能力。",
    tech: [
      ["01", "AI Video · 镜头生成 · 视频素材交付"],
      ["02", "虚拟模特 · 社媒内容 · 儿童绘本"],
      ["03", "提效增质 · Prompt · Skill 工作流 · 质量控制"],
    ],
  },
  {
    num: "二",
    title: "Vibe Coding 开发能力",
    desc: "对应后面的 Vibe Coding 开发案例。重点是把真实需求做成能上线、能维护、能继续迭代的产品、工具、Agent、网站和 Skill 系统。",
    tech: [
      ["01", "OTATO.CN · OTATO.ART · 自动化绘本工具"],
      ["02", "个人工作流 Agent · 福乐音乐工作室官网"],
      ["03", "Skill 合集 · 开源仓库 · 可安装模块"],
    ],
  },
];

// ─── Skills data ──────────────────────────────────────────────────────────────
const skillColumns = [
  {
    label: "AIGC Control",
    items: ["角色一致性", "场景连续性", "AI 视频分镜", "虚拟 IP", "风格 DNA", "Prompt Library"],
  },
  {
    label: "Vibe Coding",
    items: ["Next.js", "React", "TypeScript", "Supabase", "Prisma", "S3", "Docker"],
  },
  {
    label: "Workflow Systems",
    items: ["自动化管线", "可安装 Skills", "工作台产品", "批量生成", "资产沉淀", "开源仓库"],
  },
];

const renderTextWithLinks = (text: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--text)",
          textDecoration: "underline",
          textUnderlineOffset: 4,
          transition: "opacity 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {match[1]} ↗
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

// ─── Lazy Video Component ───────────────────────────────────────────────────
function LazyVideo({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    video.muted = false;

    const startTime = performance.now();
    const duration = 150;
    const startVol = video.volume;

    const fade = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      video.volume = Math.max(0, Math.min(1, startVol + (1 - startVol) * progress));
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(fade);
      }
    };
    fadeRef.current = requestAnimationFrame(fade);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    const startTime = performance.now();
    const duration = 250;
    const startVol = video.volume;

    const fade = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      video.volume = Math.max(0, Math.min(1, startVol * (1 - progress)));
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(fade);
      } else {
        video.muted = true;
      }
    };
    fadeRef.current = requestAnimationFrame(fade);
  };

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        backgroundColor: "#111",
        cursor: "pointer",
        willChange: "transform",
      }}
      aria-label={alt}
    />
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main
         className="relative w-full bg-[#e8e6e1]"
      >
        {/* ═══ HERO (Sticky Scale Down) ═════════════════════════════════════ */}
        <div 
          id="light-hero-wrapper"
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            zIndex: 0,
            overflow: "hidden", // Ensures the scaling doesn't break boundaries
            background: "var(--bg)",
          }}
        >
          <div
            id="light-hero-inner"
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "center top",
              willChange: "transform",
              background: "var(--bg)",
            }}
          >
            <section
              id="hero"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "12vh 6vw 5vh",
                position: "relative",
              }}
            >
              {/* Top Section: Label + Name */}
              <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr", justifyItems: "start", width: "100%", gap: "2vh" }}>
                <span style={{ 
                  display: "block",
                  fontSize: "clamp(10px, 1vw, 12px)", 
                  fontWeight: 500, 
                  letterSpacing: "0.12em",
                  color: "#1a1915",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  margin: 0,
                  padding: 0,
                  textAlign: "left",
                  minWidth: 0
                }}>
                   AIGC Production · Vibe Coding Systems
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "start", gap: "0.4em", lineHeight: 0.88, margin: 0, padding: 0, minWidth: 0 }}>
                  <h1
                    style={{
                      fontSize: "clamp(3rem, 9vw, 14rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase",
                      color: "#1a1915",
                      margin: 0,
                      padding: 0,
                      whiteSpace: "nowrap",
                      textAlign: "left",
                      justifySelf: "start",
                    }}
                  >
                    <StaggeredText text="BAHADIR" delayOffset={0.3} style={{ marginLeft: "-0.03em" }} />
                  </h1>
                  <h1
                    style={{
                      fontSize: "clamp(4.5rem, 14vw, 22rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      color: "#1a1915",
                      margin: 0,
                      padding: 0,
                      whiteSpace: "nowrap",
                      textAlign: "left",
                      justifySelf: "start",
                    }}
                  >
                    <StaggeredText text="巴哈地尔" delayOffset={0.45} style={{ marginLeft: "-0.08em" }} />
                  </h1>
                </div>
              </div>

              {/* 分隔线 - 引导视线 */}
              <div style={{ width: "100%", height: 1, background: "rgba(26,25,21,0.12)", margin: "1.5vh 0" }} />

              {/* Bottom grid - 两栏：简介 + 日期 */}
              <div 
                style={{ 
                  position: "relative", 
                  zIndex: 2, 
                  display: "grid", 
                  gridTemplateColumns: "1.3fr 0.7fr", 
                  gap: "5vw",
                  alignItems: "end",
                }}
              >
                {/* Left: Text & Button - 视觉分组 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh", paddingBottom: "1vh", paddingLeft: "1.2vw", borderLeft: "2px solid rgba(26,25,21,0.15)" }}>
                  <Reveal delay={0.6}>
                    <div style={{ fontSize: "22px", color: "#1a1915", fontWeight: 300, opacity: 0.7 }}>↘</div>
                    <p style={{ 
                      fontSize: "clamp(14px, 1.2vw, 17px)", 
                      color: "#1a1915", 
                      fontWeight: 500, 
                      lineHeight: 1.65,
                      maxWidth: "380px",
                      marginTop: "0.5vh"
                    }}>
                      我用 AI 做视觉生产，也用代码把创作流程产品化、系统化、可复用化。从 AIGC 作品到 GitHub 仓库，交付可运行的产品与可复用的工作流。
                    </p>
                    <button
                      type="button"
                      style={{
                        marginTop: "1.5vh",
                        alignSelf: "flex-start",
                        background: "#1a1915",
                        color: "#e8e6e1",
                        border: "none",
                        borderRadius: 100, // Pill shape
                        padding: "16px 32px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.background = "#333";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "#1a1915";
                      }}
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      联系我 ↗
                    </button>
                  </Reveal>
                </div>

                {/* Right: Availability & Date - 右对齐，增强视觉平衡 */}
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: "0.5vh" }}>
                  <Reveal delay={0.8}>
                    <h2 style={{ 
                      fontSize: "clamp(3rem, 6.5vw, 8rem)", 
                      fontWeight: 900, 
                      lineHeight: 0.85,
                      letterSpacing: "-0.03em",
                      color: "#1a1915",
                      margin: 0
                    }}>
                      JUN&apos;26
                    </h2>
                  </Reveal>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Everything between hero and footer is wrapped in this dark shrinking container */}
        <div 
          id="dark-main-wrapper" 
          style={{ 
            position: "relative",
            zIndex: 10,
            background: "var(--bg-dark)", 
            transformOrigin: "center bottom",
            willChange: "transform",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.15)",
          }}
        >
          {/* ═══ WHAT I DO ═════════════════════════════════════════════════════ */}
          <section
            id="services"
            style={{
              padding: "18vh 6vw",
            }}
          >
            <ServicesStack
              services={servicesData}
              intro={
                <>
                  <Reveal>
                    <h2
                      style={{
                        fontSize: "clamp(3rem, 10vw, 10rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                        color: "var(--text)",
                        marginBottom: "5vh",
                      }}
                    >
                      优势
                    </h2>
                  </Reveal>
                </>
              }
            />
          </section>

        {/* ═══ SELECTED WORKS ════════════════════════════════════════════════ */}
        <section
          id="works"
          style={{
            padding: "18vh 6vw",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                color: "var(--text)",
                marginBottom: "5vh",
              }}
            >
              案例
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginBottom: "2vh" }} />
          </Reveal>

          {/* Project list (Split Layout Sticky) */}
          <SelectedWorksTimeline sections={portfolioSections} />
        </section>

        {/* ═══ ABOUT ══════════════════════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            padding: "18vh 6vw",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "clamp(40px, 8vw, 140px)",
              alignItems: "start",
            }}
          >
            {/* Left: big identity labels */}
            <Reveal>
              <div>
                <h2
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 7rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                    color: "var(--text)",
                    letterSpacing: "-0.04em",
                    marginBottom: "4vh",
                  }}
                >
                  意向岗位<br />
                  AI技术专家<br />
                  AI产品/项目经理
                </h2>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.4vw, 20px)",
                    lineHeight: 1.6,
                    color: "var(--text)",
                    fontWeight: 600,
                    maxWidth: 500,
                    marginBottom: "3vh",
                  }}
                >
                  我不是单点做图，也不是单点写代码。我把 AIGC 创作经验转化为可运行产品、可安装模块和可交付管线。
                </p>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.2vw, 17px)",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    maxWidth: 460,
                    marginBottom: "5vh",
                  }}
                >
                  AIGC 负责视觉质量、内容连续性和生产效率；Vibe Coding 负责把这些经验工程化、产品化、开源化。两者之间的桥，是可复用的工作流资产。
                </p>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    display: "inline-block",
                    padding: "14px 32px",
                    border: "1px solid rgba(212,208,200,0.4)",
                    color: "var(--text)",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = "var(--text)";
                    (e.target as HTMLElement).style.color = "var(--bg-dark)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "var(--text)";
                  }}
                >
                  下载简历 ↓
                </a>
              </div>
            </Reveal>

            {/* Right: Skills */}
            <Reveal delay={0.15}>
              <div>
                <h3
                  style={{
                    fontSize: "clamp(2rem, 4vw, 4.5rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    marginBottom: "3vh",
                    letterSpacing: "-0.02em",
                  }}
                >
                  关于我
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(20px, 3vw, 40px)",
                  }}
                >
                  {skillColumns.map((col) => (
                    <div key={col.label}>
                      <p
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          color: "var(--text)",
                          marginBottom: 12,
                        }}
                      >
                        {col.label}
                      </p>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                        {col.items.map((item) => (
                          <li
                            key={item}
                            style={{
                              fontSize: "clamp(12px, 1.1vw, 14px)",
                              color: "var(--text-muted)",
                              fontFamily: "monospace",
                              letterSpacing: "0.03em",
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        </div> {/* End dark-main-wrapper */}

        {/* ═══ FOOTER & CONTACT (Light Section) ═════════════════════════════════════ */}
        <div 
          id="light-footer-wrapper" 
          style={{ 
            position: "relative", 
            zIndex: 10, 
            background: "#e8e6e1", // Light background matching screenshot
          }}
        >
        <section
          id="contact"
          style={{
            padding: "14vh 6vw 6vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Reveal style={{ width: "100%" }}>
              <h2
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 13rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  color: "var(--bg-dark)",
                  marginBottom: "6vh",
                  textAlign: "center"
                }}
              >
                一起做点<br />有意思的事
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  width: "100%",
                  maxWidth: 800,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5vh",
                  alignSelf: "center",
                }}
              >
                <form 
                  style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
                    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
                    const subject = encodeURIComponent(`来自 ${name} 的消息`);
                    const body = encodeURIComponent(`姓名：${name}\n邮箱：${email}\n\n${message}`);
                    window.location.href = `mailto:griffith_huo@outlook.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <div style={{ display: "flex", gap: "3vw", flexDirection: "row", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="你的名字？"
                      style={{
                        flex: "1 1 300px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "2px solid rgba(0,0,0,0.1)",
                        borderRadius: 0,
                        padding: "16px 0 12px 0",
                        color: "#1a1915",
                        fontSize: "clamp(18px, 1.5vw, 24px)",
                        fontWeight: 500,
                        fontFamily: "inherit",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#1a1915")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "rgba(0,0,0,0.1)")}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="你的邮箱？"
                      style={{
                        flex: "1 1 300px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "2px solid rgba(0,0,0,0.1)",
                        borderRadius: 0,
                        padding: "16px 0 12px 0",
                        color: "#1a1915",
                        fontSize: "clamp(18px, 1.5vw, 24px)",
                        fontWeight: 500,
                        fontFamily: "inherit",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#1a1915")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "rgba(0,0,0,0.1)")}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="说说你的项目想法..."
                    rows={1}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "2px solid rgba(0,0,0,0.1)",
                      borderRadius: 0,
                      padding: "16px 0 12px 0",
                      color: "#1a1915",
                      fontSize: "clamp(18px, 1.5vw, 24px)",
                      fontWeight: 500,
                      fontFamily: "inherit",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#1a1915")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(0,0,0,0.1)")}
                  />
                  <button
                    type="submit"
                    style={{
                      marginTop: "3vh",
                      alignSelf: "center",
                      background: "#1a1915",
                      color: "#e8e6e1",
                      border: "none",
                      borderRadius: 100, // Pill shape
                      padding: "24px 48px",
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", // Awwwards smooth easing
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    发送消息 ↗
                  </button>
                </form>
              </div>
            </Reveal>
          </section>
          <footer
            style={{
              padding: "6vh 6vw 4vh",
              display: "flex",
              flexDirection: "column",
              gap: "6vh",
            }}
          >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw", maxWidth: 640 }}>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "var(--bg-dark)", marginBottom: 12 }}>导航</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ label: "首页", href: "#" }, { label: "优势", href: "#services" }, { label: "案例", href: "#works" }, { label: "关于我", href: "#about" }].map(({ label, href }) => (
                  <a key={label} href={href} className="footer-link" style={{ color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, textDecoration: "none" }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "var(--bg-dark)", marginBottom: 12 }}>社交</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("SKYRE614");
                    const el = document.getElementById("wechat-copy-tip");
                    if (el) { el.style.opacity = "1"; setTimeout(() => { el.style.opacity = "0"; }, 1500); }
                  }}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  微信
                  <span id="wechat-copy-tip" style={{ fontSize: 11, opacity: 0, transition: "opacity 0.3s", color: "#1a1915", fontStyle: "italic", textDecoration: "none" }}>✓ 已复制!</span>
                </button>
                <a href="https://v.douyin.com/582fXEnE_Ew/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, textDecoration: "none" }}>抖音 ↗</a>
                <a href="https://xhslink.com/m/7fpkuw5vgYe" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, textDecoration: "none" }}>小红书 ↗</a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 24 }}>
            <span style={{ fontSize: 11, color: "var(--bg-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              BAHADIR <span style={{ opacity: 0.4 }}>© 2026</span>
            </span>
            <span style={{ fontSize: 10, color: "var(--bg-dark)", opacity: 0.4, textAlign: "right", letterSpacing: "0.03em" }}>
              新ICP备2024016754号-3
            </span>
          </div>
        </footer>
        </div>
      </main>

      {/* Script to handle Scale Parallax Dark Wrapper */}
      <ScaleParallaxDarkWrapper />
      
      <ScrollToTop />
    </>
  );
}

// ─── Selected Works (Chaptered Portfolio Timeline) ────────────────────────────
function SelectedWorksTimeline({ sections }: { sections: PortfolioSection[] }) {
  const items = sections.flatMap((section) =>
    section.groups.map((group) => ({ section, group }))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );

    const elements = document.querySelectorAll(".project-right-media-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isMobile, items.length]);

  const renderLinkPills = (group: PortfolioGroup) => {
    if (!group.links?.length) return null;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.8vh", marginTop: "0.4vh" }}>
        {group.links.map((link) => (
          <a
            key={`${group.slug}-${link.label}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text)",
              fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              textTransform: "uppercase",
              textDecoration: "underline",
              textUnderlineOffset: "0.18em",
              textDecorationThickness: "0.06em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    );
  };

  const renderContentBlock = (block: PortfolioContentBlock) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--text-muted)",
          borderBottom: "1px solid rgba(212,208,200,0.1)",
          paddingBottom: 8,
          marginBottom: 4,
        }}
      >
        {block.label}
      </span>
      {block.body ? (
        <p
          style={{
            fontSize: "clamp(13px, 1vw, 15px)",
            lineHeight: 1.7,
            color: "rgba(212,208,200,0.7)",
            margin: 0,
          }}
        >
          {renderTextWithLinks(block.body)}
        </p>
      ) : null}
      {block.items?.length ? (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {block.items.map((entry) => (
            <li
              key={entry}
              style={{
                fontSize: "clamp(13px, 1vw, 15px)",
                lineHeight: 1.7,
                color: "rgba(212,208,200,0.7)",
              }}
            >
              {renderTextWithLinks(entry)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const renderGroupTitle = (group: PortfolioGroup, compact = false) => {
    const titleStyle = {
      fontSize: compact ? "clamp(2.8rem, 12vw, 5.2rem)" : "clamp(3.7rem, 5.2vw, 6.4rem)",
      fontWeight: 900,
      color: "var(--text)",
      margin: 0,
      lineHeight: 0.95,
      letterSpacing: "-0.04em",
      textTransform: "uppercase" as const,
    };

    if (!group.titleLink) {
      return <h3 style={titleStyle}>{group.title}</h3>;
    }

    return (
      <h3 style={titleStyle}>
        <a
          href={group.titleLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "0.12em",
            textDecorationThickness: "0.05em",
          }}
        >
          {group.title} ↗
        </a>
      </h3>
    );
  };

  const renderGroupText = (section: PortfolioSection, group: PortfolioGroup, compact = false, serialIndex?: number) => (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? "2.5vh" : "2.2vh" }}>
      {compact ? (
        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", gap: "1vh", marginBottom: "1vh" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh", minWidth: 0 }}>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "50px",
                border: "1px solid rgba(212,208,200,0.15)",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text)",
                width: "fit-content",
                fontFamily: "monospace",
              }}
            >
              {section.title}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
              {group.marker} / {group.eyebrow}
            </span>
          </div>
          <span
            style={{
              fontSize: "clamp(4rem, 18vw, 8rem)",
              fontWeight: 800,
              lineHeight: 0.75,
              color: "var(--text)",
              letterSpacing: "-0.05em",
              minWidth: "auto",
            }}
          >
            {section.marker}
          </span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.2vh",
          }}
        >
          <span
            style={{
              fontSize: "clamp(5rem, 12vw, 14rem)",
              fontWeight: 900,
              lineHeight: 0.72,
              color: "var(--text)",
              letterSpacing: "-0.06em",
              minWidth: "auto",
            }}
          >
            {String((serialIndex ?? 0) + 1).padStart(2, "0")}
          </span>

          {renderGroupTitle(group)}
        </div>
      )}

      {compact ? (
        renderGroupTitle(group, true)
      ) : null}

      <p
        style={{
          fontSize: compact ? "clamp(14px, 3.8vw, 17px)" : "clamp(16px, 1.3vw, 20px)",
          fontWeight: 500,
          lineHeight: 1.7,
          color: "rgba(212,208,200,0.85)",
          maxWidth: compact ? "100%" : "88%",
          borderLeft: "2px solid rgba(212,208,200,0.3)",
          paddingLeft: "1.2rem",
          marginTop: compact ? 0 : "0.6vh",
        }}
      >
        {group.intro}
      </p>

      {renderLinkPills(group)}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: compact ? "3vh" : "4vh" }}>
        {group.contentBlocks.map((block) => (
          <Fragment key={`${group.slug}-${block.label}`}>
            {renderContentBlock(block)}
          </Fragment>
        ))}
      </div>
    </div>
  );

  const renderPlaceholderPreview = (preview: Extract<PortfolioPreview, { type: "placeholder" }>) => (
      <div
        style={{
          minHeight: "clamp(420px, 64vh, 760px)",
          padding: "clamp(28px, 5vw, 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, rgba(212,208,200,0.07), rgba(212,208,200,0.015) 38%, rgba(10,10,10,1) 100%)",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", marginBottom: "8vh" }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {preview.label}
            </span>
            <span style={{ fontSize: 9, color: "var(--text)", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(212,208,200,0.18)", borderRadius: 999, padding: "8px 11px", whiteSpace: "nowrap" }}>
              素材待补
            </span>
          </div>
          <h4
            style={{
              fontSize: "clamp(3rem, 7vw, 8rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.06em",
              color: "var(--text)",
              marginBottom: "4vh",
            }}
          >
            待补素材
          </h4>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 20px)", lineHeight: 1.75, color: "rgba(212,208,200,0.78)", maxWidth: 620 }}>
            {preview.needed}
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(212,208,200,0.12)", paddingTop: 24 }}>
          <span style={{ display: "block", fontSize: 10, color: "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
            FUTURE MATERIAL
          </span>
          <p style={{ fontSize: "clamp(13px, 1.2vw, 16px)", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 620 }}>
            {preview.note}
          </p>
        </div>
      </div>
  );

  const renderSkillsPreview = (preview: Extract<PortfolioPreview, { type: "skills" }>) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {preview.rows.map((row, index) => (
        <div
          key={`${preview.label}-${row.name}`}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(28px, auto) 1fr auto",
            gridTemplateRows: "auto auto auto",
            rowGap: 12,
            alignItems: "start",
            padding: "20px 18px",
            borderBottom: index < preview.rows.length - 1 ? "1px solid rgba(212,208,200,0.1)" : "none",
            fontSize: "clamp(13px, 1vw, 15px)",
          }}
        >
          <span
            style={{
              gridRow: "1 / span 2",
              color: "rgba(212,208,200,0.64)",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              fontSize: 10,
            }}
          >
            {row.index}
          </span>
          <a
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="打开 GitHub 仓库"
            style={{
              gridColumn: "2 / span 2",
              color: "var(--text)",
              textDecoration: "underline",
              textUnderlineOffset: "0.14em",
              textDecorationThickness: "0.06em",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              lineHeight: 1.2,
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            {row.name} <span style={{ whiteSpace: "nowrap" }}>↗</span>
          </a>
          <span
            style={{
              gridColumn: 2,
              justifySelf: "end",
              color: "rgba(212,208,200,0.66)",
              border: "1px solid rgba(212,208,200,0.25)",
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 10,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            {row.type}
          </span>
          <p
            style={{
              gridColumn: "2 / span 2",
              margin: 0,
              color: "rgba(212,208,200,0.84)",
              fontSize: "clamp(13px, 1vw, 15px)",
              lineHeight: 1.68,
            }}
          >
            {row.description}
          </p>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(row.command);
            }}
            style={{
              gridColumn: 2,
              justifySelf: "start",
              background: "rgba(212,208,200,0.08)",
              border: "1px solid rgba(212,208,200,0.28)",
              borderRadius: 8,
              color: "var(--text)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              maxWidth: "100%",
              width: "100%",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontSize: 12,
              lineHeight: 1.4,
              padding: "10px 12px",
              textAlign: "left",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "rgba(212,208,200,0.16)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "rgba(212,208,200,0.08)";
            }}
          >
            {row.command}
          </button>
        </div>
      ))}
    </div>
  );

  const renderPreview = (preview: PortfolioPreview, priority = false) => {
    if (preview.type === "placeholder") return renderPlaceholderPreview(preview);
    if (preview.type === "skills") return renderSkillsPreview(preview);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {preview.items.map((media, mediaIdx) => (
          <div key={`${media.src}-${mediaIdx}`} style={{ width: "100%", position: "relative", overflow: "hidden" }}>
            {preview.type === "videos" ? (
              <LazyVideo src={media.src} alt={media.alt} />
            ) : (
              <img
                src={media.src}
                alt={media.alt}
                loading={priority && mediaIdx === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const activeSection = items[activeIndex]?.section ?? sections[0];

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "14vh", marginTop: "8vh", width: "100%" }}>
        {sections.map((section) => (
          <section key={section.title} style={{ display: "flex", flexDirection: "column", gap: "8vh" }}>
            <div style={{ borderTop: "1px solid rgba(212,208,200,0.25)", paddingTop: "3vh" }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1.5vh" }}>
                {section.marker} / {section.subtitle}
              </p>
              <h3 style={{ fontSize: "clamp(3.5rem, 18vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "var(--text)", fontWeight: 900, marginBottom: "2vh" }}>
                {section.title}
              </h3>
              <p style={{ fontSize: "clamp(14px, 3.6vw, 16px)", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 520 }}>
                {section.thesis}
              </p>
            </div>

            {section.groups.map((group) => (
              <div key={group.slug} style={{ display: "flex", flexDirection: "column", gap: "4vh" }}>
                {renderGroupText(section, group, true)}
                <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", background: "#1a1915" }}>
                  {renderPreview(group.preview)}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_1.2fr] gap-y-12 gap-x-[6vw] items-start relative mt-4 w-full">
      <div className="md:sticky md:top-[6vh] flex flex-col w-full" style={{ minHeight: "72vh", zIndex: 10 }}>
        <div style={{ position: "relative", width: "100%", height: "clamp(20px, 2.4vw, 34px)", marginBottom: "1.6vh" }}>
          {sections.map((section) => (
            <span
              key={section.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
                fontWeight: 900,
                color: "var(--text)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                opacity: activeSection.title === section.title ? 1 : 0,
                transform: activeSection.title === section.title ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            >
              {section.marker}｜{section.title}
            </span>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {items.map(({ section, group }, i) => (
            <div
              key={group.slug}
              style={{
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i ? "translateY(0)" : "translateY(24px)",
                pointerEvents: activeIndex === i ? "auto" : "none",
                transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            >
              {renderGroupText(section, group, false, i)}
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col w-full"
        style={{
          gap: 0,
          marginBottom: "20vh",
          background: "#1a1915",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        {items.map(({ section, group }, i) => (
          <div
            key={group.slug}
            className="project-right-media-card flex flex-col w-full"
            data-index={i}
            style={{ position: "relative", borderBottom: i < items.length - 1 ? "1px solid rgba(212,208,200,0.1)" : "none" }}
          >
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(212,208,200,0.1)", display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", background: "rgba(10,10,10,0.75)" }}>
              <span style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {section.marker} / {section.title} / {group.marker} {group.title}
              </span>
              <span style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {group.preview.label}
              </span>
            </div>
            {renderPreview(group.preview)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Unified Scale Parallax Logic for Dark Wrapper ────────────────────────────
function ScaleParallaxDarkWrapper() {
  useEffect(() => {
    const handleScroll = () => {
      const darkLayer = document.getElementById("dark-main-wrapper");
      const lightFooter = document.getElementById("light-footer-wrapper");
      const heroInner = document.getElementById("light-hero-inner");

      if (!darkLayer) return;

      const windowHeight = window.innerHeight;
      const rect = darkLayer.getBoundingClientRect();

      // Hero 完全可见时（dark layer 在视口下方）：保持字不灰
      if (rect.top >= windowHeight) {
        darkLayer.style.transform = "none";
        darkLayer.style.borderRadius = "0";
        if (heroInner) {
          heroInner.style.transform = "scale(1)";
          heroInner.style.opacity = "1";
        }
      }
      // Top Entering Logic (sliding up over Hero)
      else if (rect.top > 0 && rect.top <= windowHeight) {
        const progress = rect.top / windowHeight; // 1 (bottom) to 0 (top)
        
        // Dark layer shrinks horizontally to create gap effect as it enters
        darkLayer.style.transformOrigin = "center top";
        darkLayer.style.transform = `scale(${1 - progress * 0.05})`;
        darkLayer.style.borderRadius = `${progress * 40}px ${progress * 40}px 0 0`;

        // The hero behind fades/shrinks slightly back
        if (heroInner) {
          heroInner.style.transform = `scale(${1 - (1 - progress) * 0.04})`;
          heroInner.style.opacity = `${0.6 + progress * 0.4}`;
        }
      } 
      // Bottom Leaving Logic (sliding up to reveal Footer)
      else if (lightFooter) {
        const footerRect = lightFooter.getBoundingClientRect();
        
        if (footerRect.top < windowHeight) { // Footer is moving into viewport
          const scrolledPast = windowHeight - footerRect.top;
          const progress = Math.min(scrolledPast / windowHeight, 1); // 0 to 1
          
          darkLayer.style.transformOrigin = "center bottom";
          darkLayer.style.transform = `scale(${1 - progress * 0.05})`;
          darkLayer.style.borderRadius = `0 0 ${progress * 40}px ${progress * 40}px`;
        } else {
          // Dark layer is normally scrolling full viewport
          darkLayer.style.transformOrigin = "center top";
          darkLayer.style.transform = "none";
          darkLayer.style.borderRadius = "0";

          if (heroInner) {
            heroInner.style.transform = `scale(0.96)`;
            heroInner.style.opacity = `0.6`;
          }
        }
      } else {
        // Fallback
        darkLayer.style.transform = "scale(1)";
        darkLayer.style.borderRadius = "0";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Defer initial run for rect calculation accuracy
    setTimeout(handleScroll, 50);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

// ─── Scroll To Top ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 36,
        height: 36,
        border: "none",
        borderRadius: 0,
        background: "transparent",
        color: "#fff",
        mixBlendMode: "difference",
        fontSize: 18,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        zIndex: 40,
        padding: 0,
        userSelect: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "block",
          transform: "translateY(-1px)",
        }}
      >
        ↑
      </span>
    </button>
  );
}
