"use client";

import { useState } from "react";

import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
        "border-border/80 bg-background/60 dark:bg-card/40 relative mx-auto w-full max-w-xl rounded-3xl border p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-white/10",
        className,
      )}
    >
      <div className="mb-5 text-center sm:text-left">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <div className="bg-primary/20 text-primary-foreground dark:bg-primary/30 flex size-7 items-center justify-center rounded-lg">
            <Mail className="text-foreground size-4" />
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

      {/* Was AnimatePresence + motion: that pulled the whole motion
          library into the footer, i.e. every page, for a 0.25s fade.
          Same effect with the CSS animate-in utilities (tw-animate-css,
          already used by the nav/select components); keying on status
          retriggers the fade on swap. */}
      {status === "success" ? (
        <div
          key="success"
          className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 duration-300 sm:flex-row dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-300"
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
            className="cursor-pointer text-xs font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {t("newsletter.subscribe_another", "Subscribe another email")}
          </button>
        </div>
      ) : (
        <form
          key="form"
          onSubmit={handleSubmit}
          className="animate-in fade-in flex flex-col gap-3 duration-300"
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
                  "bg-background h-11 rounded-xl px-3.5 text-sm shadow-2xs transition-all",
                  status === "error" &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-11 shrink-0 cursor-pointer rounded-xl px-5 font-medium shadow-sm"
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

          <p className="text-muted-foreground text-center text-xs sm:text-left">
            {t("newsletter.privacy", "We respect your privacy. No spam ever.")}
          </p>
        </form>
      )}
    </div>
  );
}
