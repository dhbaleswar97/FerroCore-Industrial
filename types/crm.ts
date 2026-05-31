import type { Address, ContactInfo, Priority, Status, TimeStamps } from "./common";

export type DealStage =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export type CompanySize = "1-10" | "11-50" | "51-200" | "201-500" | "500+";
export type IndustryType =
  | "manufacturing"
  | "construction"
  | "mining"
  | "energy"
  | "logistics"
  | "aerospace"
  | "defense"
  | "other";

export interface Contact extends TimeStamps {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  title: string;
  department?: string;
  companyId?: string;
  company?: Company;
  status: Status;
  tags: string[];
  notes?: string;
  lastContactedAt?: string;
  source?: string;
}

export interface Company extends TimeStamps {
  id: string;
  name: string;
  logo?: string;
  industry: IndustryType;
  size: CompanySize;
  website?: string;
  address: Address;
  contact: ContactInfo;
  revenue?: number;
  employeeCount?: number;
  status: Status;
  tags: string[];
  description?: string;
  contacts?: Contact[];
  deals?: Deal[];
}

export interface Deal extends TimeStamps {
  id: string;
  title: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  contactId?: string;
  contact?: Contact;
  companyId?: string;
  company?: Company;
  assignedToId: string;
  priority: Priority;
  description?: string;
  tags: string[];
  activities?: Activity[];
}

export interface Activity extends TimeStamps {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  title: string;
  description?: string;
  contactId?: string;
  dealId?: string;
  dueDate?: string;
  completedAt?: string;
  userId: string;
  isCompleted: boolean;
}

export interface CRMMetrics {
  totalContacts: number;
  totalCompanies: number;
  totalDeals: number;
  totalRevenue: number;
  pipelineValue: number;
  wonDealsThisMonth: number;
  conversionRate: number;
  averageDealSize: number;
}
