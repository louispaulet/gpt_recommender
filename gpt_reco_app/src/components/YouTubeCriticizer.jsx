import React, { useState } from 'react';
import OpenAI from 'openai';
import YouTubeRecommendationList from './YouTubeRecommendationList.jsx';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { zodTextFormat } from 'openai/helpers/zod';

// Define the recommendation type schema using zod
const RecommendationSchema = z.object({
  channel_name: z.string(),
  channel_url: z.string(),
  recommendation_reason: z.string(),
});

const RecommendationsResponse = z.object({
  recommendations: z.array(RecommendationSchema),
});

function YouTubeCriticizer({ subscriptions, recommendations }) {
  const [improvedRecommendations, setImprovedRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load API key from cookie on mount
  const [openaiApiKey, setOpenaiApiKey] = React.useState('');
  React.useEffect(() => {
    const savedKey = Cookies.get('openai_api_key');
    if (savedKey) {
      setOpenaiApiKey(savedKey);
    }
  }, []);

  const getImprovedRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true,
      });


      // Prepare the prompt to ask for better recommendations
      const prompt = `You are a YouTube channel recommender assistant. Given the user's current subscriptions:\n${subscriptions.join(
        ', '
      )}\n\nAnd the previous recommendations:\n${recommendations
        .map((r) => r.channel_name)
        .join(', ')}\n\nPlease provide a new list of ${recommendations.length} YouTube channel recommendations that are better than the previous list. Each recommendation should include the channel_name, channel_url, and a brief recommendation_reason. Respond ONLY in JSON format as an array of objects.`;
      
      console.log(prompt)
      const response = await client.responses.parse({
        model: 'gpt-4.1-nano',
        input: [
          { role: 'system', content: 'You are a helpful assistant that recommends YouTube channels.' },
          { role: 'user', content: prompt },
        ],
        text: {
          format: zodTextFormat(RecommendationsResponse, 'recommendations'),
        },
      });

      console.log('OpenAI response:', response);

      const parsedRecommendations = response.output_parsed.recommendations || [];
      console.log(parsedRecommendations)
      setImprovedRecommendations(parsedRecommendations);
    } catch (err) {
      setError('Error fetching improved recommendations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Criticizer: Get Better Recommendations</h2>
      <button
        onClick={getImprovedRecommendations}
        disabled={loading}
        className="mb-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Loading...' : 'Get Improved Recommendations'}
      </button>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {improvedRecommendations.length > 0 && (
        <YouTubeRecommendationList recommendations={improvedRecommendations} prompt="" />
      )}
    </div>
  );
}

export default YouTubeCriticizer;
