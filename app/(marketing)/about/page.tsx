"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TIMELINE = [
  { year: "2012", title: "Founded in Pittsburgh", desc: "FerroCore begins as a specialist steel trading firm, focusing on structural steel supply for US construction." },
  { year: "2015", title: "Expanded to Scrap & Alloys", desc: "Added scrap metal and specialty alloy categories — doubling our supplier network to 40+ global mills." },
  { year: "2018", title: "International Expansion", desc: "Opened operations in Europe and the Middle East. Crossed 22 countries served and $100M in annual trade volume." },
  { year: "2020", title: "Launched FerroCore Platform", desc: "Moved from email-based operations to our proprietary enterprise platform — digitizing procurement, inventory and CRM." },
  { year: "2023", title: "Energy & Mining Vertical", desc: "Added coal, pellets, fines and oil categories to serve the energy and steel-making sectors end-to-end." },
  { year: "2026", title: "FerroCore v2 — Full Ecosystem", desc: "Today: $850M+ in annual trade, 150+ enterprise clients, and the most advanced industrial trading platform in market." },
];

const TEAM = [
  { name: "Marcus Steel", title: "CEO & Co-Founder", bio: "20+ years in commodity trading. Former head of steel procurement at a Fortune 500 industrial conglomerate.", avatar: "https://ui-avatars.com/api/?name=Marcus+Steel&background=F76C46&color=fff&size=80" },
  { name: "Diana Forge", title: "COO", bio: "Supply chain expert. Designed logistics operations for $500M+ trade volumes across 3 continents.", avatar: "https://ui-avatars.com/api/?name=Diana+Forge&background=3D55FD&color=fff&size=80" },
  { name: "Ryan Alloy", title: "Head of Sales", bio: "Enterprise account management specialist with 150+ institutional client relationships globally.", avatar: "https://ui-avatars.com/api/?name=Ryan+Alloy&background=C6AF88&color=000&size=80" },
  { name: "Sofia Cast", title: "Head of Operations", bio: "Industrial engineer turned operations leader — built our warehouse infrastructure from the ground up.", avatar: "https://ui-avatars.com/api/?name=Sofia+Cast&background=85A1C5&color=fff&size=80" },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh pt-20">
      {/* Hero */}
      <section className="border-b border-border bg-[#0d0c0b] py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="mb-4 inline-block rounded-full border border-brand-ember/30 bg-brand-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
                Our Story
              </span>
              <h1 className="font-display text-5xl font-black tracking-tight text-white lg:text-6xl">
                Built by operators,<br />
                <span className="text-brand-ember">for operators.</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed">
                FerroCore was founded in 2012 by a team that had spent decades in commodity trading — frustrated by fragmented systems, opaque supply chains and analog workflows. We built the platform we always wished existed.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-ember px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2012" },
                  { label: "HQ", value: "Pittsburgh, PA" },
                  { label: "Countries Served", value: "22" },
                  { label: "Annual Trade Volume", value: "$850M+" },
                  { label: "Enterprise Clients", value: "150+" },
                  { label: "Team Members", value: "340+" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="font-display text-2xl font-black text-white">{value}</p>
                    <p className="mt-1 text-xs text-white/40">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black">14 years of building</h2>
            <p className="mt-3 text-muted-foreground">From a Pittsburgh trading desk to a global industrial platform</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 h-full w-px bg-border lg:left-1/2" />
            <div className="space-y-10">
              {TIMELINE.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`hidden lg:block lg:w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <span className="font-display text-3xl font-black text-brand-ember">{event.year}</span>
                    <h3 className="mt-1 font-display font-bold">{event.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                  <div className="relative flex items-start lg:justify-center lg:w-0">
                    <div className="h-7 w-7 shrink-0 rounded-full border-2 border-brand-ember bg-background" />
                  </div>
                  <div className="flex-1 lg:w-1/2 lg:pl-12 lg:hidden-peer">
                    <span className="font-display text-2xl font-black text-brand-ember lg:hidden">{event.year}</span>
                    <h3 className="font-display font-bold lg:hidden">{event.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-base py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black">Leadership Team</h2>
            <p className="mt-3 text-muted-foreground">Industrial operators turned platform builders</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <img src={member.avatar} alt={member.name} className="mx-auto mb-4 h-16 w-16 rounded-full" />
                <h3 className="font-display font-bold">{member.name}</h3>
                <p className="text-xs text-brand-ember font-semibold mt-0.5">{member.title}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
