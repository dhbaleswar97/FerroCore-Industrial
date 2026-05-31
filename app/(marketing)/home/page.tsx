import type { Metadata } from "next";
import { Suspense } from "react";
import { HeroSection } from "@/components/marketing/hero-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { SupplyChainSection } from "@/components/marketing/supply-chain-section";
import { MaterialsEcosystemSection } from "@/components/marketing/materials-ecosystem-section";
import { IndustriesPowerSection } from "@/components/marketing/industries-power-section";
import { OperationalStrengthSection } from "@/components/marketing/operational-strength-section";
import { ProductCategoriesSection } from "@/components/marketing/product-categories-section";
import { InventoryPreviewSection } from "@/components/marketing/inventory-preview-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { LogisticsSection } from "@/components/marketing/logistics-section";
import { ProcurementSection } from "@/components/marketing/procurement-section";
import { WhyFerrocoreSection } from "@/components/marketing/why-ferrocore-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ContactSection } from "@/components/marketing/contact-section";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "FerroCore Industrial — Engineering the Industrial Future",
  description:
    "Enterprise industrial trading platform — steel, scrap, coal, pellets and machinery. Unified inventory, CRM and analytics for global supply chains.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SupplyChainSection />
      <MaterialsEcosystemSection />
      <IndustriesPowerSection />
      <OperationalStrengthSection />
      <ProductCategoriesSection />
      <InventoryPreviewSection />
      <FeaturesSection />
      <LogisticsSection />
      <ProcurementSection />
      <WhyFerrocoreSection />
      <TestimonialsSection />
      <Suspense fallback={<div className="py-24" />}>
        <ContactSection />
      </Suspense>
      <CtaSection />
    </>
  );
}
