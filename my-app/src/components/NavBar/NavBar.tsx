import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '@components/ThemeContext/useTheme';
import { useSearchWithStorage } from '@hooks/useSearchWithStorage';

export const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchWithStorage();
  const { theme } = useTheme();
  return (
    <div className="wrapper">
      <nav className="nav">
        <Link to="/">
          <img
            src="https://brandeps.com/logo-download/P/Pokemon-logo-vector-01.svg"
            alt="Logo"
            className="nav__logo"
            style={{ width: '50px' }}
          />
        </Link>
        <div className="nav__List">
          <Link
            to="/search"
            className={theme === 'light' ? 'nav__link_light' : 'nav__link_dark'}
            onClick={()=> setSearchTerm('')}
          >
            Search
          </Link>
          <Link
            to="/about"
            className={theme === 'light' ? 'nav__link_light' : 'nav__link_dark'}
          >
            About
          </Link>
        </div>
        <ThemeSwitcher />
      </nav>
    </div>
  );
};
