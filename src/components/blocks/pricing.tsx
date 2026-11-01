"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DigitCounter } from "@/components/ui/digit-counter";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export const Pricing = ({ className }: { className?: string }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricing.free_name", "Free"),
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: t("pricing.free_desc", "Free for everyone"),
      isFree: true,
      features: [
        "Unlimited members",
        "2 teams",
        "500 issues",
        "Slack and Github integrations",
      ],
    },
    {
      name: t("pricing.startup_name", "Startup"),
      monthlyPrice: 8,
      yearlyPrice: 6,
      isFree: false,
      features: [
        "All free plan features and...",
        "Mainline AI",
        "Unlimited teams",
        "Unlimited issues and file uploads",
        "Mainline Insights",
        "Admin roles",
      ],
    },
    {
      name: t("pricing.enterprise_name", "Enterprise"),
      monthlyPrice: 8,
      yearlyPrice: 6,
      isFree: false,
      features: [
        "All free plan features and...",
        "Mainline AI",
        "Supermainline AGI",
        "Free daily catered lunch",
        "random HIPPA audits",
      ],
    },
  ];

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("pricing.title", "Pricing")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            {t(
              "pricing.desc",
              "Use Mainline for free with your whole team. Upgrade to enable unlimited issues, enhanced security controls, and additional features.",
            )}
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                !plan.isFree && plan.name === t("pricing.startup_name", "Startup")
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-semibold">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-baseline gap-1 text-lg font-medium">
                      <DigitCounter
                        prefix="$"
                        value={isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                        className="text-foreground text-2xl font-bold"
                      />
                      {!plan.isFree && (
                        <span className="text-muted-foreground text-sm">
                          {isAnnual
                            ? t("pricing.per_user_year", "per user/year")
                            : t("pricing.per_user_month", "per user/month")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!plan.isFree ? (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAnnual}
                      onCheckedChange={() => setIsAnnual(!isAnnual)}
                      aria-label="Toggle annual billing"
                    />
                    <span className="text-sm font-medium">
                      {t("pricing.annual_toggle", "Billed annually")}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    {plan.description}
                  </span>
                )}

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={
                    plan.name === t("pricing.startup_name", "Startup")
                      ? "default"
                      : "outline"
                  }
                >
                  {t("pricing.get_started", "Get started")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
