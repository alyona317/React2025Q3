'use client';

import { Provider } from 'react-redux';
// import { ThemeProvider } from '../components/ThemeContext/ThemeProvider';
import { ThemeProvider } from 'next-themes';
import { store } from '@app/store';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableSystem={true} 
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}
