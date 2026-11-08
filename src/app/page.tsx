import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { Background } from "@/components/background";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { Logos } from "@/components/blocks/logos";
import { ResourceAllocation } from "@/components/blocks/resource-allocation";
import { LazyHydrate } from "@/components/lazy-hydrate";
import type { Locale } from "@/lib/translations";

// Logos, Features and ResourceAllocation are server components: they
// only render translated text and images, so they need no hydration
// at all. Their locale comes from the app_language cookie (written by
// the language switcher); first visit defaults to "en", matching the
// client provider's initial state.
const Testimonials = dynamic(() =>
  import("@/components/blocks/testimonials").then((mod) => mod.Testimonials),
);
const Pricing = dynamic(() =>
  import("@/components/blocks/pricing").then((mod) => mod.Pricing),
);
const FAQ = dynamic(() =>
  import("@/components/blocks/faq").then((mod) => mod.FAQ),
);

export default async function Home() {
  const cookieStore = await cookies();
  const locale: Locale =
    cookieStore.get("app_language")?.value === "es" ? "es" : "en";

  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero locale={locale} />
        <div className="below-fold">
          <Logos locale={locale} />
        </div>
        <div className="below-fold">
          <Features locale={locale} />
        </div>
        <div className="below-fold">
          <ResourceAllocation locale={locale} />
        </div>
      </Background>
      <div className="below-fold">
        {/* Interactive sections hydrate only when scrolled near (or
            8s after load, see LazyHydrate), so their JS — Embla,
            Radix accordion, pricing toggle — no longer competes with
            the hero's LCP. SSR HTML is unchanged. */}
        <LazyHydrate placeholderMinHeight={700}>
          <Testimonials />
        </LazyHydrate>
      </div>
      <Background variant="bottom">
        <div className="below-fold">
          <LazyHydrate placeholderMinHeight={1200}>
            <Pricing />
          </LazyHydrate>
        </div>
        <div className="below-fold">
          <LazyHydrate placeholderMinHeight={800}>
            <FAQ />
          </LazyHydrate>
        </div>
      </Background>
    </>
  );
}
