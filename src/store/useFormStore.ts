import type { IUserData } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type FormState = {
  users: FormData[];
  addUser: (user: FormData) => void;
  reset: () => void;
};

const initialUsers: IUserData[] = [
  {
    name: 'Anna',
    age: 25,
    email: 'anna@example.com',
    gender: 'female',
    picture: '/images/anna.png',
    country: 'Germany',
  },
  {
    name: 'Bread',
    age: 15,
    email: 'bread-pit@example.com',
    gender: 'other',
    country: 'Germany',
  },
];

export const useFormStore = create<FormState>()(
  devtools((set) => ({
    users: initialUsers,
    addUser: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),
    reset: () => set({ users: [] }),
  }))
);
