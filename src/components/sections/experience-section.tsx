"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  "Full-time": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
  Intern: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20",
  Freelance: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/20",
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-pad border-y border-border/40 bg-secondary/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Hành trình<span className="text-gradient"> nghề nghiệp</span>
            </>
          }
          description="Mỗi vai trò là một bước đệm — từ thực tập xây dựng sàn TMĐT đến phát triển công cụ quản trị cho nền tảng quốc tế."
        />

        <div className="mt-14 grid gap-0 lg:grid-cols-[1fr]">
          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:-translate-x-1/2"
            />

            <div className="space-y-10 md:space-y-16">
              {experiences.map((exp, i) => (
                <TimelineItem key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Exp = (typeof experiences)[number];

function TimelineItem({ exp, index }: { exp: Exp; index: number }) {
  const isLeft = index % 2 === 0;
  const Icon = Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-12",
        // On md+, alternate side
        isLeft ? "md:[&>*:first-child]:order-2" : "",
      )}
    >
      {/* Node dot (mobile: left column) */}
      <div className="relative flex justify-start md:absolute md:left-1/2 md:top-1 md:-translate-x-1/2 md:justify-center">
        <div className="absolute left-4 top-1.5 md:left-1/2 md:-translate-x-1/2">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />
          </span>
        </div>
        {/* Spacer to keep grid alignment on mobile */}
        <div className="hidden md:block" />
      </div>

      {/* Content card — placed in second column on mobile, alternating on desktop */}
      <div
        className={cn(
          "col-start-2 md:col-start-auto",
          isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12",
        )}
      >
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
          {/* Header */}
          <div
            className={cn(
              "flex flex-wrap items-start gap-2",
              isLeft && "md:justify-end",
            )}
          >
            <Badge
              variant="secondary"
              className={cn("text-xs font-medium", typeStyles[exp.type])}
            >
              {exp.type}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {exp.period}
              <span className="text-muted-foreground/60">· {exp.periodLabel}</span>
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
            {exp.role}
          </h3>
          <div
            className={cn(
              "mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground",
              isLeft && "md:justify-end",
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {exp.company}
            </span>
          </div>

          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-muted-foreground",
              isLeft && "md:text-right",
            )}
          >
            {exp.summary}
          </p>

          {/* Achievements */}
          <ul
            className={cn(
              "mt-4 space-y-1.5",
              isLeft && "md:flex md:flex-col md:items-end",
            )}
          >
            {exp.achievements.map((a) => (
              <li
                key={a}
                className={cn(
                  "flex items-start gap-2 text-sm text-muted-foreground",
                  isLeft && "md:flex-row-reverse md:text-right",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "mt-0.5 h-3.5 w-3.5 shrink-0 text-primary",
                    isLeft && "md:mt-0.5",
                  )}
                />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div
            className={cn(
              "mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-border/60",
              isLeft && "md:justify-end",
            )}
          >
            {exp.stack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Floating corner icon */}
          <span className="pointer-events-none absolute -right-2 -top-2 text-foreground/5 dark:text-foreground/10">
            <Icon className="h-16 w-16" />
          </span>
        </div>
      </div>

      {/* Empty placeholder for the opposite desktop column to keep alternating layout */}
      <div className="hidden md:block" />
    </motion.div>
  );
}

export function ExperienceHint() {
  return (
    <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      Mọi thông tin được trình bày theo thứ tự thời gian gần nhất trước.
    </div>
  );
}
