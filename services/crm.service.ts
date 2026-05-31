import { MOCK_CONTACTS, MOCK_COMPANIES, MOCK_DEALS } from "@/data/mock-crm";
import type { Contact, Company, Deal, CRMMetrics } from "@/types/crm";
import { sleep } from "@/lib/utils";

export const crmService = {
  async getContacts(): Promise<Contact[]> {
    await sleep(300);
    return MOCK_CONTACTS;
  },

  async getContact(id: string): Promise<Contact | undefined> {
    await sleep(200);
    return MOCK_CONTACTS.find((c) => c.id === id);
  },

  async getCompanies(): Promise<Company[]> {
    await sleep(300);
    return MOCK_COMPANIES;
  },

  async getCompany(id: string): Promise<Company | undefined> {
    await sleep(200);
    return MOCK_COMPANIES.find((c) => c.id === id);
  },

  async getDeals(): Promise<Deal[]> {
    await sleep(300);
    return MOCK_DEALS;
  },

  async getDeal(id: string): Promise<Deal | undefined> {
    await sleep(200);
    return MOCK_DEALS.find((d) => d.id === id);
  },

  async getMetrics(): Promise<CRMMetrics> {
    await sleep(400);
    const totalRevenue = MOCK_DEALS
      .filter((d) => d.stage === "closed_won")
      .reduce((sum, d) => sum + d.value, 0);
    const pipelineValue = MOCK_DEALS
      .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
      .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

    return {
      totalContacts: MOCK_CONTACTS.length,
      totalCompanies: MOCK_COMPANIES.length,
      totalDeals: MOCK_DEALS.length,
      totalRevenue,
      pipelineValue,
      wonDealsThisMonth: 1,
      conversionRate: 25,
      averageDealSize:
        MOCK_DEALS.reduce((sum, d) => sum + d.value, 0) / MOCK_DEALS.length,
    };
  },
};
