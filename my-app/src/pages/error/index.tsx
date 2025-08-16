import { useTheme } from '@components/ThemeContext/useTheme';

export default function ErrorPage () {
  const { theme } = useTheme();
  return (
    <div className="error__container">
      <h1
        className={theme === 'light' ? 'error_title_Light' : 'error_title_dark'}
      >
        404
      </h1>
      <h2
        className={
          theme === 'light' ? 'error_massage_light' : 'error_massage_dark'
        }
      >
        OOPS! PAGE NOT FOUND
      </h2>
      <img
        src="https://pokestop.io/img/pokemon/psyduck-256x256.png"
        alt="psyduck"
      />
    </div>
  );
};
