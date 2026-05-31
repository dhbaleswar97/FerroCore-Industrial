import type { TimeStamps } from "./common";

export type UserRole = "super_admin" | "admin" | "manager" | "operator" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  lastLoginAt?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  sidebarCollapsed: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  digest: "daily" | "weekly" | "none";
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Permission {
  resource: string;
  actions: ("create" | "read" | "update" | "delete" | "export")[];
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export interface TeamMember extends User, TimeStamps {
  position: string;
  phone?: string;
  location?: string;
}
