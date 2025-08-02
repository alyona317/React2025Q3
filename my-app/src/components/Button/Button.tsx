import { useState } from "react";
import styles from './Button.module.css'

export const Button =({name}:{name:string})=>{
  const [isClicked, setIsClicked] = useState(false)
  const setInfo = ()=>{
    setIsClicked(!isClicked)
  }
  return(
    <button className={styles.button} onClick={setInfo} >{name}</button>
  )
}