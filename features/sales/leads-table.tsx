"use client";

import { useState } from "react";
import { Search, Plus, TrendingUp, User, Building2 } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { MOCK_LEADS } from "@/data/mock-sales";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-brand-cobalt/15 text-brand-cobalt" },
  contacted: { label: "Contacted", className: "bg-brand-steel/15 text-brand-steel" },
  qualified: { label: "Qualified", className: "bg-warning/15 text-warning" },
  proposal: { label: "Proposal", className: "bg-brand-sand/15 text-brand-sand" },
  converted: { label: "Converted", className: "bg-success/15 text-success" },
  lost: { label: "Lost", className: "bg-destructive/15 text-destructive" },
};

const SOURCE_LABELS: Record<string, string> = {
  website: "Website", referral: "Referral", cold_call: "Cold Call",
  trade_show: "Trade Show", linkedin: "LinkedIn", email: "Email",
};

const KANBAN_STATUSES = ["new", "contacted", "qualified", "proposal", "converted"] as const;

export function LeadsTable() {
  const [view, setView] = useState<"table" | "kanban">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_LEADS.filter((l) => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || (l.company ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Lead Pipeline</h2>
          <p className="text-sm text-muted-foreground">{MOCK_LEADS.filter((l) => l.status !== "converted" && l.status !== "lost").length} active leads</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border bg-card p-0.5">
            {(["table", "kanban"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn("rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors", view === v ? "bg-brand-ember text-white" : "text-muted-foreground hover:text-foreground")}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-brand-ember px-3 py-2 text-xs font-bold text-white hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Add Lead
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, companies..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {view === "table" ? (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Lead", "Company", "Source", "Value", "Assigned To", "Last Contact", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status];
                  return (
                    <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-cobalt/10 text-brand-cobalt">
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="font-display text-sm font-semibold">{lead.name}</p>
                            {lead.title && <p className="text-xs text-muted-foreground">{lead.title}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {lead.company ? (
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{lead.company}</span>
                          </div>
                        ) : <span className="text-sm text-muted-foreground">—</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{SOURCE_LABELS[lead.source] ?? lead.source}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {lead.value ? (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3.5 w-3.5 text-brand-ember" />
                            <span className="font-display font-bold text-sm">{formatCurrency(lead.value)}</span>
                          </div>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{lead.assignedToName ?? "—"}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {lead.lastContactedAt ? formatDate(lead.lastContactedAt) : "Not contacted"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-5">
          {KANBAN_STATUSES.map((status) => {
            const cfg = STATUS_CONFIG[status];
            const statusLeads = MOCK_LEADS.filter((l) => l.status === status);
            return (
              <div key={status} className="min-w-[200px] rounded-2xl border border-border bg-muted/30 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold", cfg.className)}>{cfg.label}</span>
                  <span className="text-xs text-muted-foreground">{statusLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {statusLeads.map((lead) => (
                    <div key={lead.id} className="rounded-xl border border-border bg-card p-3">
                      <p className="font-display text-sm font-semibold truncate">{lead.name}</p>
                      {lead.company && <p className="text-xs text-muted-foreground truncate">{lead.company}</p>}
                      {lead.value && (
                        <p className="mt-2 font-display text-xs font-bold text-brand-ember">{formatCurrency(lead.value)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
