import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShowResult } from '../components/ShowResult';

describe('ShowResult', () => {
  it('renders loading state', () => {
    render(
      <ShowResult abilities={[]} loading={true} error={null} pokemonName="" />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <ShowResult
        abilities={[]}
        loading={false}
        error="Something went wrong"
        pokemonName=""
      />
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders abilities', () => {
    render(
      <ShowResult
        loading={false}
        error={null}
        pokemonName="pikachu"
        abilities={[
          {
            name: 'static',
            effect_entries: [
              {
                effect: 'Paralyzes attacker',
                short_effect: 'Has a 30% chance to paralyze.',
                language: { name: 'en'},
              },
            ],
          },
        ]}
      />
    );
    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(
      screen.getByText(/has a 30% chance to paralyze/i)
    ).toBeInTheDocument();
  });
});
