import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PokemonItem.module.css';
import { useTheme } from '../ThemeContext/useTheme';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';
import { increment, decrement } from '../../features/count/CountSlice';
import { useDispatch } from 'react-redux';

export const PokemonItem = (props: { name: string }) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (e.target.checked) {
      dispatch(increment());
    } else {
      dispatch(decrement());
    }
  };

  const checkedCount = useSelector(
    (state: RootState) => state.counter.checkedCount
  );
  useEffect(() => {
    if (checkedCount === 0) {
      setChecked(false);
    }
  }, [checkedCount]);

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
