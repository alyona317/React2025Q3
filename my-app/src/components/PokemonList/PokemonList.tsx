import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { NamedAPIResource } from '../../types/pokemon';
import { PokemonItem } from '../PokemonItem/PokemonItem';
const ITEMS_PER_PAGE = 50;
const STORAGE_KEY = 'currentPokemonPage';
import { useTheme } from '../ThemeContext/useTheme';

export const PokemonList: React.FC<{ pokemons: NamedAPIResource[] }> = ({
  pokemons,
}) => {
  const totalPages = Math.ceil(pokemons.length / ITEMS_PER_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  const getInitialPage = (): number => {
    const urlPage = Number(searchParams.get('page'));
    if (urlPage >= 1 && urlPage <= totalPages) return urlPage;

    const storedPage = Number(localStorage.getItem(STORAGE_KEY));
    if (storedPage >= 1 && storedPage <= totalPages) return storedPage;

    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentPage.toString());
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const urlPage = Number(searchParams.get('page'));
    if (urlPage && urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = pokemons.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <ul>
        {currentPageItems.map((p) => (
          <PokemonItem key={p.name} name={p.name} />
        ))}
      </ul>
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={
            theme === 'light'
              ? 'button__pagination_light'
              : 'button__pagination_dark'
          }
        >
          Back
        </button>
        <span className={theme === 'light' ? 'textLight' : 'textDark'}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={
            theme === 'light'
              ? 'button__pagination_light'
              : 'button__pagination_dark'
          }
        >
          Forward
        </button>
      </div>
    </>
  );
};
