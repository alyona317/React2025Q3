import { useParams } from 'react-router-dom';

import { useGetPokemonByNameQuery } from '../../services/pokemonApi';
import { PokemonCard1 } from '@components/PokemonCard/PokemonCard1';
export const PokemonDetails = () => {
  const { name } = useParams();



  const {
    data: pokemonInfo,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(name ?? '', {
    skip: !name,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>Error loading Pokemon details.</p>;
  }

  if (!pokemonInfo) return null;

  return (
    <div style={{ padding: '1rem' }}>
<PokemonCard1 info={pokemonInfo} />
    </div>
  );
};
