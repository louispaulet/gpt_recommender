import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import App from '../App.jsx';

test('renders homepage by default', () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /gpt youtube channel recommender/i })).toBeInTheDocument();
});
