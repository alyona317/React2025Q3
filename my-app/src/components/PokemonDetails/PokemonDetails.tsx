import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { PokemonInfo, TypeEntry, AbilityEntry } from '@customTypes/pokemon';
import { useTheme } from '@components/ThemeContext/useTheme';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../services/pokemonApi';
import styles from './PokemonDetails.module.css'

export const PokemonDetails = () => {
  const { name } = useParams();

  const { theme } = useTheme();

const {
  data: info,
  error,
  isLoading,
} = useGetPokemonByNameQuery(name ?? '', {
  skip: !name,
});

if (isLoading) return <p>Loading...</p>;

if (error) {
  return <p>Error loading Pokemon details.</p>;
}

if (!info) return null;


  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={()=>{

      }}>close</button>
      <h2 className={theme === 'light' ? 'cardTitleLight' : 'cardTitleDark'}>
        Information about {name}
      </h2>
      <h2 className={theme === 'light' ? 'cardTitleLight' : 'cardTitleDark'}>
        {info.sprite && <img src={info.sprite} alt="pokemon" />}
      </h2>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Types:</strong> {info.types.join(', ')}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Height:</strong> {info.height}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Weight:</strong> {info.weight}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Base XP:</strong> {info.baseExperience}
      </p>
      <p className={theme === 'light' ? 'cardInfoLight' : 'cardInfoDark'}>
        <strong>Abilities:</strong> {info.abilities.join(', ')}
      </p>
    </div>
  );
};
