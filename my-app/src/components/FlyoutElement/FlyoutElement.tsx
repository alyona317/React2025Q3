import styles from './FlyoutElement.module.css';
import { Button } from '../Button/Button';
import { useTheme } from '../ThemeContext';

export const FlyoutElement = () => {
  const { theme } = useTheme();
  return (
    <div className={styles.container}>
      <p className={theme === 'light' ? styles.textLight : styles.textDark}>
        <span
          className={theme === 'light' ? styles.countLight : styles.countDark}
        ></span>{' '}
        items are selected
      </p>
      <div className={styles.buttons}>
        <Button name="Download" />
        <Button name="Unselect all" />
      </div>
    </div>
  );
};
