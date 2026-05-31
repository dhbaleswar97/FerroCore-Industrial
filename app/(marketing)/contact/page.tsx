import type { Metadata } from "next";
import { ContactSection } from "@/components/marketing/contact-section";

export const metadata: Metadata = {
  title: "Contact FerroCore Industrial",
  description: "Speak to our enterprise supply chain specialists. Get a custom procurement solution within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-dvh pt-20">
      <div className="border-b border-border bg-[#0d0c0b] py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <span className="mb-4 inline-block rounded-full border border-brand-ember/30 bg-brand-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
            Contact
          </span>
          <h1 className="font-display text-5xl font-black tracking-tight text-white lg:text-6xl">
            Let&apos;s build your<br />
            <span className="text-brand-ember">supply chain together</span>
          </h1>
        </div>
      </div>
      <ContactSection />
    </div>
  );
}
