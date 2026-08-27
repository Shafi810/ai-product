"use client";



import { AnimatePresence } from "framer-motion";
import  { NavbarLanding } from "@/components/NavbarLanding";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import PricingSection from "@/app/pricing/page";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { SocialProof } from "@/components/social-proof";





export default function Home() {
  
  return (
    <div className="flex min-h-screen flex-col bg-[#08080a] text-[#f4f4f6]">
      <NavbarLanding />
      <main className="flex-1 space-y-12 pb-16">
        {/* Hero Section */}
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>

        

        {/* Features Section */}
        <AnimatedSection delay={0.1}>
          <FeaturesSection />
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection delay={0.1}>
          <PricingSection />
        </AnimatedSection>

        {/* Social Proof Section */}
        <AnimatedSection delay={0.1}>
          <SocialProof />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
}