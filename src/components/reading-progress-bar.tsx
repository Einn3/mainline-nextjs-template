"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="pointer-events-none fixed top-0 inset-x-0 z-[60] h-[3px] w-full overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-linear-to-r from-primary/70 via-primary to-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
      />
    </div>
  );
}
