import React from 'react';
import type { AbilityEntry } from '../types/pokemon';

interface Props {
  abilities: AbilityEntry[];
  loading: boolean;
  error: string | null;
  pokemonName: string;
}

export const ShowResult: React.FC<Props> = ({
  abilities,
  loading,
  error,
  pokemonName,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (abilities.length === 0 )
    return <p>Введите имя покемона и нажмите "Поиск".</p>;
  return (
    <div>
      <ul>
        <h1>{pokemonName}</h1>
        {abilities.map((ability) => {
          const effect = ability.effect_entries.find(
            (e) => e.language.name === 'en'
          );
          return (
            <li key={ability.name}>
              <strong>{ability.name}</strong>:{' '}
              {effect?.short_effect || effect?.effect || 'Описание недоступно'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
