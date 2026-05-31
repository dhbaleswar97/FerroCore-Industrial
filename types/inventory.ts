import type { Status, TimeStamps } from "./common";

export type ProductCategory =
  | "raw_materials"
  | "structural_steel"
  | "alloys"
  | "fasteners"
  | "coatings"
  | "tools"
  | "machinery"
  | "safety"
  | "consumables";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "discontinued";
export type UnitOfMeasure = "kg" | "ton" | "piece" | "meter" | "liter" | "set";

export interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
}

export interface Product extends TimeStamps {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: ProductCategory;
  subcategory?: string;
  images: string[];
  specifications: ProductSpec[];
  unitPrice: number;
  currency: string;
  unit: UnitOfMeasure;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  status: Status;
  tags: string[];
  supplierId?: string;
  supplier?: Supplier;
}

export interface InventoryItem extends TimeStamps {
  id: string;
  productId: string;
  product?: Product;
  warehouseId: string;
  warehouse?: Warehouse;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderPoint: number;
  reorderQuantity: number;
  stockStatus: StockStatus;
  lastRestockedAt?: string;
  batchNumber?: string;
  expiryDate?: string;
  location?: string;
}

export interface Warehouse extends TimeStamps {
  id: string;
  name: string;
  code: string;
  address: string;
  capacity: number;
  currentUtilization: number;
  status: Status;
  manager?: string;
}

export interface Supplier extends TimeStamps {
  id: string;
  name: string;
  code: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  country: string;
  rating: number;
  paymentTerms: string;
  leadTimeDays: number;
  status: Status;
  categories: ProductCategory[];
}

export interface PurchaseOrder extends TimeStamps {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplier?: Supplier;
  items: PurchaseOrderItem[];
  status: "draft" | "sent" | "confirmed" | "partial" | "received" | "cancelled";
  totalAmount: number;
  currency: string;
  expectedDeliveryDate: string;
  deliveredAt?: string;
  notes?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
}

export interface InventoryMetrics {
  totalProducts: number;
  totalSkus: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  warehouseUtilization: number;
  pendingOrders: number;
  turnoverRate: number;
}
