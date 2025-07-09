export interface AbilityEntry {
  name: string;
  effect_entries: {
    effect: string;
    short_effect?: string;
    language: {
      name: string;
    };
  };
}

export interface State {
  pokemonName: string;
  abilities: AbilityEntry[];
  loading: boolean;
  error: string | null;
}