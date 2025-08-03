import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { About } from './About';
import { ThemeProvider } from '../../components/ThemeContext/ThemeProvider';

describe('About Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders text content correctly', () => {
    render(
      <ThemeProvider>
        <About />
      </ThemeProvider>
    );

    expect(screen.getByText(/Hello, my name is Alyona/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tap here/i })).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  it('displays image after successful fetch', async () => {
    const mockSpriteUrl = 'https://example.com/pokemon.png';

    const mockFetch = vi.fn().mockResolvedValue({
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

    vi.stubGlobal('fetch', mockFetch as typeof fetch);

    render(
      <ThemeProvider>
        <About />
      </ThemeProvider>
    );

    expect(screen.getByText(/Loading image/i)).toBeInTheDocument();

    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', mockSpriteUrl);
    expect(image).toHaveAttribute('alt', 'profile photo');
  });
});
