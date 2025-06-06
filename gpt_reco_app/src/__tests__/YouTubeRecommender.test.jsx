import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import YouTubeRecommender from '../components/YouTubeRecommender.jsx';

test('button disabled without input', () => {
  render(<YouTubeRecommender />);
  const btn = screen.getByRole('button', { name: /get recommendations/i });
  expect(btn).toBeDisabled();
});
