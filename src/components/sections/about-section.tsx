"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Compass,
  GraduationCap,
  Heart,
  Lightbulb,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { profile, education, stats } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const strengths = [
  {
    icon: Code2,
    title: "Backend-first mindset",
    description:
      "Tiếp cận vấn đề từ dữ liệu và luồng nghiệp vụ trước, sau mới tới UI. Thiết kế schema, API contract và batch job luôn được lên kế hoạch trước khi viết code.",
  },
  {
    icon: Zap,
    title: "Tự động hoá & vận hành",
    description:
      "Đã đưa tính năng lên production bằng Docker, viết batch command chạy hằng ngày và thiết lập MySQL Replication Master-Slave cho hệ thống thực tế.",
  },
  {
    icon: Users,
    title: "Làm việc nhóm đa văn hoá",
    description:
      "Đã làm việc trực tiếp với team Nhật Bản tại Rivercrane — giao tiếp rõ ràng, viết tài liệu và review code chéo với quốc tế.",
  },
  {
    icon: Lightbulb,
    title: "Học nhanh & thích nghi",
    description:
      "Đổi công nghệ liên tục: PHP/Laravel, Vue.js, Bash, Docker, Google API. Đọc tài liệu nhanh và đưa vào sản phẩm trong thời gian ngắn.",
  },
];

const directions = [
  {
    icon: Target,
    title: "Mục tiêu ngắn hạn",
    description:
      "Trau dồi thêm Node.js / NestJS và các pattern kiến trúc (CQRS, DDD) để mở rộng khả năng thiết kế hệ thống ở quy mô lớn hơn.",
  },
  {
    icon: Compass,
    title: "Định hướng dài hạn",
    description:
      "Trở thành Senior Backend Engineer / Tech Lead, xây dựng hệ thống distributed ổn định và dẫn dắt đội ngũ kỹ thuật.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Backend Engineer với tư duy
              <span className="text-gradient"> sản phẩm</span>
            </>
          }
          description="Mình xây dựng hệ thống backend ổn định, dễ mở rộng — tập trung vào kiến trúc sạch, vận hành tự động và giao tiếp rõ ràng."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* Left: bio + education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Mình là <strong className="text-foreground">{profile.name}</strong>, một{" "}
                <strong className="text-foreground">Software Engineer</strong> tập trung vào
                phát triển backend. Hơn một năm qua mình đã làm việc tại{" "}
                <strong className="text-foreground">Rivercrane (ADC Office)</strong> — xây
                dựng các công cụ quản trị nội bộ cho nền tảng Webike, phục vụ thị trường Nhật
                Bản và nhiều quốc gia khác.
              </p>
              <p>
                Công việc hằng ngày của mình bao gồm thiết kế cơ sở dữ liệu, viết API với
                Laravel, xây dựng batch command tự động, triển khai Docker và duy trì hệ thống
                MySQL Replication. Mình tin rằng backend tốt không chỉ là code chạy được — mà
                là code rõ ràng, có thể bảo trì, có thể mở rộng và có tài liệu đi kèm.
              </p>
              <p>
                Ngoài công việc, mình tích cực học thêm Node.js / NestJS và các pattern kiến
                trúc hiện đại (CQRS, DDD) để sẵn sàng cho những hệ thống phức tạp hơn trong
                tương lai. Mình cũng quan tâm tới DevOps, CI/CD và tự động hoá quy trình vận
                hành.
              </p>
            </div>

            {/* Education card */}
            <Card className="spotlight-card border-conic group border-border/60 bg-card/60 backdrop-blur transition-colors hover:border-primary/40">
              <CardContent className="relative z-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm shadow-primary/20 transition-transform group-hover:scale-110">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {education.school}
                    </h3>
                    <p className="text-sm text-muted-foreground">{education.degree}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                      {education.period}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/60 px-4 py-3 sm:flex-col sm:items-end sm:gap-0.5">
                  <span className="font-display text-2xl font-semibold text-gradient">
                    {education.gpa}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    GPA
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="spotlight-card group relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-primary/30"
                >
                  <div className="relative z-10">
                    <p className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                  <span
                    className="absolute inset-x-0 bottom-0 h-px gradient-bar opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ animationDelay: `${i * -1}s` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: strengths */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" />
              Điểm mạnh
            </h3>
            <div className="grid gap-3">
              {strengths.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="spotlight-card border-conic group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:border-primary/40"
                  >
                    <div className="relative z-10 flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                          {s.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direction */}
            <div className="grid gap-3 pt-2">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Target className="h-4 w-4 text-primary" />
                Định hướng nghề nghiệp
              </h3>
              {directions.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.title}
                    className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground">
                          {d.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {d.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
