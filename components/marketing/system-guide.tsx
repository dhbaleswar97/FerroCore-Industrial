"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, X, ArrowRight, ArrowDown,
  LayoutDashboard, Users, Package, TrendingUp, FileText, Settings,
  CheckCircle2, Zap, Shield, Globe, BarChart3,
  Mail, Phone, MessageSquare, Clock, Star, Award,
  Database, Target, UserCheck, UserPlus, Search,
  ShoppingCart, Inbox, Activity, Bell,
  Building2, ClipboardList, Filter, Tag,
  HelpCircle, Lightbulb, CheckSquare, Headphones, BookOpen,
  CircleDot, Workflow, LineChart,
} from "lucide-react";

// ================================================================
// TYPES & CONFIG
// ================================================================
type Color = "ember" | "cobalt" | "sand" | "ash" | "success" | "warning";

const TOTAL = 15;
const LABELS = [
  "Welcome", "Platform Overview", "Sitemap", "User Roles",
  "CRM Workflow", "Lead Generation", "Admin Guide", "Sales Guide",
  "Customer Guide", "Daily Operations", "Dashboard Walkthrough",
  "System Benefits", "FAQs & Tips", "Support & Contact", "Thank You",
];

const C: Record<Color, { bg: string; text: string; border: string; dot: string }> = {
  ember:   { bg: "bg-[#F76C46]/10",   text: "text-[#F76C46]",   border: "border-[#F76C46]/30",   dot: "bg-[#F76C46]" },
  cobalt:  { bg: "bg-[#3D55FD]/10",   text: "text-[#3D55FD]",   border: "border-[#3D55FD]/30",   dot: "bg-[#3D55FD]" },
  sand:    { bg: "bg-[#C6AF88]/10",   text: "text-[#C6AF88]",   border: "border-[#C6AF88]/30",   dot: "bg-[#C6AF88]" },
  ash:     { bg: "bg-white/5",        text: "text-white/60",    border: "border-white/10",        dot: "bg-white/40" },
  success: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", dot: "bg-emerald-400" },
  warning: { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   dot: "bg-amber-400" },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};
const spring = { type: "spring" as const, damping: 28, stiffness: 200 };

// ================================================================
// SHARED MICRO-COMPONENTS
// ================================================================

