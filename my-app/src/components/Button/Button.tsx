import styles from './Button.module.css';
import { useTheme } from '@components/ThemeContext/useTheme';


interface ButtonProps {
  name: string;
  onClick: () => void;
}
export const Button = ({ name, onClick }: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      className={theme === 'light' ? styles.buttonLight : styles.buttonDark}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
