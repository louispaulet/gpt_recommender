import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import YouTubeRecommender, { parseSubscriptions } from '../components/YouTubeRecommender.jsx';

test('button enabled without subscriptions', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <YouTubeRecommender />
    </MemoryRouter>
  );
  const btn = screen.getByRole('button', { name: /get recommendations/i });
  expect(btn).toBeEnabled();
});

test('parseSubscriptions splits lines, commas and semicolons', () => {
  const input = 'A, B\nC; D;;\n';
  expect(parseSubscriptions(input)).toEqual(['A', 'B', 'C', 'D']);
});

test('parseSubscriptions returns empty array for empty input', () => {
  expect(parseSubscriptions('')).toEqual([]);
});
