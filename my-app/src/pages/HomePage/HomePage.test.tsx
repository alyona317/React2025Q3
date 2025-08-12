import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Homepage } from './Homepage';

interface SearchProps {
  onSearch: (value: string) => void;
}

interface PokemonCardProps {
  info: {
    name: string;
    [key: string]: unknown;
  };
}

interface PokemonListProps {
  pokemons: { name: string }[];
}

interface PokemonLoaderProps {
  children: (data: {
    loading: boolean;
    error: string | null;
    info: { name: string };
    pokemonList: { name: string }[];
  }) => React.ReactNode;
  pokemonName: string;
}

vi.mock('@components/Search/Search', () => ({
  Search: ({ onSearch }: SearchProps) => (
    <input placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
  ),
}));

vi.mock('@components/PokemonCard/PokemonCard', () => ({
  PokemonCard: ({ info }: PokemonCardProps) => (
    <div>PokemonCard: {info.name}</div>
  ),
}));

vi.mock('@components/PokemonList/PokemonList', () => ({
  PokemonList: ({ pokemons }: PokemonListProps) => (
    <ul>
      {pokemons.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  ),
}));

vi.mock('@hooks/useSearchWithStorage', () => ({
  useSearchWithStorage: () => ({
    searchTerm: 'pikachu',
    setSearchTerm: vi.fn(),
  }),
}));

vi.mock('@components/PokemonLoader/PokemonLoader', () => ({
  PokemonLoader: ({ children }: PokemonLoaderProps) => {
    const fakeData = {
      loading: false,
      error: null,
      info: { name: 'pikachu' },
      pokemonList: [],
    };
    return children(fakeData);
  },
}));

describe('Homepage component', () => {
  it('renders Search and PokemonCard when info is available', () => {
    render(<Homepage />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/PokemonCard: pikachu/i)).toBeInTheDocument();
  });
});
