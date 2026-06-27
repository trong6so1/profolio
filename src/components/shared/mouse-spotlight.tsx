"use client";

import * as React from "react";

/**
 * Subtle spotlight that follows the cursor across the page.
 * Mounted once at the root level. Hidden on touch devices.
 */
export function MouseSpotlight() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background:
          "radial-gradient(420px circle at var(--x, -200px) var(--y, -200px), color-mix(in oklch, var(--primary) 6%, transparent), transparent 65%)",
      }}
    />
  );
}
