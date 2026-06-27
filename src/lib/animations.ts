import type { Variants, Transition } from "framer-motion";

/**
 * Premium animation primitives — shared across sections.
 * All use cubic-bezier(0.22, 1, 0.36, 1) (easeOutQuint-ish) for soft,
 * high-end feel. Spring variants use gentle damping for natural motion.
 */

// Easing — cubic-bezier(0.22, 1, 0.36, 1) = "easeOutQuint"-ish
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
// Easing — cubic-bezier(0.16, 1, 0.3, 1) = "easeOutExpo"
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// Spring — soft, premium, no overshoot bounce
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.8,
};

// Spring — gentle overshoot for "alive" feel
export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 18,
  mass: 0.6,
};

// Container — stagger children for sequential reveal
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// Fade up — most common scroll reveal
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// Fade up — larger distance, for hero headlines
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

// Fade in (no movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

// Fade from left
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// Fade from right
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// Scale in (zoom from 0.92)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
};

// Blur in — for hero name / large headlines
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

// Slide up + slight scale (for cards)
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// Word-by-word reveal — pass as parent stagger, child uses this
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
};

// Default viewport config — trigger once, with margin
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;
export const VIEWPORT_SOFT = { once: true, margin: "-40px" } as const;
