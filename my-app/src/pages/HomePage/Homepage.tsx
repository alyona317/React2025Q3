import { Search } from '../../components/Search/Search';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import { PokemonList } from '../../components/PokemonList/PokemonList';
import { PokemonLoader } from '../../components/PokemonLoader/PokemonLoader';
import { useSearchWithStorage } from '../../hooks/useSearchWithStorage';
import { Outlet } from 'react-router-dom';

export const Homepage = () => {
  const { searchTerm, setSearchTerm } = useSearchWithStorage();

  return (
    <PokemonLoader pokemonName={searchTerm} searchTerm={searchTerm}>
      {({ loading, error, pokemonList, info }) => (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Search onSearch={setSearchTerm} />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {info ? (
              <PokemonCard info={info} />
            ) : (
              pokemonList && <PokemonList pokemons={pokemonList} />
            )}
          </div>

          <div
            style={{
              width: '400px',
              borderLeft: '1px solid #ccc',
              padding: '1rem',
            }}
          >
            <Outlet />
          </div>
        </div>
      )}
    </PokemonLoader>
  );
};