function Badge({ color = "ember", children }: { color?: Color; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${C[color].bg} ${C[color].text} ${C[color].border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${C[color].dot}`} />
      {children}
    </span>
  );
}

function SLabel({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#F76C46]/60">{children}</p>;
}

function H({ children, xl = false }: { children: ReactNode; xl?: boolean }) {
  return <h2 className={`font-display font-black tracking-tight text-white ${xl ? "text-4xl xl:text-5xl" : "text-2xl xl:text-3xl"}`}>{children}</h2>;
}

function SlideWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`h-screen w-screen overflow-hidden bg-[#0a0908] pt-11 pb-14 px-6 lg:px-14 ${className}`}>
      <div className="mx-auto h-full max-w-6xl overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return vertical
    ? <ArrowDown className="h-4 w-4 shrink-0 text-white/20 mx-auto" />
    : <ChevronRight className="h-4 w-4 shrink-0 text-white/20" />;
}

function FlowStep({
  icon: Icon, label, sub, color = "ember", i = 0,
}: { icon: React.ComponentType<{ className?: string }>; label: string; sub?: string; color?: Color; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className={`flex min-w-[78px] flex-col items-center rounded-xl border p-2.5 text-center ${C[color].bg} ${C[color].border}`}
    >
      <div className={`mb-1.5 flex h-6 w-6 items-center justify-center rounded-lg ${C[color].bg}`}>
        <Icon className={`h-3 w-3 ${C[color].text}`} />
      </div>
      <span className={`text-[10px] font-semibold leading-tight ${C[color].text}`}>{label}</span>
      {sub && <span className="mt-0.5 text-[9px] text-white/30">{sub}</span>}
    </motion.div>
  );
}

function Step({
  n, title, desc, icon: Icon,
}: { n: number; title: string; desc: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: n * 0.055 }}
      className="flex gap-3 items-start"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F76C46]/30 bg-[#F76C46]/10 font-mono text-[9px] font-bold text-[#F76C46]">
        {String(n).padStart(2, "0")}
      </div>
      <div className="flex-1 pt-0.5">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Icon className="h-3 w-3 text-white/30 shrink-0" />
          <span className="text-[11px] font-semibold text-white">{title}</span>
        </div>
        <p className="text-[10px] text-white/35 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, color = "ember" }: { label: string; value: string; color?: Color }) {
  return (
    <div className={`rounded-xl border p-3 text-center ${C[color].bg} ${C[color].border}`}>
      <p className={`font-display text-xl font-black ${C[color].text}`}>{value}</p>
      <p className="mt-0.5 text-[10px] text-white/40">{label}</p>
    </div>
  );
}

function BCard({
  icon: Icon, title, desc, color = "ember",
}: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; color?: Color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:border-white/15 transition-colors"
    >
      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${C[color].bg}`}>
        <Icon className={`h-4 w-4 ${C[color].text}`} />
      </div>
      <p className="text-[11px] font-bold text-white mb-1">{title}</p>
      <p className="text-[10px] text-white/35 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ================================================================
// SLIDE 01 — WELCOME / COVER
// ================================================================
function Slide01({ onNext }: { onNext?: () => void }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0a0908]">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(247,108,70,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247,108,70,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-[#F76C46]/8 blur-[110px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 h-60 w-60 rounded-full bg-[#3D55FD]/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F76C46]/30 bg-[#F76C46]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F76C46]"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-1.5 w-1.5 rounded-full bg-[#F76C46]"
          />
          Interactive User Manual & System Guide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-7xl font-black tracking-tight text-white xl:text-8xl"
        >
          FERRO<span className="text-[#F76C46]">CORE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 font-display text-xl font-semibold text-white/40"
        >
          Industrial Platform — Complete Guide
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 mx-auto max-w-lg text-sm text-white/30 leading-relaxed"
        >
          A comprehensive walkthrough covering platform architecture, user roles, CRM workflows, lead management, admin operations, and day-to-day best practices for every team member.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {["15 Slides", "4 User Roles", "7 Core Modules", "3 Workflow Maps", "FAQ & Best Practices"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/30">{t}</span>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          onClick={onNext}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F76C46] px-7 py-3 text-sm font-bold text-white hover:bg-[#F76C46]/90 transition-colors shadow-xl"
        >
          Begin Tour <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/20"
      >
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
        Arrow keys · Click arrows · Swipe · Click dots to navigate
      </motion.div>
    </div>
  );
}

// ================================================================
// SLIDE 02 — PLATFORM OVERVIEW
// ================================================================
function Slide02() {
  const modules = [
    { icon: LayoutDashboard, label: "Dashboard", desc: "Real-time KPIs & metrics", color: "ember" as Color },
    { icon: Users, label: "CRM", desc: "Contacts, Deals & Activities", color: "cobalt" as Color },
    { icon: TrendingUp, label: "Sales", desc: "Orders, Invoices & Pipeline", color: "success" as Color },
    { icon: Package, label: "Inventory", desc: "Products & Supplier Network", color: "sand" as Color },
    { icon: BarChart3, label: "Analytics", desc: "Revenue & Performance Data", color: "warning" as Color },
    { icon: FileText, label: "Reports", desc: "Export & Generate Reports", color: "ash" as Color },
  ];

  return (
    <SlideWrap>
      <div className="flex h-full flex-col gap-6 py-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <SLabel>Slide 02 — Platform Overview</SLabel>
            <H xl>What is FerroCore<br /><span className="text-[#F76C46]">Industrial Platform?</span></H>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-md">
              FerroCore is an enterprise-grade industrial trading platform built for steel, scrap, coal, pellets, and machinery businesses. It unifies your CRM, inventory management, sales pipeline, and analytics into a single, seamless workspace.
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                { icon: Building2, text: "Built for industrial commodity traders & manufacturers" },
                { icon: Globe, text: "Manage 22+ country supply chains from one dashboard" },
                { icon: Zap, text: "Automate lead capture, follow-ups & order workflows" },
                { icon: Shield, text: "Role-based access for admin, sales & customer portals" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#F76C46]/10">
                    <Icon className="h-3 w-3 text-[#F76C46]" />
                  </div>
                  <span className="text-xs text-white/50">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat label="Enterprise Clients" value="150+" color="ember" />
              <Stat label="Annual Trade Volume" value="$850M+" color="cobalt" />
              <Stat label="Countries Served" value="22" color="sand" />
            </div>
          </div>

          {/* Right — module grid */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">Core Modules</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {modules.map(({ icon: Icon, label, desc, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border p-4 hover:scale-[1.02] transition-transform ${C[color].bg} ${C[color].border}`}
                >
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${C[color].bg}`}>
                    <Icon className={`h-4 w-4 ${C[color].text}`} />
                  </div>
                  <p className={`text-xs font-bold ${C[color].text}`}>{label}</p>
                  <p className="mt-0.5 text-[10px] text-white/35">{desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] font-semibold text-white/40 mb-2">Who uses FerroCore?</p>
              <div className="flex flex-wrap gap-2">
                {["Business Owners", "Administrators", "Sales Teams", "Operations Staff", "Customers"].map((r) => (
                  <span key={r} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/40">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 03 — PLATFORM SITEMAP
// ================================================================
function Slide03() {
  const branches = [
    {
      label: "Public Website",
      icon: Globe,
      color: "ember" as Color,
      items: ["/ — Home", "/products", "/solutions", "/about", "/contact", "/guide"],
    },
    {
      label: "Authentication",
      icon: Shield,
      color: "cobalt" as Color,
      items: ["/auth/login", "/auth/register", "/auth/forgot-password"],
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "sand" as Color,
      items: [
        "/dashboard — Overview",
        "/dashboard/crm/contacts",
        "/dashboard/crm/deals",
        "/dashboard/crm/activities",
        "/dashboard/sales/orders",
        "/dashboard/sales/invoices",
        "/dashboard/inventory",
        "/dashboard/inventory/suppliers",
        "/dashboard/analytics",
        "/dashboard/reports",
        "/dashboard/settings",
      ],
    },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-6 text-center">
          <SLabel>Slide 03 — Platform Sitemap</SLabel>
          <H xl>Complete Site<br /><span className="text-[#F76C46]">Architecture</span></H>
          <p className="mt-2 text-sm text-white/40">Every page and route in the FerroCore platform</p>
        </div>

        {/* Root node */}
        <div className="flex flex-col items-center">
          <div className="rounded-xl border border-[#F76C46]/40 bg-[#F76C46]/10 px-6 py-2.5 text-sm font-bold text-[#F76C46]">
            FerroCore Industrial Platform
          </div>

          {/* Connector */}
          <div className="h-5 w-px bg-white/10" />

          {/* Horizontal connector line */}
          <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-1/6 right-1/6 h-px bg-white/10" />

            <div className="grid grid-cols-3 gap-4 pt-0">
              {branches.map(({ label, icon: Icon, color, items }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="h-5 w-px bg-white/10" />
                  <div className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${C[color].bg} ${C[color].text} ${C[color].border}`}>
                    <Icon className="h-3 w-3" />
                    {label}
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <div className="w-full space-y-1">
                    {items.map((item) => (
                      <div key={item} className={`rounded-lg border px-3 py-1.5 text-center text-[10px] font-medium ${C[color].bg} ${C[color].border} ${C[color].text} opacity-70`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] text-white/30">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F76C46]" /> Public — No login required</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#3D55FD]" /> Auth — Login / Registration flows</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#C6AF88]" /> Protected — Requires authentication</span>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 04 — USER ROLES & PERMISSIONS
// ================================================================
function Slide04() {
  const roles = [
    {
      role: "Administrator",
      icon: Shield,
      color: "ember" as Color,
      desc: "Full platform access. Manages all users, settings, reports, and operations.",
      access: ["Full Dashboard", "User Management", "All CRM Data", "Inventory Control", "System Settings", "All Reports"],
    },
    {
      role: "Sales Team",
      icon: Target,
      color: "cobalt" as Color,
      desc: "CRM-focused access. Manages leads, deals, customer relationships and quotes.",
      access: ["Sales Dashboard", "CRM — Contacts & Deals", "Activities Feed", "Order Creation", "Sales Reports", "Product Catalog"],
    },
    {
      role: "Customer",
      icon: UserCheck,
      color: "sand" as Color,
      desc: "Customer-facing portal. Browse products, submit inquiries, and track orders.",
      access: ["Product Catalog", "Submit Inquiries", "Request Quotes", "Order Tracking", "Profile Management", "Support Access"],
    },
  ];

  const features = [
    "Dashboard Overview", "Manage Users", "CRM — All Contacts", "Create/Edit Deals",
    "Place Orders", "Manage Inventory", "View All Reports", "System Settings",
    "Product Catalog", "Submit Inquiries",
  ];

  const perms: Record<string, boolean[]> = {
    "Dashboard Overview": [true, true, false],
    "Manage Users": [true, false, false],
    "CRM — All Contacts": [true, true, false],
    "Create/Edit Deals": [true, true, false],
    "Place Orders": [true, true, true],
    "Manage Inventory": [true, false, false],
    "View All Reports": [true, true, false],
    "System Settings": [true, false, false],
    "Product Catalog": [true, true, true],
    "Submit Inquiries": [true, true, true],
  };

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 04 — User Roles</SLabel>
          <H xl>Roles & <span className="text-[#F76C46]">Permissions</span></H>
          <p className="mt-1 text-sm text-white/40">Four access levels — each with purpose-built controls</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Role cards */}
          <div className="space-y-3">
            {roles.map(({ role, icon: Icon, color, desc, access }) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl border p-4 ${C[color].bg} ${C[color].border}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${C[color].bg}`}>
                    <Icon className={`h-4 w-4 ${C[color].text}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${C[color].text}`}>{role}</p>
                    <p className="text-[10px] text-white/35">{desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {access.map((a) => (
                    <span key={a} className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${C[color].border} ${C[color].text} opacity-70`}>{a}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Permissions Matrix */}
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Permissions Matrix</p>
            <table className="w-full text-[10px]">
              <thead>
                <tr>
                  <th className="pb-2 text-left font-medium text-white/30">Feature</th>
                  {["Admin", "Sales", "Customer"].map((r, i) => (
                    <th key={r} className={`pb-2 text-center font-semibold ${["text-[#F76C46]", "text-[#3D55FD]", "text-[#C6AF88]"][i]}`}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {features.map((f) => (
                  <tr key={f}>
                    <td className="py-1.5 text-white/50">{f}</td>
                    {perms[f].map((has, j) => (
                      <td key={j} className="py-1.5 text-center">
                        {has
                          ? <CheckCircle2 className="inline h-3 w-3 text-emerald-400" />
                          : <span className="inline-block h-3 w-3 rounded-full border border-white/10" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 05 — CRM WORKFLOW
// ================================================================
function Slide05() {
  const stages = [
    { icon: UserPlus, label: "Lead", sub: "New prospect", color: "ash" as Color },
    { icon: Filter, label: "Qualified", sub: "Meets criteria", color: "warning" as Color },
    { icon: FileText, label: "Proposal", sub: "Quote sent", color: "cobalt" as Color },
    { icon: MessageSquare, label: "Negotiation", sub: "Terms agreed", color: "sand" as Color },
    { icon: CheckCircle2, label: "Closed Won", sub: "Deal sealed", color: "success" as Color },
    { icon: X, label: "Closed Lost", sub: "Not converted", color: "ember" as Color },
  ];

  const lifecycle = [
    { icon: UserPlus, title: "Contact Created", desc: "New lead enters via website form, direct outreach, or manual entry by sales team." },
    { icon: Tag, title: "Qualification", desc: "Sales rep reviews budget, authority, need & timeline. Moves qualified leads to Deals." },
    { icon: Target, title: "Deal Opened", desc: "A Deal record links the Contact to a specific opportunity with value, probability, and expected close date." },
    { icon: MessageSquare, title: "Follow-Up Activities", desc: "Calls, emails, and meetings logged in Activities. Automated reminders keep deals progressing." },
    { icon: FileText, title: "Proposal & Quote", desc: "Formal quote generated from the platform and sent to customer. Price, volume, lead time confirmed." },
    { icon: CheckCircle2, title: "Conversion", desc: "Deal marked Won. Order created in Sales module. Customer record updated to active client status." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 05 — CRM Workflow</SLabel>
          <H xl>CRM Pipeline <span className="text-[#F76C46]">& Deal Flow</span></H>
          <p className="mt-1 text-sm text-white/40">From first contact to closed deal — how the CRM moves business forward</p>
        </div>

        {/* Pipeline stages */}
        <div className="mb-5 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 pb-2">
            {stages.map((s, i) => (
              <>
                <FlowStep key={s.label} {...s} i={i} />
                {i < stages.length - 1 && <FlowArrow key={`arr-${i}`} />}
              </>
            ))}
          </div>
        </div>

        {/* Lifecycle grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {lifecycle.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5"
            >
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#F76C46]/10">
                <Icon className="h-3.5 w-3.5 text-[#F76C46]" />
              </div>
              <p className="text-[11px] font-bold text-white mb-1">{title}</p>
              <p className="text-[10px] text-white/35 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <Stat label="Avg Deal Cycle" value="14 days" color="ember" />
          <Stat label="Win Rate Target" value="35%+" color="cobalt" />
          <Stat label="Pipeline Stages" value="6" color="sand" />
          <Stat label="Activity Types" value="5" color="success" />
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 06 — LEAD GENERATION WORKFLOW
// ================================================================
function Slide06() {
  const sources = [
    { icon: Globe, label: "Website Forms", sub: "Contact & Inquiry", color: "ember" as Color },
    { icon: Package, label: "Product Inquiries", sub: "Product page CTAs", color: "cobalt" as Color },
    { icon: Mail, label: "Email Campaigns", sub: "Inbound & outbound", color: "sand" as Color },
    { icon: Users, label: "Referrals", sub: "Client introductions", color: "success" as Color },
  ];

  const qualSteps = [
    { icon: Inbox, n: 1, title: "Lead Captured", desc: "Form submission auto-creates a CRM Contact record with source, product interest, and volume data." },
    { icon: Bell, n: 2, title: "Sales Team Notified", desc: "Assigned sales rep receives immediate notification. Lead appears in their CRM queue within seconds." },
    { icon: Phone, n: 3, title: "Initial Contact — 24 hrs", desc: "Sales rep makes first contact within 24 hours. Call/email logged as Activity. BANT qualification begins." },
    { icon: Filter, n: 4, title: "Qualification & Scoring", desc: "Lead scored on Budget, Authority, Need, Timeline. Qualified leads converted to Deals with estimated value." },
    { icon: Target, n: 5, title: "Deal Assignment", desc: "High-value deals escalated to senior account managers. Standard deals follow standard pipeline workflow." },
    { icon: TrendingUp, n: 6, title: "Pipeline Entry", desc: "Deal enters the 6-stage pipeline. Progress tracked via probability % and expected close date." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 06 — Lead Generation</SLabel>
          <H xl>Lead Capture <span className="text-[#F76C46]">& Qualification</span></H>
          <p className="mt-1 text-sm text-white/40">How prospects enter the system and become active opportunities</p>
        </div>

        {/* Lead sources */}
        <div className="mb-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Lead Sources</p>
          <div className="flex gap-3 flex-wrap">
            {sources.map((s, i) => <FlowStep key={s.label} {...s} i={i} />)}
          </div>
        </div>

        {/* Arrow down */}
        <div className="mb-4 flex flex-col items-start gap-1 pl-10">
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-3 rounded-xl border border-[#F76C46]/30 bg-[#F76C46]/5 px-4 py-2 text-xs font-semibold text-[#F76C46]">
            <CircleDot className="h-4 w-4" />
            All sources feed into the FerroCore Lead Pool — CRM Contacts Module
          </div>
          <div className="h-6 w-px bg-white/10" />
        </div>

        {/* Qualification steps */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 lg:grid-cols-3">
          {qualSteps.map(({ icon, n, title, desc }) => (
            <Step key={title} icon={icon} n={n} title={title} desc={desc} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <Stat label="Response Target" value="< 24h" color="ember" />
          <Stat label="Qualification Rate" value="40%" color="cobalt" />
          <Stat label="Lead Sources" value="4+" color="sand" />
          <Stat label="Conversion Target" value="35%" color="success" />
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 07 — ADMIN WORKFLOW GUIDE
// ================================================================
function Slide07() {
  const steps = [
    { icon: Shield, n: 1, title: "Admin Login", desc: "Access /auth/login with admin credentials. Two-factor authentication recommended for all admin accounts." },
    { icon: LayoutDashboard, n: 2, title: "Dashboard Overview", desc: "Review daily KPIs: Revenue, Active Deals, New Leads, Inventory Alerts. Check notification panel for pending actions." },
    { icon: Activity, n: 3, title: "Morning Operations Check", desc: "Review overnight activity logs. Monitor SLA compliance. Check for any system alerts or inventory low-stock warnings." },
    { icon: Users, n: 4, title: "Lead Management", desc: "Review new leads from overnight. Assign unassigned leads to sales reps. Review lead source performance." },
    { icon: UserCheck, n: 5, title: "Customer Management", desc: "Review new customer registrations. Update customer tier classifications. Respond to high-value customer escalations." },
    { icon: Package, n: 6, title: "Inventory Control", desc: "Review low-stock alerts. Update product availability. Process supplier order confirmations. Adjust pricing if needed." },
    { icon: ShoppingCart, n: 7, title: "Order Management", desc: "Approve pending orders. Review order fulfilment status. Handle exception orders requiring manual intervention." },
    { icon: TrendingUp, n: 8, title: "Sales Performance Review", desc: "Monitor team's daily deal activity. Review pipeline velocity. Identify stalled deals needing management attention." },
    { icon: BarChart3, n: 9, title: "Reports & Analytics", desc: "Generate daily sales summary report. Review revenue-vs-target. Export data for board-level reporting as needed." },
    { icon: Settings, n: 10, title: "System Administration", desc: "Manage user accounts. Review permission changes. Update system configurations. Back up critical data." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <SLabel>Slide 07 — Admin Guide</SLabel>
            <H xl>Administrator <span className="text-[#F76C46]">Daily Workflow</span></H>
            <p className="mt-1 text-sm text-white/40">Step-by-step operational guide for platform administrators</p>
          </div>
          <Badge color="ember">Admin Access</Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
          {steps.map(({ icon, n, title, desc }) => (
            <Step key={title} icon={icon} n={n} title={title} desc={desc} />
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#F76C46]/20 bg-[#F76C46]/5 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-4 w-4 text-[#F76C46] shrink-0 mt-0.5" />
            <p className="text-[11px] text-white/50 leading-relaxed">
              <span className="font-semibold text-[#F76C46]">Admin Best Practice:</span> Complete steps 1–5 every morning before 10 AM. This ensures lead assignments are processed, inventory is current, and the sales team starts their day with full visibility.
            </p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 08 — SALES TEAM WORKFLOW GUIDE
// ================================================================
function Slide08() {
  const steps = [
    { icon: Shield, n: 1, title: "Sales Login", desc: "Access dashboard via /auth/login. Bookmark /dashboard for quick access. Review today's task notifications on login." },
    { icon: Inbox, n: 2, title: "Check New Leads", desc: "Review leads assigned overnight. Prioritize by lead score and product category. Update status for any in-progress leads." },
    { icon: Phone, n: 3, title: "Morning Follow-Ups", desc: "Work through yesterday's follow-up schedule. Log all calls and emails in the Activities module immediately after contact." },
    { icon: Target, n: 4, title: "Opportunity Tracking", desc: "Update deal stages for active opportunities. Record any new information: budget confirmed, decision timeline, competitor mentions." },
    { icon: MessageSquare, n: 5, title: "Customer Communications", desc: "Respond to all customer messages within 2 hours. Log every customer interaction as an Activity in CRM." },
    { icon: FileText, n: 6, title: "Quote Creation", desc: "Access Sales > Invoices to generate quotes. Include product specs, MOQ, price per MT, lead time, and payment terms." },
    { icon: TrendingUp, n: 7, title: "Conversion & Closing", desc: "Move qualified deals through stages systematically. Request manager approval for deals > $500K. Update probability weekly." },
    { icon: ClipboardList, n: 8, title: "End-of-Day Reporting", desc: "Update all deal records before close of business. Log today's activities. Set follow-up reminders for tomorrow." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <SLabel>Slide 08 — Sales Guide</SLabel>
            <H xl>Sales Team <span className="text-[#3D55FD]">Daily Workflow</span></H>
            <p className="mt-1 text-sm text-white/40">Step-by-step process for sales representatives and account managers</p>
          </div>
          <Badge color="cobalt">Sales Access</Badge>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
          {steps.map(({ icon, n, title, desc }) => (
            <Step key={title} icon={icon} n={n} title={title} desc={desc} />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#3D55FD]/20 bg-[#3D55FD]/5 p-3">
            <p className="text-[10px] font-semibold text-[#3D55FD] mb-1">Daily Target</p>
            <p className="text-[10px] text-white/40">Minimum 5 meaningful customer touchpoints logged in CRM daily</p>
          </div>
          <div className="rounded-xl border border-[#3D55FD]/20 bg-[#3D55FD]/5 p-3">
            <p className="text-[10px] font-semibold text-[#3D55FD] mb-1">Response SLA</p>
            <p className="text-[10px] text-white/40">All new leads contacted within 24 hours — no exceptions</p>
          </div>
          <div className="rounded-xl border border-[#3D55FD]/20 bg-[#3D55FD]/5 p-3">
            <p className="text-[10px] font-semibold text-[#3D55FD] mb-1">CRM Rule</p>
            <p className="text-[10px] text-white/40">If it didn&apos;t happen in CRM, it didn&apos;t happen. Log everything.</p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 09 — CUSTOMER WORKFLOW GUIDE
// ================================================================
function Slide09() {
  const journeySteps = [
    { icon: UserPlus, label: "Register", sub: "/auth/register", color: "ember" as Color },
    { icon: Shield, label: "Login", sub: "/auth/login", color: "ash" as Color },
    { icon: Package, label: "Browse Products", sub: "/products", color: "cobalt" as Color },
    { icon: Search, label: "Search & Filter", sub: "By category/grade", color: "sand" as Color },
    { icon: MessageSquare, label: "Send Inquiry", sub: "/contact", color: "warning" as Color },
    { icon: FileText, label: "Request Quote", sub: "Get pricing", color: "cobalt" as Color },
    { icon: ShoppingCart, label: "Place Order", sub: "Confirm order", color: "success" as Color },
    { icon: Activity, label: "Track Status", sub: "Order updates", color: "ember" as Color },
  ];

  const details = [
    { icon: UserPlus, title: "Registration & Onboarding", desc: "Create account at /auth/register. Provide business name, email, and contact details. Receive welcome email with platform access." },
    { icon: Package, title: "Product Discovery", desc: "Browse the full product catalog. Filter by material category, grade, origin, and availability. View MOQ and pricing indicators." },
    { icon: MessageSquare, title: "Inquiry Submission", desc: "Submit product inquiries via /contact. Specify material, volume (MT/Units), delivery requirements. Receive ticket number instantly." },
    { icon: FileText, title: "Quotation Process", desc: "FerroCore team responds within 4 business hours with a formal quote including price, lead time, payment terms, and shipping cost." },
    { icon: CheckCircle2, title: "Order Confirmation", desc: "Review and accept quote. Place order via the platform. Receive order confirmation with tracking reference." },
    { icon: Headphones, title: "Support & Escalation", desc: "Contact support via email or platform chat. Response within 2 business hours for active orders. Dedicated account manager for enterprise clients." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <SLabel>Slide 09 — Customer Guide</SLabel>
            <H xl>Customer <span className="text-[#C6AF88]">Journey</span></H>
            <p className="mt-1 text-sm text-white/40">From first visit to fulfilled order — the complete customer experience</p>
          </div>
          <Badge color="sand">Customer Access</Badge>
        </div>

        {/* Journey flow */}
        <div className="mb-5 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 pb-2">
            {journeySteps.map((s, i) => (
              <>
                <FlowStep key={s.label} {...s} i={i} />
                {i < journeySteps.length - 1 && <FlowArrow key={`a${i}`} />}
              </>
            ))}
          </div>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {details.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5"
            >
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#C6AF88]/10">
                <Icon className="h-3.5 w-3.5 text-[#C6AF88]" />
              </div>
              <p className="text-[11px] font-bold text-white mb-1">{title}</p>
              <p className="text-[10px] text-white/35 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 10 — DAILY BUSINESS OPERATIONS
// ================================================================
function Slide10() {
  const periods = [
    {
      time: "Morning",
      range: "8:00 — 11:00 AM",
      color: "ember" as Color,
      icon: Clock,
      tasks: [
        { icon: Bell, text: "Review overnight notifications & alerts" },
        { icon: Inbox, text: "Process new lead assignments from CRM queue" },
        { icon: Package, text: "Check low-stock inventory alerts" },
        { icon: BarChart3, text: "Review yesterday's sales performance dashboard" },
        { icon: ClipboardList, text: "Set daily targets and team priorities" },
      ],
    },
    {
      time: "Midday",
      range: "11:00 AM — 3:00 PM",
      color: "cobalt" as Color,
      icon: Activity,
      tasks: [
        { icon: Phone, text: "Customer follow-up calls and email responses" },
        { icon: Target, text: "Update deal stages and pipeline probabilities" },
        { icon: FileText, text: "Generate and send customer quotations" },
        { icon: ShoppingCart, text: "Process and approve pending orders" },
        { icon: Users, text: "Hold team sync — share deals and blockers" },
      ],
    },
    {
      time: "End of Day",
      range: "3:00 — 6:00 PM",
      color: "sand" as Color,
      icon: CheckSquare,
      tasks: [
        { icon: TrendingUp, text: "Review day's lead conversion performance" },
        { icon: ClipboardList, text: "Ensure all CRM activities are logged" },
        { icon: BarChart3, text: "Generate end-of-day sales summary report" },
        { icon: Bell, text: "Set follow-up reminders for tomorrow" },
        { icon: Database, text: "Verify inventory counts are updated" },
      ],
    },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 10 — Daily Operations</SLabel>
          <H xl>Daily Business <span className="text-[#F76C46]">Operations Guide</span></H>
          <p className="mt-1 text-sm text-white/40">Recommended operational schedule for maximum team efficiency</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {periods.map(({ time, range, color, icon: Icon, tasks }) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-4 ${C[color].bg} ${C[color].border}`}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${C[color].bg}`}>
                  <Icon className={`h-4 w-4 ${C[color].text}`} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${C[color].text}`}>{time}</p>
                  <p className="text-[10px] text-white/30">{range}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {tasks.map(({ icon: TIcon, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded ${C[color].bg}`}>
                      <TIcon className={`h-2.5 w-2.5 ${C[color].text}`} />
                    </div>
                    <span className="text-[11px] text-white/50">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Key Daily Metrics to Monitor</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {["New Leads Today", "Deals Updated", "Activities Logged", "Inquiries Received", "Orders Placed", "Revenue vs Target"].map((m) => (
                <div key={m} className="flex items-center gap-1.5 text-white/40">
                  <span className="h-1 w-1 rounded-full bg-[#F76C46]" />{m}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Weekly Reporting Schedule</p>
            <div className="space-y-1.5 text-[10px]">
              {[
                { day: "Monday", task: "Pipeline review & week target setting" },
                { day: "Wednesday", task: "Mid-week sales performance check" },
                { day: "Friday", task: "Weekly summary report & forecasting" },
              ].map(({ day, task }) => (
                <div key={day} className="flex gap-2 text-white/40">
                  <span className="shrink-0 font-semibold text-[#F76C46]">{day}</span>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 11 — DASHBOARD WALKTHROUGH
// ================================================================
function Slide11() {
  const kpis = [
    { label: "Total Revenue", value: "$2.4M", color: "ember" as Color, delta: "+12.5%" },
    { label: "Active Deals", value: "47", color: "cobalt" as Color, delta: "+8" },
    { label: "New Leads", value: "23", color: "sand" as Color, delta: "+15%" },
    { label: "Orders Today", value: "12", color: "success" as Color, delta: "+3" },
  ];

  const areas = [
    { label: "A — KPI Cards", desc: "4 top-line metrics with period comparison. Color-coded for quick status assessment." },
    { label: "B — Revenue Chart", desc: "Monthly revenue vs target. Recharts line chart with responsive container." },
    { label: "C — Category Mix", desc: "Product category breakdown by revenue — pie/donut chart view." },
    { label: "D — Recent Deals", desc: "Latest 5 deals with stage, value, and expected close. Quick navigation to CRM." },
    { label: "E — Quick Actions", desc: "4 shortcut cards: New Sale, New Invoice, Add Contact, Stock Entry." },
    { label: "F — Command Palette", desc: "Press ⌘K to open the global command palette — navigate any page instantly." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 11 — Dashboard Walkthrough</SLabel>
          <H xl>Dashboard <span className="text-[#F76C46]">Reference Guide</span></H>
          <p className="mt-1 text-sm text-white/40">Understanding every section of the FerroCore admin dashboard</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Mock dashboard wireframe */}
          <div className="lg:col-span-3">
            {/* KPI row — A */}
            <div className="mb-2 grid grid-cols-4 gap-2">
              {kpis.map(({ label, value, color, delta }) => (
                <div key={label} className={`rounded-lg border p-2.5 ${C[color].bg} ${C[color].border}`}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[9px] text-white/40">{label}</p>
                    <span className={`text-[8px] font-semibold ${C[color].text}`}>{delta}</span>
                  </div>
                  <p className={`font-display text-base font-black ${C[color].text}`}>{value}</p>
                  <p className="mt-0.5 text-[8px] text-white/20 uppercase tracking-wider font-mono">A</p>
                </div>
              ))}
            </div>

            {/* Quick actions — E */}
            <div className="mb-2 grid grid-cols-4 gap-2">
              {["New Sale", "New Invoice", "Add Contact", "Stock Entry"].map((a) => (
                <div key={a} className="rounded-lg border border-white/8 bg-white/[0.02] p-2 text-center">
                  <p className="text-[9px] text-white/50">{a}</p>
                  <p className="text-[8px] text-white/20 mt-0.5 font-mono">E</p>
                </div>
              ))}
            </div>

            {/* Charts row — B & C */}
            <div className="mb-2 grid grid-cols-3 gap-2">
              <div className="col-span-2 rounded-lg border border-white/8 bg-white/[0.02] p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] text-white/40">Revenue vs Target</p>
                  <span className="font-mono text-[8px] text-white/20">B</span>
                </div>
                <div className="flex-1 flex items-end gap-1">
                  {[60, 75, 55, 85, 70, 90, 80].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-[#F76C46]/30" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] text-white/40">Categories</p>
                  <span className="font-mono text-[8px] text-white/20">C</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative h-16 w-16 rounded-full border-4 border-[#F76C46]/30 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#F76C46] border-r-[#3D55FD] border-b-[#C6AF88] border-l-transparent" />
                    <p className="text-[8px] text-white/30">Mix</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Deals — D */}
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] text-white/40">Recent Deals</p>
                <span className="font-mono text-[8px] text-white/20">D</span>
              </div>
              {["Apex Steel Co — $245K — Negotiation", "Global Metals Ltd — $180K — Proposal", "Nordic Scrap — $92K — Qualified"].map((deal) => (
                <div key={deal} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#F76C46] shrink-0" />
                  <p className="text-[9px] text-white/40 truncate">{deal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="lg:col-span-2 space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-3">Dashboard Sections</p>
            {areas.map(({ label, desc }) => (
              <div key={label} className="flex gap-3 items-start">
                <span className="shrink-0 rounded border border-[#F76C46]/30 bg-[#F76C46]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#F76C46]">
                  {label.split(" — ")[0]}
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-white">{label.split(" — ")[1]}</p>
                  <p className="text-[10px] text-white/35 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
              <p className="text-[10px] font-semibold text-white mb-1">⌘K — Command Palette</p>
              <p className="text-[10px] text-white/35">Press Ctrl+K (or Cmd+K on Mac) from any dashboard page to instantly search and navigate to any module, contact, deal, or inventory item.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 12 — SYSTEM BENEFITS
// ================================================================
function Slide12() {
  const benefits = [
    { icon: Zap, color: "ember" as Color, title: "Lead Response Automation", desc: "Auto-route new inquiries to the right sales rep. Eliminate manual lead distribution. Cut response time from hours to minutes." },
    { icon: Target, color: "cobalt" as Color, title: "Pipeline Visibility", desc: "Every deal, every stage, every rep — visible in real time. Identify bottlenecks before they impact revenue." },
    { icon: Database, color: "sand" as Color, title: "Inventory Intelligence", desc: "Real-time stock levels, low-stock alerts, and supplier lead times. Never lose a sale due to invisible inventory gaps." },
    { icon: BarChart3, color: "success" as Color, title: "Revenue Analytics", desc: "Track revenue vs target daily. Segment by product, region, sales rep. Export board-ready reports in seconds." },
    { icon: Users, color: "warning" as Color, title: "Customer Relationship Depth", desc: "Full contact history, purchase records, and communication logs. Every team member has full context — no repeated questions." },
    { icon: Globe, color: "ember" as Color, title: "Global Supply Chain Control", desc: "Manage 22+ country supplier relationships, shipping timelines, and procurement from a single command center." },
    { icon: Shield, color: "cobalt" as Color, title: "Role-Based Security", desc: "Granular access control ensures sales reps see only what they need. Sensitive financials restricted to admin level." },
    { icon: Workflow, color: "sand" as Color, title: "Process Standardization", desc: "Every team follows the same proven workflow. New team members onboard in hours, not weeks." },
    { icon: LineChart, color: "success" as Color, title: "Forecasting Accuracy", desc: "Pipeline probability × deal value = revenue forecast. Make hiring and procurement decisions based on data, not gut." },
  ];

  const metrics = [
    { label: "Lead Response Time", before: "24–48 hrs", after: "< 4 hrs", color: "ember" as Color },
    { label: "CRM Data Capture Rate", before: "40%", after: "95%+", color: "cobalt" as Color },
    { label: "Monthly Report Generation", before: "2–3 days", after: "< 10 min", color: "sand" as Color },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 12 — System Benefits</SLabel>
          <H xl>Why FerroCore <span className="text-[#F76C46]">Changes the Game</span></H>
          <p className="mt-1 text-sm text-white/40">Measurable business improvements across every function</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {benefits.map(({ icon, color, title, desc }) => (
            <BCard key={title} icon={icon} title={title} desc={desc} color={color} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {metrics.map(({ label, before, after, color }) => (
            <div key={label} className={`rounded-xl border p-3 ${C[color].bg} ${C[color].border}`}>
              <p className="text-[10px] font-semibold text-white/40 mb-2">{label}</p>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-[10px] text-white/30">Before</p>
                  <p className="text-sm font-bold text-white/50">{before}</p>
                </div>
                <ArrowRight className={`h-4 w-4 ${C[color].text}`} />
                <div className="text-center">
                  <p className="text-[10px] text-white/30">After</p>
                  <p className={`text-sm font-bold ${C[color].text}`}>{after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 13 — FAQs & BEST PRACTICES
// ================================================================
function Slide13() {
  const faqs = [
    { q: "How do I add a new lead to the CRM?", a: "Navigate to Dashboard → CRM → Contacts. Click 'New Contact'. Fill in name, company, email, and source. The system auto-creates a timeline entry." },
    { q: "How do I create a product quotation?", a: "Go to Dashboard → Sales → Invoices. Click 'New Invoice'. Select customer, add line items from the product catalog, set pricing and payment terms, then send." },
    { q: "What happens when a customer submits an inquiry?", a: "The inquiry is logged in CRM Contacts with a unique ticket ID. The assigned sales rep receives an immediate notification to follow up within 24 hours." },
    { q: "How do I track inventory levels?", a: "Dashboard → Inventory. The overview shows stock by category with low-stock alerts. The Suppliers tab shows outstanding orders and lead times." },
    { q: "How do I generate a weekly sales report?", a: "Dashboard → Reports. Select date range and report type (Sales Summary, Lead Conversion, Revenue by Category). Click Export CSV or Print PDF." },
    { q: "Can I manage multiple sales reps?", a: "Yes. Admin creates user accounts with Sales role. Lead assignments are configured per rep or auto-routed by product category or region." },
  ];

  const tips = [
    { icon: Star, color: "ember" as Color, title: "Log Every Interaction", tip: "Create an Activity record for every call, email, and meeting. Teams with 100% activity logging close 28% more deals." },
    { icon: Bell, color: "cobalt" as Color, title: "Use Reminders Religiously", tip: "Set follow-up reminders before leaving any deal page. Deals that go 5+ days without activity have a 60% lower close rate." },
    { icon: Target, color: "sand" as Color, title: "Update Deal Probability Weekly", tip: "Review and update deal probability every Friday. Accurate probability scores produce reliable revenue forecasts." },
    { icon: Zap, color: "success" as Color, title: "Use the Command Palette", tip: "⌘K opens any module instantly. Power users navigate 3× faster using keyboard commands vs clicking through menus." },
    { icon: BarChart3, color: "warning" as Color, title: "Review Dashboard Daily", tip: "Spend 10 minutes each morning reviewing KPIs. Teams that do this identify pipeline risks 2 weeks earlier on average." },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 13 — FAQs & Best Practices</SLabel>
          <H xl>Common Questions <span className="text-[#F76C46]">& Pro Tips</span></H>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FAQs */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30 flex items-center gap-2">
              <HelpCircle className="h-3 w-3 text-[#F76C46]" /> Frequently Asked Questions
            </p>
            <div className="space-y-2.5">
              {faqs.map(({ q, a }) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5"
                >
                  <p className="text-[11px] font-semibold text-white mb-1.5 flex items-start gap-1.5">
                    <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-[#F76C46]/40 text-center text-[8px] font-bold text-[#F76C46] flex items-center justify-center">Q</span>
                    {q}
                  </p>
                  <p className="text-[10px] text-white/35 leading-relaxed pl-5">{a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30 flex items-center gap-2">
              <Lightbulb className="h-3 w-3 text-[#F76C46]" /> Best Practices & Pro Tips
            </p>
            <div className="space-y-2.5">
              {tips.map(({ icon: Icon, color, title, tip }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl border p-3.5 ${C[color].bg} ${C[color].border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${C[color].bg}`}>
                      <Icon className={`h-3 w-3 ${C[color].text}`} />
                    </div>
                    <div>
                      <p className={`text-[11px] font-bold mb-0.5 ${C[color].text}`}>{title}</p>
                      <p className="text-[10px] text-white/40 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 14 — SUPPORT & CONTACT
// ================================================================
function Slide14() {
  const channels = [
    { icon: Mail, color: "ember" as Color, label: "Email Support", contact: "support@ferrocore.io", sla: "Response within 4 business hours", desc: "For general inquiries, account questions, billing, and non-urgent technical issues." },
    { icon: Phone, color: "cobalt" as Color, label: "Phone Support", contact: "+1 (412) 800-FERRO", sla: "Mon–Fri, 8 AM – 6 PM EST", desc: "For urgent order issues, supply chain emergencies, and enterprise client priority support." },
    { icon: MessageSquare, color: "sand" as Color, label: "Platform Chat", contact: "In-app support widget", sla: "Response within 2 hours", desc: "Available from any dashboard page. Fastest route for platform technical questions and workflow guidance." },
  ];

  const escalation = [
    { level: "L1", title: "Self-Service", desc: "Platform FAQs, this guide, in-app tooltips", icon: BookOpen },
    { level: "L2", title: "Platform Support", desc: "Email or chat — general issues & how-to questions", icon: MessageSquare },
    { level: "L3", title: "Account Manager", desc: "Enterprise clients — dedicated rep for strategic issues", icon: UserCheck },
    { level: "L4", title: "Executive Escalation", desc: "Critical operational or contractual issues — Director level", icon: Award },
  ];

  return (
    <SlideWrap>
      <div className="py-4">
        <div className="mb-5">
          <SLabel>Slide 14 — Support & Contact</SLabel>
          <H xl>Getting Help & <span className="text-[#F76C46]">Escalation Process</span></H>
          <p className="mt-1 text-sm text-white/40">How to reach us and what to expect at every level of support</p>
        </div>

        {/* Contact channels */}
        <div className="mb-5 grid gap-3 lg:grid-cols-3">
          {channels.map(({ icon: Icon, color, label, contact, sla, desc }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-5 ${C[color].bg} ${C[color].border}`}
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${C[color].bg}`}>
                <Icon className={`h-5 w-5 ${C[color].text}`} />
              </div>
              <p className={`text-sm font-bold mb-0.5 ${C[color].text}`}>{label}</p>
              <p className="text-xs font-semibold text-white mb-2">{contact}</p>
              <p className="text-[10px] text-white/40 mb-2 leading-relaxed">{desc}</p>
              <div className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-medium ${C[color].bg} ${C[color].border} ${C[color].text}`}>
                <Clock className="inline h-3 w-3 mr-1" />{sla}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Escalation path */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Escalation Pathway</p>
          <div className="flex flex-wrap items-center gap-2">
            {escalation.map(({ level, title, desc, icon: Icon }, i) => (
              <>
                <motion.div
                  key={level}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex-1 min-w-[140px] rounded-xl border border-white/8 bg-white/[0.02] p-3 text-center"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#F76C46]/30 bg-[#F76C46]/10 mx-auto font-mono text-xs font-bold text-[#F76C46]">
                    {level}
                  </div>
                  <Icon className="mx-auto mb-1 h-4 w-4 text-white/30" />
                  <p className="text-[11px] font-bold text-white">{title}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{desc}</p>
                </motion.div>
                {i < escalation.length - 1 && (
                  <ArrowRight key={`esc-arr-${i}`} className="h-4 w-4 shrink-0 text-white/20" />
                )}
              </>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold text-white mb-1.5">When to contact support</p>
            <div className="space-y-1 text-[10px] text-white/40">
              {["Platform login issues or account lockout", "Data discrepancies or missing records", "Integration and API assistance", "Custom report configuration help"].map((i) => (
                <div key={i} className="flex items-start gap-1.5"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#F76C46]" />{i}</div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold text-white mb-1.5">Information to include in support requests</p>
            <div className="space-y-1 text-[10px] text-white/40">
              {["Your account email and company name", "The specific page or module affected", "Steps to reproduce the issue", "Screenshots or screen recordings (if applicable)"].map((i) => (
                <div key={i} className="flex items-start gap-1.5"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#3D55FD]" />{i}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ================================================================
// SLIDE 15 — THANK YOU
// ================================================================
function Slide15() {
  const covered = [
    "Platform Overview", "Site Architecture", "User Roles", "CRM Workflow",
    "Lead Generation", "Admin Guide", "Sales Guide", "Customer Journey",
    "Daily Operations", "Dashboard", "System Benefits", "FAQs & Tips",
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[#0a0908]">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(247,108,70,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,108,70,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-[#F76C46]/8 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-[#3D55FD]/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 text-center max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Guide Complete — 15 / 15 Slides
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-6xl font-black tracking-tight text-white xl:text-7xl"
        >
          You&apos;re Ready to <span className="text-[#F76C46]">Operate.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 mx-auto max-w-lg text-sm text-white/40 leading-relaxed"
        >
          You now have a complete understanding of the FerroCore Industrial Platform — from architecture and roles to daily workflows and best practices. You&apos;re ready to use the system at full capacity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {covered.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/40">
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
              {c}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-[#F76C46] px-7 py-3 text-sm font-bold text-white hover:bg-[#F76C46]/90 transition-colors shadow-xl"
          >
            <LayoutDashboard className="h-4 w-4" />
            Open Dashboard
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Package className="h-4 w-4" />
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Our Team
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-[11px] text-white/20"
        >
          FerroCore Industrial Platform — User Manual v2.0 · support@ferrocore.io
        </motion.p>
      </div>
    </div>
  );
}

// ================================================================
// MAIN SHELL — SystemGuide
// ================================================================
export function SystemGuide() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastWheelTime = useRef(0);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    if (current < TOTAL - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
      if (e.key === "Escape") window.location.href = "/";
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Scroll lock
  useEffect(() => {
    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = savedOverflow;
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Wheel navigation (throttled)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;
      lastWheelTime.current = now;
      if (e.deltaX > 40 || e.deltaY > 40) next();
      else if (e.deltaX < -40 || e.deltaY < -40) prev();
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 55) {
      if (diff > 0) next();
      else prev();
    }
  };

  const slides = [
    <Slide01 key="01" onNext={next} />,
    <Slide02 key="02" />,
    <Slide03 key="03" />,
    <Slide04 key="04" />,
    <Slide05 key="05" />,
    <Slide06 key="06" />,
    <Slide07 key="07" />,
    <Slide08 key="08" />,
    <Slide09 key="09" />,
    <Slide10 key="10" />,
    <Slide11 key="11" />,
    <Slide12 key="12" />,
    <Slide13 key="13" />,
    <Slide14 key="14" />,
    <Slide15 key="15" />,
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#0a0908]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-[#F76C46]"
          animate={{ width: `${((current + 1) / TOTAL) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Header bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-2.5 pt-1.5">
        <Link href="/" className="font-display text-xs font-black tracking-tight text-white/50 hover:text-white transition-colors">
          FERRO<span className="text-[#F76C46]">CORE</span>
          <span className="ml-1.5 font-sans text-[10px] font-normal text-white/20">User Guide</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block font-mono text-[11px] text-white/25">
            {LABELS[current]}
          </span>
          <span className="font-mono text-[11px] text-white/25">
            {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
          </span>
          <Link href="/" className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/60 transition-colors">
            <X className="h-3 w-3" /> Exit
          </Link>
        </div>
      </div>

      {/* Slide renderer */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring}
          className="absolute inset-0"
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>

      {/* Prev arrow */}
      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="fixed left-3 top-1/2 z-50 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Next arrow */}
      {current < TOTAL - 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          className="fixed right-3 top-1/2 z-50 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Dot navigation */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5">
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}: ${LABELS[i]}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-1.5 w-8 bg-[#F76C46]"
                : "h-1.5 w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
