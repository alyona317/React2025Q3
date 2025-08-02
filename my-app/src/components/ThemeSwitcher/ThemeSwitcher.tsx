import styles from './ThemeSwitcher.module.css'
import { useState } from 'react';
import { useTheme } from '../ThemeContext';

export const ThemeSwitcher = ()=>{
    const [lightMode, setLightMode] = useState(true);


  const handleToggle = () => {
    setLightMode(!lightMode);
  };
  return (
    <>
      <span>Light</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={lightMode} onChange={handleToggle} />
        <span className={styles.slider}></span>
      </label>
      <span>Dark</span>
    </>
  );
}