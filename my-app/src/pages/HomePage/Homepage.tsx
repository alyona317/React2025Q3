import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { PokemonCard } from '@components/PokemonCard/PokemonCard';
import { PokemonCard1 } from '@components/PokemonCard/PokemonCard1';
import { PokemonList } from '@components/PokemonList/PokemonList';
import { PokemonLoader } from '@components/PokemonLoader/PokemonLoader';
import { useSearchWithStorage } from '@hooks/useSearchWithStorage';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../services/pokemonApi';
import { useEffect, useState } from 'react';

export const Homepage = () => {
  const { searchTerm, setSearchTerm } = useSearchWithStorage();
  const [hasSelectedPokemon, setHasSelectedPokemon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const hasPokemonName = pathParts.length >= 4 && pathParts[3] !== '';
    setHasSelectedPokemon(hasPokemonName);
  }, [location]);

  const loading = isLoadingPokemon || isLoadingAll;
  const error = errorPokemon || errorAll;

  const isSearchMode = !!searchTerm.trim();
  const isListMode = !isSearchMode;

  return (
    <div className="homepageContainer">
      <Search
        onSearch={(name) => {
          navigate(`/pokemon/${name}`);
        }}
      />
      <div className="homepageContent">
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{'Error loading data'}</p>}

          {searchTerm.trim() && pokemonInfo && (
            <div className="searchResult">
              <PokemonCard1 info={pokemonInfo} />
            </div>
          )}

          {!searchTerm.trim() && (
            <div
              className={`homepageContent ${hasSelectedPokemon ? 'with-card' : ''}`}
            >
              <div className="leftPanel">
                {allPokemons && <PokemonList pokemons={allPokemons.results} />}
              </div>
              <div className="rightPanel">
                <Outlet />
              </div>
            </div>
          )}

          {/* {pokemonInfo ? (
            <PokemonCard1 info={pokemonInfo} />
          ) : (
            allPokemons && <PokemonList pokemons={allPokemons.results} />
          )} */}
        </div>
        {/* <div>
          <Outlet />
        </div> */}
      </div>
    </div>
  );
};
