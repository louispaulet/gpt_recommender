import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, test, expect, vi } from 'vitest';
import YouTubeRecommendationList from '../components/YouTubeRecommendationList.jsx';

const recs = [
  { channel_name: 'A', channel_url: 'https://a.com', recommendation_reason: 'one' },
  { channel_name: 'A', channel_url: 'https://a.com', recommendation_reason: 'dup' },
  { channel_name: 'B', channel_url: 'https://b.com', recommendation_reason: 'two' },
];

globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 200 }) }));

afterEach(() => vi.restoreAllMocks());

test('handles duplicate toggle', async () => {
  render(<YouTubeRecommendationList recommendations={recs} prompt="A" />);
  expect(screen.getAllByRole('link').length).toBe(1);
  const toggle = screen.getByLabelText('Toggle display of duplicate recommendations');
  await userEvent.click(toggle);
  expect(screen.getAllByRole('link').length).toBe(2);
});
