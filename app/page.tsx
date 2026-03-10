"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import { projects } from "@/data/projects";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
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
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    num: "01",
    title: "AI 绘本与视觉",
    desc: "从角色设定到多页场景连贯性，用提示词工程将非标准化创作转化为标准化流水线。在不降质的前提下，将团队绘本产出效率提升 20 倍。",
    tech: [
      ["01", "ComfyUI · MJ · 角色一致性"],
      ["02", "JSON 提示词逆向工程"],
      ["03", "Vibe Coding · 批量生成"],
    ],
  },
  {
    num: "02",
    title: "产品与工具开发",
    desc: "Vibe Coding 驱动，从 0 到 1 搭建 AI 摄影平台 oTATo.art、全自动绘本生成软件。将工作流、拆解引擎、并发调度打包成工业化产品。",
    tech: [
      ["01", "Next.js · React · 全栈建站"],
      ["02", "Cursor · Trae · AI 辅助编程"],
      ["03", "自动化引擎 · 流水线封装"],
    ],
  },
  {
    num: "03",
    title: "AI 视频",
    desc: "MV 制作、商业比赛、平台打榜。熟悉 Sora、Runway、Pika 等工具，产出可商用的 AI 视频内容，具备高要求 B 端交付能力。",
    tech: [
      ["01", "Sora · Runway · Pika"],
      ["02", "商业 MV · 品牌视频"],
      ["03", "平台打榜 · 参赛作品"],
    ],
  },
];

