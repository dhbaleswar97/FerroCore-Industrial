"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "FerroCore transformed our procurement process. We went from 3-week lead times to 5 days for structural steel. The platform visibility alone saved us $400K last year.",
    name: "Alex Morrison",
    title: "Procurement Director",
    company: "Titan Construction Group",
    avatar: "https://ui-avatars.com/api/?name=Alex+Morrison&background=F76C46&color=fff&size=64",
    rating: 5,
  },
  {
    id: "t2",
    quote: "The material certification workflow is exceptional. Every certificate is digitally attached, traceable and ready for our aerospace auditors. No other supplier offers this.",
    name: "Priya Nair",
    title: "VP Supply Chain",
    company: "Nordic Aerospace Systems",
    avatar: "https://ui-avatars.com/api/?name=Priya+Nair&background=3D55FD&color=fff&size=64",
    rating: 5,
  },
  {
    id: "t3",
    quote: "We've partnered with FerroCore for 4 years across our Gulf pipeline projects. Their ability to source pipeline-grade steel on short notice in the Middle East is unmatched.",
    name: "Carlos Vega",
    title: "Operations Manager",
    company: "Granite Energy Corp",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Vega&background=C6AF88&color=000&size=64",
    rating: 5,
  },
  {
    id: "t4",
    quote: "The analytics dashboard gives our management team real supply chain intelligence — not spreadsheets. We now make procurement decisions backed by live inventory data.",
    name: "Kenji Watanabe",
    title: "Sourcing Manager",
    company: "Pacific Fabrication Co.",
    avatar: "https://ui-avatars.com/api/?name=Kenji+Watanabe&background=85A1C5&color=fff&size=64",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-base py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-brand-cobalt/25 bg-brand-cobalt/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cobalt">
            Client Testimonials
          </span>
          <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
            Trusted by procurement leaders<br />
            <span className="text-muted-foreground">across 22 countries</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-elevated"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-brand-ember text-brand-ember" />
                ))}
              </div>
              <blockquote className="mb-6 text-base leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-display text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title} · {t.company}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-brand-ember/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
