import { z } from 'zod';
import Cookies from 'js-cookie';

export const RecommendationSchema = z.object({
  channel_name: z.string(),
  channel_url: z.string(),
  recommendation_reason: z.string(),
});

export const RecommendationsResponse = z.object({
  recommendations: z.array(RecommendationSchema),
});

export function getOpenAIApiKey() {
  return Cookies.get('openai_api_key');
}
