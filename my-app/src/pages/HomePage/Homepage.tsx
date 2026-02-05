import { Outlet } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { PokemonCard } from '@components/PokemonCard/PokemonCard';
import {PokemonCard1} from '@components/PokemonCard/PokemonCard1';
import { PokemonList } from '@components/PokemonList/PokemonList';
import { PokemonLoader } from '@components/PokemonLoader/PokemonLoader';
import { useSearchWithStorage } from '@hooks/useSearchWithStorage';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../services/pokemonApi';

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
    <div className='homepageContainer'>
      <Search onSearch={setSearchTerm} />
      <div className='homepageContent'>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{'Error loading data'}</p>}
          {pokemonInfo ? (
            <PokemonCard1 info={pokemonInfo} />
          ) : (
            allPokemons && <PokemonList pokemons={allPokemons.results} />
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
