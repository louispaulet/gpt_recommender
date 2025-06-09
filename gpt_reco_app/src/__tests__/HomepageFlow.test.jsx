import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { afterEach, expect, test, vi } from 'vitest';

let createMock;
let parseMock;

vi.mock('openai', () => ({
  default: class {
    responses = {
      create: (...args) => createMock(...args),
      parse: (...args) => parseMock(...args),
    };
  },
}));

import Homepage from '../pages/Homepage.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

const recommendations = [
  { channel_name: 'Flow', channel_url: 'https://flow.com', recommendation_reason: 'why' },
];

test('user can set api key and fetch recommendations', async () => {
  createMock = vi.fn().mockResolvedValue({ output_text: 'ok' });
  parseMock = vi.fn().mockResolvedValue({ output_parsed: { recommendations } });
  globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 200 }) }));

  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense>
        <Homepage />
      </Suspense>
    </MemoryRouter>
  );

  const input = screen.getByLabelText(/openai api key/i);
  await userEvent.type(input, 'abc');
  await userEvent.click(screen.getByRole('button', { name: /check and save api key/i }));
  await screen.findByText(/api key is valid/i);
  document.cookie = 'openai_api_key=abc';
  await userEvent.click(screen.getByRole('button', { name: /get recommendations/i }));
  await waitFor(() => expect(parseMock).toHaveBeenCalled());
});
