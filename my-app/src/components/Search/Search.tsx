import React, { use, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTheme } from '@components/ThemeContext/useTheme';
import styles from './Search.module.css';
import useSound from 'use-sound';
import { useEffect } from 'react';
import clickSound from '@src/assets/sound.mp3';
import { useGetAllPokemonsQuery } from '@services/pokemonApi';
interface Props {
  onSearch: (pokemonName: string) => void;
}
export const Search: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  // const [history, setHistory] = useState<string[]>([]);
  const { theme } = useTheme();
  const [filterPokemons, setFilterPokemons] = useState<string[]>([]);
  const [play] = useSound(clickSound);
  const { data } = useGetAllPokemonsQuery();

  // useEffect(() => {
  //   const savedHistory = localStorage.getItem('searchHistory');
  //   if (savedHistory) {
  //     setHistory(JSON.parse(savedHistory));
  //   }
  // }, []);
  useEffect(() => {
if (!data || !inputValue) {
      setFilterPokemons([]);
      return;
    }
      const timer = setTimeout(() => {
      const filtered = data.results
        .map((p) => p.name)
        .filter((name) => name.startsWith(inputValue))
        .slice(0, 5);
      setFilterPokemons(filtered);
    }, 300)
  return () => clearTimeout(timer)}
    ,[data, inputValue])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

  }


    

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();

      const trimmed = inputValue.trim().toLowerCase();
      if (!trimmed) return;

      // const newHistory = Array.from(new Set([trimmed, ...history])).slice(0, 5);

      // setHistory(newHistory);
      // localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      onSearch(trimmed);
    };

    return (
      <form onSubmit={handleSearch} className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter pokemon's name"
          className={theme === 'light' ? styles.inputLight : styles.inputDark}
          // list="search-history"
        />

        {filterPokemons.length > 0 && (
          <ul className={styles.suggestionsList}>
            {filterPokemons.map((name) => (
              <li
              className={styles.listItemSuggestions}
                key={name}
                onClick={() => {
                  setInputValue(name);
                  setFilterPokemons([]);
                  onSearch(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          style={{ marginLeft: 10, padding: '0.5rem 1rem' }}
          className={theme === 'light' ? styles.buttonLight : styles.buttonDark}
          onMouseEnter={() => play()}
        >
          Search
        </button>
      </form>
    );
  };

