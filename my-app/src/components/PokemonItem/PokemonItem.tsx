import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@components/ThemeContext/useTheme';
import { increment, decrement } from '@features/count/CountSlice';
import { type RootState } from '../../app/store';
import styles from './PokemonItem.module.css';

export const PokemonItem = (props: { name: string }) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkedCount = useSelector(
    (state: RootState) => state.counter.checkedCount
  );

  useEffect(() => {
    if (checkedCount === 0) {
      setChecked(false);
    }
  }, [checkedCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (e.target.checked) {
      dispatch(increment());
    } else {
      dispatch(decrement());
    }
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
        {props.name}
      </span>
    </li>
  );
};
