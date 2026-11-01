"use client";

import {
  TESTIMONIAL_SLIDE_CLASS,
  TestimonialCard,
  type TestimonialItem,
} from "./testimonial-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TestimonialsCarousel({
  items,
}: {
  items: TestimonialItem[];
}) {
  return (
    <Carousel
      data-testid="testimonials-embla-carousel"
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.author} className={TESTIMONIAL_SLIDE_CLASS}>
            <TestimonialCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex gap-3">
        <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
        <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
      </div>
    </Carousel>
  );
}
