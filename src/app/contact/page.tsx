import React from "react";

import { Background } from "@/components/background";
import Contact from "@/components/blocks/contact";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us - Inquiries & Support",
  description:
    "Get in touch with the Mainline team for general inquiries, partnership opportunities, press, or enterprise sales.",
  pathname: "/contact",
});

const Page = () => {
  return (
    <Background>
      <Contact />
    </Background>
  );
};

export default Page;
