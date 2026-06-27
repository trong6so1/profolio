"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number; // % position
  y: number; // % position
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

/**
 * Floating particle field — subtle dots that drift upward.
 * Used as Hero background depth layer.
 * Disabled on reduced motion (renders nothing).
 */
export function Particles({ count = 18 }: { count?: number }) {
  const [particles, setParticles] = React.useState<Particle[]>([]);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const next: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 40,
    }));
    setParticles(next);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
