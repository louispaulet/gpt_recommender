import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import Navbar from '../components/Navbar.jsx';

test('renders navigation links', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
});
