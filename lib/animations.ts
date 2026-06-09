import { Variants, Transition } from "framer-motion";

// Shared timing curves - subtle, natural easing
export const easing = {
  // For most UI transitions
  smooth: [0.25, 0.1, 0.25, 1],
  // For elements entering view
  enter: [0, 0, 0.2, 1],
  // For elements leaving
  exit: [0.4, 0, 1, 1],
} as const;

// Standard transition configs
export const transitions = {
  fast: {
    duration: 0.15,
    ease: easing.smooth,
  } as Transition,
  default: {
    duration: 0.3,
    ease: easing.smooth,
  } as Transition,
  slow: {
    duration: 0.5,
    ease: easing.smooth,
  } as Transition,
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } as Transition,
};

// Fade up animation for content entering view
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing.enter,
    },
  },
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Subtle scale on hover
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: transitions.fast,
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing.enter,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easing.exit,
    },
  },
};

// Link underline animation
export const linkUnderline = {
  initial: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: transitions.default,
  },
};
