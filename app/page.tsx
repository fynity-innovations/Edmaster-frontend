import { HeroSection } from "@/components/home/hero-section"
import { TrustMetrics } from "@/components/home/trust-metrics"
import { HowItWorks } from "@/components/home/how-it-works"
import { TopDestinations } from "@/components/home/top-destinations"
import { AIToolsHighlight } from "@/components/home/ai-tools-highlight"
import { FeaturedUniversities } from "@/components/home/featured-universities"
import { StudentServices } from "@/components/home/student-services"
import { Testimonials } from "@/components/home/testimonials"
import { FinalCTA } from "@/components/home/final-cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMetrics />
      <HowItWorks />
      <TopDestinations />
      <AIToolsHighlight />
      <FeaturedUniversities />
      <StudentServices />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
