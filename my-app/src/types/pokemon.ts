export interface PokemonAbilityReference {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface AbilityEntry {
  name: string;
  effect_entries: {
    effect: string;
    short_effect?: string;
    language: {
      name: string;
    };
  }[];
}

export interface State {
  pokemonName: string;
  abilities: AbilityEntry[];
  loading: boolean;
  error: string | null;
}

export interface Props {
  pokemonName: string;
  children: (props: {
    abilities: AbilityEntry[];
    loading: boolean;
    error: string | null;
    pokemonName: string;
  }) => React.ReactNode;
}
