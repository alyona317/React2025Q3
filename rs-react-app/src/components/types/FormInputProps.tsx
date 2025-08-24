export  type FormInputProps = {
  label: string;
  errorMessage: string;
  submitted: boolean;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
