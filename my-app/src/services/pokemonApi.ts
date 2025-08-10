import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  NamedAPIResource,
  PokemonInfo,
  TypeEntry,
  AbilityEntry,
} from '@customTypes/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getAllPokemons: builder.query<{ results: NamedAPIResource[] }, void>({
      query: () => 'pokemon?limit=1000',
      providesTags: ['Pokemon'],
    }),
    getPokemonByName: builder.query<PokemonInfo, string>({
      query: (name: string) => `pokemon/${name}`,
      transformResponse: (response: any): PokemonInfo => {
        return {
          sprite: response.sprites.front_default,
          types: response.types.map((t: TypeEntry) => t.type.name),
          height: response.height,
          weight: response.weight,
          baseExperience: response.base_experience,
          abilities: response.abilities.map(
            (a: AbilityEntry) => a.ability.name
          ),
        };
      },
      providesTags: (_result, _error, name) => [{ type: 'Pokemon', id: name }],
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
