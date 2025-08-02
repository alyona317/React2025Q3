import styles from './ThemeSwitcher.module.css'

import { useTheme } from '../ThemeContext';

export const ThemeSwitcher = ()=>{
    const {theme, toggleTheme} = useTheme();

  return (
    <>
      <span>Light</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
      <span>Dark</span>
    </>
  );
}