import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../services/pokemonApi';
import { PokemonDetails } from './PokemonDetails';
import { vi } from 'vitest';
import { ThemeProvider } from '@components/ThemeContext/ThemeProvider';


vi.mock('@/components/ThemeContext/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn(() => ({ name: 'pikachu' })),
}));


const mockUseGetPokemonByNameQuery = vi.fn();

vi.mock('../../services/pokemonApi', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
    return {
    ...actual,
      useGetPokemonByNameQuery: () => mockUseGetPokemonByNameQuery(),
    }
});


const mockStore = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/pokemon/pikachu']}>
            <Routes>
              <Route path="/pokemon/:name" element={<PokemonDetails />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('should render loading state initially', () => {
    renderComponent();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render pokemon details when data is loaded', async () => {
    const mockData = {
      sprite: 'https://example.com/pikachu.png',
      types: ['electric'],
      height: 4,
      weight: 60,
      baseExperience: 112,
      abilities: ['static'],
    };

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: undefined,
    });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(/Information about pikachu/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByAltText(/pokemon/i)).toHaveAttribute(
      'src',
      mockData.sprite
    );
    expect(screen.getByText(/Types:/i)).toHaveTextContent('electric');
    expect(screen.getByText(/Height:/i)).toHaveTextContent('4');
    expect(screen.getByText(/Weight:/i)).toHaveTextContent('60');
    expect(screen.getByText(/Base XP:/i)).toHaveTextContent('112');
    expect(screen.getByText(/Abilities:/i)).toHaveTextContent('static');
  });

  it('should render error message when there is an error', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404, data: 'Not found' },
    });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading Pokemon details./i)
      ).toBeInTheDocument();
    });
  });

  it('should render nothing when no name param is provided', () => {
    vi.mocked(useParams).mockReturnValue({ name: undefined });
    const { container } = render(
      <Provider store={mockStore}>
        <PokemonDetails />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });
});