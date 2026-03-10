"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

    // Immediately check if already in viewport (e.g. on page load)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
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
function StaggeredText({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const { ref, visible } = useReveal();
  const letters = text.split("");

  return (
    <div ref={ref} style={{ overflow: "hidden", display: "inline-block" }}>
      {letters.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(100%)",
            transition: `opacity 0.8s ${delayOffset + i * 0.05}s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s ${delayOffset + i * 0.05}s cubic-bezier(0.25, 1, 0.5, 1)`,
            minWidth: char === " " ? "0.3em" : "auto", // preserve spaces
          }}
        >
          {char}
        </span>
      ))}
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
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5vw",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", gap: "2vh" }}>

            <h1
              style={{
                fontSize: "clamp(5rem, 20vw, 24rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#1a1915",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              <StaggeredText text="BAHADIR" delayOffset={0.1} />
            </h1>

            <h1
              style={{
                fontSize: "clamp(4rem, 16vw, 18rem)",
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: "0.02em",
                color: "#1a1915",
                margin: 0,
                whiteSpace: "nowrap",
                opacity: 0.9,
              }}
            >
              <StaggeredText text="巴哈地尔" delayOffset={0.3} />
            </h1>

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

          {/* Service items (Sticky Stacking Effect) */}
          <div style={{ position: "relative" }}>
            {services.map((s, i) => (
              <div
                key={s.num}
                style={{
                  position: "sticky",
                  // The cascade: each card stops slightly lower than the previous one,
                  // creating the folded/stacked effect at the top of the viewport.
                  top: `calc(12vh + ${i * 130}px)`,
                  background: "var(--bg-dark)", // Solid background ensures it elegantly covers the previous scrolling card
                  zIndex: i + 10,
                  borderTop: "1px solid rgba(212,208,200,0.1)",
                  paddingTop: "clamp(40px, 6vh, 80px)",
                  paddingBottom: "15vh", // Give it extra scroll length so the sticky effect lasts
                  minHeight: "75vh", // Ensures long satisfying scroll coverage
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "clamp(20px, 4vw, 60px)",
                  boxShadow: i > 0 ? "0 -20px 40px rgba(10,10,10,0.4)" : "none", // Adds depth to the overlapping layer
                }}
              >
                {/* Number */}
                <Reveal delay={0}>
                  <div>
                    <span
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        fontWeight: 800,
                        color: "var(--text)",
                        lineHeight: 1,
                        display: "block",
                      }}
                    >
                      ({s.num})
                    </span>
                  </div>
                </Reveal>

                {/* Content */}
                <div>
                  <Reveal delay={0.1}>
                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "3vh",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {s.title}
                    </h3>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <p
                      style={{
                        fontSize: "clamp(14px, 1.4vw, 17px)",
                        lineHeight: 1.8,
                        color: "var(--text-muted)",
                        marginBottom: "4vh",
                        maxWidth: 540,
                      }}
                    >
                      {s.desc}
                    </p>
                  </Reveal>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "1px solid rgba(212,208,200,0.08)",
                    }}
                  >
                    {s.tech.map(([n, t], index) => (
                      <Reveal key={n} delay={0.3 + index * 0.1}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            padding: "16px 0",
                            borderBottom: "1px solid rgba(212,208,200,0.08)",
                            position: "relative",
                            overflow: "hidden"
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "var(--text-muted)",
                              fontFamily: "monospace",
                              minWidth: 30,
                            }}
                          >
                            {n}
                          </span>
                          <span
                            style={{
                              fontSize: "clamp(14px, 1.5vw, 18px)",
                              fontWeight: 600,
                              color: "var(--text)",
                            }}
                          >
                            {t}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            {projects.map((project, i) => (
              <ProjectItem key={project.slug} project={project} index={i} />
            ))}
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

// ─── Project Item (Scroll Flow Interaction) ────────────────────────────────────
function ProjectItem({
  project,
  index,
}: {
  project: { slug: string; title: string; shortName?: string; tagline: string; category: string; thumbnail: string; background?: string; role?: string; approach?: string; result?: string; };
  index: number;
}) {
  const { ref, visible } = useReveal();
  const titleRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      // Trigger the "active" animation state when the title is near the viewport center
      const distance = Math.abs(elCenter - windowCenter);
      setIsActive(distance < 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    // Safety check after initial renders just in case of layout shifts
    const timeoutId = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ${Math.min(index * 0.05, 0.25)}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s ${Math.min(index * 0.05, 0.25)}s cubic-bezier(0.22, 1, 0.36, 1)`,
        borderBottom: "1px solid rgba(212,208,200,0.1)",
        paddingBottom: "8vh",
      }}
    >
      {/* Title Bar (Scroll to preview) */}
      <div
        ref={titleRef}
        className="block relative w-full overflow-hidden"
        style={{
          padding: "clamp(24px, 4vh, 40px) 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Project Title (Massive Text) */}
          <h3
            style={{
              fontSize: "clamp(2.5rem, 6vw, 7rem)",
              fontWeight: 800,
              color: "var(--text)",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), color 0.6s",
              transform: isActive ? "translateX(2vw)" : "translateX(0)",
            }}
          >
            {project.shortName || project.title}
          </h3>

          {/* Project Category / Tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              textAlign: "right",
              transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s",
              transform: isActive ? "translateX(-2vw)" : "translateX(0)",
              opacity: isActive ? 1 : 0.4,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "clamp(12px, 1.2vw, 15px)",
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}
              >
                {project.category}
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 1.4vw, 18px)",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                }}
              >
                {project.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Action Image Reveal Parallax (Awwwards Style) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "clamp(300px, 30vw, 500px)",
            aspectRatio: "16/9",
            transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.8}) rotate(${isActive ? "-2deg" : "0deg"})`,
            opacity: isActive ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
            pointerEvents: "none",
            zIndex: 1,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
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
              transform: isActive ? "scale(1.05)" : "scale(1.2)",
              transition: "transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          />
        </div>
      </div>

      {/* Content Payload (Always inline, automatically revealed on scroll) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6vh", marginTop: "2vh" }}>
        {/* Big Thumbnail */}
        <Reveal delay={0.1}>
          <div
            style={{
              width: "100%",
              aspectRatio: "21/9",
              background: "#1a1915",
              borderRadius: 16,
              overflow: "hidden",
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
              }}
            />
          </div>
        </Reveal>

        {/* Details Grid */}
        <Reveal delay={0.2}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "clamp(30px, 5vw, 60px)",
            }}
          >
            {[
              { label: "Background", value: project.background },
              { label: "Role", value: project.role },
              { label: "Approach", value: project.approach },
              { label: "Result", value: project.result },
            ].map((item, i) => item.value ? (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    borderBottom: "1px solid rgba(212,208,200,0.1)",
                    paddingBottom: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {item.label}
                </span>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.2vw, 16px)",
                    lineHeight: 1.8,
                    color: "var(--text)",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ) : null)}
          </div>
        </Reveal>
      </div>
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
