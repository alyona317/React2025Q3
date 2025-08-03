import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Search } from './Search';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';

describe('Search', () => {
  it('renders input', () => {
    render(
      <ThemeProvider>
        {' '}
        <Search onSearch={() => {}} />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders button', () => {
    render(
      <ThemeProvider>
        {' '}
        <Search onSearch={() => {}} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('should update the input value correctly', async () => {
    render(
      <ThemeProvider>
        {' '}
        <Search onSearch={() => {}} />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
    await userEvent.type(input, 'pikachu');
    expect(input).toHaveValue('pikachu');
  });

  it('test click event', () => {
    const onClickMock = vi.fn();
    render(
      <ThemeProvider>
        <Search onSearch={onClickMock} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch with the correct input value on button click', async () => {
    const onClickMock = vi.fn();
    render(
      <ThemeProvider>
        <Search onSearch={onClickMock} />
      </ThemeProvider>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Pikachu');

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith('pikachu');
  });
});
