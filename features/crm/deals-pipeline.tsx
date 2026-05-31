"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_DEALS } from "@/data/mock-crm";
import { formatCurrency, formatDate, titleCase } from "@/lib/utils";
import { DealsTable } from "./deals-table";
import { cn } from "@/lib/utils";

type Stage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";

const STAGES: { id: Stage; label: string; color: string; bg: string }[] = [
  { id: "lead", label: "Lead", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  { id: "qualified", label: "Qualified", color: "#3D55FD", bg: "rgba(61,85,253,0.12)" },
  { id: "proposal", label: "Proposal", color: "#C6AF88", bg: "rgba(198,175,136,0.12)" },
  { id: "negotiation", label: "Negotiation", color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  { id: "closed_won", label: "Won", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  { id: "closed_lost", label: "Lost", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
];

const PRIORITY_COLOR: Record<string, string> = {
  critical: "text-destructive",
  high: "text-warning",
  medium: "text-brand-cobalt",
  low: "text-muted-foreground",
};

export function DealsPipeline() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const totalPipeline = MOCK_DEALS
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">Deals</h1>
          <p className="mt-1 text-muted-foreground">
            {MOCK_DEALS.length} deals · Weighted pipeline:{" "}
            <span className="font-semibold text-foreground">{formatCurrency(totalPipeline)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted p-1">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "kanban" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
          </div>
          <Button>
            <Plus className="h-4 w-4" /> Add Deal
          </Button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: `${STAGES.length * 280}px` }}>
            {STAGES.map((stage) => {
              const stageDeals = MOCK_DEALS.filter((d) => d.stage === stage.id);
              const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);

              return (
                <div key={stage.id} className="flex w-[260px] shrink-0 flex-col gap-3">
                  {/* Column header */}
                  <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: stage.bg }}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: stage.color }} />
                      <span className="text-sm font-semibold" style={{ color: stage.color }}>{stage.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{stageDeals.length}</span>
                  </div>

                  {stageTotal > 0 && (
                    <p className="px-1 text-xs text-muted-foreground">
                      {formatCurrency(stageTotal)}
                    </p>
                  )}

                  {/* Deal cards */}
                  <div className="space-y-2.5">
                    {stageDeals.map((deal, i) => (
                      <motion.div
                        key={deal.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group cursor-pointer rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-card hover:-translate-y-0.5"
                      >
                        <p className="text-sm font-medium leading-snug">{deal.title}</p>
                        <p className="mt-2 font-display text-base font-bold" style={{ color: stage.color }}>
                          {formatCurrency(deal.value)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${deal.probability}%`, background: stage.color }}
                            />
                          </div>
                          <span className="ml-2 text-xs text-muted-foreground">{deal.probability}%</span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span className={cn("font-semibold capitalize", PRIORITY_COLOR[deal.priority])}>
                            {deal.priority}
                          </span>
                          <span>Close: {formatDate(deal.expectedCloseDate)}</span>
                        </div>
                      </motion.div>
                    ))}

                    {stageDeals.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-xs text-muted-foreground">
                        No deals
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <DealsTable />
      )}
    </div>
  );
}
