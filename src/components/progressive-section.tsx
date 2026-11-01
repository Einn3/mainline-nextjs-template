"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type SkeletonVariant = "logos" | "features" | "resources" | "testimonials" | "pricing" | "faq";

type ProgressiveSectionProps = {
  children: ReactNode;
  variant: SkeletonVariant;
};

const skeletonCounts: Record<SkeletonVariant, number> = {
  logos: 5,
  features: 3,
  resources: 5,
  testimonials: 3,
  pricing: 3,
  faq: 4,
};

const gridClasses: Record<SkeletonVariant, string> = {
  logos: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  features: "grid-cols-1 md:grid-cols-3",
  resources: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  testimonials: "grid-cols-1 md:grid-cols-3",
  pricing: "grid-cols-1 md:grid-cols-3",
  faq: "grid-cols-1 md:grid-cols-2",
};

function SectionSkeleton({ variant }: { variant: SkeletonVariant }) {
  return (
    <div className="container space-y-8 py-20" aria-hidden="true">
      <div className="mx-auto max-w-2xl space-y-3">
        <div className="skeleton-shimmer mx-auto h-8 w-2/3 rounded-md" />
        <div className="skeleton-shimmer mx-auto h-4 w-5/6 rounded-md" />
        <div className="skeleton-shimmer mx-auto h-4 w-1/2 rounded-md" />
      </div>
      <div className={`grid gap-5 ${gridClasses[variant]}`}>
        {Array.from({ length: skeletonCounts[variant] }, (_, index) => (
          <div
            key={index}
            className={
              variant === "logos"
                ? "flex min-h-20 items-center justify-center"
                : "space-y-4 rounded-2xl border border-border/60 bg-card/40 p-5"
            }
          >
            {variant === "logos" ? (
              <div className="skeleton-shimmer h-8 w-28 rounded-md" />
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="skeleton-shimmer size-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton-shimmer h-3 w-3/4 rounded" />
                    <div className="skeleton-shimmer h-3 w-1/2 rounded" />
                  </div>
                </div>
                {variant !== "faq" && (
                  <div className="skeleton-shimmer h-28 w-full rounded-xl" />
                )}
                <div className="space-y-2">
                  <div className="skeleton-shimmer h-3 w-full rounded" />
                  <div className="skeleton-shimmer h-3 w-5/6 rounded" />
                  <div className="skeleton-shimmer h-3 w-2/3 rounded" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressiveSection({ children, variant }: ProgressiveSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px", threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative" aria-busy={!isVisible}>
      <div
        className={`transition-opacity duration-500 motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
      {!isVisible && (
        <div className="pointer-events-none absolute inset-0">
          <SectionSkeleton variant={variant} />
        </div>
      )}
    </div>
  );
}
