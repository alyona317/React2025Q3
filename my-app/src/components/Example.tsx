import { render, screen } from '@testing-library/react';
import React from 'react';

function Example() {
  return <div>Hello test</div>;
}

test('renders text', () => {
  render(<Example />);
  expect(screen.getByText(/hello test/i)).toBeInTheDocument();
});
