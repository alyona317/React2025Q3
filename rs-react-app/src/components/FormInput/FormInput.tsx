import styles from './FormInput.module.css'
import { useState } from 'react'
import type { FormInputProps } from '@components/types/FormInputProps'


export const FormInput = ({
  label,
  errorMessage,
  submitted,
  id,
  ...inputProps
}: FormInputProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={String(id)}>{label}</label>
      <input
        {...inputProps}
        id={String(id)}
        className={styles.input}
        onBlur={handleFocus}
        data-focused={focused.toString()}
      />
      {submitted && errorMessage && (
        <span className={styles.error}>{errorMessage}</span>
      )}
    </div>
  );
};