// Demo cấu trúc store với Zustand
import { create } from 'zustand';

interface AppState {
  user: any;
  setUser: (user: any) => void;
  theme: string;
  setTheme: (theme: string) => void;
  notification: string;
  setNotification: (msg: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  notification: '',
  setNotification: (msg) => set({ notification: msg }),
}));
