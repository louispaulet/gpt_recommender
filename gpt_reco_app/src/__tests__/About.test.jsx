import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import About from '../pages/About.jsx';

test('shows about heading', () => {
  render(<About />);
  expect(screen.getByRole('heading', { name: /about gpt youtube channel recommender/i })).toBeInTheDocument();
});
