import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import YouTubeRecommender, {
  parseSubscriptions,
  parseHtmlSubscriptions,
} from '../components/YouTubeRecommender.jsx';

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

test('unchecking subscription list clears textarea', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <YouTubeRecommender />
    </MemoryRouter>
  );
  const checkbox = screen.getAllByRole('checkbox', { name: /use my subscription list/i })[0];
  await user.click(checkbox);
  const textarea = screen.getByPlaceholderText(/your subscriptions will appear here/i);
  await user.type(textarea, 'test');
  expect(textarea.value).toBe('test');
  await user.click(checkbox);
  expect(screen.queryByPlaceholderText(/your subscriptions will appear here/i)).toBeNull();
  await user.click(checkbox);
  const textareaAgain = screen.getByPlaceholderText(/your subscriptions will appear here/i);
  expect(textareaAgain.value).toBe('');
});

test('parseHtmlSubscriptions extracts channel urls', () => {
  const html = `
  <ytd-channel-renderer>
    <a class="channel-link" href="/@alpha"></a>
  </ytd-channel-renderer>
  <ytd-channel-renderer>
    <a class="channel-link" href="https://www.youtube.com/@beta"></a>
  </ytd-channel-renderer>`;
  expect(parseHtmlSubscriptions(html)).toEqual([
    'https://www.youtube.com/@alpha',
    'https://www.youtube.com/@beta',
  ]);
});

test('parseHtmlSubscriptions ignores items without channel link', () => {
  const html = `
    <ytd-channel-renderer></ytd-channel-renderer>
    <ytd-channel-renderer>
      <a class="channel-link" href="/@good"></a>
    </ytd-channel-renderer>`;
  expect(parseHtmlSubscriptions(html)).toEqual([
    'https://www.youtube.com/@good',
  ]);
});

test('parseHtmlSubscriptions returns empty array when no matches', () => {
  expect(parseHtmlSubscriptions('<div></div>')).toEqual([]);
});

test('parseSubscriptions trims whitespace and ignores blanks', () => {
  const input = '  One ;; , \n Two\n\nThree ';
  expect(parseSubscriptions(input)).toEqual(['One', 'Two', 'Three']);
});
