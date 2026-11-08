"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { translate, type Locale } from "@/lib/translations";


export interface LanguageContextType {
  locale: Locale;
  isChanging: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, fallback?: string) => string;
}


const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // The server renders some sections with the locale from the
  // app_language cookie (see page.tsx). Keep the cookie in sync so a
  // refresh re-renders those sections in the chosen language, and
  // call router.refresh() after a change so they update without a
  // full page reload. Client components update instantly via context.
  const persistLocale = useCallback(
    (next: Locale) => {
      try {
        localStorage.setItem("app_language", next);
        document.cookie = `app_language=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {
        // Ignore storage errors
      }
      router.refresh();
    },
    [router],
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_language") as Locale | null;
      if (saved === "en" || saved === "es") {
        queueMicrotask(() => setLocaleState(saved));
        // First visit after a saved choice: the server rendered the
        // default, so sync the cookie and re-render server sections.
        const cookieLocale = document.cookie.match(
          /(?:^|; )app_language=(en|es)/,
        )?.[1];
        if (cookieLocale !== saved) {
          persistLocale(saved);
        }
      }
    } catch {
      // Ignore storage errors in SSR or restricted privacy settings
    }
  }, [persistLocale]);

  const triggerChangeEffect = useCallback(() => {
    setIsChanging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsChanging(false);
    }, 700);
  }, []);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      triggerChangeEffect();
      setLocaleState(newLocale);
      persistLocale(newLocale);
    },
    [locale, triggerChangeEffect, persistLocale],
  );

  const toggleLocale = useCallback(() => {
    triggerChangeEffect();
    const next = locale === "en" ? "es" : "en";
    setLocaleState(next);
    persistLocale(next);
  }, [locale, triggerChangeEffect, persistLocale]);

  const t = useCallback(
    (key: string, fallback?: string): string => translate(locale, key, fallback),
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, isChanging, setLocale, toggleLocale, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
