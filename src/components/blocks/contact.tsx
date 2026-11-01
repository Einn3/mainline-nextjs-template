"use client";

import Link from "next/link";

import { Facebook, Linkedin, Twitter } from "lucide-react";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";
import { useLanguage } from "@/context/language-context";

export default function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      title: t("contact.office_title", "Corporate office"),
      content: (
        <p className="text-muted-foreground mt-3 whitespace-pre-line">
          {t("contact.office_address", "1 Carlsberg Close\n1260 Hillview, Australia")}
        </p>
      ),
    },
    {
      title: t("contact.email_title", "Email us"),
      content: (
        <div className="mt-3">
          <div>
            <p className="">{t("contact.careers", "Careers")}</p>
            <Link
              href="mailto:careers@example.com"
              className="text-muted-foreground hover:text-foreground"
            >
              careers@example.com
            </Link>
          </div>
          <div className="mt-1">
            <p className="">{t("contact.press", "Press")}</p>
            <Link
              href="mailto:press@example.com"
              className="text-muted-foreground hover:text-foreground"
            >
              press@example.com
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: t("contact.follow_us", "Follow us"),
      content: (
        <div className="mt-3 flex gap-6 lg:gap-10">
          <Link href="#" className="text-muted-foreground hover:text-foreground" aria-label="Facebook">
            <Facebook className="size-5" />
          </Link>
          <Link
            href="https://x.com/ausrobdev"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="size-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
            <Linkedin className="size-5" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {t("contact.title", "Contact us")}
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          {t(
            "contact.subtitle",
            "Hopefully this form gets through our spam filters.",
          )}
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">
            {t("contact.inquiries", "Inquiries")}
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
