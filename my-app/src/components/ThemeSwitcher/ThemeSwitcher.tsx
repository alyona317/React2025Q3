import styles from './ThemeSwitcher.module.css';

import { useTheme } from '../ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

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
