import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

// Выполняет первоначальный вызов API при монтировании компонента
// Обрабатывает поисковый запрос из localStorage при первоначальной загрузке
// Управляет загрузкой состояний во время вызовов API
// Вызывает API с правильными параметрами
// Обновляет состояние компонента на основе ответов API
// Обрабатывает успешные ответы API
// Обрабатывает ответы на ошибки AP

// Перезаписывает существующее значение localStorage при выполнении нового поиска.
