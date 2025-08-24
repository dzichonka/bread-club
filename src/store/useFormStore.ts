import type { IFormData } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type FormState = {
  users: IFormData[];
  addUser: (user: IFormData) => void;
  reset: () => void;
};

const initialUsers: IFormData[] = [
  {
    name: 'Anna',
    age: 25,
    email: 'anna@example.com',
    password: '123456',
    confirmPassword: '123456',
    acceptTnC: true,
    gender: 'female',
    picture: '/images/anna.png',
    country: 'Germany',
  },
  {
    name: 'Bread',
    age: 15,
    email: 'bread-pit@example.com',
    password: '123456',
    confirmPassword: '123456',
    acceptTnC: true,
    gender: 'other',
    picture: '/images/bread.png',
    country: 'Poland',
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
