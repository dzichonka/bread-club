import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import countries from './countries.json';

type CountryState = {
  countries: string[];
};

export const useCountryStore = create<CountryState>()(
  devtools(() => ({ countries: countries }))
);
