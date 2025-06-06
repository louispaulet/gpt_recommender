import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Homepage from '../pages/Homepage.jsx';

// Mock components inside to avoid heavy rendering
vi.mock('../components/Homepage.jsx', () => ({ default: () => <div>API KEY</div> }));
vi.mock('../components/YouTubeRecommender.jsx', () => ({ default: () => <div>RECOMMENDER</div> }));

test('renders homepage title', () => {
  render(<Homepage />);
  expect(screen.getByRole('heading', { name: /gpt youtube channel recommender/i })).toBeInTheDocument();
});
