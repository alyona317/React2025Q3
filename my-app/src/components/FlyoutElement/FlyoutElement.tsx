import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTheme } from '@components/ThemeContext/useTheme';
import { Button } from '@components/Button/Button';
import { resetCount } from '@features/count/CountSlice';
import { type RootState } from '@app/store';
import styles from './FlyoutElement.module.css';

export const FlyoutElement = () => {
  const { theme } = useTheme();

  const checkedCount = useSelector(
    (state: RootState) => state.counter.checkedCount
  );

  const dispatch = useDispatch();

  const unselect = () => {
    dispatch(resetCount());
  };
  const notWorking = () => {
    return console.log('not working');
  };

  return (
    <div
      className={checkedCount === 0 ? styles.containerHide : styles.container}
    >
      <p className={theme === 'light' ? styles.textLight : styles.textDark}>
        <span
          className={theme === 'light' ? styles.countLight : styles.countDark}
        >
          {' '}
          {checkedCount}{' '}
        </span>
        items are selected
      </p>
      <div className={styles.buttons}>
        <Button name="Download" onClick={notWorking} />
        <Button name="Unselect all" onClick={unselect} />
      </div>
    </div>
  );
};
