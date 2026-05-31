"use client";

import { useState } from "react";
import { Search, Download, FileText, Eye } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { MOCK_INVOICES } from "@/data/mock-sales";

const STATUS_STYLE: Record<string, { label: string; className: string }> = {
  unpaid: { label: "Unpaid", className: "bg-muted text-muted-foreground" },
  partial: { label: "Partial", className: "bg-warning/15 text-warning" },
  paid: { label: "Paid", className: "bg-success/15 text-success" },
  overdue: { label: "Overdue", className: "bg-destructive/15 text-destructive" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground" },
};

export function InvoiceTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const filtered = MOCK_INVOICES.filter((inv) => {
    const matchSearch = !search ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selected = MOCK_INVOICES.find((i) => i.id === selectedInvoice);

  const totalOutstanding = MOCK_INVOICES.filter((i) => i.status !== "paid" && i.status !== "cancelled")
    .reduce((sum, i) => sum + i.balanceDue, 0);

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Invoiced", value: formatCurrency(MOCK_INVOICES.reduce((s, i) => s + i.total, 0)), color: "text-foreground" },
          { label: "Outstanding", value: formatCurrency(totalOutstanding), color: "text-warning" },
          { label: "Overdue", value: formatCurrency(MOCK_INVOICES.filter((i) => i.status === "overdue").reduce((s, i) => s + i.balanceDue, 0)), color: "text-destructive" },
          { label: "Collected", value: formatCurrency(MOCK_INVOICES.reduce((s, i) => s + i.amountPaid, 0)), color: "text-success" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={cn("font-display text-xl font-black mt-1", color)}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices, customers..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_STYLE).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted transition-colors">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className={cn("rounded-2xl border border-border bg-card overflow-hidden", selectedInvoice ? "lg:col-span-2" : "lg:col-span-3")}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Invoice #", "Customer", "Issue Date", "Due Date", "Total", "Balance Due", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((inv) => {
                  const cfg = STATUS_STYLE[inv.status];
                  return (
                    <tr key={inv.id} className={cn("hover:bg-muted/20 transition-colors cursor-pointer", selectedInvoice === inv.id && "bg-brand-ember/5")}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-brand-ember" />
                          <span className="font-mono text-sm">{inv.invoiceNumber}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-display text-sm font-semibold">{inv.customerName}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(inv.issueDate)}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(inv.dueDate)}</td>
                      <td className="px-5 py-3.5 font-display font-bold">{formatCurrency(inv.total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("font-bold", inv.balanceDue > 0 ? "text-warning" : "text-success")}>
                          {formatCurrency(inv.balanceDue)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setSelectedInvoice(selectedInvoice === inv.id ? null : inv.id)}
                          className="text-muted-foreground hover:text-brand-ember transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-display font-bold">Invoice Preview</p>
              <button onClick={() => setSelectedInvoice(null)} className="text-xs text-muted-foreground hover:text-foreground">Close</button>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-mono text-brand-ember font-semibold">{selected.invoiceNumber}</p>
              <p className="font-display font-bold">{selected.customerName}</p>
              {selected.customerAddress && <p className="text-xs text-muted-foreground">{selected.customerAddress}</p>}
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              {selected.lineItems.map((li, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div>
                    <p className="font-medium">{li.productName}</p>
                    <p className="text-muted-foreground">{li.quantity} {li.unit} × ${li.unitPrice}</p>
                  </div>
                  <span className="font-display font-bold">{formatCurrency(li.total)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 border-t border-border pt-3 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatCurrency(selected.subtotal)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax ({selected.taxRate}%)</span><span>{formatCurrency(selected.taxAmount)}</span></div>
              <div className="flex justify-between font-display font-black text-base border-t border-border pt-2 mt-2">
                <span>Total</span><span className="text-brand-ember">{formatCurrency(selected.total)}</span>
              </div>
            </div>
            <button className="w-full rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
