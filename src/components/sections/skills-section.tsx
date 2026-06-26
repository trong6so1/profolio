"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Database,
  Container,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Server,
  Database,
  Container,
  Boxes,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-pad border-y border-border/40 bg-secondary/30"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tech stack mình sử dụng
              <span className="text-gradient"> hằng ngày</span>
            </>
          }
          description="Bộ công cụ được tinh chỉnh qua các dự án thực tế — từ xây dựng API cho đến vận hành production."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => {
            const Icon = iconMap[group.icon] ?? Server;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: gi * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="spotlight-card border-conic lift-on-hover group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur hover:border-primary/40 hover:shadow-depth">
                  <CardContent className="relative z-10 p-5">
                    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                          {group.category}
                        </h3>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground/70">
                        {group.skills.length} skills
                      </span>
                    </div>

                    <ul className="mt-5 space-y-4">
                      {group.skills.map((skill, si) => (
                        <li key={skill.name}>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {skill.name}
                            </span>
                            <span className="font-mono text-xs font-medium text-primary">
                              {skill.level}%
                            </span>
                          </div>
                          {skill.note && (
                            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                              {skill.note}
                            </p>
                          )}
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/80">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + si * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="relative h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                            >
                              <span className="absolute inset-y-0 right-0 w-1.5 rounded-full bg-white/60 blur-[1px]" />
                            </motion.div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee tech tags strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-border/60 bg-background/60 py-5 backdrop-blur"
        >
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex items-center gap-3">
            <span className="z-20 ml-5 hidden shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:inline-block">
              Cũng quen thuộc:
            </span>
            <div className="marquee-track gap-2">
              {[
                "PHP",
                "JavaScript",
                "Vue.js",
                "jQuery",
                "Bash",
                "CentOS",
                "MariaDB",
                "REST API",
                "JSON",
                "TSV",
                "Git",
                "Google API",
                "MoMo API",
              ]
                .concat([
                  "PHP",
                  "JavaScript",
                  "Vue.js",
                  "jQuery",
                  "Bash",
                  "CentOS",
                  "MariaDB",
                  "REST API",
                  "JSON",
                  "TSV",
                  "Git",
                  "Google API",
                  "MoMo API",
                ])
                .map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
