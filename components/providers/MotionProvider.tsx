"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every Framer Motion animation respect the OS-level
// "reduce motion" accessibility setting, app-wide, from one place.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
