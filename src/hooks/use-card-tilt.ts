"use client";

import * as React from "react";

type TiltOptions = {
  max?: number; // max rotation in degrees
  scale?: number; // hover scale
  glare?: boolean; // enable glare overlay
};

/**
 * Premium card tilt hook — combines 3D rotation + cursor-tracked glow.
 * - Sets --rx, --ry (rotation), --mx, --my (0..100% glow position)
 * - Uses rAF for smooth 60fps updates
 * - Resets on leave with CSS transition for natural spring-back
 *
 * Apply to element with class `tilt-card glow-border glow-inner` and
 * a perspective wrapper (`perspective-mid`).
 */
export function useCardTilt<T extends HTMLElement>(
  options: TiltOptions = {},
) {
  const { max = 8, scale = 1.02 } = options;

  const onMove = React.useCallback(
    (e: React.PointerEvent<T>) => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches
      ) {
        return;
      }
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max * 2;
      const ry = (x - 0.5) * max * 2;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    },
    [max, scale],
  );

  const onLeave = React.useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, []);

  return { onMove, onLeave };
}
