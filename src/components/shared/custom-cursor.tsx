"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor with trail.
 * - A small dot follows the cursor instantly (rAF-throttled).
 * - A larger ring trails behind with spring physics.
 * - When hovering interactive elements ([data-cursor="hover"], a, button, [role="button"]),
 *   the ring scales up + changes color.
 * - Disabled on touch devices and reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Mark body so the `cursor: none` rule doesn't apply
      document.body.classList.add("reduce-motion");
      return;
    }

    setEnabled(true);

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        setHidden(false);
      });
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Hover detection — interactive elements
    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      return !!el.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
      );
    };

    const onOver = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) setHovering(true);
    };
    const onOut = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) setHovering(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Small dot — follows cursor instantly */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-primary mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Larger ring — trails behind with spring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[79] rounded-full border mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--primary)",
        }}
        animate={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          opacity: hidden ? 0 : hovering ? 1 : 0.55,
          borderWidth: hovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 22,
          mass: 0.5,
        }}
      />
    </>
  );
}
