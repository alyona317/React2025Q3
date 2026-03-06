import { renderHook, act } from '@testing-library/react';
import { useSearchWithStorage } from './useSearchWithStorage';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useSearchWithStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('return empty line by default', () => {
    const { result } = renderHook(() => useSearchWithStorage(key));
    expect(result.current.searchTerm).toBe('');
  });

  it('read name from localStorage', () => {
    localStorage.setItem(key, 'pikachu');
    const { result } = renderHook(() => useSearchWithStorage(key));
    expect(result.current.searchTerm).toBe('pikachu');
  });

  it('update localStorage if name changed', () => {
    const { result } = renderHook(() => useSearchWithStorage(key));

    act(() => {
      result.current.setSearchTerm('bulbasaur');
    });

    expect(localStorage.getItem(key)).toBe('bulbasaur');
  });

  it('dont storage empty lines', () => {
    const { result } = renderHook(() => useSearchWithStorage(key));

    act(() => {
      result.current.setSearchTerm('   ');
    });

    expect(localStorage.getItem(key)).toBe(null);
  });
});
