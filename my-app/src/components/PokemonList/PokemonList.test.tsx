import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonList } from './PokemonList';
import { useTheme } from '@components/ThemeContext/useTheme';

vi.mock('@components/PokemonItem/PokemonItem', () => ({
  PokemonItem: ({ name }: { name: string }) => <li>{name}</li>,
}));

vi.mock('@components/ThemeContext/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockPokemons = Array.from({ length: 120 }, (_, i) => ({
  name: `pokemon-${i + 1}`,
  url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
}));

describe('PokemonList', () => {
  beforeEach(() => {
    localStorage.clear();
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
  });

  it('renders first page with 50 pokemons', () => {
    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-51')).not.toBeInTheDocument();
  });

  it('navigates to next page and updates display', () => {
    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Forward'));

    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('pokemon-51')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-1')).not.toBeInTheDocument();
  });

  it('disables Back button on first page', () => {
    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    expect(screen.getByText('Back')).toBeDisabled();
  });

  it('disables Forward button on last page', () => {
    localStorage.setItem('currentPokemonPage', '3');

    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeDisabled();
  });

  it('applies dark theme styles', () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: 'dark' });

    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    expect(screen.getByText('Back')).toHaveClass('button__pagination_dark');
    expect(screen.getByText('Page 1 of 3')).toHaveClass('textDark');
  });
});
