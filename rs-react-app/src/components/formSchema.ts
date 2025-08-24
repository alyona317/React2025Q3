import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z][a-z]*$/, 'Name must start with uppercase'),
    email: z.string().email('Invalid email'),
    age: z.coerce
      .number()
      .refine((val) => !Number.isNaN(val), {
        message: 'Age must be a number',
      })
      .refine((val) => val >= 0, {
        message: 'Age cannot be negative',
      })
      .refine((val) => Number.isInteger(val), {
        message: 'Age must be an integer',
      }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string(),
    
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
