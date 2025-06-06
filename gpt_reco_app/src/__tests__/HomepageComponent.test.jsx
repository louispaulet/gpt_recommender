import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import HomepageComponent from '../components/Homepage.jsx';

test('shows API key setup heading', () => {
  render(<HomepageComponent />);
  expect(screen.getByText(/set up your openai api key/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /check and save api key/i })).toBeInTheDocument();
});
