import { Outlet } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { PokemonCard } from '@components/PokemonCard/PokemonCard';
import { PokemonList } from '@components/PokemonList/PokemonList';
import { useSearchWithStorage } from '@hooks/useSearchWithStorage';
import { useGetAllPokemonsQuery, useGetPokemonByNameQuery } from '../../services/pokemonApi';
import styles from './HomePage.module.css'

export const Homepage = () => {
  const { searchTerm, setSearchTerm } = useSearchWithStorage();

  const {
    data: pokemonInfo,
    isLoading: isLoadingPokemon,
    error: errorPokemon,
  } = useGetPokemonByNameQuery(searchTerm, {
    skip: !searchTerm.trim(),
  });

  const {
    data: allPokemons,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetAllPokemonsQuery(undefined, {
    skip: !!searchTerm.trim(),
  });

  const loading = isLoadingPokemon || isLoadingAll;
  const error = errorPokemon || errorAll;

  return (
    <div className={styles.layout}>
      <div className={styles.searchBar}>
        <Search onSearch={setSearchTerm} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {loading && <p>Loading...</p>}
          {error && <p className={styles.error}>Error loading data</p>}
          {pokemonInfo ? (
            <PokemonCard info={pokemonInfo} />
          ) : (
            allPokemons && <PokemonList pokemons={allPokemons.results} />
          )}
        </div>
      </div>

      <div className={styles.sidebar}>
        <Outlet />
      </div>
    </div>
  );
};
