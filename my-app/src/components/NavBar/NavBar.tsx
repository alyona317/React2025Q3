'use client'
import Link from 'next/link';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher';
import { useSearchWithStorage } from '@hooks/useSearchWithStorage';
import styles from './NavBar.module.css'

export const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchWithStorage();

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <Link href="/">
          <img
            src="https://brandeps.com/logo-download/P/Pokemon-logo-vector-01.svg"
            alt="Logo"
            className={styles.navLogo}
            style={{ width: '50px' }}
          />
        </Link>
        <div className={styles.navList}>
          <Link
            href="/search"
            className={styles.navLink}
            onClick={() => setSearchTerm('')}
          >
            Search
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </div>
        <ThemeSwitcher />
      </nav>
    </div>
  );
};
