import type { ReactNode } from 'react';

export interface PokemonInfo {
  name: string;
  number: string;
  imageUrl: string;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
  baseExperience: number;
  abilities: string[];
}

export interface LoaderDataProps {
  loading: boolean;
  error: string | null;
  pokemonName: string;
  pokemonList?: NamedAPIResource[];
  info?: PokemonInfo;
}
export type PropsWithChildren = {
  children: (props: LoaderDataProps) => ReactNode;
};
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface TypeEntry {
  slot: number;
  type: NamedAPIResource;
}

export interface AbilityEntry {
  ability: NamedAPIResource;
}
