import { Component } from 'react';
import type {
  AbilityEntry,
  State,
  Props,
  PokemonAbilityReference,
} from '../types/pokemon';

export class PokemonLoader extends Component<Props, State> {
  state: State = {
    pokemonName: '',
    abilities: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.pokemonName !== this.props.pokemonName &&
      this.props.pokemonName
    ) {
      this.fetchPokemonAbilities(this.props.pokemonName);
    }
  }
  async fetchAllPokemon() {
    this.setState({
      loading: true,
      error: null,
      abilities: [],
      pokemonName: '',
    });

    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await res.json();
      const abilities: AbilityEntry[] = data.results.map(
        (p: { name: string }) => ({
          name: p.name,
          effect_entries: [],
        })
      );

      this.setState({
        abilities,
        loading: false,
        pokemonName: 'All pokemons',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Неизвестная ошибка', loading: false });
      }
    }
  }
  async fetchPokemonAbilities(name: string) {
    this.setState({
      loading: true,
      error: null,
      abilities: [],
      pokemonName: '',
    });
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error('Покемон не найден');

      const data = await res.json();
      const pokemonName: string = data.name;
      const abilityRequests = data.abilities.map(
        async (entry: PokemonAbilityReference) => {
          const res = await fetch(entry.ability.url);
          return await res.json();
        }
      );
      const abilities: AbilityEntry[] = await Promise.all(abilityRequests);

      this.setState({ abilities, loading: false, pokemonName });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Неизвестная ошибка', loading: false });
      }
    }
  }
  componentDidMount() {
    if (this.props.pokemonName) {
      this.fetchPokemonAbilities(this.props.pokemonName);
    } else {
      this.fetchAllPokemon();
    }
  }
  render() {
    return this.props.children({
      abilities: this.state.abilities,
      loading: this.state.loading,
      error: this.state.error,
      pokemonName: this.state.pokemonName,
    });
  }
}
