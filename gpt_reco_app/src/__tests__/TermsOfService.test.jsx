import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import TermsOfService from '../pages/TermsOfService.jsx';

test('shows terms heading', () => {
  render(<TermsOfService />);
  expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
});
