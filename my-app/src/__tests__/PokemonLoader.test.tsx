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
          sprites: { front_default: 'sprite.png' },
          types: [{ type: { name: 'electric' } }],
          height: 4,
          weight: 60,
          base_experience: 112,
          abilities: [{ ability: { name: 'static' } }],
        }),
      })


    global.fetch = mockFetch;

    render(
      <PokemonLoader pokemonName="pikachu" searchTerm="">
        {() => null}
      </PokemonLoader>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });


  
  
});
