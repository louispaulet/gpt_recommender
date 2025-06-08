import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import YouTubeRecommender, { parseSubscriptions } from '../components/YouTubeRecommender.jsx';

test('button disabled without input', () => {
  render(<YouTubeRecommender />);
  const btn = screen.getByRole('button', { name: /get recommendations/i });
  expect(btn).toBeDisabled();
});

test('parseSubscriptions splits lines, commas and semicolons', () => {
  const input = 'A, B\nC; D;;\n';
  expect(parseSubscriptions(input)).toEqual(['A', 'B', 'C', 'D']);
});

test('parseSubscriptions returns empty array for empty input', () => {
  expect(parseSubscriptions('')).toEqual([]);
});
