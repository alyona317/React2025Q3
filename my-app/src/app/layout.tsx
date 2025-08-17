import type { ReactNode } from 'react';
import { Providers } from './Providers';
import { Layout } from '@components/Layout/Layout';
import './global.css';

export const metadata = {
  title: 'Pokemons',
  description: 'Pokemon app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
        <html lang="en" suppressHydrationWarning>
      <body>
    <Providers>
        <Layout>{children}</Layout>
    </Providers>
      </body>
</html>
  );
}
