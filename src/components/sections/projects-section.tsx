"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, CheckCircle2, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Dự án<span className="text-gradient"> nổi bật</span>
            </>
          }
          description="Những sản phẩm mình đã xây dựng end-to-end — từ thiết kế database, viết API, batch job đến triển khai production."
        />

        {/* Featured projects */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <h3 className="mt-16 font-display text-lg font-semibold text-foreground">
              Dự án khác
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.map((project, i) => (
                <CompactProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Card className="h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              project.gradient,
            )}
          />
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute inset-0 bg-grid opacity-30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              className="text-6xl drop-shadow-lg"
            >
              {project.emoji}
            </motion.span>
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2">
            {project.featured && (
              <Badge className="bg-background/80 text-foreground backdrop-blur hover:bg-background/80">
                ★ Featured
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground backdrop-blur"
            >
              {project.year}
            </Badge>
          </div>

          {/* Hover overlay links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Xem trên GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground shadow-lg transition-transform hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Xem demo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground shadow-lg transition-transform hover:scale-110"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 4).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-secondary/80 text-xs font-medium text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="mt-2 flex items-center gap-3 border-t border-border/60 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
}

function CompactProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group h-full border-border/60 bg-card/60 backdrop-blur transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="flex h-full flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-xl",
                  project.gradient,
                )}
              >
                {project.emoji}
              </span>
              <div>
                <h4 className="font-display text-sm font-semibold text-foreground">
                  {project.title}
                </h4>
                <p className="text-xs text-muted-foreground">{project.year}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-secondary/70 text-[10px] font-medium text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
