"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyHydrateProps = {
  children: ReactNode;
  /** Height of the placeholder while the section is not yet mounted,
      so the page layout doesn't jump when it mounts. */
  placeholderMinHeight?: number;
};

/**
 * Deferred hydration for below-fold sections.
 *
 * The section still renders on the server (SSR HTML + SEO intact),
 * but on the client the wrapper initially renders only a placeholder
 * instead of hydrating it, and mounts the real component when it
 * comes within 1000px of the viewport — or 8s after load, whichever
 * comes first, so crawlers, keyboard users and no-scroll sessions
 * still get the content.
 *
 * Trade-off: the server-rendered HTML of the section is discarded on
 * hydration (React client-renders the placeholder instead) and is
 * re-created when the section mounts. That is the whole point — the
 * section's JS and hydration work no longer compete with the hero's
 * LCP — but it means a JS crawler that never scrolls and leaves
 * before the 8s fallback sees the placeholder in the rendered DOM
 * (the real content is still in the raw HTML).
 */
export function LazyHydrate({
  children,
  placeholderMinHeight = 600,
}: LazyHydrateProps) {
  // No IntersectionObserver (very old browser): mount immediately.
  // Initialized lazily so the first client render already agrees
  // with it instead of flipping state inside an effect.
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || ready) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "1000px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setReady(true), 8000);
    return () => clearTimeout(timer);
  }, [ready]);

  if (!ready) {
    return (
      <div
        ref={ref}
        style={{ minHeight: placeholderMinHeight }}
        aria-hidden="true"
      />
    );
  }

  return <div ref={ref}>{children}</div>;
}
