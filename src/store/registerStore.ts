import { create } from 'zustand';

interface RegisterState {
  username: string;
  name: string;
  setUserName: (_username: string) => void;
  setName: (_name: string) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  username: '',
  name: '',
  setUserName: (username) => set({ username }),
  setName: (name) => set({ name }),
}));
