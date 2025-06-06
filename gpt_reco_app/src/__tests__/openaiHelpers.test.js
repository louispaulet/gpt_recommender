import { test, expect } from 'vitest';
import Cookies from 'js-cookie';
import { RecommendationSchema, RecommendationsResponse, getOpenAIApiKey } from '../utils/openaiHelpers.js';


test('RecommendationSchema validates valid object', () => {
  const data = {
    channel_name: 'Test Channel',
    channel_url: 'https://youtube.com/@test',
    recommendation_reason: 'Because it is great',
  };
  const result = RecommendationSchema.safeParse(data);
  expect(result.success).toBe(true);
});

test('RecommendationSchema rejects invalid object', () => {
  const data = {
    channel_name: 'Test Channel',
    recommendation_reason: 'missing url',
  };
  const result = RecommendationSchema.safeParse(data);
  expect(result.success).toBe(false);
});

test('RecommendationsResponse parses array of recommendations', () => {
  const data = {
    recommendations: [
      { channel_name: 'A', channel_url: 'https://a.com', recommendation_reason: 'one' },
    ],
  };
  const result = RecommendationsResponse.safeParse(data);
  expect(result.success).toBe(true);
});

test('getOpenAIApiKey returns stored cookie value', () => {
  Cookies.set('openai_api_key', 'abc123');
  expect(getOpenAIApiKey()).toBe('abc123');
  Cookies.remove('openai_api_key');
});
