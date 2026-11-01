"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { DashedLine } from "../dashed-line";

import { Button } from "@/components/ui/button";
import {
  TESTIMONIAL_SLIDE_CLASS,
  TestimonialCard,
  type TestimonialItem,
} from "@/components/blocks/testimonial-card";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const DeferredTestimonialsCarousel = lazy(() =>
  import("./testimonials-carousel").then((module) => ({
    default: module.TestimonialsCarousel,
  })),
);

function StaticTestimonialsCarousel({
  items,
}: {
  items: TestimonialItem[];
}) {
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      data-testid="testimonials-static-carousel"
      className="relative w-full"
    >
      <div className="overflow-hidden">
        <div className="flex -ml-4">
          {items.map((item) => (
            <div
              key={item.author}
              role="group"
              aria-roledescription="slide"
              className={cn(
                "min-w-0 shrink-0 grow-0 basis-full pl-4",
                TESTIMONIAL_SLIDE_CLASS,
              )}
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled
          aria-label="Previous slide"
          className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8"
        >
          <ChevronLeft className="size-6 lg:size-9" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled
          aria-label="Next slide"
          className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8"
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  );
}

export const Testimonials = ({
  className,
  dashedLineClassName,
  emblaActive = true,
}: {
  className?: string;
  dashedLineClassName?: string;
  emblaActive?: boolean;
}) => {
  const { t } = useLanguage();
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);

  const items: TestimonialItem[] = [
    {
      quote: t(
        "testimonials.q1",
        "We're misusing Mainline as a CRM and it still works!",
      ),
      author: "Amy Chase",
      role: "PM",
      company: "Mercury Finance",
      image: "/testimonials/amy-chase.webp",
    },
    {
      quote: t(
        "testimonials.q2",
        "I was able to replace 80% of my team with Mainline bots.",
      ),
      author: "Jonas Kotara",
      role: "Lead Engineer",
      company: "Mercury Finance",
      image: "/testimonials/jonas-kotara.webp",
    },
    {
      quote: t(
        "testimonials.q3",
        "Founder Mode is hard enough without having a really nice PM app.",
      ),
      author: "Kevin Yam",
      role: "Founder",
      company: "Mercury Finance",
      image: "/testimonials/kevin-yam.webp",
    },
    {
      quote: t(
        "testimonials.q4",
        "I can use the tool as a substitute from my PM.",
      ),
      author: "Kundo Marta",
      role: "Founder",
      company: "Mercury Finance",
      image: "/testimonials/kundo-marta.webp",
    },
  ];

  useEffect(() => {
    const target = carouselViewportRef.current;

    if (!emblaActive || !target) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadCarousel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCarousel(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1000px 0px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [emblaActive]);

  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              {t("testimonials.title", "Trusted by product builders")}
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              {t(
                "testimonials.desc",
                "Mainline is built on the habits that make the best product teams successful: staying focused, moving quickly, and always aiming for high-quality work.",
              )}
            </p>
            <Button variant="outline" className="shadow-md">
              {t("testimonials.cta", "Read our Customer Stories")}{" "}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div
            ref={carouselViewportRef}
            className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20"
          >
            {shouldLoadCarousel ? (
              <Suspense fallback={<StaticTestimonialsCarousel items={items} />}>
                <DeferredTestimonialsCarousel items={items} />
              </Suspense>
            ) : (
              <StaticTestimonialsCarousel items={items} />
            )}
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
