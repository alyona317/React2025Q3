import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { NamedAPIResource } from "../types/pokemon";
const ITEMS_PER_PAGE = 50;
const STORAGE_KEY = 'currentPokemonPage';

export const PokemonList: React.FC<{ pokemons: NamedAPIResource[] }> = ({pokemons})=>{

    const totalPages = Math.ceil(pokemons.length / ITEMS_PER_PAGE);
    const [searchParams, setSearchParams] = useSearchParams();

    // Начальное значение из URL, localStorage или 1
    const getInitialPage = (): number => {
      const urlPage = Number(searchParams.get('page'));
      if (urlPage >= 1 && urlPage <= totalPages) return urlPage;

      const storedPage = Number(localStorage.getItem(STORAGE_KEY));
      if (storedPage >= 1 && storedPage <= totalPages) return storedPage;

      return 1;
    };

    const [currentPage, setCurrentPage] = useState(getInitialPage);

    // Обновляем localStorage и URL при смене страницы
    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, currentPage.toString());
      setSearchParams({ page: currentPage.toString() });
    }, [currentPage, setSearchParams]);

    useEffect(() => {
      // Обновляем currentPage при изменении URL
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

    const goToPage = (page: number) =>
      setCurrentPage(Math.min(Math.max(1, page), totalPages));

return (
  <>
    <ul>
      {currentPageItems.map((p) => (
        <li key={p.name}>{p.name}</li>
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
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Назад
      </button>
      <span>
        Страница {currentPage} из {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Вперёд
      </button>
    </div>
  </>
);
}