import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { PokemonItem } from './PokemonItem';

vi.mock('../ThemeContext/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('PokemonItem', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders with correct text and theme classes (light)', () => {
    render(<PokemonItem name="pikachu" />);

    const listItem = screen.getByRole('listitem');
    const checkbox = screen.getByRole('checkbox');
    const nameSpan = screen.getByText(/pikachu/i);

    expect(nameSpan).toBeInTheDocument();

    expect(listItem.className).toContain('itemLight');
    expect(checkbox.className).toContain('checkboxLight');
    expect(nameSpan.className).toContain('nameLight');

    expect(checkbox).not.toBeChecked();
  });

  it('toggles checkbox state on change', () => {
    render(<PokemonItem name="pikachu" />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls navigate with the correct name on list item click', () => {
    render(<PokemonItem name="pikachu" />);
    const listItem = screen.getByRole('listitem');

    fireEvent.click(listItem);
    expect(mockNavigate).toHaveBeenCalledWith('pikachu');
  });

  it('stops propagation on checkbox click', () => {
    render(<PokemonItem name="pikachu" />);
    const listItem = screen.getByRole('listitem');

    const listItemClickHandler = vi.fn();
    listItem.addEventListener('click', listItemClickHandler);

    fireEvent.click(listItem);
    expect(listItemClickHandler).toHaveBeenCalled();
  });
});