// ─── Skills data ──────────────────────────────────────────────────────────────
const skillColumns = [
  {
    label: "AIGC 工具",
    items: ["ComfyUI", "MidJourney", "Stable Diffusion", "Sora", "Runway", "Pika", "Kling"],
  },
  {
    label: "开发能力",
    items: ["Next.js", "React", "TypeScript", "Cursor", "Trae", "全栈建站", "API 集成"],
  },
  {
    label: "核心方法论",
    items: ["提示词工程", "角色一致性", "SOP 构建", "工作流自动化", "IP 孵化", "知识产品化"],
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 5vw 6vh",
            position: "relative",
          }}
        >
          {/* Gradient transition to dark at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "35%",
              background:
                "linear-gradient(to bottom, transparent, var(--bg-dark))",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Intro label */}
            <p
              style={{
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7a7870",
                marginBottom: "3vh",
                fontWeight: 500,
              }}
            >
              AIGC 创作者 · 上海
            </p>

            {/* Huge name */}
            <h1
              style={{
                fontSize: "clamp(4rem, 14vw, 14rem)",
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#1a1915",
                marginBottom: "4vh",
              }}
            >
              巴哈<br />地尔
            </h1>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <p
                style={{
                  maxWidth: 420,
                  fontSize: "clamp(14px, 1.6vw, 18px)",
                  lineHeight: 1.6,
                  color: "#5a574e",
                  fontWeight: 500,
                }}
              >
                用技术把 AI 视觉生产做成流水线，帮助团队和产品实现规模化产出。
              </p>
              <span
                style={{
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  fontWeight: 800,
                  color: "#c8c4bc",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                2026
              </span>
            </div>
          </div>
        </section>

        {/* ═══ WHAT I DO ═════════════════════════════════════════════════════ */}
        <section
          id="services"
          style={{
            background: "var(--bg-dark)",
            padding: "12vh 5vw",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                color: "var(--text)",
                marginBottom: "6vh",
              }}
            >
              WHAT I DO /
            </h2>
          </Reveal>

          {/* Services intro */}
          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: "clamp(20px, 5vw, 80px)",
                marginBottom: "8vh",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  minWidth: 120,
                  paddingTop: 4,
                }}
              >
                (服务)
              </span>
              <p
                style={{
                  maxWidth: 520,
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                专注 AI 视觉生产的技术化与流水线化，从 Prompt 到批量生成，从单次创作到可复用系统。
              </p>
            </div>
          </Reveal>

          {/* Service items */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div
                  style={{
                    borderTop: "1px solid rgba(212,208,200,0.1)",
                    paddingTop: "clamp(32px, 5vh, 64px)",
                    paddingBottom: "clamp(32px, 5vh, 64px)",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "clamp(20px, 4vw, 60px)",
                  }}
                >
                  {/* Number */}
                  <div>
                    <span
                      style={{
                        fontSize: "clamp(2rem, 5vw, 5rem)",
                        fontWeight: 700,
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      ({s.num})
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "2vh",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(13px, 1.3vw, 16px)",
                        lineHeight: 1.8,
                        color: "var(--text-muted)",
                        marginBottom: "3vh",
                        maxWidth: 500,
                      }}
                    >
                      {s.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "1px solid rgba(212,208,200,0.08)",
                      }}
                    >
                      {s.tech.map(([n, t]) => (
                        <div
                          key={n}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            padding: "12px 0",
                            borderBottom: "1px solid rgba(212,208,200,0.08)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: "var(--text-muted)",
                              fontFamily: "monospace",
                              minWidth: 24,
                            }}
                          >
                            {n}
                          </span>
                          <span
                            style={{
                              fontSize: "clamp(13px, 1.4vw, 17px)",
                              fontWeight: 600,
                              color: "var(--text)",
                            }}
                          >
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ SELECTED WORKS ════════════════════════════════════════════════ */}
        <section
          id="works"
          style={{
            background: "var(--bg-dark)",
            padding: "12vh 5vw",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                color: "var(--text)",
                marginBottom: "6vh",
              }}
            >
              SELECTED WORKS /
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: 40,
                marginBottom: "8vh",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  minWidth: 120,
                  paddingTop: 4,
                }}
              >
                (项目)
              </span>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  maxWidth: 500,
                }}
              >
                绘本、工具、AI 视频 —— 技术与视觉的交叉点
              </p>
            </div>
          </Reveal>

          {/* Project list */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(80px, 200px) 1fr",
              gap: 0,
            }}
          >
            {/* Row of numbers */}
            <div
              style={{
                fontSize: "clamp(5rem, 18vw, 22rem)",
                fontWeight: 800,
                lineHeight: 0.85,
                color: "rgba(212,208,200,0.08)",
                userSelect: "none",
                display: "flex",
                flexDirection: "column",
                letterSpacing: "-0.04em",
              }}
            >
              {projects.slice(0, 6).map((_, i) => (
                <span key={i} style={{ lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>

            {/* Project cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {projects.map((project, i) => (
                <ProjectItem key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ══════════════════════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            background: "var(--bg-dark)",
            padding: "12vh 5vw",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 100px)",
              alignItems: "start",
            }}
          >
            {/* Left: big identity labels */}
            <Reveal>
              <div>
                <h2
                  style={{
                    fontSize: "clamp(3rem, 7vw, 8rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    lineHeight: 0.88,
                    color: "var(--text)",
                    letterSpacing: "-0.03em",
                    marginBottom: "5vh",
                  }}
                >
                  AIGC<br />
                  CREATOR<br />
                  DESIGNER /
                </h2>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 18px)",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    maxWidth: 440,
                    marginBottom: "4vh",
                  }}
                >
                  我是巴哈地尔，做 AI 视觉，也搭系统。用技术把零散、非标的创作流程，整理成可复用的流水线。
                </p>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 18px)",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    maxWidth: 440,
                    marginBottom: "5vh",
                  }}
                >
                  做这行久了，会对一些细节有执念——角色一致性要控到什么程度、提示词结构怎么拆才方便复用。把事做好，把流程跑通，这是我在意的。
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
                    marginBottom: "4vh",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Skills
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
                          marginBottom: 16,
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

        {/* ═══ CONTACT ════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          style={{
            background: "var(--bg-dark)",
            padding: "12vh 5vw 0",
          }}
        >
          <div style={{ borderTop: "1px solid rgba(212,208,200,0.1)", paddingTop: "8vh" }}>
            <Reveal>
              <h2
                style={{
                  fontSize: "clamp(3.5rem, 12vw, 13rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  lineHeight: 0.88,
                  color: "var(--text)",
                  marginBottom: "8vh",
                }}
              >
                LET&apos;S MAKE<br />IT HAPPEN
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  maxWidth: 640,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,208,200,0.1)",
                  borderRadius: 16,
                  padding: "clamp(28px, 5vw, 56px)",
                  marginBottom: "8vh",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "clamp(16px, 2vw, 20px)",
                    color: "var(--text)",
                    marginBottom: "3vh",
                    fontWeight: 500,
                  }}
                >
                  有项目想聊？
                </p>

                {/* Contact links */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "邮箱", value: "1779916397@qq.com", href: "mailto:1779916397@qq.com" },
                    { label: "电话", value: "135 6568 5912", href: "tel:13565685912" },
                    { label: "作品集", value: "bahadir.design", href: "https://bahadir.design" },
                  ].map(({ label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(212,208,200,0.08)",
                        color: "var(--text)",
                        textDecoration: "none",
                        fontSize: "clamp(14px, 1.5vw, 17px)",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(212,208,200,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--text)";
                      }}
                    >
                      <span style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {label}
                      </span>
                      <span>{value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Footer bar */}
            <Reveal delay={0.15}>
              <footer
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "28px 0",
                  borderTop: "1px solid rgba(212,208,200,0.1)",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  © 2026 巴哈地尔 · bahadir.design
                </span>
                <div style={{ display: "flex", gap: 32 }}>
                  {[
                    { label: "首页", href: "#hero" },
                    { label: "服务", href: "#services" },
                    { label: "项目", href: "#works" },
                    { label: "关于", href: "#about" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </footer>
            </Reveal>
          </div>
        </section>

        {/* Scroll to top */}
        <ScrollToTop />
      </main>
    </>
  );
}

// ─── Project Item ─────────────────────────────────────────────────────────────
function ProjectItem({
  project,
  index,
}: {
  project: { slug: string; title: string; shortName?: string; tagline: string; category: string; thumbnail: string };
  index: number;
}) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ${index * 0.06}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${index * 0.06}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <a
        href="#"
        className="cursor-hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          textDecoration: "none",
          paddingTop: "clamp(24px, 4vh, 40px)",
          paddingBottom: "clamp(24px, 4vh, 40px)",
          borderBottom: "1px solid rgba(212,208,200,0.08)",
          cursor: "none",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 16,
            aspectRatio: "16/9",
            background: "#1a1915",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Hover VIEW badge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(10,10,10,0.4)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--bg)",
                color: "#1a1915",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transform: hovered ? "scale(1)" : "scale(0.5)",
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              查看
            </span>
          </div>
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 6,
                fontFamily: "monospace",
              }}
            >
              {project.tagline}
            </p>
            <h3
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.01em",
                transition: "color 0.2s",
              }}
            >
              {project.shortName || project.title}
            </h3>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                padding: "5px 12px",
                border: "1px solid rgba(212,208,200,0.2)",
                borderRadius: 20,
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                padding: "5px 12px",
                border: "1px solid rgba(212,208,200,0.08)",
                borderRadius: 20,
                fontSize: 11,
                color: "var(--text-muted)",
                background: "rgba(212,208,200,0.04)",
              }}
            >
              2025
            </span>
          </div>
        </div>
      </a>
    </div>
  );
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
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "1px solid rgba(212,208,200,0.3)",
        background: "rgba(10,10,10,0.8)",
        color: "var(--text)",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        zIndex: 40,
      }}
    >
      ↑
    </button>
  );
}
