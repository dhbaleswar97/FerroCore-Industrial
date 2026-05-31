export type SaleStatus = "draft" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type InvoiceStatus = "unpaid" | "partial" | "paid" | "overdue" | "cancelled";
export type PaymentMethod = "bank_transfer" | "cheque" | "cash" | "credit" | "lc";
export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "converted" | "lost";
export type LeadSource = "website" | "referral" | "cold_call" | "trade_show" | "linkedin" | "email";

export interface SaleLineItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface SaleEntry {
  id: string;
  saleNumber: string;
  customerId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  salespersonId: string;
  salespersonName: string;
  lineItems: SaleLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  currency: string;
  status: SaleStatus;
  paymentStatus: InvoiceStatus;
  saleDate: string;
  expectedDelivery?: string;
  notes?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  saleId: string;
  saleNumber: string;
  customerId: string;
  customerName: string;
  customerAddress?: string;
  lineItems: SaleLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  currency: string;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  source: LeadSource;
  status: LeadStatus;
  value?: number;
  currency: string;
  assignedToId?: string;
  assignedToName?: string;
  productInterest?: string[];
  notes?: string;
  lastContactedAt?: string;
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesPerformance {
  salespersonId: string;
  salespersonName: string;
  avatar?: string;
  totalSales: number;
  totalRevenue: number;
  avgDealSize: number;
  conversionRate: number;
  target: number;
  achievement: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  warehouseId: string;
  warehouseName: string;
  type: "in" | "out" | "transfer" | "adjustment";
  quantity: number;
  unit: string;
  reference?: string;
  reason?: string;
  performedById: string;
  performedByName: string;
  movedAt: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: "stock_in" | "stock_out" | "transfer" | "adjustment" | "reorder_alert" | "new_product" | "product_updated" | "supplier_order";
  entityType: "product" | "warehouse" | "supplier" | "inventory";
  entityId: string;
  entityName: string;
  description: string;
  metadata?: Record<string, string | number>;
  performedById: string;
  performedByName: string;
  createdAt: string;
}
