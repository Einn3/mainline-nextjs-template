import localFont from "next/font/local";
import { cookies } from "next/headers";

import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { createMetadata, generateSoftwareSchema } from "@/lib/seo";
import type { Locale } from "@/lib/translations";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  // Was 8 TTF files (544 KB): the 4 italic variants were declared and
  // preloaded but never used — no `italic` class, <em>, or font-style
  // in the codebase — and TTF is ~2x the size of WOFF2 for the same
  // glyphs. Converted the 4 used normal weights to WOFF2 with
  // fontTools, dropping the italics. Then subset all 5 font files to
  // the 378 codepoints the site actually uses (Latin, Latin-1,
  // general punctuation, plus every character in the source) with
  // hinting stripped: DM Sans 100 KB -> 65 KB, Inter 47 KB -> 38 KB.
  // Font payload on the home page falls from 9 files / ~348 KB to
  // 5 files / ~103 KB (4x DM Sans WOFF2 + Inter variable). Verified:
  // every character used in the source is present in each subset;
  // the only "missing" glyphs (★ ✓ → etc.) were already absent from
  // the original fonts and fall back to a system font as before.
  variable: "--font-dm-sans",
  display: "swap",
});

// Inter was fetched from Google Fonts at build time (47 KB variable
// font, latin subset). Vendored and subset like DM Sans above so the
// site no longer depends on Google Fonts at build time and ships the
// smaller file. Still a variable font (wght 100-900), same variable.
const inter = localFont({
  src: "../../fonts/inter/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = createMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateSoftwareSchema();
  // Locale for the server-rendered Footer (see footer.tsx). Reading
  // the cookie here makes the layout dynamic, so every route renders
  // on demand instead of being prerendered — see the note there.
  const cookieStore = await cookies();
  const locale: Locale =
    cookieStore.get("app_language")?.value === "es" ? "es" : "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer locale={locale} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
