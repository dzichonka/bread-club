import { z } from 'zod';

export const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((val) => /^[A-ZА-Я]/.test(val), {
        message: 'First letter must be uppercase',
      }),

    age: z
      .string()
      .regex(/^\d+$/, 'Age must be a number')
      .refine((val) => Number(val) > 0, { message: 'Age must be positive' }),

    email: z.email('Invalid email'),

    password: z.string(),

    confirmPassword: z.string(),

    gender: z.string().min(1, 'Gender is required'),

    picture: z
      .instanceof(FileList)
      .refine((files) => files?.length === 1, {
        message: 'Picture is required',
      })
      .refine(
        (files) =>
          files && ['image/png', 'image/jpeg'].includes(files[0]?.type),
        { message: 'Only PNG or JPEG allowed' }
      )
      .refine((files) => files && files[0]?.size <= 2_000_000, {
        message: 'File must be smaller than 2MB',
      }),

    country: z.string().min(1, 'Country is required'),

    acceptTnC: z.literal(true, {
      message: 'You must accept T&C',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof schema>;
