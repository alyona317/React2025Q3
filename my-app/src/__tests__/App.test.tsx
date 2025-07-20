import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('App', () => {
  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');

    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(mockSetItem).toHaveBeenCalledWith('pokemonName', 'pikachu');
  });
});
