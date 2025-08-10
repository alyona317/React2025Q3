import { useState, useEffect } from 'react';

export const useSearchWithStorage = (storageKey: string = 'search') => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(storageKey) || '';
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      localStorage.setItem(storageKey, searchTerm);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [searchTerm, storageKey]);

  return { searchTerm, setSearchTerm };
};
