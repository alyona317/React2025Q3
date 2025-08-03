import { Outlet } from 'react-router-dom';
import { Navbar } from './NavBar/NavBar';
import { useTheme } from './ThemeContext/useTheme';
import { FlyoutElement } from './FlyoutElement/FlyoutElement';

export const Layout = () => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <Outlet />
      <FlyoutElement/>
      <footer className={theme === 'light' ? 'footerLight' : 'footerDark'}>
        2025
      </footer>
    </>
  );
};
