"use client";

import { useEffect, useRef } from "react";

const navItems = [
    { href: "#hero", label: "首页" },
    { href: "#services", label: "服务" },
    { href: "#works", label: "项目" },
    { href: "#about", label: "关于" },
    { href: "#contact", label: "联系" },
];

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <div
            ref={overlayRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(10, 10, 10, 0.96)",
                backdropFilter: "blur(24px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 10vw",
                pointerEvents: isOpen ? "all" : "none",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                    position: "absolute",
                    top: 28,
                    right: 48,
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,208,200,0.3)",
                    background: "rgba(212,208,200,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "none",
                    color: "var(--text)",
                    fontSize: 20,
                    fontWeight: 300,
                }}
            >
                ×
            </button>

            {/* Nav links */}
            <nav style={{ marginBottom: "8vh" }}>
                {navItems.map(({ href, label }, i) => (
                    <a
                        key={href}
                        href={href}
                        onClick={onClose}
                        style={{
                            display: "block",
                            fontSize: "clamp(2.5rem, 7vw, 6rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.05,
                            color: "var(--text)",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0)" : "translateY(30px)",
                            transition: `opacity 0.5s ${0.05 * i + 0.15}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s ${0.05 * i + 0.15}s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s`,
                            cursor: "none",
                        }}
                        onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.color = "var(--text-muted)")
                        }
                        onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.color = "var(--text)")
                        }
                    >
                        {label}
                    </a>
                ))}
            </nav>

            {/* Footer info */}
            <div
                style={{
                    position: "absolute",
                    bottom: 48,
                    left: "10vw",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.4s ease, transform 0.5s 0.4s ease",
                }}
            >
                <p
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: 8,
                    }}
                >
                    邮箱
                </p>
                <a
                    href="mailto:1779916397@qq.com"
                    style={{
                        display: "block",
                        fontSize: 15,
                        color: "var(--text)",
                        textDecoration: "none",
                        marginBottom: 24,
                    }}
                >
                    1779916397@qq.com
                </a>
                <div style={{ display: "flex", gap: 24 }}>
                    {["抖音", "小红书", "微信"].map((s) => (
                        <span
                            key={s}
                            style={{
                                fontSize: 13,
                                color: "var(--text-muted)",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
