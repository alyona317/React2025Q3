import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PokemonItem.module.css';
import { useTheme } from '../ThemeContext/useTheme';

export const PokemonItem = (props: { name: string }) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <li
      onClick={() => navigate(`${props.name}`)}
      className={theme === 'light' ? styles.itemLight : styles.itemDark}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        className={
          theme === 'light' ? styles.checkboxLight : styles.checkboxDark
        }
      />
      <span className={theme === 'light' ? styles.nameLight : styles.nameDark}>
        {' '}
        {props.name}{' '}
      </span>
    </li>
  );
};
