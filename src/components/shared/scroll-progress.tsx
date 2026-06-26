"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Slim progress bar fixed at the very top of the viewport showing
 * reading progress through the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-[oklch(0.72_0.18_290)] to-accent-foreground"
    />
  );
}
