import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { Button } from './Button/Button';
import { FlyoutElement } from './FlyoutElement/FlyoutElement';

export const Navbar: React.FC = () => {
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
          <Link to="/search">Search</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
      <ThemeSwitcher/>
      <FlyoutElement />
    </div>
  );
};
