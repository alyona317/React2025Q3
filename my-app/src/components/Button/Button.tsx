import { useState } from "react";
import styles from './Button.module.css'
import { useTheme } from "../ThemeContext";

export const Button =({name}:{name:string})=>{
  const {theme} = useTheme();
  const [isClicked, setIsClicked] = useState(false)
  const setInfo = ()=>{
    setIsClicked(!isClicked)
  }
  return (
    <button
      className={theme === 'light' ? styles.buttonLight : styles.buttonDark}
      onClick={setInfo}
    >
      {name}
    </button>
  );
}