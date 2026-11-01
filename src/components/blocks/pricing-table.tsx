"use client";

import { useState } from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLanguage } from "@/context/language-context";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    free: true | false | null | string;
    startup: true | false | null | string;
    enterprise: true | false | null | string;
  }[];
}

export const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Startup plan
  const { t } = useLanguage();

  const pricingPlans = [
    {
      name: t("pricing.free_name", "Free"),
      button: {
        text: t("pricing.get_started", "Get started"),
        variant: "outline" as const,
      },
    },
    {
      name: t("pricing.startup_name", "Startup"),
      button: {
        text: t("pricing.get_started", "Get started"),
        variant: "outline" as const,
      },
    },
    {
      name: t("pricing.enterprise_name", "Enterprise"),
      button: {
        text: t("pricing.get_demo", "Get a demo"),
        variant: "outline" as const,
      },
    },
  ];

  const comparisonFeatures: FeatureSection[] = [
    {
      category: t("pricing_table.cat_usage", "Usage"),
      features: [
        {
          name: t("pricing_table.members", "Members"),
          free: t("pricing.unlimited", "Unlimited"),
          startup: t("pricing.unlimited", "Unlimited"),
          enterprise: t("pricing.unlimited", "Unlimited"),
        },
        {
          name: t("pricing_table.transactions", "Transactions"),
          free: "250",
          startup: t("pricing.unlimited", "Unlimited"),
          enterprise: t("pricing.unlimited", "Unlimited"),
        },
        {
          name: t("pricing_table.teams", "Teams"),
          free: "2",
          startup: t("pricing.unlimited", "Unlimited"),
          enterprise: t("pricing.unlimited", "Unlimited"),
        },
      ],
    },
    {
      category: t("pricing_table.cat_features", "Features"),
      features: [
        {
          name: t("pricing_table.reporting", "Reporting"),
          free: true,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.analytics", "Analytics"),
          free: true,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.import_export", "Import and export"),
          free: true,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.integrations", "Integrations"),
          free: true,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.ai", "Mainline AI"),
          free: null,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.admin_roles", "Admin roles"),
          free: null,
          startup: null,
          enterprise: true,
        },
        {
          name: t("pricing_table.audit_log", "Audit log"),
          free: null,
          startup: null,
          enterprise: true,
        },
      ],
    },
    {
      category: t("pricing_table.cat_support", "Support"),
      features: [
        {
          name: t("pricing_table.priority_support", "Priority Support"),
          free: true,
          startup: true,
          enterprise: true,
        },
        {
          name: t("pricing_table.account_manager", "Account Manager"),
          free: null,
          startup: null,
          enterprise: true,
        },
        {
          name: t("pricing_table.uptime_sla", "Uptime SLA"),
          free: null,
          startup: null,
          enterprise: true,
        },
      ],
    },
  ];

  return (
    <section className="pb-28 lg:py-32">
      <div className="container">
        <PlanHeaders
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
          pricingPlans={pricingPlans}
        />
        <FeatureSections
          selectedPlan={selectedPlan}
          comparisonFeatures={comparisonFeatures}
        />
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
  pricingPlans,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
  pricingPlans: {
    name: string;
    button: { text: string; variant: "outline" | "default" };
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile View */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <div className="flex items-center justify-between border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <Button
              variant={pricingPlans[selectedPlan].button.variant}
              className="w-fit"
            >
              {pricingPlans[selectedPlan].button.text}
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-4 gap-4 max-md:hidden">
        <div className="col-span-1 max-md:hidden"></div>

        {pricingPlans.map((plan, index) => (
          <div key={index} className="">
            <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
            <Button variant={plan.button.variant} className="">
              {plan.button.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderFeatureValue = (value: true | false | null | string) => {
  if (value === true) {
    return <Check className="size-5" />;
  }
  if (value === false) {
    return <X className="size-5" />;
  }
  if (value === null) {
    return null;
  }
  // String value
  return (
    <div className="flex items-center gap-2">
      <Check className="size-4" />
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};

const FeatureSections = ({
  selectedPlan,
  comparisonFeatures,
}: {
  selectedPlan: number;
  comparisonFeatures: FeatureSection[];
}) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="">
        <div className="border-primary/40 border-b py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-foreground grid grid-cols-2 font-medium max-md:border-b md:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {renderFeatureValue(
                  [feature.free, feature.startup, feature.enterprise][
                    selectedPlan
                  ],
                )}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
              {[feature.free, feature.startup, feature.enterprise].map(
                (value, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 border-b py-4"
                  >
                    {renderFeatureValue(value)}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);
