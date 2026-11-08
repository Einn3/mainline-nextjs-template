import Image from "next/image";

import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { translate, type Locale } from "@/lib/translations";

// Server component: the hero is the LCP element, so it must not wait
// for hydration to render. It only renders translated text, links and
// the priority hero image — no state, no handlers. Locale comes from
// the app_language cookie (see page.tsx); the language switcher
// refreshes the route after changing it.
export const Hero = ({ locale }: { locale: Locale }) => {
  const t = (key: string, fallback?: string) => translate(locale, key, fallback);

  const features = [
    {
      title: t("hero.f1_title", "Tailored workflows"),
      description: t("hero.f1_desc", "Track progress across custom issue flows for your team."),
      icon: CircleDot,
    },
    {
      title: t("hero.f2_title", "Cross-team projects"),
      description: t("hero.f2_desc", "Collaborate across teams and departments."),
      icon: Blend,
    },
    {
      title: t("hero.f3_title", "Milestones"),
      description: t("hero.f3_desc", "Break projects down into concrete phases."),
      icon: Diamond,
    },
    {
      title: t("hero.f4_title", "Progress insights"),
      description: t("hero.f4_desc", "Track scope, velocity, and progress over time."),
      icon: ChartNoAxesColumn,
    },
  ];

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
            {t("hero.title", "Mainline Next.js template")}
          </h1>
          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            {t(
              "hero.description",
              "Mainline is an open-source website template built with shadcn/ui, Tailwind 4 & Next.js",
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <a href="https://github.com/shadcnblocks/mainline-nextjs-template">
                {t("hero.get_template", "Get template")}
              </a>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <a
                href="https://shadcnblocks.com"
                className="max-w-56 truncate text-start md:max-w-none"
              >
                {t("hero.built_by", "Built by shadcnblocks.com")}
                <ArrowRight className="stroke-3" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine orientation="vertical" className="absolute top-0 left-0 max-lg:hidden" />
          <DashedLine orientation="horizontal" className="absolute top-0 lg:hidden" />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">{feature.title}</h2>
                  <p className="text-muted-foreground max-w-76 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
        <div className="relative h-[793px] w-full">
          <Image
            src="/hero.webp"
            alt="Mainline project management dashboard preview"
            fill
            // `preload` is not a next/image prop: the old code produced a
            // plain preload link with no fetchpriority and no srcset, so
            // the LCP image was discovered late and at full 2360px width.
            // `priority` emits a proper high-priority preload with srcset.
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 1220px"
            className="rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
          />
        </div>
      </div>
    </section>
  );
};
