import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Homepage } from './page';
import { ThemeProvider } from '@components/ThemeContext/ThemeProvider';

const mockUseGetPokemonByNameQuery = vi.fn();
const mockUseGetAllPokemonsQuery = vi.fn();

vi.mock('../../services/pokemonApi', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useGetPokemonByNameQuery: () => mockUseGetPokemonByNameQuery(),
  };
});

import { pokemonApi } from '../../services/pokemonApi';

const mockStore = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

vi.mock('@hooks/useSearchWithStorage', () => ({
  useSearchWithStorage: () => ({
    searchTerm: '',
    setSearchTerm: vi.fn(),
  }),
}));

describe('Homepage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });

    mockUseGetAllPokemonsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Homepage />
        </ThemeProvider>
      </Provider>
    );
  };

  it('shows loading state when data is loading', () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    renderComponent();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Error fetching data' },
    });

    renderComponent();
    expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
  });
});
