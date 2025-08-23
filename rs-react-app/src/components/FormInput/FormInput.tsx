import styles from './FormInput.module.css'
import { useState } from 'react'

export const FormInput = (props: any)=>{
  const [focused, setFocused]= useState(false)
  const {label, onChange, errorMassage, id, ...inputProps} = props;
  const handleFocus = ()=>{
    setFocused(true)
  }
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input 
      {...inputProps} 
      onChange={onChange} 
      className={styles.input} 
      onBlur={handleFocus} 
      focused ={focused.toString()}
      onFocus={()=>
        inputProps.name === "confirmPassword" && setFocused(true)}
       />
      <span className={styles.error}>{errorMassage}</span>
    </div>
  );
}