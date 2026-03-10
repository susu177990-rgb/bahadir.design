"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".cursor-hover")
            ) {
                setHovering(true);
            } else {
                setHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`cursor ${hovering ? "hovering" : ""}`}
        />
    );
}
