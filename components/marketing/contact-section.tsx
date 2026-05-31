"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Package, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REQUEST_TYPES = [
  { value: "product-inquiry", label: "Product Inquiry" },
  { value: "quote-request", label: "Request a Quote" },
  { value: "demo", label: "Request a Demo" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Support" },
  { value: "general", label: "General Enquiry" },
];

const MATERIAL_GROUPS = [
  {
    group: "Metals & Scrap",
    items: ["Iron Scrap", "Copper Scrap", "Aluminium Scrap", "Sponge Iron"],
  },
  {
    group: "Energy & Minerals",
    items: ["Coal", "Pellets", "Fines"],
  },
  {
    group: "Equipment",
    items: ["Plant Machinery", "Electrical Equipment"],
  },
  {
    group: "Other",
    items: ["Oil & Lubricants", "Other"],
  },
];

const VOLUME_UNITS = ["MT", "KG", "Units", "Litres", "Barrels", "Containers"];

const inputCls = "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function ContactSection() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId] = useState(() => `FC-${Math.floor(1000 + Math.random() * 9000)}`);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-fill from URL params (set by product Inquire links)
  const preProduct = searchParams.get("product") ?? "";
  const preGrade = searchParams.get("grade") ?? "";
  const preType = searchParams.get("type") ?? "general";
  const preMaterial = searchParams.get("category")
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") ?? "";

  const [requestType, setRequestType] = useState(preType);
  const [material, setMaterial] = useState(preMaterial);
  const [volumeUnit, setVolumeUnit] = useState("MT");
  const [charCount, setCharCount] = useState(0);

  const defaultMessage = preProduct
    ? `I am interested in inquiring about:\n\nProduct: ${preProduct}\nGrade: ${preGrade}\n\nPlease provide availability, pricing, and lead time information.`
    : "";

  useEffect(() => {
    if (preType) setRequestType(preType);
    if (preMaterial) setMaterial(preMaterial);
  }, [preType, preMaterial]);

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
          {/* Left — Info */}
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
                { icon: Mail, label: "Email", value: "enterprise@ferrocore.io", href: "mailto:enterprise@ferrocore.io" },
                { icon: Phone, label: "Phone", value: "+1 (412) 800-FERRO", href: "tel:+14128003376" },
                { icon: MapPin, label: "HQ", value: "Pittsburgh, PA 15201, United States", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="font-display text-sm font-semibold hover:text-brand-ember transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-display text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-border bg-muted/40 p-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What happens next</p>
              {[
                "Your inquiry is reviewed within 4 business hours",
                "A dedicated account manager contacts you",
                "Custom quote delivered within 24–48 hours",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-ember/15 text-[10px] font-bold text-brand-ember">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Inquiry Received</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reference: <span className="font-mono font-semibold text-brand-ember">{ticketId}</span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Our enterprise team will reach out to you within <strong>4 business hours</strong>. Check your email for a confirmation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-brand-ember hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 space-y-5">
                {/* Pre-fill notice */}
                {preProduct && (
                  <div className="flex items-start gap-3 rounded-lg bg-brand-ember/8 border border-brand-ember/20 p-3">
                    <Package className="h-4 w-4 shrink-0 mt-0.5 text-brand-ember" />
                    <div>
                      <p className="text-xs font-semibold text-brand-ember">Product pre-selected</p>
                      <p className="text-xs text-muted-foreground">{preProduct} · {preGrade}</p>
                    </div>
                  </div>
                )}

                {/* Request type */}
                <div>
                  <label className={labelCls}>Request Type</label>
                  <div className="flex flex-wrap gap-2">
                    {REQUEST_TYPES.map((rt) => (
                      <button
                        key={rt.value}
                        type="button"
                        onClick={() => setRequestType(rt.value)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                          requestType === rt.value
                            ? "bg-brand-ember text-white"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {rt.label}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="requestType" value={requestType} />
                </div>

                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: "firstName", label: "First Name", placeholder: "Alex" },
                    { name: "lastName", label: "Last Name", placeholder: "Morrison" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className={labelCls}>{f.label}</label>
                      <input name={f.name} placeholder={f.placeholder} required className={inputCls} />
                    </div>
                  ))}
                </div>

                {/* Company */}
                <div>
                  <label className={labelCls}>Company</label>
                  <input name="company" placeholder="Titan Construction Group" required className={inputCls} />
                </div>

                {/* Email + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Business Email</label>
                    <input name="email" type="email" placeholder="alex@company.com" required className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span></label>
                    <input name="phone" type="tel" placeholder="+1 (412) 555-0100" className={inputCls} />
                  </div>
                </div>

                {/* Material + Volume */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Material of Interest</label>
                    <select
                      name="category"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select material</option>
                      {MATERIAL_GROUPS.map(({ group, items }) => (
                        <optgroup key={group} label={group}>
                          {items.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Estimated Volume</label>
                    <div className="flex gap-2">
                      <input
                        name="volume"
                        type="number"
                        placeholder="500"
                        min={1}
                        className={cn(inputCls, "flex-1")}
                      />
                      <select
                        value={volumeUnit}
                        onChange={(e) => setVolumeUnit(e.target.value)}
                        className="rounded-lg border border-border bg-background px-2 py-2.5 text-sm outline-none focus:border-brand-ember/60"
                      >
                        {VOLUME_UNITS.map((u) => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={cn(labelCls, "flex items-center justify-between")}>
                    <span>Message</span>
                    <span className="text-muted-foreground/50 normal-case font-normal">{charCount}/500</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue={defaultMessage}
                    maxLength={500}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    placeholder="Describe your material requirements, volumes and delivery timelines..."
                    className={cn(inputCls, "resize-none")}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  {!loading && <Send className="h-4 w-4" />}
                  Send Inquiry
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <FileText className="inline h-3 w-3 mr-1" />
                  We respond within 4 business hours. Your data is never shared with third parties.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
