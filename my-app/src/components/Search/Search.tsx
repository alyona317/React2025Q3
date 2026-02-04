import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTheme } from '@components/ThemeContext/useTheme';
import styles from './Search.module.css';
import useSound from 'use-sound';
import clickSound from '@src/assets/sound.mp3';
interface Props {
  onSearch: (pokemonName: string) => void;
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const { theme } = useTheme();
  const [play] = useSound(clickSound);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSearch(inputValue.trim().toLowerCase());
  };

  return (
    <div className= {styles.inputContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter pokemon's name"
        className={theme === 'light' ? styles.inputLight : styles.inputDark}
      />
      <button
        onClick={handleSubmit}
        style={{ marginLeft: 10, padding: '0.5rem 1rem' }}
        className={theme === 'light' ? styles.buttonLight : styles.buttonDark}
        onMouseEnter={() => {
          play();
        }}
      >
        Search
      </button>
    </div>
  );
};
