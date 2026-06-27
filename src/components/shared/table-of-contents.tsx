"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Right-side fixed Table of Contents with scroll-spy.
 * - Desktop (lg+): vertical list, active item highlighted with glow + indicator bar
 * - Mobile: floating button bottom-left that opens a sheet
 */
export function TableOfContents() {
  const [active, setActive] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(`#${visible.target.id}`);
          // Update URL hash without scroll
          if (history.replaceState) {
            history.replaceState(null, "", `#${visible.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(href);
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop — right-side fixed vertical TOC */}
      <nav
        aria-label="Mục lục"
        className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="pointer-events-auto flex flex-col gap-1.5 border-l border-border/60 pl-4">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    "group relative flex items-center gap-2 py-1.5 text-xs font-medium transition-all duration-300",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      layoutId="toc-active"
                      className="absolute -left-[17px] top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary-glow)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      "font-medium transition-all",
                      isActive && "font-semibold",
                    )}
                  >
                    {link.label}
                  </span>
                  {/* Hover dot indicator */}
                  <span
                    className={cn(
                      "h-1 w-1 rounded-full transition-all",
                      isActive
                        ? "bg-primary opacity-100"
                        : "bg-muted-foreground opacity-0 group-hover:opacity-60",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile — floating button bottom-left */}
      <div className="fixed bottom-6 left-6 z-40 lg:hidden">
        <button
          type="button"
          aria-label="Mở mục lục"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground shadow-lg backdrop-blur-xl transition-all hover:border-primary/40 hover:text-primary"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-14 left-0 w-56 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
            >
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition-all",
                            isActive ? "bg-primary" : "bg-muted-foreground/40",
                          )}
                        />
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
