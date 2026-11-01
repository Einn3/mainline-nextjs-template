"use client";

import { useEffect, useState } from "react";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position on mount
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/85 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-white/15 dark:bg-neutral-900/85 sm:bottom-8 sm:right-8 group cursor-pointer"
        >
          <ArrowUp className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
