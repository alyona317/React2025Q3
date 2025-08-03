import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Welcome } from './Welcome';
import { ThemeProvider } from '../../components/ThemeContext/ThemeProvider';

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders text content correctly', () => {
    render(
      <ThemeProvider>
        <Welcome />
      </ThemeProvider>
    );

    expect(
      screen.getByText(/Welcome to pokemon searching/i)
    ).toBeInTheDocument();
  });

  it('displays image', async () => {
    const mockSpriteUrl =
      'https://wallpapers.com/images/high/every-legendary-pokemon-651dl7pr5nrs7bgu.webp';

    const mockFetch: typeof fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        sprites: {
          other: {
            'official-artwork': {
              front_default: mockSpriteUrl,
            },
          },
        },
      }),
    });

    vi.stubGlobal('fetch', mockFetch);

    render(
      <ThemeProvider>
        <Welcome />
      </ThemeProvider>
    );

    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', mockSpriteUrl);
    expect(image).toHaveAttribute('alt', 'pokemons');
  });
});
