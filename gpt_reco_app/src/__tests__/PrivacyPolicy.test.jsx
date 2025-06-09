import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy.jsx';

test('shows privacy policy heading', () => {
  render(<PrivacyPolicy />);
  expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
});
