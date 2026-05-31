"use client";

import Link from "next/link";
import { Users, Building2, Handshake, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_DEALS } from "@/data/mock-crm";
import { formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants/app";

const PIPELINE_VALUE = MOCK_DEALS
  .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
  .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

const STATS = [
  { label: "Total Contacts", value: "3", icon: Users, href: ROUTES.crm.contacts, color: "text-brand-ember" },
  { label: "Companies", value: "3", icon: Building2, href: ROUTES.crm.companies, color: "text-brand-cobalt" },
  { label: "Open Deals", value: "3", icon: Handshake, href: ROUTES.crm.deals, color: "text-brand-sand" },
  { label: "Pipeline Value", value: formatCurrency(PIPELINE_VALUE), icon: TrendingUp, href: ROUTES.crm.deals, color: "text-brand-steel" },
];

export function CRMOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">CRM</h1>
          <p className="mt-1 text-muted-foreground">Manage contacts, companies, and deals.</p>
        </div>
        <Button>Add Contact</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}>
            <Card className="transition-all hover:shadow-elevated hover:-translate-y-0.5">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-muted p-3">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-display text-xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[ROUTES.crm.contacts, ROUTES.crm.companies, ROUTES.crm.deals].map((href, i) => (
          <Link key={href} href={href}>
            <Card className="p-6 transition-all hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer">
              <p className="text-sm font-semibold">
                {["Contacts", "Companies", "Deals"][i]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {["Manage customer contacts", "Track company relationships", "Monitor sales pipeline"][i]}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
