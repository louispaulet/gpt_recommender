import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { test, expect } from 'vitest';
import App from '../App.jsx';

test('renders extraction page heading via router', async () => {
  render(
    <MemoryRouter initialEntries={["/extract-youtube"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense>
        <App />
      </Suspense>
    </MemoryRouter>
  );
  expect(
    await screen.findByRole('heading', { name: /extract your subscriptions/i })
  ).toBeInTheDocument();
});
