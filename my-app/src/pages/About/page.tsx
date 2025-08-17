'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function AboutPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!res.ok) throw new Error('Pokemon is not found');
        const data = await res.json();
        const sprite = data.sprites.other['official-artwork'].front_default;

        setImageUrl(sprite);
      } catch (err) {
        setError('Error');
        console.error(err);
      }
    };
    fetchRandomImage();
  }, []);

  return (
    <div>
      <h1 className={styles.aboutTitle}>About us</h1>
      <div className={styles.about}>
        <div className={styles.aboutInfo}>
          <p className={styles.aboutText}>
            Hello, my name is Alyona. I'm junior frontend developer. I live in
            St. Petersburg. I like to travel, learn something new and
            videogames. Maybe someday I will work on one of videogames.
          </p>
          <h3 className={styles.aboutMidTitle}>
            To learn more about React course
          </h3>
          <a
            className={styles.aboutLink}
            href="https://rs.school/courses/reactjs"
          >
            Tap here
          </a>
        </div>
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="profile photo" />
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
}
