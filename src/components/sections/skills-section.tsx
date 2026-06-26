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
                <Card className="group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-colors hover:border-primary/40">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {group.category}
                      </h3>
                    </div>

                    <ul className="mt-5 space-y-4">
                      {group.skills.map((skill) => (
                        <li key={skill.name}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">
                              {skill.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          {skill.note && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                              {skill.note}
                            </p>
                          )}
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                duration: 0.9,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                            />
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

        {/* Tech tags strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur"
        >
          <span className="mr-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cũng quen thuộc:
          </span>
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
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
