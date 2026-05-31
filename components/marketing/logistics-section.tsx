"use client";

import { motion } from "framer-motion";
import { Truck, Ship, Plane, MapPin, CheckCircle2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  "Real-time shipment tracking via FerroCore dashboard",
  "Customs clearance and documentation management",
  "Temperature-controlled and hazmat-compliant transport",
  "Last-mile delivery to plant gates",
  "Multi-modal logistics optimization",
  "Insurance and risk management",
];

const SHIPMENTS = [
  { from: "Pittsburgh, PA", to: "Chicago, IL",  status: "In Transit",   pct: 72 },
  { from: "Rotterdam, NL",  to: "Houston, TX",  status: "On Vessel",    pct: 45 },
  { from: "Tokyo, JP",      to: "Seattle, WA",  status: "Departed Port",pct: 28 },
];

export function LogisticsSection() {
  return (
    <section className="overflow-hidden bg-[#0d0c0b] py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── LEFT: copy + capabilities ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="mb-4 inline-block rounded-full bg-brand-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
              Logistics & Infrastructure
            </span>
            <h2 className="font-display text-4xl font-black tracking-tight text-white lg:text-5xl">
              From mill to doorstep —<br />
              <span className="text-brand-ember">fully tracked.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              FerroCore&apos;s logistics network spans 3 continents. Every shipment is monitored
              in real time, documented end-to-end, and managed by our in-house freight operations team.
            </p>

            <div className="mt-8 space-y-3">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-ember" />
                  <span className="text-sm text-white/60">{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: bento transport cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-2 gap-3 content-start"
          >

            {/* Road Freight */}
            <div className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.08]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ember/14">
                <Truck className="h-5 w-5 text-brand-ember" />
              </div>
              <div>
                <p className="font-display font-bold text-white">Road Freight</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  Full truckload &amp; LTL across North America and Europe
                </p>
              </div>
            </div>

            {/* Sea Freight */}
            <div className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white/[0.05] p-5 transition-colors hover:bg-white/[0.08]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cobalt/14">
                <Ship className="h-5 w-5 text-brand-cobalt" />
              </div>
              <div>
                <p className="font-display font-bold text-white">Sea Freight</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  FCL / LCL containers, bulk carriers and breakbulk
                </p>
              </div>
            </div>

            {/* Air Freight — full width */}
            <div className="col-span-2 flex items-center gap-4 rounded-2xl bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.07]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-ember/10">
                <Plane className="h-5 w-5 text-brand-ember" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-white">Air Freight</p>
                <p className="mt-0.5 text-xs text-white/45">
                  Express airfreight for urgent, high-value shipments
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-brand-ember/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-ember">
                Express
              </span>
            </div>

            {/* Live shipment tracking — full width */}
            <div className="col-span-2 rounded-2xl bg-white/[0.06] p-5">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-ember" />
                <span className="font-display text-sm font-bold text-white">
                  Active Shipments — Live
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Real-time
                </span>
              </div>

              <div className="space-y-3.5">
                {SHIPMENTS.map((ship, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">{ship.from} → {ship.to}</span>
                      <span className="font-semibold text-brand-ember">{ship.status}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-1.5 rounded-full bg-brand-ember"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ship.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.12 + 0.2, ease: EASE }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
