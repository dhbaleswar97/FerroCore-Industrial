"use client";

import { useState } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/mock-inventory";
import { MOCK_WAREHOUSES } from "@/data/mock-inventory";
import { Button } from "@/components/ui/button";

type EntryType = "in" | "out" | "transfer" | "adjustment";

const ENTRY_TYPES: { value: EntryType; label: string; desc: string }[] = [
  { value: "in", label: "Stock In", desc: "Receive new stock from supplier or PO" },
  { value: "out", label: "Stock Out", desc: "Dispatch stock for sale or use" },
  { value: "transfer", label: "Transfer", desc: "Move stock between warehouses" },
  { value: "adjustment", label: "Adjustment", desc: "Correct stock count after cycle count" },
];

export function StockEntryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>("in");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="font-display text-xl font-bold">Stock Entry Recorded</h2>
        <p className="mt-2 text-sm text-muted-foreground">Inventory levels have been updated and logged to the activity feed.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard/inventory" className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Back to Inventory
          </Link>
          <button onClick={() => setSubmitted(false)} className="rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90">
            New Entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/inventory" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Inventory
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-semibold">Daily Stock Entry</span>
      </div>

      <div>
        <h1 className="font-display text-2xl font-black">Daily Stock Entry</h1>
        <p className="text-sm text-muted-foreground">Record stock movements — receipts, dispatches, transfers and adjustments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Entry Type */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="font-display font-bold">Movement Type</p>
          <div className="grid grid-cols-2 gap-3">
            {ENTRY_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setEntryType(type.value)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  entryType === type.value
                    ? "border-brand-ember bg-brand-ember/8 text-brand-ember"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <p className="font-display text-sm font-bold">{type.label}</p>
                <p className="mt-1 text-xs opacity-70">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Product & Location */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="font-display font-bold">Product & Location</p>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product *</label>
            <select required className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20">
              <option value="">Select product</option>
              {MOCK_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {entryType === "transfer" ? "From Warehouse *" : "Warehouse *"}
              </label>
              <select required className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20">
                <option value="">Select warehouse</option>
                {MOCK_WAREHOUSES.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            {entryType === "transfer" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">To Warehouse *</label>
                <select required className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20">
                  <option value="">Select warehouse</option>
                  {MOCK_WAREHOUSES.map((w) => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Quantity & Reference */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="font-display font-bold">Quantity & Details</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quantity {entryType === "adjustment" ? "(use negative for deduction)" : ""} *
              </label>
              <input
                type="number"
                required
                placeholder={entryType === "adjustment" ? "e.g. -200 or 150" : "0"}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</label>
              <input
                type="text"
                placeholder={entryType === "in" ? "PO-2026-XXXX" : entryType === "out" ? "FC-2026-XXXX" : "TRF-2026-XX"}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reason / Notes</label>
            <textarea
              rows={3}
              placeholder="Reason for this movement..."
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/inventory" className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            Cancel
          </Link>
          <Button type="submit" loading={loading}>
            Record Movement
          </Button>
        </div>
      </form>
    </div>
  );
}
