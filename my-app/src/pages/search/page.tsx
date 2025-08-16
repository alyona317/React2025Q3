'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetAllPokemonsQuery,
  
} from '../../services/pokemonApi';
import {Search} from '@components/Search/Search';
import {PokemonList} from '@components/PokemonList/PokemonList';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allPokemons, isLoading, error } = useGetAllPokemonsQuery();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      router.push(`/pokemon/${term.toLowerCase()}`);
    }
  };

  const handleSelectPokemon = (name: string) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.searchBar}>
        <Search onSearch={handleSearch} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {isLoading && <p>Loading...</p>}
          {error && <p className={styles.error}>Error loading data</p>}
          {allPokemons && (
            <PokemonList
              pokemons={allPokemons.results}
              onSelect={handleSelectPokemon}
            />
          )}
        </div>
      </div>
    </div>
  );
}