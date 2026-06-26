"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Building2, CheckCircle2, Briefcase } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  "Full-time":
    "bg-primary/10 text-primary ring-1 ring-primary/20",
  Intern:
    "bg-warning/10 text-warning ring-1 ring-warning/20",
  Freelance:
    "bg-accent-foreground/15 text-accent-foreground ring-1 ring-accent-foreground/25",
};

export function ExperienceSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });
  // Timeline line draws as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="section-pad border-y border-border/40 bg-secondary/30"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Hành trình<span className="text-gradient"> nghề nghiệp</span>
            </>
          }
          description="Mỗi vai trò là một bước đệm — từ thực tập xây dựng sàn TMĐT đến phát triển công cụ quản trị cho nền tảng quốc tế."
        />

        <div ref={containerRef} className="relative mt-14">
          {/* Track background */}
          <div
            aria-hidden
            className="absolute left-5 top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated progress line (draws on scroll) */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-5 top-2 w-px bg-gradient-to-b from-primary via-primary to-[oklch(0.72_0.18_290)] md:left-1/2 md:-translate-x-1/2"
          >
            <span className="absolute -left-px top-0 h-2 w-[3px] rounded-full bg-primary shadow-[0_0_8px_var(--primary-glow)]" />
          </motion.div>

          <ol className="space-y-10 md:space-y-14">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

type Exp = (typeof experiences)[number];

function TimelineItem({ exp, index }: { exp: Exp; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0"
    >
      {/* Node dot — pops in when scrolled to */}
      <motion.span
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
        className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
          <span className="glow-dot relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-2 ring-background" />
        </span>
      </motion.span>

      {/* Card — full width on mobile, alternating side on md+ */}
      <div
        className={cn(
          "md:col-span-1",
          isLeft ? "md:col-start-1 md:pr-8" : "md:col-start-2 md:pl-8",
        )}
      >
        <article className="spotlight-card border-conic lift-on-hover group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur hover:border-primary/40 hover:shadow-depth sm:p-6">
          {/* Top accent gradient line */}
          <span className="absolute inset-x-0 top-0 h-px gradient-bar opacity-60 transition-opacity group-hover:opacity-100" />

          {/* Decorative corner icon */}
          <span className="pointer-events-none absolute -right-3 -top-3 text-foreground/[0.04] dark:text-foreground/[0.08]">
            <Briefcase className="h-20 w-20" />
          </span>

          <div className="relative z-10">
            {/* Header row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={cn("text-xs font-medium", typeStyles[exp.type])}
              >
                {exp.type}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {exp.period}
                <span className="text-muted-foreground/60">
                  · {exp.periodLabel}
                </span>
              </span>
            </div>

            {/* Role + company */}
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {exp.role}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span>{exp.company}</span>
            </div>

            {/* Summary */}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {exp.summary}
            </p>

            {/* Achievements */}
            <ul className="mt-4 space-y-1.5">
              {exp.achievements.map((a, ai) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + ai * 0.05, duration: 0.4 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{a}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
              {exp.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </motion.li>
  );
}
