import { Outlet } from 'react-router-dom';
import { Navbar } from './NavBar/NavBar';
import { useTheme } from './ThemeContext/useTheme';

export const Layout = () => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <Outlet />

      <footer className={theme === 'light' ? 'footerLight' : 'footerDark'}>
        2025
      </footer>
    </>
  );
};
