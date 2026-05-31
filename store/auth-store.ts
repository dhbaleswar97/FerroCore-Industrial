import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@/types/auth";
import { MOCK_USERS } from "@/data/mock-users";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_USERS[0],
      session: null,
      isLoading: false,
      isAuthenticated: true,

      login: async (_email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        set({
          user: MOCK_USERS[0],
          isAuthenticated: true,
          isLoading: false,
          session: {
            user: MOCK_USERS[0],
            accessToken: "mock_access_token",
            refreshToken: "mock_refresh_token",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        });
      },

      logout: () => {
        set({ user: null, session: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          window.location.href = "/auth/login";
        }
      },

      setUser: (user) => set({ user }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "ferrocore-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
