"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative scroll-driven divider between sections.
 * Renders a centered gradient bar that grows wider as it scrolls into view.
 */
export function SectionDivider({
  className,
}: {
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const width = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "80%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative flex h-px items-center justify-center ${className ?? ""}`}
    >
      <motion.div
        style={{ width, opacity }}
        className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
    </div>
  );
}
