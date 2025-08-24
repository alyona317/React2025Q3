import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formSchema } from '@components/formSchema';
import { FormInput } from '@components/FormInput/FormInput';
import { addForm } from '../../store/formSlice';
import type { AppDispatch } from '../../store/index';
import styles from './NativeForm.module.css';

export const NativeForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const inputs = [
    {
      id: 'username',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username',
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
    },
    {
      id: 'age',
      name: 'age',
      type: 'number',
      placeholder: 'Age',
      label: 'Age',
    },
    {
      id: 'password',
      name: 'password',
      type: 'text',
      placeholder: 'Password',
      label: 'Password',
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'text',
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const form = formRef.current;
    if (!form) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = formSchema.safeParse({
      ...data,
      age: Number(data.age),
    });

    if (!parsed.success) {
      const formErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        if (issue.path[0]) formErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formErrors);
    } else {
      setErrors({});
      dispatch(addForm(parsed.data));
      console.log('✅ Valid data', parsed.data);
      form.reset();
      setSubmitted(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}
      noValidate
    >
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          submitted={submitted}
          errorMessage={errors[input.name]}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
