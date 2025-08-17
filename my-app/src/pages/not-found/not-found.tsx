import Link from 'next/link';
import styles from './not-found.module.css';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>This page could not be found.</p>
      <Link href="/" className={styles.link}>
        Back to main page
      </Link>
    </div>
  );
};
