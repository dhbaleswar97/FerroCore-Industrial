"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/data/mock-inventory";
import { Button } from "@/components/ui/button";

interface LineItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
}

const MOCK_CUSTOMERS = [
  { id: "cmp_01", name: "Titan Construction Group", email: "procurement@titanconst.example.com" },
  { id: "cmp_02", name: "Nordic Aerospace Systems", email: "supply@nordicaero.example.com" },
  { id: "cmp_03", name: "Granite Energy Corp", email: "ops@granitecorp.example.com" },
  { id: "cust_04", name: "Meridian Infrastructure Ltd", email: "supply@meridian.example.com" },
  { id: "cust_05", name: "Baxter Fabrication Works", email: "orders@baxterfab.example.com" },
];

export function SalesEntryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState("");
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { productId: "", productName: "", sku: "", quantity: 1, unit: "kg", unitPrice: 0, discount: 0 },
  ]);

  const addLine = () =>
    setLineItems((prev) => [...prev, { productId: "", productName: "", sku: "", quantity: 1, unit: "kg", unitPrice: 0, discount: 0 }]);

  const removeLine = (i: number) => setLineItems((prev) => prev.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: keyof LineItem, value: string | number) =>
    setLineItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== i) return item;
        if (field === "productId") {
          const product = MOCK_PRODUCTS.find((p) => p.id === value);
          if (product) return { ...item, productId: product.id, productName: product.name, sku: product.sku, unitPrice: product.unitPrice, unit: product.unit };
        }
        return { ...item, [field]: value };
      })
    );

  const lineTotal = (item: LineItem) => item.quantity * item.unitPrice * (1 - item.discount / 100);
  const subtotal = lineItems.reduce((sum, item) => sum + lineTotal(item), 0);
  const taxAmount = subtotal * 0.085;
  const total = subtotal + taxAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="font-display text-xl font-bold">Sale Created Successfully</h2>
        <p className="mt-2 text-sm text-muted-foreground">Invoice will be generated automatically.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard/sales" className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Back to Sales
          </Link>
          <button onClick={() => setSubmitted(false)} className="rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
            New Sale
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/sales" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Sales
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-semibold">New Sale Entry</span>
      </div>

      <div>
        <h1 className="font-display text-2xl font-black">New Sale</h1>
        <p className="text-sm text-muted-foreground">Fill in customer, products and totals</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer & Date */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="font-display font-bold">Customer Information</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer *</label>
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
              >
                <option value="">Select customer</option>
                {MOCK_CUSTOMERS.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sale Date *</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="font-display font-bold">Products</p>
            <button type="button" onClick={addLine} className="flex items-center gap-1.5 text-xs font-semibold text-brand-ember hover:text-brand-ember/80">
              <Plus className="h-3.5 w-3.5" /> Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Product", "Qty", "Unit", "Unit Price", "Discount %", "Total", ""].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lineItems.map((item, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2">
                      <select
                        value={item.productId}
                        onChange={(e) => updateLine(i, "productId", e.target.value)}
                        className="w-48 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-brand-ember/60"
                      >
                        <option value="">Select product</option>
                        {MOCK_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLine(i, "quantity", parseFloat(e.target.value) || 0)}
                        min="0"
                        className="w-20 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-brand-ember/60"
                      />
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{item.unit || "—"}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateLine(i, "unitPrice", parseFloat(e.target.value) || 0)}
                        step="0.01"
                        min="0"
                        className="w-24 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-brand-ember/60"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) => updateLine(i, "discount", parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        className="w-16 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-brand-ember/60"
                      />
                    </td>
                    <td className="px-4 py-2 font-display text-sm font-semibold">
                      {formatCurrency(lineTotal(item))}
                    </td>
                    <td className="px-4 py-2">
                      {lineItems.length > 1 && (
                        <button type="button" onClick={() => removeLine(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals + Notes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-display font-bold mb-3">Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Internal notes, delivery instructions..."
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <p className="font-display font-bold mb-3">Order Summary</p>
            {[
              { label: "Subtotal", value: formatCurrency(subtotal) },
              { label: "Tax (8.5%)", value: formatCurrency(taxAmount) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span>{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-display font-bold">Total</span>
              <span className="font-display text-xl font-black text-brand-ember">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/dashboard/sales" className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            Cancel
          </Link>
          <Button type="submit" loading={loading}>
            Create Sale
          </Button>
        </div>
      </form>
    </div>
  );
}
