import {
  MOCK_PRODUCTS,
  MOCK_INVENTORY,
  MOCK_WAREHOUSES,
  MOCK_SUPPLIERS,
} from "@/data/mock-inventory";
import type {
  Product,
  InventoryItem,
  Warehouse,
  Supplier,
  InventoryMetrics,
} from "@/types/inventory";
import { sleep } from "@/lib/utils";

export const inventoryService = {
  async getProducts(): Promise<Product[]> {
    await sleep(300);
    return MOCK_PRODUCTS;
  },

  async getProduct(id: string): Promise<Product | undefined> {
    await sleep(200);
    return MOCK_PRODUCTS.find((p) => p.id === id);
  },

  async getInventory(): Promise<InventoryItem[]> {
    await sleep(300);
    return MOCK_INVENTORY.map((item) => ({
      ...item,
      product: MOCK_PRODUCTS.find((p) => p.id === item.productId),
      warehouse: MOCK_WAREHOUSES.find((w) => w.id === item.warehouseId),
    }));
  },

  async getWarehouses(): Promise<Warehouse[]> {
    await sleep(300);
    return MOCK_WAREHOUSES;
  },

  async getSuppliers(): Promise<Supplier[]> {
    await sleep(300);
    return MOCK_SUPPLIERS;
  },

  async getMetrics(): Promise<InventoryMetrics> {
    await sleep(400);
    const totalValue = MOCK_INVENTORY.reduce((sum, item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      return sum + (product?.unitPrice ?? 0) * item.quantity;
    }, 0);

    return {
      totalProducts: MOCK_PRODUCTS.length,
      totalSkus: MOCK_PRODUCTS.length,
      totalValue,
      lowStockItems: MOCK_INVENTORY.filter((i) => i.stockStatus === "low_stock").length,
      outOfStockItems: MOCK_INVENTORY.filter((i) => i.stockStatus === "out_of_stock").length,
      warehouseUtilization:
        MOCK_WAREHOUSES.reduce((sum, w) => sum + w.currentUtilization, 0) /
        MOCK_WAREHOUSES.length,
      pendingOrders: 3,
      turnoverRate: 8.2,
    };
  },
};
