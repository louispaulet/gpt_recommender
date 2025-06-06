import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import YouTubeCriticizer from '../components/YouTubeCriticizer.jsx';

const subs = ['channel1'];
const recs = [
  { channel_name: 'test', channel_url: 'https://x.com', recommendation_reason: 'why' },
];

test('renders criticizer section', () => {
  render(<YouTubeCriticizer subscriptions={subs} recommendations={recs} />);
  expect(screen.getByText(/criticizer: get better recommendations/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get improved recommendations/i })).toBeInTheDocument();
});
