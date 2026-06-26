"use client";

import * as React from "react";

/**
 * Hook returning the current pointer position relative to an element.
 * Calls the handler with values in [0..1] for x and y, plus pixel coords.
 */
export function usePointerTracking<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);

  const onMove = React.useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget as T;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = rect.width > 0 ? px / rect.width : 0.5;
    const y = rect.height > 0 ? py / rect.height : 0.5;
    el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    el.style.setProperty("--rx", `${((y - 0.5) * -10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--px", `${px.toFixed(0)}px`);
    el.style.setProperty("--py", `${py.toFixed(0)}px`);
  }, []);

  const onLeave = React.useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget as T;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }, []);

  return { ref, onMove, onLeave };
}

/**
 * 3D tilt hook — apply to a wrapper that has `tilt-3d` class.
 * Uses `e.currentTarget` instead of a ref so the lint rule about
 * accessing refs during render doesn't fire on the callback props.
 */
export function useTilt<T extends HTMLElement>(max = 10) {
  const onMove = React.useCallback(
    (e: React.PointerEvent<T>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max * 2;
      const ry = (x - 0.5) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    },
    [max],
  );

  const onLeave = React.useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  }, []);

  return { onMove, onLeave };
}
