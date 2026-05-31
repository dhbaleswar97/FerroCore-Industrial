export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type MaybePromise<T> = T | Promise<T>;

export type Status = "active" | "inactive" | "pending" | "archived";
export type Priority = "low" | "medium" | "high" | "critical";
export type SortOrder = "asc" | "desc";

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface TableColumn<T = Record<string, unknown>> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (value: T) => React.ReactNode;
  sortable?: boolean;
  width?: number;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "range" | "boolean";
  options?: SelectOption[];
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: Coordinates;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
}

export interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}
