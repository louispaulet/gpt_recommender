import React, { useState } from 'react';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const RecommendationSchema = z.object({
  channel_name: z.string(),
  channel_url: z.string(),
});

const RecommendationsResponse = z.object({
  recommendations: z.array(RecommendationSchema),
});

function YouTubeRecommender() {
  const [inputText, setInputText] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const getRecommendations = async () => {
    if (!apiKey) {
      setRecommendations('Please enter your OpenAI API key above to get recommendations.');
      return;
    }
    setLoading(true);
    setRecommendations(null);
    try {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const prompt = `Based on the following list of YouTube recommendations, please suggest new YouTube channels to watch. The input list is:\n\n${inputText}\n\nPlease respond ONLY in JSON format with a list of recommendations. Each recommendation should have the following fields: "channel_name" (string), "channel_url" (string) where the URL is formatted as "https://www.youtube.com/@" + slug of the channel name.`;

      const response = await client.responses.parse({
        model: 'gpt-4.1-mini',
        input: [
          { role: 'system', content: 'You are a helpful assistant that recommends YouTube channels.' },
          { role: 'user', content: prompt },
        ],
        text: {
          format: zodTextFormat(RecommendationsResponse, 'recommendations'),
        },
      });

      const parsedRecommendations = response.output_parsed.recommendations;
      setRecommendations(parsedRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations('Failed to get recommendations. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4 mt-8 border border-gray-300 rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">YouTube Channel Recommender</h2>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <textarea
        rows={5}
        placeholder="Paste your current YouTube recommendations here (names and URLs if available)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
      />
      <button
        onClick={getRecommendations}
        disabled={loading || !inputText || !apiKey}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>
      {recommendations && (
        Array.isArray(recommendations) ? (
          <ul className="mt-4 space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="p-3 border border-gray-300 rounded bg-gray-50">
                <a
                  href={rec.channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {rec.channel_name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <pre className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded whitespace-pre-wrap">{recommendations}</pre>
        )
      )}
    </section>
  );
}

export default YouTubeRecommender;
