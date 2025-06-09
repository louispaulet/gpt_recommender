import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { test, expect } from 'vitest';
import App from '../App.jsx';

test('renders homepage by default', async () => {
  render(
    <MemoryRouter
      initialEntries={["/"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Suspense>
        <App />
      </Suspense>
    </MemoryRouter>
  );
  expect(
    await screen.findByRole('heading', { name: /gpt youtube channel recommender/i })
  ).toBeInTheDocument();
});
