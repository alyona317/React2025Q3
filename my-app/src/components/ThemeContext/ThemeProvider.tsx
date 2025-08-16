'use client';
import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

type Theme = 'light' | 'dark';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      setIsThemeLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isThemeLoaded) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isThemeLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!isThemeLoaded) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
