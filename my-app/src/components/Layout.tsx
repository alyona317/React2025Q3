import { Outlet } from 'react-router-dom';
import { Navbar } from '@components/NavBar/NavBar';
import { useTheme } from '@components/ThemeContext/useTheme';
import { FlyoutElement } from '@components/FlyoutElement/FlyoutElement';

export const Layout = () => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <Outlet />
      <FlyoutElement />
      <footer className={theme === 'light' ? 'footerLight' : 'footerDark'}>
        2025
      </footer>
    </>
  );
};
