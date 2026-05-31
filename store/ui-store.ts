import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants/app";

interface UIState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  commandPaletteOpen: boolean;
  activeModal: string | null;
  activeSheet: string | null;
  theme: "light" | "dark" | "system";

  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
  toggleSidebarMobile: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  openSheet: (id: string) => void;
  closeSheet: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      sidebarMobileOpen: false,
      commandPaletteOpen: false,
      activeModal: null,
      activeSheet: null,
      theme: "system",

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
      toggleSidebarMobile: () => set((s) => ({ sidebarMobileOpen: !s.sidebarMobileOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),
      openSheet: (id) => set({ activeSheet: id }),
      closeSheet: () => set({ activeSheet: null }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: STORAGE_KEYS.sidebarCollapsed,
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
