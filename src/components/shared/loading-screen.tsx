"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium loading screen — brief branded intro that fades out smoothly.
 * Shows a gradient logo mark + progress bar, then reveals the page.
 * Respects reduced motion (instant hide).
 */
export function LoadingScreen() {
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setProgress(100);
      setDone(true);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.18_290)] shadow-2xl shadow-primary/40">
              <span className="font-display text-2xl font-bold text-primary-foreground">
                ĐT
              </span>
              <span
                aria-hidden
                className="shine-sweep absolute inset-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="font-display text-sm font-medium text-foreground">
              Đinh Hiếu Trọng
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Software Engineer
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-[oklch(0.65_0.18_290)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground/60"
          >
            {progress.toString().padStart(3, "0")}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
