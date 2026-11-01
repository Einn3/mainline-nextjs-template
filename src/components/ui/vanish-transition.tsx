"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { useLanguage } from "@/context/language-context";

export function VanishWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { locale } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={{ opacity: 0, filter: "blur(8px)", y: 4, scale: 0.99 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)", y: -4, scale: 0.99 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function VanishLanguageHUD() {
  const { locale, isChanging } = useLanguage();
  const [showHUD, setShowHUD] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isChanging) {
      setShowHUD(true);
      setPercent(0);

      // Fast digit counter from 0 to 100%
      const start = Date.now();
      const duration = 450;

      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const p = Math.min(Math.floor((elapsed / duration) * 100), 100);
        setPercent(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowHUD(false);
          }, 350);
        }
      }, 20);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isChanging, locale]);

  return (
    <AnimatePresence>
      {showHUD && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 0.85, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3.5 rounded-2xl border border-primary/30 bg-background/90 px-4 py-3 shadow-2xl backdrop-blur-xl dark:border-primary/40 dark:bg-neutral-900/90"
        >
          {/* Particle / pulse effect */}
          <div className="relative flex size-3 items-center justify-center">
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground font-mono text-[11px] font-medium tracking-wider uppercase">
              {locale === "es" ? "Cambiando idioma" : "Switching language"}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display text-foreground text-sm font-bold">
                {locale === "es" ? "Español activado" : "English activated"}
              </span>
              <span className="text-primary font-mono text-xs font-bold tabular-nums">
                {percent.toString().padStart(2, "0")}%
              </span>
            </div>
          </div>

          {/* Vanish scanning bar */}
          <div className="bg-muted relative h-1.5 w-16 overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              style={{ width: `${percent}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
