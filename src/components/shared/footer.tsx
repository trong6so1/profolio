"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-background/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <Link href="#hero" className="flex items-center gap-2.5 text-foreground">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-display text-sm font-bold text-white">
                ĐT
              </span>
              <span className="font-display text-sm font-semibold">{profile.name}</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              {profile.role} — xây dựng sản phẩm backend ổn định, sạch và dễ mở rộng.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Liên hệ
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-foreground/60">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Mạng xã hội
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. Bản quyền thuộc về tôi.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Sẵn sàng cho cơ hội mới
          </p>
        </div>
      </div>
    </footer>
  );
}
