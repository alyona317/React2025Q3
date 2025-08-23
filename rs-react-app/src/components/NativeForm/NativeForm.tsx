import { useRef, useState } from 'react';
import styles from './NativeForm.module.css';
import { FormInput } from '@components/FormInput/FormInput';


export const NativeForm = () => {
const [values, setValues] = useState({
  username:'',
  email: '',
  age: '',
  placeholder: '',
  password: '',
  confirmPassword: ''

});
type ValueKeys = keyof typeof values;

type InputConfig = {
  id: number;
  name: ValueKeys; // ✅ теперь name может быть только из values
  placeholder:string;
  label: string;
  type: string;
};
  const inputs: InputConfig[] = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username',
    },
    {
      id: 2,
      name: 'email',
      type: 'text',
      placeholder: 'email',
      label: 'Email',
    },
    {
      id: 3,
      name: 'age',
      type: 'text',
      placeholder: 'Age',
      label: 'Age',
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
    },
  ];
  const handleSabmit =(e:any)=>{
    
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
  }
  const onChange = (e:any)=>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  return (
    <div className={styles.formContainer}>
    <h1>Enter your information</h1>
      <form className={styles.form} onSubmit={handleSabmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};
