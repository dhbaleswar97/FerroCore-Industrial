"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Package, Users, ShoppingCart, FileBarChart, Settings2 } from "lucide-react";
import Link from "next/link";

const SOLUTIONS = [
  {
    id: "erp",
    icon: Package,
    label: "Inventory ERP",
    tagline: "Real-time stock control across all warehouses",
    desc: "Track inventory levels, movements, and reorder points across multiple warehouses. Get low-stock alerts before you run out. Manage stock entries, adjustments and transfers from a single dashboard.",
    features: ["Multi-warehouse tracking", "Low-stock alerts", "Stock entry forms", "Movement history", "Activity logs", "Reorder automation"],
    cta: "Explore Inventory",
    href: "/auth/register",
    color: "ember",
  },
  {
    id: "crm",
    icon: Users,
    label: "CRM Platform",
    tagline: "Complete customer relationship management",
    desc: "Manage contacts, companies, deals and the full sales pipeline. Track deal stages, assign tasks, log communications and forecast revenue — built for industrial sales teams.",
    features: ["Contact management", "Deal pipeline", "Company profiles", "Activity tracking", "Email integration", "Revenue forecasting"],
    cta: "Explore CRM",
    href: "/auth/register",
    color: "cobalt",
  },
  {
    id: "sales",
    icon: ShoppingCart,
    label: "Sales Operations",
    tagline: "End-to-end sales and invoicing workflows",
    desc: "Create sales entries, generate professional invoices, track payment status and monitor individual salesperson performance — all from one sales operations hub.",
    features: ["Sale entry forms", "Invoice generation", "Payment tracking", "Lead management", "Salesperson dashboards", "Excel/PDF exports"],
    cta: "Explore Sales",
    href: "/auth/register",
    color: "sand",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics & BI",
    tagline: "Business intelligence for industrial operations",
    desc: "Visualize revenue trends, inventory movement patterns, customer analytics and KPIs in real time. From executive summaries to granular product-level reports.",
    features: ["Revenue analytics", "Product performance", "Customer insights", "KPI dashboards", "Trend heatmaps", "Exportable reports"],
    cta: "Explore Analytics",
    href: "/auth/register",
    color: "steel",
  },
  {
    id: "products",
    icon: Settings2,
    label: "Product Catalog",
    tagline: "Centralized product and material management",
    desc: "Maintain a complete digital catalog with grades, specifications, material certifications and pricing. Manage 1,200+ SKUs across all 10 product categories with bulk editing tools.",
    features: ["Full CRUD interface", "Specification management", "Grade classifications", "Category management", "Bulk actions", "Product search engine"],
    cta: "Explore Catalog",
    href: "/auth/register",
    color: "citrine",
  },
  {
    id: "reports",
    icon: FileBarChart,
    label: "Reporting Engine",
    tagline: "Automated reports — daily, weekly, monthly",
    desc: "Generate executive summaries, salesperson performance reports, inventory movement reports and financial statements. Export to Excel or PDF in one click.",
    features: ["Executive summary", "Sales reports", "Inventory reports", "Financial statements", "Scheduled exports", "Manager dashboards"],
    cta: "Explore Reports",
    href: "/auth/register",
    color: "ember",
  },
];

const colorMap: Record<string, { badge: string; accent: string; iconBg: string }> = {
  ember: { badge: "border-brand-ember/25 bg-brand-ember/8 text-brand-ember", accent: "bg-brand-ember", iconBg: "bg-brand-ember/10 text-brand-ember" },
  cobalt: { badge: "border-brand-cobalt/25 bg-brand-cobalt/8 text-brand-cobalt", accent: "bg-brand-cobalt", iconBg: "bg-brand-cobalt/10 text-brand-cobalt" },
  sand: { badge: "border-brand-sand/25 bg-brand-sand/8 text-brand-sand", accent: "bg-brand-sand", iconBg: "bg-brand-sand/10 text-brand-sand" },
  steel: { badge: "border-brand-steel/25 bg-brand-steel/8 text-brand-steel", accent: "bg-brand-steel", iconBg: "bg-brand-steel/10 text-brand-steel" },
  citrine: { badge: "border-brand-citrine/25 bg-brand-citrine/8 text-brand-citrine", accent: "bg-brand-citrine", iconBg: "bg-brand-citrine/10 text-brand-citrine" },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-dvh pt-20">
      <section className="border-b border-border bg-[#0d0c0b] py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-block rounded-full border border-brand-cobalt/30 bg-brand-cobalt/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cobalt">
              Platform Solutions
            </span>
            <h1 className="font-display text-5xl font-black tracking-tight text-white lg:text-6xl">
              One platform.<br />
              <span className="text-brand-ember">Six powerful modules.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              FerroCore combines inventory ERP, CRM, sales operations, analytics and reporting into a single enterprise platform designed for industrial trading companies.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-7xl space-y-20">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon;
            const colors = colorMap[sol.color];
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <span className={`mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${colors.badge}`}>
                    {sol.label}
                  </span>
                  <h2 className="font-display text-3xl font-black tracking-tight lg:text-4xl">{sol.tagline}</h2>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{sol.desc}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${colors.accent}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={sol.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-ember px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    {sol.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className={`flex items-center ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="w-full rounded-2xl border border-border bg-card p-8">
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="font-display text-2xl font-black">{sol.label}</p>
                    <div className="mt-6 space-y-3">
                      {sol.features.map((f, fi) => (
                        <div key={f} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2.5">
                          <span className="text-sm">{f}</span>
                          <span className={`h-2 w-2 rounded-full ${fi < 4 ? colors.accent : "bg-muted-foreground/30"}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
