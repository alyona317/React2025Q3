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
  name: ValueKeys; 
  placeholder: string;
  errorMassage: string;
  label: string;
  pattern: string;
  type: string;
  required: boolean
};
  const inputs: InputConfig[] = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMassage:
        "Username should be 3-16 characters and shouldn't include any special character",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    // {
    //   id: 2,
    //   name: 'email',
    //   type: 'email',
    //   placeholder: 'email',
    //   errorMassage: 'It should be valid email',
    //   label: 'Email',

    //   required: true,
    // },
    {
      id: 3,
      name: 'age',
      type: 'text',
      placeholder: 'Age',
      errorMassage: 'It should be number',
      label: 'Age',
      pattern: '^[0-9]{1,3}$',
      required: true,
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMassage:
        'Password should have 8 characters and it should include 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMassage: 'Passwords dont match',
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
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
