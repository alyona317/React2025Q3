import Link from 'next/link';
import styles from './Footer.module.css';
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link
            href="https://github.com/alyona317"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub
          </Link>

          <Link
            href="https://rs.school/courses/reactjs"
            className={styles.link}
          >
            React course RSS
          </Link>
        </div>
        {currentYear && <p className={styles.copyright}>{currentYear}</p>}
      </div>
    </footer>
  );
};
