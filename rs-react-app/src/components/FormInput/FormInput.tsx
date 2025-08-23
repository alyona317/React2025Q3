import styles from './FormInput.module.css'


export const FormInput = (props: any)=>{
  const {label, onChange, id, ...inputProps} = props
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} className={styles.input} />
    </div>
  );
}