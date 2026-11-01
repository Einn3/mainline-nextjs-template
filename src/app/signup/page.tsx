import { SignupContent } from "./signup-content";

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sign Up - Start Your Free Trial",
  description: "Create your free Mainline account in less than 2 minutes. No credit card required.",
  pathname: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return <SignupContent />;
}
