import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';
import { useTheme } from '@components/ThemeContext/useTheme';
import type { PokemonInfo } from '@customTypes/pokemon';

vi.mock('@components/ThemeContext/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockPokemon: PokemonInfo = {
  sprite: 'https://example.com/pikachu.png',
  types: ['electric'],
  height: 4,
  weight: 60,
  baseExperience: 112,
  abilities: ['static', 'lightning-rod'],
};

describe('PokemonCard', () => {
  it('render details if theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<PokemonCard info={mockPokemon} />);

    expect(screen.getByAltText(/pokemon/i)).toHaveAttribute(
      'src',
      mockPokemon.sprite
    );
    expect(screen.getByText(/Types:/i)).toHaveTextContent('Types:');
    expect(screen.getByText(/Height:/i)).toHaveTextContent('Height:');
    expect(screen.getByText(/Weight:/i)).toHaveTextContent('Weight:');
    expect(screen.getByText(/Base XP:/i)).toHaveTextContent('Base XP:');
    expect(screen.getByText(/Abilities:/i)).toHaveTextContent('Abilities:');

    expect(screen.getByRole('heading')).toHaveClass('cardTitleLight');
    expect(screen.getByText(/Types:/i).closest('p')).toHaveClass(
      'cardInfoLight'
    );
  });

  it('render details if theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

    render(<PokemonCard info={mockPokemon} />);

    expect(screen.getByAltText(/pokemon/i)).toHaveAttribute(
      'src',
      mockPokemon.sprite
    );
    expect(screen.getByRole('heading')).toHaveClass('cardTitleDark');

    expect(screen.getByText(/Types:/i).closest('p')).toHaveClass(
      'cardInfoDark'
    );
    expect(screen.getByText(/Height:/i).closest('p')).toHaveClass(
      'cardInfoDark'
    );
    expect(screen.getByText(/Weight:/i).closest('p')).toHaveClass(
      'cardInfoDark'
    );
    expect(screen.getByText(/Base XP:/i).closest('p')).toHaveClass(
      'cardInfoDark'
    );
    expect(screen.getByText(/Abilities:/i).closest('p')).toHaveClass(
      'cardInfoDark'
    );
  });
});
