export type Gender = 'male' | 'female' | 'other';

export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptTnC: boolean;
  picture?: string;
  country: string;
}

export interface IUserData {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  picture?: string;
  country: string;
}
