import styles from './ReactForm.module.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// import type { FormDataType } from '@components/types/FormDataType';

const schema = z
  .object({
    name: z
      .string()
      .min(3, { error: 'Username must be at least 3 characters' })
      .max(16, { error: 'Username must be at most 16 characters' })
      .regex(/^[A-Za-z0-9]+$/, {
        error: 'Username must not include special characters',
      }),
    email: z.email(),
    age: z.coerce
      .number<number>()
      .positive({ error: 'Age cannot be negative' }),
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters' })
      .regex(/[0-9]/, { error: 'Password must include a number' })
      .regex(/[A-Z]/, { error: 'Password must include an uppercase letter' })
      .regex(/[a-z]/, { error: 'Password must include a lowercase letter' })
      .regex(/[!@#$%^&*]/, {
        error: 'Password must include a special character',
      }),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female', 'other'], { error: 'Select a gender' }),
    country: z.string().max(16),
    acceptTerms: z.literal(true, { error: 'You must accept the terms' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormDataType = z.infer<typeof schema>;

export const ReactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    console.log(data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username</label>
        <input
          {...register('name')}
          id="username"
          type="text"
          placeholder="Username"
          className={styles.input}
        />
        {errors.name && (
          <div className={styles.error}>{errors.name.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="age">Age</label>
        <input
          {...register('age')}
          id="age"
          type="number"
          placeholder="Age"
          className={styles.input}
        />
        {errors.age && <div className={styles.error}>{errors.age.message}</div>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="gender">Gender</label>
        <select {...register('gender')} id="gender" className={styles.input}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <div className={styles.error}>{errors.gender.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          {...register('country')}
          id="country"
          type="text"
          placeholder="Country"
          className={styles.input}
        />
        {errors.country && (
          <div className={styles.error}>{errors.country.message}</div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
          <input
            {...register('acceptTerms')}
            type="checkbox"
            id="acceptTerms"
            className={styles.checkbox}
          />
          I accept the terms and conditions
        </label>
        {errors.acceptTerms && (
          <div className={styles.error}>{errors.acceptTerms.message}</div>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
