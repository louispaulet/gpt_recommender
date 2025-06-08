import React, { useState } from 'react';
import OpenAI from 'openai';
import YouTubeRecommendationList from './YouTubeRecommendationList.jsx';
import { zodTextFormat } from 'openai/helpers/zod';
import { RecommendationsResponse, getOpenAIApiKey } from '../utils/openaiHelpers.js';


function YouTubeCriticizer({ subscriptions, recommendations }) {
  const [improvedRecommendations, setImprovedRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load API key from cookie on mount
  const [openaiApiKey, setOpenaiApiKey] = React.useState('');
  React.useEffect(() => {
    const savedKey = getOpenAIApiKey();
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

      const parsedRecommendations = response.output_parsed.recommendations || [];
      setImprovedRecommendations(parsedRecommendations);
    } catch (err) {
      setError('Error fetching improved recommendations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md font-secondary">
      <h2 className="text-2xl font-semibold mb-4 font-primary">Criticizer: Get Better Recommendations</h2>
      <button
        onClick={getImprovedRecommendations}
        disabled={loading}
        className="mb-4 w-full py-3 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Loading...' : 'Get Improved Recommendations'}
      </button>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {improvedRecommendations.length > 0 && (
        <YouTubeRecommendationList
          recommendations={improvedRecommendations}
          prompt={`User subscriptions: ${subscriptions.join(', ')}. Previous recommendations: ${recommendations.map(r => r.channel_name).join(', ')}`}
        />
      )}
    </div>
  );
}

export default YouTubeCriticizer;
