"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/blocks/newsletter-form";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();

  const navigation = [
    { name: t("footer.product", "Product"), href: "/#feature-modern-teams" },
    { name: t("nav.about", "About Us"), href: "/about" },
    { name: t("nav.pricing", "Pricing"), href: "/pricing" },
    { name: t("nav.faq", "FAQ"), href: "/faq" },
    { name: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const social = [
    { name: "X", href: "https://x.com/ausrobdev" },
    { name: "LinkedIn", href: "#" },
  ];

  const legal = [
    { name: t("footer.privacy", "Privacy Policy"), href: "/privacy" },
  ];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 pb-14 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          {t("footer.title", "Start your free trial today")}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          {t(
            "footer.desc",
            "Mainline is the fit-for-purpose tool for planning and building modern software products.",
          )}
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="https://github.com/shadcnblocks/mainline-nextjs-template">
              {t("footer.cta", "Get template")}
            </a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Newsletter Subscription Form */}
      <div className="container w-full max-w-4xl px-4">
        <NewsletterForm />
      </div>
    </footer>
  );
}
