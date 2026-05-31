import api from "@/lib/axios";
import type { ApiResponse, PaginationMeta } from "@/types/common";

export interface QueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export async function fetchList<T>(
  endpoint: string,
  params?: QueryParams
): Promise<{ data: T[]; meta: PaginationMeta }> {
  const response = await api.get<ApiResponse<T[]>>(endpoint, { params });
  return {
    data: response.data.data,
    meta: response.data.meta!,
  };
}

export async function fetchOne<T>(endpoint: string): Promise<T> {
  const response = await api.get<ApiResponse<T>>(endpoint);
  return response.data.data;
}

export async function create<T, B>(endpoint: string, body: B): Promise<T> {
  const response = await api.post<ApiResponse<T>>(endpoint, body);
  return response.data.data;
}

export async function update<T, B>(endpoint: string, body: Partial<B>): Promise<T> {
  const response = await api.patch<ApiResponse<T>>(endpoint, body);
  return response.data.data;
}

export async function remove(endpoint: string): Promise<void> {
  await api.delete(endpoint);
}
