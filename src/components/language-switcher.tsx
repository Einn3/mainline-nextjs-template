"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(
        "h-9 gap-1.5 px-2.5 font-medium cursor-pointer transition-all hover:bg-accent select-none",
        className,
      )}
      onClick={toggleLocale}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
      aria-label={t("lang.language", "Toggle language")}
    >
      <Globe className="size-3.5 text-muted-foreground" />
      <span className="flex items-center gap-1 text-xs font-semibold">
        <span
          className={cn(
            "transition-colors",
            locale === "en"
              ? "text-foreground font-bold underline underline-offset-2 decoration-primary decoration-2"
              : "text-muted-foreground font-normal",
          )}
        >
          EN
        </span>
        <span className="text-muted-foreground/40">/</span>
        <span
          className={cn(
            "transition-colors",
            locale === "es"
              ? "text-foreground font-bold underline underline-offset-2 decoration-primary decoration-2"
              : "text-muted-foreground font-normal",
          )}
        >
          ES
        </span>
      </span>
    </Button>
  );
}
