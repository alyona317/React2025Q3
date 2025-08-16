'use client';
import { useTheme } from 'next-themes';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className={styles.container}>
      <span className={theme === 'light' ? styles.textLight : styles.textDark}>
        Light
      </span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
      <span className={theme === 'light' ? styles.textLight : styles.textDark}>
        Dark
      </span>
    </div>
  );
};
