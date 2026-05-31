"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full border border-brand-ember/25 bg-brand-ember/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
              Start your<br />
              <span className="gradient-text-brand">supply chain journey</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Speak to our industrial supply experts. We&apos;ll assess your material requirements and design a custom procurement solution within 48 hours.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "enterprise@ferrocore.io" },
                { icon: Phone, label: "Phone", value: "+1 (412) 800-FERRO" },
                { icon: MapPin, label: "HQ", value: "Pittsburgh, PA 15201, United States" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-display text-sm font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold">Message Received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our enterprise team will reach out within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: "firstName", label: "First Name", placeholder: "Alex" },
                    { name: "lastName", label: "Last Name", placeholder: "Morrison" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">{f.label}</label>
                      <input
                        name={f.name}
                        placeholder={f.placeholder}
                        required
                        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</label>
                  <input
                    name="company"
                    placeholder="Titan Construction Group"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="alex@yourcompany.com"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Materials of Interest</label>
                  <select
                    name="category"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
                  >
                    <option value="">Select a category</option>
                    {["Plant Machinery","Iron Scrap","Copper Scrap","Aluminium Scrap","Electrical Equipment","Sponge Iron","Coal","Pellets","Fines","Oil & Lubricants"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your material requirements, volumes and timelines..."
                    className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  {!loading && <Send className="h-4 w-4" />}
                  Send Inquiry
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
