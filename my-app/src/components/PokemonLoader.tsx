import { useCallback, useEffect, useState, type JSX, type ReactNode } from 'react';
import type {
  PokemonInfo,
  NamedAPIResource,
  TypeEntry,
  AbilityEntry,
} from '../types/pokemon';

interface PokemonLoaderProps {
  pokemonName: string;
  children: (args: {
    loading: boolean;
    error: string | null;
    pokemonList?: NamedAPIResource[];
    info?: PokemonInfo;
  }) => ReactNode;
  searchTerm: string;
}

export const PokemonLoader: React.FC<PokemonLoaderProps> = ({
  pokemonName,
  children,
  searchTerm,
}) => {
  const [pokemonList, setPokemonList] = useState<
    NamedAPIResource[] | undefined
  >(undefined);
  const [info, setInfo] = useState<PokemonInfo>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchPokemon(searchTerm.toLowerCase());
    } else {
      fetchList();
    }
  }, [searchTerm]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      if (!res.ok) throw new Error('Pokemon is not found');

      const data = await res.json();
      setPokemonList(data.results);
    } catch {
      setError('Loading error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPokemon = useCallback(async (name: string) => {
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
      setError(err instanceof Error ? err.message : 'Loading error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon(pokemonName.toLowerCase());
    } else {
      fetchList();
    }
  }, [pokemonName, fetchPokemon, fetchList]);

  return children({
    loading,
    error,
    pokemonList,
    info,
  });
};
