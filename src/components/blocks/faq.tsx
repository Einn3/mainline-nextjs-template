"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t("faq.cat_support", "Support"),
      questions: [
        {
          question: t(
            "faq.q1",
            "How do I update my account without breaking my laptop?",
          ),
          answer: t(
            "faq.a1",
            "Everything runs directly in your browser with secure cloud synchronization and automatic backups.",
          ),
        },
        {
          question: t(
            "faq.q2",
            "Is support free, or do I need to Google everything?",
          ),
          answer: t(
            "faq.a2",
            "Our dedicated support team is available 24/7 with an average response time of under 10 minutes.",
          ),
        },
        {
          question: t("faq.q3", "Are you going to be subsumed by AI?"),
          answer: t(
            "faq.a3",
            "Mainline is built with AI workflows from the ground up to empower people, not replace them.",
          ),
        },
      ],
    },
    {
      title: t("faq.cat_account", "Your account"),
      questions: [
        {
          question: t(
            "faq.q2",
            "Is support free, or do I need to Google everything?",
          ),
          answer: t(
            "faq.a2",
            "Our dedicated support team is available 24/7 with an average response time of under 10 minutes.",
          ),
        },
        {
          question: t("faq.q3", "Are you going to be subsumed by AI?"),
          answer: t(
            "faq.a3",
            "Mainline is built with AI workflows from the ground up to empower people, not replace them.",
          ),
        },
      ],
    },
    {
      title: t("faq.cat_other", "Other questions"),
      questions: [
        {
          question: t(
            "faq.q1",
            "How do I update my account without breaking my laptop?",
          ),
          answer: t(
            "faq.a1",
            "Everything runs directly in your browser with secure cloud synchronization and automatic backups.",
          ),
        },
        {
          question: t("faq.q3", "Are you going to be subsumed by AI?"),
          answer: t(
            "faq.a3",
            "Mainline is built with AI workflows from the ground up to empower people, not replace them.",
          ),
        },
      ],
    },
  ];

  const Header = headerTag;

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            <Header className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              {t("faq.title", "Got Questions?")}
            </Header>
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              {t(
                "faq.contact_prompt",
                "If you can't find what you're looking for, ",
              )}
              <Link href="/contact" className="underline underline-offset-4">
                {t("faq.contact_link", "get in touch")}
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
