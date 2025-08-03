import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './NavBar';

vi.mock('../ThemeContext/useTheme', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

vi.mock('../FlyoutElement/FlyoutElement', () => ({
  FlyoutElement: () => <div data-testid="flyout-element">FlyoutElement</div>,
}));

vi.mock('../ThemeContext/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render links Search и About with correct path', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const searchLink = screen.getByText(/search/i);
    const aboutLink = screen.getByText(/about/i);

    expect(searchLink.closest('a')).toHaveAttribute('href', '/search');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('render components ThemeSwitcher и FlyoutElement', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/light/i)).toBeInTheDocument();
    expect(screen.getByText(/dark/i)).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('apply correct class to link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const searchLink = screen.getByText(/search/i);
    expect(searchLink).toHaveClass('nav__link_light');
  });
});
