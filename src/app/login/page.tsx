import { LoginContent } from "./login-content";

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Login",
  description: "Sign in to your Mainline account to manage projects, teams, and issues.",
  pathname: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <LoginContent />;
}
