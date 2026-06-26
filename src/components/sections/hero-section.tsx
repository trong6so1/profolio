"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { profile, stats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useTilt } from "@/hooks/use-pointer";
import { Magnetic } from "@/components/shared/magnetic";
import { Particles } from "@/components/shared/particles";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useCountUp } from "@/hooks/use-count-up";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [roleIdx, setRoleIdx] = React.useState(0);
  const mouse = useMousePosition();

  // Parallax motion values for avatar card
  const mx = useSpring(mouse.x, { stiffness: 80, damping: 20 });
  const my = useSpring(mouse.y, { stiffness: 80, damping: 20 });
  const cardX = useTransform(mx, (v) => v * -12);
  const cardY = useTransform(my, (v) => v * -12);
  const blob1X = useTransform(mx, (v) => v * 30);
  const blob1Y = useTransform(my, (v) => v * 30);

  React.useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setRoleIdx((v) => (v + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Aurora background — soft moving gradients */}
      <div className="aurora pointer-events-none absolute inset-0 -z-20 opacity-70" />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40" />

      {/* Floating particles */}
      <Particles count={20} />

      {/* Animated gradient blobs with mouse parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="blob absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15"
        />
        <div
          className="blob absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[oklch(0.72_0.18_290)]/10"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="blob absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[oklch(0.72_0.15_155)]/10"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
        >
          {/* Left: text content */}
          <div className="flex flex-col items-start gap-6">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {profile.available ? "Sẵn sàng cho cơ hội mới" : "Đang bận"}
                <span className="mx-1 h-1 w-1 rounded-full bg-border" />
                <MapPin className="h-3 w-3" />
                {profile.location}
              </span>
            </motion.div>

            <motion.div variants={item} className="space-y-3">
              <p className="font-display text-sm font-medium uppercase tracking-[0.18em] text-primary">
                <span className="inline-block h-px w-6 align-middle bg-primary/60" />{" "}
                Xin chào, tôi là
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <div className="flex min-h-[2.5rem] items-center overflow-hidden text-2xl font-semibold sm:text-3xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gradient inline-flex items-center"
                  >
                    {profile.roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25} className="inline-block">
                <Button
                  asChild
                  size="lg"
                  className="shine-sweep group h-11 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:brightness-105"
                >
                  <Link href={profile.cvUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Tải CV
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.2} className="inline-block">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-11 rounded-full border-border bg-background/60 px-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-secondary hover:shadow-md"
                >
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Liên hệ
                  </Link>
                </Button>
              </Magnetic>

              <div className="ml-1 flex items-center gap-1.5">
                <Magnetic strength={0.4}>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Github className="h-4.5 w-4.5 transition-transform group-hover:scale-110 group-hover:-rotate-6" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Linkedin className="h-4.5 w-4.5 transition-transform group-hover:scale-110 group-hover:-rotate-6" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="mt-6 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Right: avatar / portrait card */}
          <motion.div
            variants={item}
            style={{ x: cardX, y: cardY }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="bob">
              <AvatarCard />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex justify-center lg:mt-16"
        >
          <a
            href="#about"
            aria-label="Cuộn xuống"
            className="group flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Cuộn xuống
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/60"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function AvatarCard() {
  const tilt = useTilt<HTMLDivElement>(8);

  return (
    <div className="relative">
      {/* Decorative gradient ring */}
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 via-primary/20 to-accent-foreground/20 opacity-60 blur-2xl" />

      {/* Rotating conic ring */}
      <div
        aria-hidden
        className="absolute -inset-2 -z-10 rounded-[2.2rem] opacity-50"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, var(--primary), transparent 60%)",
          animation: "conic-spin 8s linear infinite",
          maskImage: "radial-gradient(circle, transparent 60%, black 62%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 60%, black 62%)",
        }}
      />

      <motion.div
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.onLeave}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="tilt-3d spotlight-card relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/15 via-background to-accent-foreground/10 p-1 shadow-2xl shadow-primary/10"
        style={{ transform: "perspective(900px)" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary/10 via-background to-accent-foreground/5 dark:from-primary/10 dark:via-card dark:to-accent/10">
          {/* Stylised avatar — initials monogram with floating tech glyphs */}
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="noise absolute inset-0" />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(40px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="pulse-ring relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.65_0.18_290)] shadow-2xl shadow-primary/40 sm:h-48 sm:w-48"
            >
              <span className="font-display text-5xl font-bold text-white drop-shadow sm:text-6xl">
                {profile.avatarInitials}
              </span>
              <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
              {/* Rotating outer ring */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full border border-dashed border-white/20"
                style={{ animation: "conic-spin 12s linear infinite" }}
              />
            </motion.div>
          </div>

          {/* Floating tech chips */}
          <FloatingChip
            label="Laravel"
            className="left-4 top-6 sm:left-6 sm:top-10"
            delay={0.5}
          />
          <FloatingChip
            label="Node.js"
            className="right-3 top-1/3 sm:right-5"
            delay={0.7}
          />
          <FloatingChip
            label="Docker"
            className="bottom-16 left-3 sm:bottom-20 sm:left-5"
            delay={0.9}
          />
          <FloatingChip
            label="MySQL"
            className="bottom-6 right-4 sm:bottom-8 sm:right-6"
            delay={1.1}
          />

          {/* Bottom badge */}
          <div
            className="glass-strong absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl px-4 py-3 sm:inset-x-5 sm:bottom-5"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold text-foreground">
                {profile.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">{profile.role}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Open to work
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingChip({
  label,
  className,
  delay,
}: {
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`glass absolute inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-foreground/80 shadow-sm ${className}`}
      style={{ transform: "translateZ(50px)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </motion.span>
  );
}

type StatItem = (typeof stats)[number];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const { ref, display } = useCountUp(stat.value, 1.6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="spotlight-card lift-on-hover group relative overflow-hidden rounded-2xl border border-border/60 bg-background/50 p-4 backdrop-blur hover:border-primary/40 hover:shadow-depth"
    >
      <div ref={ref} className="relative z-10">
        <p className="number-ticker font-display text-2xl font-bold leading-none transition-transform group-hover:scale-105">
          {display}
        </p>
        <p className="mt-1.5 text-xs font-semibold text-foreground/80">
          {stat.label}
        </p>
        <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
          {stat.hint}
        </p>
      </div>
      <span
        className="absolute inset-x-0 bottom-0 h-px gradient-bar opacity-0 transition-opacity group-hover:opacity-100"
        style={{ animationDelay: `${index * -1}s` }}
      />
    </motion.div>
  );
}
