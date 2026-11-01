"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProgressiveImage } from "@/components/progressive-image";

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
};

export const TESTIMONIAL_SLIDE_CLASS =
  "xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]";

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <Card className="bg-muted h-full overflow-hidden border-none">
      <CardContent className="flex h-full flex-col p-0">
        <div className="relative h-[288px] lg:h-[328px]">
          <ProgressiveImage
            src={item.image}
            alt={item.author}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-10 p-6">
          <blockquote className="font-display text-lg leading-none! font-medium md:text-xl lg:text-2xl">
            {item.quote}
          </blockquote>
          <div className="space-y-0.5">
            <div className="text-primary font-semibold">
              {item.author}, {item.role}
            </div>
            <div className="text-muted-foreground text-sm">{item.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
