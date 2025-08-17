'use client';
import PokemonDetails from '@components/PokemonDetails/PokemonDetails';
import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';

import { useParams } from 'next/navigation';



export default function PokemonDetailsPage() {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = useGetPokemonByNameQuery(name);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading data</p>;

  return <PokemonDetails info={data} />;
}