import type { Metadata } from "next";

export const siteConfig = {
  name: "Mainline",
  title: "Mainline - Modern Next.js Template & Product Management Platform",
  description:
    "A modern Next.js template and product management tool built with shadcn/ui, Tailwind 4 & MDX. Purpose-built for modern product teams.",
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  ogImage: "/og-image.jpg",
  creator: "@ausrobdev",
  authors: [{ name: "shadcnblocks.com", url: "https://shadcnblocks.com" }],
  keywords: [
    "Next.js 15",
    "React 19",
    "Tailwind CSS 4",
    "shadcn/ui",
    "Product Management",
    "Software Development",
    "Project Management",
    "Issue Tracker",
    "SaaS Template",
    "Next.js Template",
  ],
};

export interface MetadataOptions {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
}

/**
 * Generates dynamic, SEO-optimized Next.js Metadata with OpenGraph and Twitter cards.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  pathname = "",
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = siteConfig.keywords,
  type = "website",
}: MetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const canonicalUrl = pathname
    ? `${siteConfig.url}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
    : siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      absolute: pageTitle,
    },
    description,
    keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
      creator: siteConfig.creator,
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico", sizes: "48x48" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
        {
          url: "/favicon/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: [{ url: "/favicon/favicon.ico" }],
    },
  };
}

/**
 * Generates Schema.org JSON-LD structured data for software application SEO.
 */
export function generateSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "shadcnblocks.com",
      url: "https://shadcnblocks.com",
    },
  };
}
