import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { PokemonInfo, TypeEntry, AbilityEntry } from '../types/pokemon';
import { useTheme } from './ThemeContext';

export const PokemonDetails = () => {
  const { name } = useParams();
  const [info, setInfo] = useState<PokemonInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {theme} = useTheme()

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Pokemon is not found');

        const data = await res.json();
        const fullInfo: PokemonInfo = {
          sprite: data.sprites.front_default,
          types: data.types.map((t: TypeEntry) => t.type.name),
          height: data.height,
          weight: data.weight,
          baseExperience: data.base_experience,
          abilities: data.abilities.map((a: AbilityEntry) => a.ability.name),
        };

        setInfo(fullInfo);
      } catch (err) {
        setError((err as Error).message || 'Error');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!info) return null;

  return (
    <div style={{ padding: '1rem' }}>
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
