"use client";

import * as React from "react";
import { useInView } from "framer-motion";

/**
 * Count-up animation hook. Starts at 0 and animates to `end` when the
 * ref enters the viewport. Returns the current display value.
 *
 * `end` can be a number or a numeric string like "3.24" — the hook will
 * preserve the original number of decimals.
 */
export function useCountUp(end: number | string, duration = 1.4) {
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState("0");

  // Parse end into { value, decimals, prefix, suffix }
  const parsed = React.useMemo(() => {
    const str = String(end);
    const match = str.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { value: 0, decimals: 0, prefix: "", suffix: str };
    const [, prefix, numStr, suffix] = match;
    const value = parseFloat(numStr);
    const decimals = (numStr.split(".")[1] ?? "").length;
    return { value, decimals, prefix, suffix };
  }, [end]);

  React.useEffect(() => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(`${parsed.prefix}${parsed.value.toFixed(parsed.decimals)}${parsed.suffix}`);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // ease-out expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = parsed.value * eased;
      setDisplay(
        `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`,
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration]);

  return { ref, display };
}
