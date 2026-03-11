"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import { projects, type Project } from "@/data/projects";

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

// ─── Services Stack (JS 控制：依次滚入 + 一起滑走) ─────────────────────────────
function ServicesStack({ services }: { services: typeof servicesData }) {
  // 采用 CSS Absolute + Sticky 的嵌套架构：
  // 1. 各卡片在 absolute 容器中拥有不同的 top，实现依次错位滚入视口。
  // 2. 所有 absolute 容器共享同一个 bottom : 0 边界（即最外层 div 的底部）。
  // 3. 当滚到最外层底部时，所有的 css sticky 会在“同一时刻”被挤上去，从而实现完美的“三张一起滑走”交互，且不会发生卡片互相覆盖挤压，也避免了 JS `transform` 动画的跳跃感。
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* 滚动占位区：提供自然滚动的距离。3 张卡片 * 100vh 错开高度，加上额外的 50vh 给最后一张卡片留出更短的停顿阅读的时间 */}
      <div style={{ height: `${services.length * 100 + 50}vh`, width: "100%" }} />

      {services.map((s, i) => (
        <div
          key={s.num}
          style={{
            position: "absolute",
            top: `${i * 100}vh`,
            bottom: `${(services.length - 1 - i) * 150}px`,
            left: 0,
            right: 0,
            pointerEvents: "none", // 避免占位的绝对定位层遮挡事件
          }}
        >
          <div
            style={{
              position: "sticky",
              top: `calc(12vh + ${i * 150}px)`,
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
                  ({s.num})
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
    items: ["JSON 逆向工程", "Vibe Coding", "视觉管线自动化", "一致性控制", "数字资产沉淀", "工作流拆解"],
  },
];

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
                  AI 视觉生产 · 全栈开发 · 工作流自动化
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
                      我将分散的生成式 AI 转化为标准化的工业级管线。从自动化工具开发到视觉资产量产，交付可复用、可扩展的系统。承接全球商业项目与技术咨询。
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
                    <p style={{ 
                      fontSize: "10px", 
                      fontWeight: 600, 
                      textTransform: "uppercase", 
                      letterSpacing: "0.12em",
                      color: "#1a1915",
                      opacity: 0.5,
                      marginBottom: "0.5vh"
                    }}>
                      可接项目时间
                    </p>
                    <h2 style={{ 
                      fontSize: "clamp(3rem, 6.5vw, 8rem)", 
                      fontWeight: 900, 
                      lineHeight: 0.85,
                      letterSpacing: "-0.03em",
                      color: "#1a1915",
                      margin: 0
                    }}>
                      MAR&apos;26
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
              我做什么 /
            </h2>
          </Reveal>

          {/* Services intro */}
          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: "clamp(20px, 5vw, 80px)",
                marginBottom: "6vh",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
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

          {/* Service items: JS 控制，依次滚入 + 一起滑走 */}
          <ServicesStack services={servicesData} />
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
              精选作品 /
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: "clamp(20px, 5vw, 80px)",
                marginBottom: "6vh",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
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

          {/* Project list (Split Layout Sticky) */}
          <SelectedWorksTimeline projects={projects} />
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
                    lineHeight: 1.1,
                    color: "var(--text)",
                    letterSpacing: "-0.03em",
                    marginBottom: "4vh",
                  }}
                >
                  AIGC<br />
                  创作者<br />
                  设计师 /
                </h2>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 18px)",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    maxWidth: 440,
                    marginBottom: "3.5vh",
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
                    marginBottom: "4vh",
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
                    marginBottom: "3vh",
                    letterSpacing: "-0.02em",
                  }}
                >
                  技能
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
                <form style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}>
                  <div style={{ display: "flex", gap: "3vw", flexDirection: "row", flexWrap: "wrap" }}>
                    <input
                      type="text"
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
                    type="button"
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
                {[{ label: "首页", href: "#" }, { label: "服务", href: "#services" }, { label: "作品", href: "#works" }, { label: "关于", href: "#about" }].map(({ label, href }) => (
                  <a key={label} href={href} className="footer-link" style={{ color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, textDecoration: "none" }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "var(--bg-dark)", marginBottom: 12 }}>社交</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Dribbble", "Instagram", "Twitter"].map(item => (
                  <a key={item} href="#" className="footer-link" style={{ color: "var(--bg-dark)", opacity: 0.6, fontSize: 13, textDecoration: "none" }}>{item}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 24 }}>
            <span style={{ fontSize: 11, color: "var(--bg-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              BAHADIR <span style={{ opacity: 0.4 }}>© 2026</span>
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

// ─── Selected Works (Split View Timeline) ──────────────────────────────────────
function SelectedWorksTimeline({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      // When the image enters the middle 50% of the screen, we switch the active index
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );

    const elements = document.querySelectorAll(".project-right-media-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_1.2fr] gap-y-12 gap-x-[6vw] items-start relative mt-12 w-full">
      {/* LEFT: Sticky Active Content */}
      <div
        className="md:sticky md:top-[15vh] flex flex-col w-full"
        style={{ minHeight: "80vh", zIndex: 10 }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {projects.map((p, i) => (
            <div
              key={p.slug}
              style={{
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i ? "translateY(0)" : "translateY(24px)",
                pointerEvents: activeIndex === i ? "auto" : "none",
                transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "3vh",
              }}
            >
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                {/* Upper block: Giant Number + Category */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw", marginBottom: "4vh" }}>
                  <span
                    style={{
                      fontSize: "clamp(6rem, 11vw, 14rem)", // Huge editorial number
                      fontWeight: 800,
                      lineHeight: 0.75,
                      color: "var(--text)",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div style={{ paddingTop: "1vh", display: "flex", flexDirection: "column", gap: "1vh" }}>
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
                      {p.category}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
                      {"// 2026"}
                    </span>
                  </div>
                </div>

                {/* Massive Title */}
                <h3
                  style={{
                    fontSize: "clamp(3rem, 4.5vw, 5.5rem)",
                    fontWeight: 900,
                    color: "var(--text)",
                    margin: 0,
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    marginBottom: "3vh",
                  }}
                >
                  {p.title}
                </h3>

                {/* Tagline / Descriptive Hero Text */}
                <p
                  style={{
                    fontSize: "clamp(16px, 1.3vw, 20px)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "rgba(212,208,200,0.85)",
                    maxWidth: "85%",
                    borderLeft: "2px solid rgba(212,208,200,0.3)",
                    paddingLeft: "1.5rem",
                    marginBottom: "5vh",
                  }}
                >
                  {p.tagline}
                </p>

                {/* Grid for details with harsh contrast styling */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2.5vw",
                    rowGap: "4vh",
                  }}
                >
                  {[
                    { label: "背景", value: p.background },
                    { label: "角色", value: p.role },
                    { label: "方法", value: p.approach },
                    { label: "成果", value: p.result },
                  ].map((item, idx) =>
                    item.value ? (
                      <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                          {item.label}
                        </span>
                        <p
                          style={{
                            fontSize: "clamp(13px, 1vw, 15px)",
                            lineHeight: 1.7,
                            color: "rgba(212,208,200,0.7)",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Scrolling Media */}
      <div className="flex flex-col w-full" style={{ gap: "30vh", paddingBottom: "20vh" }}>
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="project-right-media-card flex flex-col w-full"
            data-index={i}
            style={{
               position: "relative",
            }}
          >
            {/* Media Container */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4", // Portrait poster look for artistic vibe
                background: "#1a1915",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder/remote URLs */}
              <img
                src={p.thumbnail}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
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

      // Top Entering Logic (sliding up over Hero)
      if (rect.top > 0 && rect.top <= windowHeight) {
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
