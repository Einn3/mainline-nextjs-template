"use client";

import { useState } from "react";

import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage(
        t("newsletter.invalid_email", "Please enter a valid email address."),
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate subscription network request
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("success");
    setEmail("");
  };

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-xl rounded-3xl border border-border/80 bg-background/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-card/40 sm:p-8",
        className,
      )}
    >
      <div className="mb-5 text-center sm:text-left">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground dark:bg-primary/30">
            <Mail className="size-4 text-foreground" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
            {t("newsletter.title", "Subscribe to our newsletter")}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t(
            "newsletter.subtitle",
            "Get the latest product updates, design articles, and engineering insights directly to your inbox.",
          )}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-300 sm:flex-row"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium">
                {t(
                  "newsletter.success",
                  "Thanks for subscribing! Check your inbox for confirmation.",
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 cursor-pointer"
            >
              {t("newsletter.subscribe_another", "Subscribe another email")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={t(
                    "newsletter.placeholder",
                    "Enter your email address",
                  )}
                  disabled={status === "loading"}
                  required
                  className={cn(
                    "h-11 rounded-xl bg-background px-3.5 text-sm transition-all shadow-2xs",
                    status === "error" && "border-destructive focus-visible:ring-destructive",
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="h-11 rounded-xl px-5 font-medium cursor-pointer shadow-sm shrink-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>{t("newsletter.submitting", "Submitting...")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("newsletter.button", "Subscribe")}</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>

            {status === "error" && errorMessage && (
              <p className="text-destructive text-xs font-medium">
                {errorMessage}
              </p>
            )}

            <p className="text-muted-foreground text-xs text-center sm:text-left">
              {t(
                "newsletter.privacy",
                "We respect your privacy. No spam ever.",
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
