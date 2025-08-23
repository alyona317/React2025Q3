import type { ChangeEvent } from 'react';


export default interface NativeFormProps {
  formData: any;
  errors: any;
  countries: any[];
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCountrySelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}
