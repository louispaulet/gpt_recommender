import React, { useState } from 'react';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import YouTubeRecommendationList from './YouTubeRecommendationList';
import YouTubeCriticizer from './YouTubeCriticizer';
import { RecommendationsResponse, getOpenAIApiKey } from '../utils/openaiHelpers.js';
function YouTubeRecommender() {
  const [inputText, setInputText] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numRecommendations, setNumRecommendations] = useState(10);
  const [prompt, setPrompt] = useState('');

  // Helper function to parse subscriptions from inputText
  const parseSubscriptions = (text) => {
    // Split by new lines, commas, or semicolons, trim spaces, and filter out empty strings
    return text
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  const getRecommendations = async () => {
    const currentApiKey = getOpenAIApiKey();
    if (!currentApiKey) {
      setRecommendations('API key not found. Please set your OpenAI API key in the homepage.');
      return;
    }
    setLoading(true);
    setRecommendations(null);
    try {
      const client = new OpenAI({
        apiKey: currentApiKey,
        dangerouslyAllowBrowser: true,
      });

      const newPrompt = `
Based on the following list of YouTube recommendations, please suggest ${numRecommendations} new YouTube channels to watch.
The input list of subscribed channels:

${inputText}

Please respond ONLY in JSON format with a list of recommendations. 
Each recommendation should have the following fields: 
"channel_name" (string), "channel_url" (string) where the URL is formatted as "https://www.youtube.com/@" + slug of the channel name,
and "recommendation_reason" (string) which is a single short sentence explaining why this channel is recommended.

Do NOT recommend a channel that is already present in the input list.`;

      setPrompt(newPrompt);

      const response = await client.responses.parse({
        model: 'gpt-4.1-nano',
        input: [
          { role: 'system', content: 'You are a helpful assistant that recommends YouTube channels.' },
          { role: 'user', content: newPrompt },
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
    <section className="max-w-3xl mx-auto p-section mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">YouTube Channel Recommender</h2>
      <textarea
        rows={5}
        placeholder="Paste your current YouTube subscriptions here (names and URLs if available)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition"
      />
      <label className="block mb-4 text-gray-700 font-medium">
        Number of recommendations to make:
        <input
          type="number"
          min="1"
          value={numRecommendations}
          onChange={(e) => setNumRecommendations(Number(e.target.value))}
          className="ml-3 p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition"
        />
      </label>
      <button
        onClick={getRecommendations}
        disabled={loading || !inputText}
        className="w-full py-3 bg-brand hover:bg-brand-dark focus:ring-4 focus:ring-brand-light text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>
      {recommendations && (
        Array.isArray(recommendations) ? (
          <>
            <YouTubeRecommendationList recommendations={recommendations} prompt={prompt} />
            <YouTubeCriticizer
              subscriptions={parseSubscriptions(inputText)}
              recommendations={recommendations}
            />
          </>
        ) : (
          <pre className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg whitespace-pre-wrap">{recommendations}</pre>
        )
      )}
    </section>
  );
}

export default YouTubeRecommender;
