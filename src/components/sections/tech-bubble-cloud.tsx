"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/animations";

type Tag = {
  name: string;
  size: "xs" | "sm" | "md" | "lg";
  tone: "primary" | "default" | "muted";
};

const TECH_TAGS: Tag[] = [
  { name: "PHP", size: "lg", tone: "primary" },
  { name: "JavaScript", size: "md", tone: "default" },
  { name: "Vue.js", size: "md", tone: "default" },
  { name: "jQuery", size: "sm", tone: "muted" },
  { name: "Bash", size: "sm", tone: "muted" },
  { name: "CentOS", size: "sm", tone: "muted" },
  { name: "MariaDB", size: "md", tone: "default" },
  { name: "REST API", size: "lg", tone: "primary" },
  { name: "JSON", size: "sm", tone: "muted" },
  { name: "TSV", size: "xs", tone: "muted" },
  { name: "Git", size: "md", tone: "default" },
  { name: "Google API", size: "md", tone: "default" },
  { name: "MoMo API", size: "sm", tone: "primary" },
  { name: "Linux", size: "sm", tone: "muted" },
  { name: "Postman", size: "xs", tone: "muted" },
  { name: "phpMyAdmin", size: "xs", tone: "muted" },
];

// Relative position (% x, % y) for each bubble
const POSITIONS = [
  { x: 8, y: 32 },
  { x: 22, y: 14 },
  { x: 38, y: 46 },
  { x: 52, y: 20 },
  { x: 68, y: 40 },
  { x: 84, y: 17 },
  { x: 14, y: 68 },
  { x: 32, y: 82 },
  { x: 48, y: 65 },
  { x: 62, y: 80 },
  { x: 78, y: 62 },
  { x: 92, y: 76 },
  { x: 6, y: 52 },
  { x: 26, y: 52 },
  { x: 58, y: 92 },
  { x: 88, y: 46 },
];

const sizeClasses: Record<Tag["size"], string> = {
  xs: "px-2.5 py-1 text-[10px]",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base font-semibold",
};

const toneClasses: Record<Tag["tone"], string> = {
  primary:
    "border-primary/40 bg-primary/10 text-primary shadow-lg shadow-primary/20",
  default: "border-border/60 bg-card/80 text-foreground backdrop-blur",
  muted: "border-border/40 bg-secondary/40 text-muted-foreground backdrop-blur",
};

/**
 * Interactive tech bubble cloud — replaces the boring marquee.
 * - Bubbles float gently (unique delay/duration each)
 * - Cursor parallax: bubbles drift with depth illusion
 * - Hover: bubble scales up + glows
 * - Staggered reveal on scroll
 */
export function TechBubbleCloud() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        mx.set(x);
        my.set(y);
      });
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      className="relative mt-10 h-[340px] w-full overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-secondary/30 via-background/40 to-secondary/20 backdrop-blur sm:h-[380px]"
    >
      {/* Decorative layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      {/* Ambient center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]"
      />

      {/* Label */}
      <div className="absolute left-5 top-5 z-20">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary" />
          Cũng quen thuộc
        </span>
        <p className="mt-1 text-sm text-muted-foreground/80">
          Hover để thấy bong bóng phản ứng ✨
        </p>
      </div>

      {/* Bubbles */}
      {TECH_TAGS.map((tag, i) => (
        <Bubble
          key={tag.name}
          tag={tag}
          pos={POSITIONS[i % POSITIONS.length]}
          index={i}
          mx={mx}
          my={my}
        />
      ))}

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
    </motion.div>
  );
}

type BubbleProps = {
  tag: Tag;
  pos: { x: number; y: number };
  index: number;
  mx: ReturnType<typeof useMotionValue>;
  my: ReturnType<typeof useMotionValue>;
};

function Bubble({ tag, pos, index, mx, my }: BubbleProps) {
  // Each bubble has unique parallax depth (closer = more drift)
  const depth = 12 + (index % 5) * 6;
  const smX = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const smY = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
  const x = useTransform(smX, (v) => v * depth);
  const y = useTransform(smY, (v) => v * depth);
  const floatDelay = (index * 0.4) % 4;
  const floatDur = 4 + (index % 3);

  return (
    <motion.div
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, x, y }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.06,
        ease: EASE_PREMIUM,
      }}
      whileHover={{
        scale: 1.2,
        zIndex: 30,
        transition: { duration: 0.25, ease: EASE_PREMIUM },
      }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDur,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses[tag.size]} ${toneClasses[tag.tone]} cursor-default transition-colors duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/30`}
      >
        {tag.tone === "primary" && (
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary-glow)]" />
        )}
        {tag.name}
      </motion.span>
    </motion.div>
  );
}
