"use client";

import { useState, useEffect } from "react";
import MenuOverlay from "./MenuOverlay";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          transition: "background 0.4s ease",
          background: menuOpen
            ? "transparent"
            : scrolled
              ? "rgba(10,10,10,0.8)"
              : "transparent",
          backdropFilter: scrolled && !menuOpen ? "blur(12px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
          <a
            href="#hero"
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            bahadir.design
          </a>

          {/* Circular hamburger button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid rgba(212,208,200,0.3)",
              background: "rgba(212,208,200,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              cursor: "none",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "var(--text)",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "var(--text)",
                borderRadius: 2,
              }}
            />
          </button>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
