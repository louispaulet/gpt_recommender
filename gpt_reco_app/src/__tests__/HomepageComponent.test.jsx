import Cookies from "js-cookie";
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import HomepageComponent from '../components/Homepage.jsx';

test('shows API key setup heading', () => {
  render(<HomepageComponent />);
  expect(screen.getByText(/set up your openai api key/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/openai api key/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /check and save api key/i })).toBeInTheDocument();
});

test('shows delete button when API key cookie exists', async () => {
  Cookies.set('openai_api_key', 'test');
  render(<HomepageComponent />);
  expect(await screen.findByText(/api key is loaded from cookie/i)).toBeInTheDocument();
  Cookies.remove('openai_api_key');
});
