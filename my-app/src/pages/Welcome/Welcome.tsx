import { useTheme } from '../../components/ThemeContext/useTheme';

export const Welcome = () => {
  const { theme } = useTheme();
  return (
    <div className="error__container">
      <h1 className={theme === 'light' ? 'titleLight' : 'titleDark'}>
        Welcome to pokemon searching
      </h1>
      <img
        src="https://wallpapers.com/images/high/every-legendary-pokemon-651dl7pr5nrs7bgu.webp"
        alt="pokemons"
      />
    </div>
  );
};
