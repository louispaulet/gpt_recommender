import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { test, expect } from 'vitest';
import App from '../App.jsx';

test('renders not found page for invalid route', async () => {
  render(
    <MemoryRouter initialEntries={["/does-not-exist"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense>
        <App />
      </Suspense>
    </MemoryRouter>
  );
  expect(
    await screen.findByRole('heading', { name: /page not found/i })
  ).toBeInTheDocument();
});
