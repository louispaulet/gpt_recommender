import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, test, expect, vi } from 'vitest';

let parseMock;
vi.mock('openai', () => ({
  default: class {
    constructor() {}
    responses = {
      parse: (...args) => parseMock(...args),
    };
  },
}));

import YouTubeCriticizer from '../components/YouTubeCriticizer.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

const subs = ['channel1'];
const recs = [
  { channel_name: 'test', channel_url: 'https://x.com', recommendation_reason: 'why' },
];

test('renders criticizer section', () => {
  render(<YouTubeCriticizer subscriptions={subs} recommendations={recs} />);
  expect(screen.getByText(/criticizer: get better recommendations/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get improved recommendations/i })).toBeInTheDocument();
});

test('fetches and displays improved recommendations', async () => {
  parseMock = vi.fn().mockResolvedValue({
    output_parsed: {
      recommendations: [
        { channel_name: 'better', channel_url: 'https://b.com', recommendation_reason: 'why' },
      ],
    },
  });
  globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 200 }) }));
  render(<YouTubeCriticizer subscriptions={subs} recommendations={recs} />);
  const btn = screen.getAllByRole('button', { name: /get improved recommendations/i })[0];
  await userEvent.click(btn);
  expect(await screen.findByText('better')).toBeInTheDocument();
});

test('shows error when fetch fails', async () => {
  parseMock = vi.fn().mockRejectedValue(new Error('bad'));
  globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 200 }) }));
  render(<YouTubeCriticizer subscriptions={subs} recommendations={recs} />);
  const btn = screen.getAllByRole('button', { name: /get improved recommendations/i })[0];
  await userEvent.click(btn);
  expect(await screen.findByText(/error fetching improved recommendations/i)).toBeInTheDocument();
});
