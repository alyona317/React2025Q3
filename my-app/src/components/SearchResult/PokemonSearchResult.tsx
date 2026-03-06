import { PokemonCard1 } from '@components/PokemonCard/PokemonCard1';
import { useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../../services/pokemonApi';

export const PokemonSearchResult = () => {
  const { name } = useParams();
  const {
    data: pokemonInfo,
    isLoading,
    isError,
  } = useGetPokemonByNameQuery(name!, {
    skip: !name,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{ color: 'red' }}>Pokemon not found</p>;
  if (!pokemonInfo) return null;

  return (
    <div>
      <div className="searchResult">
        <PokemonCard1 info={pokemonInfo} />
      </div>
    </div>
  );
};
