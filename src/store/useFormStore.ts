import type { IFormData } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User extends IFormData {
  id: string;
}

type FormState = {
  users: User[];
  newlyAddedId: string | null;
  addUser: (user: Omit<IFormData, 'id'>) => void;
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
  devtools(
    (set) => ({
      users: initialUsers,
      newlyAddedId: null,
      addUser: (user) =>
        set((state) => {
          const id = crypto.randomUUID();
          return {
            users: [...state.users, { ...user, id }],
            newlyAddedId: id,
          };
        }),
      reset: () => set({ users: [], newlyAddedId: null }),
    }),
    { name: 'FormStore' }
  )
);
