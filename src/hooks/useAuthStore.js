import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(persist((set) => ({
  accessToken: null,
  email: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setEmail: (email) => set({ email }),
  logout: () => set({ accessToken: null, email: null }), // Thêm hàm logout
}), { name: "auth" }));
