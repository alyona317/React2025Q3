'use client';
import { useState, useEffect } from 'react';

export const useSearchWithStorage = (storageKey: string = 'search') => {
  const [searchTerm, setSearchTerm] = useState(''); 
  useEffect(() => {
    setSearchTerm(localStorage.getItem(storageKey) || '');
  }, [storageKey]);

  useEffect(() => {
    if (searchTerm.trim()) {
      localStorage.setItem(storageKey, searchTerm);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [searchTerm, storageKey]);

  return { searchTerm, setSearchTerm };
};
