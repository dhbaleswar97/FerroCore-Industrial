"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0d0c0b] px-8 py-16 text-center md:px-16 md:py-24"
        >
          {/* Blobs */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-ember/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-cobalt/25 blur-3xl" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-ember"
            >
              Start Building Today
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-white"
            >
              Industrial excellence,
              <br />
              delivered at scale.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-4 max-w-xl text-lg text-white/60"
            >
              Join 150+ enterprise manufacturers already running on FerroCore.
              14-day free trial, no credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button asChild size="xl">
                <Link href="/auth/register">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Link
                href="/auth/login"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-9 text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
              >
                View Dashboard Demo
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
