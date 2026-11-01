import React from "react";

import { Background } from "@/components/background";
import { Pricing } from "@/components/blocks/pricing";
import { PricingTable } from "@/components/blocks/pricing-table";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing - Transparent Plans for Teams of Any Size",
  description:
    "Explore transparent pricing plans for Mainline. Start for free with your whole team or unlock unlimited projects with Startup and Enterprise.",
  pathname: "/pricing",
});

const Page = () => {
  return (
    <Background>
      <Pricing className="py-28 text-center lg:pt-44 lg:pb-32" />
      <PricingTable />
    </Background>
  );
};

export default Page;
