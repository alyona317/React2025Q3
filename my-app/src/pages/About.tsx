import { useEffect, useState } from 'react';
import '../App.css';
import { useTheme } from '../components/ThemeContext/ThemeContext';

export const About = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  useEffect(() => {
    const fetchRandomImage = async () => {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!res.ok) throw new Error('Покемон не найден');
        const data = await res.json();
        const sprite = data.sprites.other['official-artwork'].front_default;

        setImageUrl(sprite);
        console.log(sprite);
      } catch (err) {
        setError('Error');
        console.error(err);
      }
    };
    fetchRandomImage();
  }, []);

  return (
    <div>
      <h1
        className={
          theme === 'light' ? 'about__title_light' : 'about__title_dark'
        }
      >
        About us
      </h1>
      <div className="about">
        <div className="about__info">
          <p
            className={
              theme === 'light' ? 'about__text_light' : 'about__text_dark'
            }
          >
            Hello, my name is Alyona. I'm junior frontend developer.I'm live in
            St. Petersburg. I like to travel, learn something new and
            videogames. Maybe someday I will work on one of videgames.{' '}
          </p>
          <h3 className={theme === 'light' ? 'textLight' : 'texDark'}>
            To learn more about React course
          </h3>
          <a
            className={
              theme === 'light' ? 'about__link_light' : 'about__link_dark'
            }
            href="https://rs.school/courses/reactjs"
          >
            Tap here
          </a>
        </div>
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="profile photo" />
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
};
