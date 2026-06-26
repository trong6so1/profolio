"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: "from-emerald-500/15 to-emerald-500/0 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    accent: "from-amber-500/15 to-amber-500/0 text-amber-600 dark:text-amber-400",
  },
  {
    icon: MapPin,
    label: "Địa điểm",
    value: profile.location,
    href: "https://maps.google.com/?q=Bien+Hoa+Dong+Nai",
    accent: "from-sky-500/15 to-sky-500/0 text-sky-600 dark:text-sky-400",
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Mail, label: "Email", href: `mailto:${profile.email}` },
];

export function ContactSection() {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setStatus({ kind: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        setStatus({
          kind: "error",
          message: json.error ?? "Gửi tin nhắn thất bại. Vui lòng thử lại.",
        });
        return;
      }

      setStatus({
        kind: "success",
        message:
          json.message ??
          "Cảm ơn bạn! Tin nhắn đã được gửi. Mình sẽ phản hồi sớm.",
      });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.",
      });
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Cùng nhau <span className="text-gradient">xây dựng</span>{" "}điều gì đó
            </>
          }
          description="Đang tìm một Backend Engineer cho đội của bạn? Hay chỉ muốn trao đổi về kiến trúc, Laravel, hoặc một dự án thú vị? Mình luôn sẵn sàng lắng nghe."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <Card className="spotlight-card relative overflow-hidden border-border/60 bg-card/60 backdrop-blur">
              <span className="absolute inset-x-0 top-0 h-px gradient-bar opacity-60" />
              <CardContent className="relative z-10 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Thông tin liên hệ
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Trực tuyến thường xuyên — phản hồi trong vòng 24 giờ.
                </p>

                <ul className="mt-6 space-y-3">
                  {contactChannels.map((c) => {
                    const Icon = c.icon;
                    return (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer noopener"
                          className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
                        >
                          <span
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${c.accent} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              {c.label}
                            </p>
                            <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                              {c.value}
                            </p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {/* Socials */}
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Mạng xã hội
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {socials.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={s.label}
                          className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                        >
                          <Icon className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability badge */}
            <div className="spotlight-card relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 transition-colors hover:border-emerald-500/50">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl"
              />
              <div className="relative z-10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-medium text-foreground">
                  Sẵn sàng cho cơ hội mới
                </p>
                <Sparkles className="ml-auto h-4 w-4 text-emerald-500" />
              </div>
              <p className="relative z-10 mt-2 text-sm text-muted-foreground">
                Mình đang mở cho các vị trí Backend Developer (Laravel / Node.js) —
                onsite tại Đồng Nai / TP.HCM hoặc remote toàn quốc.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="spotlight-card border-conic relative overflow-hidden border-border/60 bg-card/60 backdrop-blur">
              <span className="absolute inset-x-0 top-0 h-px gradient-bar opacity-60" />
              <CardContent className="relative z-10 p-6 sm:p-8">
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Họ và tên" htmlFor="name">
                      <GlowInput
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Nguyễn Văn A"
                        required
                        maxLength={80}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <GlowInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="ban@example.com"
                        required
                        maxLength={120}
                      />
                    </Field>
                  </div>

                  <Field label="Chủ đề" htmlFor="subject">
                    <GlowInput
                      id="subject"
                      name="subject"
                      placeholder="Cơ hội hợp tác / Tuyển dụng / Trao đổi kỹ thuật"
                      required
                      maxLength={120}
                    />
                  </Field>

                  <Field label="Nội dung" htmlFor="message">
                    <GlowTextarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Mô tả ngắn gọn về dự án, vai trò hoặc câu hỏi của bạn..."
                      required
                      maxLength={2000}
                      className="resize-none"
                    />
                  </Field>

                  {/* Status messages */}
                  <AnimatePresence mode="wait">
                    {status.kind === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        role="status"
                        className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-700 dark:text-emerald-300"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        </motion.span>
                        <span>{status.message}</span>
                      </motion.div>
                    )}
                    {status.kind === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{status.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-muted-foreground">
                      Bằng việc gửi form, bạn đồng ý mình liên hệ lại qua email.
                    </p>
                    <Button
                      type="submit"
                      disabled={status.kind === "loading"}
                      className="shine-sweep group h-11 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:brightness-105 disabled:opacity-60"
                    >
                      {status.kind === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          Gửi tin nhắn
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

/**
 * Input wrapper with a glowing focus ring (gradient border) that animates
 * in/out on focus.
 */
function GlowInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="group/input relative">
      <Input
        {...props}
        className={cn(
          "relative z-10 transition-all duration-200",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-0 ring-2 ring-primary/50 ring-offset-0 transition-opacity duration-200 group-focus-within/input:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-primary/30 via-emerald-400/30 to-amber-300/30 opacity-0 blur-md transition-opacity duration-300 group-focus-within/input:opacity-100"
      />
    </div>
  );
}

function GlowTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <div className="group/input relative">
      <Textarea
        {...props}
        className={cn(
          "relative z-10 transition-all duration-200",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-0 ring-2 ring-primary/50 transition-opacity duration-200 group-focus-within/input:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-primary/30 via-emerald-400/30 to-amber-300/30 opacity-0 blur-md transition-opacity duration-300 group-focus-within/input:opacity-100"
      />
    </div>
  );
}
