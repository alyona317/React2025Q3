import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonDetails } from './PokemonDetails';
import { vi } from 'vitest';

vi.mock('@components/ThemeContext/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: () => ({ name: 'pikachu' }),
  };
});

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading, fetches data and displays details', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        sprites: { front_default: 'https://example.com/pikachu.png' },
        types: [{ type: { name: 'electric' } }],
        height: 4,
        weight: 60,
        base_experience: 112,
        abilities: [{ ability: { name: 'static' } }],
      }),
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/Information about pikachu/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Types:/)).toHaveTextContent('Types:');
    expect(screen.getByText(/Height:/)).toHaveTextContent('Height:');
    expect(screen.getByText(/Weight:/)).toHaveTextContent('Weight:');
    expect(screen.getByText(/Base XP:/)).toHaveTextContent('Base XP:');
    expect(screen.getByText(/Abilities:/)).toHaveTextContent('Abilities:');
    expect(screen.getByAltText(/pokemon/i)).toHaveAttribute(
      'src',
      'https://example.com/pikachu.png'
    );
  });

  it('renders error on fetch failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Pokemon is not found/i)
      ).toBeInTheDocument();
    });
  });
});
