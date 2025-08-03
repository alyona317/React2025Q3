// import { useState } from 'react';
import styles from './Button.module.css';
import { useTheme } from '../ThemeContext/useTheme';

interface ButtonProps {
  name: string;
  onClick: () => void;
}
export const Button = ({ name, onClick }: ButtonProps) => {
  const { theme } = useTheme();
  // const [isClicked, setIsClicked] = useState(false);

  // const setInfo = () => {
  //   setIsClicked(!isClicked);
  // };

  return (
    <button
      className={theme === 'light' ? styles.buttonLight : styles.buttonDark}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
