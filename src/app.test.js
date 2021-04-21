import { render, screen } from '@testing-library/react';
import App from './app';
import React from 'react';

describe('app', () => {
  test('mount success', () => {
    render(<App />);
    const linkElement = screen.getByText(/template/i);
    expect(linkElement).toBeInTheDocument();
  });
});

