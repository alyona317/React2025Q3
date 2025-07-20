import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PokemonLoader } from '../components/PokemonLoader';
import { vi } from 'vitest';

describe('PokemonLoader', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls API with correct pokemon name', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'pikachu',
          abilities: [
            { ability: { url: 'https://pokeapi.co/api/v2/ability/31/' } },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'static',
          effect_entries: [],
        }),
      });

    global.fetch = mockFetch;

    render(<PokemonLoader pokemonName="pikachu">{() => null}</PokemonLoader>);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
    vi.restoreAllMocks();
  });

  it('Makes initial API call on component mount', async () => {
    const mockPokemonList = {
      results: [{ name: 'bulbasaur' }, { name: 'charmander' }],
    };

    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockPokemonList,
      ok: true,
    });

    render(
      <PokemonLoader pokemonName="">
        {({ loading, pokemonName }) => (
          <div>
            {loading && <p>Loading...</p>}
            {pokemonName && <p>{pokemonName}</p>}
          </div>
        )}
      </PokemonLoader>
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=1000'
    );

    await waitFor(() => {
      expect(screen.getByText('All pokemons')).toBeInTheDocument();
    });
  });
  it('handles API error correctly', async () => {
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' }),
    });

    render(
      <PokemonLoader pokemonName="unknown">
        {({ loading, error }) => (
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error occurred</p>}
          </div>
        )}
      </PokemonLoader>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
  it('handles successful API response', async () => {
    const mockResponse = {
      name: 'pikachu',
      abilities: [
        {
          ability: {
            name: 'static',
            url: 'https://pokeapi.co/api/v2/ability/9/',
          },
        },
      ],
    };
    const mockAbilityResponse = {
      name: 'static',
      effect_entries: [
        {
          effect: 'Paralyzes on contact.',
          language: { name: 'en' },
        },
      ],
    };
    (global.fetch as vi.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAbilityResponse,
      });

    render(
      <PokemonLoader pokemonName="pikachu">
        {({ abilities, loading, error, pokemonName }) => (
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {pokemonName && <p>{pokemonName}</p>}
            {abilities.map((a) => (
              <p key={a.name}>{a.name}</p>
            ))}
          </div>
        )}
      </PokemonLoader>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('static')).toBeInTheDocument();
    });
  });
});
