import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { Logos } from "@/components/blocks/logos";
import { Pricing } from "@/components/blocks/pricing";
import { ResourceAllocation } from "@/components/blocks/resource-allocation";
import { Testimonials } from "@/components/blocks/testimonials";
import { ProgressiveSection } from "@/components/progressive-section";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <ProgressiveSection variant="logos">
          <Logos />
        </ProgressiveSection>
        <ProgressiveSection variant="features">
          <Features />
        </ProgressiveSection>
        <ProgressiveSection variant="resources">
          <ResourceAllocation />
        </ProgressiveSection>
      </Background>
      <ProgressiveSection variant="testimonials">
        <Testimonials />
      </ProgressiveSection>
      <Background variant="bottom">
        <ProgressiveSection variant="pricing">
          <Pricing />
        </ProgressiveSection>
        <ProgressiveSection variant="faq">
          <FAQ />
        </ProgressiveSection>
      </Background>
    </>
  );
}
