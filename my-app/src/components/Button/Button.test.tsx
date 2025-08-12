import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { useTheme } from '@components/ThemeContext/useTheme';

vi.mock('@components/ThemeContext/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Button component', () => {
  it("render button's name", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<Button name="Click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('apple class light if theme light', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<Button name="Light Button" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/buttonLight/);
  });

  it('apple class dark if theme dark', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

    render(<Button name="Dark Button" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/buttonDark/);
  });

  it('switch isClicked by click', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<Button name="Toggle" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
