import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type FormData = {
  name: string;
  email: string;
  bread: string;
};

type FormState = {
  users: FormData[];
  addUser: (user: FormData) => void;
  reset: () => void;
};

const initialUsers: FormData[] = [
  { name: 'Anna', email: 'anna@example.com', bread: 'Baguette' },
  { name: 'Bob', email: 'bob@example.com', bread: 'Ciabatta' },
];

export const useFormStore = create<FormState>()(
  devtools((set) => ({
    users: initialUsers,
    addUser: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),
    reset: () => set({ users: initialUsers }),
  }))
);
