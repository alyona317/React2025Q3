import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

interface Props {
  onSearch: (pokemonName: string) => void;
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSearch(inputValue.trim().toLowerCase());
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter pokemon's name"
        style={{ padding: '0.5rem', width: 200 }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginLeft: 10, padding: '0.5rem 1rem' }}
      >
        Search
      </button>
    </div>
  );
};
