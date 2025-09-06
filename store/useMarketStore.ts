import { apiFetch } from "@/lib/api";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StoreState {
  isAuth: boolean;
  loading: boolean;
  user: User | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setIsAuth: (isAuth: boolean) => void;
}

export const useMarketStore = create<StoreState>()(
  persist(
    devtools((set) => ({
      isAuth: false,
      loading: false,
      user: null,

      fetchUser: async () => {
        set({ loading: true });
        try {
          const data = await apiFetch("/users/me");

          set({
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
            },
            isAuth: true,
          });
        } catch (error) {
          set({ isAuth: false, user: null });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await apiFetch("/auth/logout", {
            method: "POST",
          });
        } finally {
          set({ isAuth: false, user: null });
        }
      },

      setIsAuth: (isAuth) => set({ isAuth }),
    })),
    { name: "auth-store" },
  ),
);
