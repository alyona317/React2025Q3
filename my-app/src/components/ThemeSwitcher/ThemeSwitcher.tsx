import { useTheme } from '@components/ThemeContext/useTheme';
import styles from './ThemeSwitcher.module.css';
import useSound from 'use-sound';
import clickSound from '@src/assets/sound.mp3';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
      const [play] = useSound(clickSound);

  return (
    <div className={styles.container} >
      <span className={theme === 'light' ? styles.textLight : styles.textDark}>
        Light
      </span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={() => {
            toggleTheme()
            play()
          }}
        />
        <span className={styles.slider}></span>
      </label>
      <span className={theme === 'light' ? styles.textLight : styles.textDark}>
        Dark
      </span>
    </div>
  );
};
