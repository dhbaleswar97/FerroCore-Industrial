"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivityType = "call" | "email" | "meeting" | "note" | "task";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  contact: string;
  company: string;
  date: string;
  status: "completed" | "scheduled" | "overdue";
  assignee: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "act_01",
    type: "call",
    title: "Discovery call — structural steel requirements",
    description: "Discussed Q3 procurement volumes, delivery schedule preferences, and quality certifications needed.",
    contact: "Alex Morrison",
    company: "Titan Construction Group",
    date: "2026-05-30T14:00:00Z",
    status: "completed",
    assignee: "Ryan Alloy",
  },
  {
    id: "act_02",
    type: "email",
    title: "Sent proposal: Aerospace Alloy Q3 Batch",
    description: "Forwarded detailed proposal with pricing, lead times, and material certifications.",
    contact: "Priya Nair",
    company: "Nordic Aerospace Systems",
    date: "2026-05-29T09:30:00Z",
    status: "completed",
    assignee: "Marcus Steel",
  },
  {
    id: "act_03",
    type: "meeting",
    title: "Site visit — Granite Energy Houston facility",
    description: "On-site review of pipeline steel specifications and logistics access points.",
    contact: "Carlos Vega",
    company: "Granite Energy Corp",
    date: "2026-06-05T10:00:00Z",
    status: "scheduled",
    assignee: "Diana Forge",
  },
  {
    id: "act_04",
    type: "task",
    title: "Follow up on Tower Phase 2 contract signature",
    description: "Legal review completed. Awaiting procurement director sign-off.",
    contact: "Alex Morrison",
    company: "Titan Construction Group",
    date: "2026-05-28T00:00:00Z",
    status: "overdue",
    assignee: "Ryan Alloy",
  },
  {
    id: "act_05",
    type: "note",
    title: "Negotiation notes — Aerospace Alloy deal",
    description: "Priya requested 2% price reduction on titanium alloy components. Discussed delivery terms.",
    contact: "Priya Nair",
    company: "Nordic Aerospace Systems",
    date: "2026-05-27T16:45:00Z",
    status: "completed",
    assignee: "Marcus Steel",
  },
  {
    id: "act_06",
    type: "email",
    title: "Invoice sent — Safety Equipment Restock",
    description: "Invoice FC-2847 for $185,000. Payment terms NET-30.",
    contact: "Alex Morrison",
    company: "Titan Construction Group",
    date: "2026-04-28T11:00:00Z",
    status: "completed",
    assignee: "Diana Forge",
  },
];

const TYPE_CONFIG: Record<ActivityType, { icon: typeof Phone; color: string; bg: string; label: string }> = {
  call: { icon: Phone, color: "text-brand-ember", bg: "bg-brand-ember/12", label: "Call" },
  email: { icon: Mail, color: "text-brand-cobalt", bg: "bg-brand-cobalt/12", label: "Email" },
  meeting: { icon: Calendar, color: "text-brand-sand", bg: "bg-brand-sand/12", label: "Meeting" },
  note: { icon: MessageSquare, color: "text-brand-steel", bg: "bg-brand-steel/12", label: "Note" },
  task: { icon: FileText, color: "text-warning", bg: "bg-warning/12", label: "Task" },
};

const STATUS_CONFIG = {
  completed: { icon: CheckCircle2, color: "text-success", label: "Completed" },
  scheduled: { icon: Clock, color: "text-brand-cobalt", label: "Scheduled" },
  overdue: { icon: Clock, color: "text-destructive", label: "Overdue" },
};

const ALL_TYPES: (ActivityType | "all")[] = ["all", "call", "email", "meeting", "note", "task"];

function formatActivityDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function ActivitiesFeed() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const filtered = filter === "all" ? ACTIVITIES : ACTIVITIES.filter((a) => a.type === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">Activities</h1>
          <p className="mt-1 text-muted-foreground">
            {ACTIVITIES.length} total · {ACTIVITIES.filter((a) => a.status === "overdue").length} overdue
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Log Activity
        </Button>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {ALL_TYPES.map((type) => {
          const cfg = type === "all" ? null : TYPE_CONFIG[type];
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors capitalize",
                filter === type
                  ? "bg-brand-ember text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cfg ? cfg.label : "All"}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-px bg-border" />
        <div className="space-y-4">
          {filtered.map((activity, i) => {
            const typeCfg = TYPE_CONFIG[activity.type];
            const TypeIcon = typeCfg.icon;
            const statusCfg = STATUS_CONFIG[activity.status];
            const StatusIcon = statusCfg.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="relative pl-14"
              >
                {/* Icon dot */}
                <div
                  className={cn(
                    "absolute left-0 flex h-10 w-10 items-center justify-center rounded-full",
                    typeCfg.bg
                  )}
                >
                  <TypeIcon className={cn("h-4 w-4", typeCfg.color)} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                            typeCfg.bg, typeCfg.color
                          )}
                        >
                          {typeCfg.label}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1 text-[10px] font-semibold",
                            statusCfg.color
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusCfg.label}
                        </span>
                      </div>
                      <h3 className="font-medium leading-snug">{activity.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">{formatActivityDate(activity.date)}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-3">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {activity.contact} · {activity.company}
                    </span>
                    <span>Assigned: {activity.assignee}</span>
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
