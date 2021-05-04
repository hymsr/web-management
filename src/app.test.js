import { render, screen } from '@testing-library/react';
import App from './app';
import React from 'react';

describe('app', () => {
  test('mount success', () => {
    render(<App />);
    const linkElement = screen.getByText(/前端管理界面/i);
    expect(linkElement).toBeInTheDocument();
  });
});

