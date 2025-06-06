import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import Footer from '../components/Footer.jsx';

test('renders privacy and terms links', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
  expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
});
