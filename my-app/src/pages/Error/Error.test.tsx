import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Error } from './Error';
import { ThemeProvider } from '../../components/ThemeContext/ThemeProvider';

describe('Error Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders text content correctly', () => {
    render(
      <ThemeProvider>
        <Error />
      </ThemeProvider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/OOPS! PAGE NOT FOUND/i)).toBeInTheDocument();
  });

  it('displays image', async () => {
    const mockSpriteUrl = 'https://pokestop.io/img/pokemon/psyduck-256x256.png';

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
        <Error />
      </ThemeProvider>
    );

    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', mockSpriteUrl);
    expect(image).toHaveAttribute('alt', 'psyduck');
  });
});
