import { PrivacyContent } from "./privacy-content";

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn about Mainline's commitment to protecting your data, privacy practices, and compliance standards.",
  pathname: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
