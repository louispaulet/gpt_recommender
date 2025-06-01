import React, { useState } from 'react';
import OpenAI from 'openai';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';
import YouTubeVideoRecommendationList from './YouTubeVideoRecommendationList.jsx';

const VideoRecommendationSchema = z.object({
  video_name: z.string(),
  video_url: z.string(),
});

const VideoRecommendationsResponse = z.object({
  recommendations: z.array(VideoRecommendationSchema),
});

function YouTubeVideoRecommender() {
  const [theme, setTheme] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numRecommendations, setNumRecommendations] = useState(10);
  const [prompt, setPrompt] = useState('');

  const getVideoRecommendations = async () => {
    const currentApiKey = Cookies.get('openai_api_key');
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
Based on the following theme, please suggest ${numRecommendations} YouTube videos to watch.
Theme: ${theme}

Please respond ONLY in JSON format with a list of recommendations.
Each recommendation should have the following fields:
"video_name" (string), "video_url" (string) which is a valid YouTube video URL.

Do NOT include channels, only individual videos.`;

      setPrompt(newPrompt);

      const response = await client.responses.parse({
        model: 'gpt-4.1-nano',
        input: [
          { role: 'system', content: 'You are a helpful assistant that recommends YouTube videos.' },
          { role: 'user', content: newPrompt },
        ],
        text: {
          format: zodTextFormat(VideoRecommendationsResponse, 'recommendations'),
        },
      });

      const parsedRecommendations = response.output_parsed.recommendations;
      setRecommendations(parsedRecommendations);
    } catch (error) {
      console.error('Error fetching video recommendations:', error);
      setRecommendations('Failed to get video recommendations. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">YouTube Video Recommender</h2>
      <input
        type="text"
        placeholder="Enter a theme for video recommendations"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <label className="block mb-4 text-gray-700 font-medium">
        Number of recommendations to make:
        <input
          type="number"
          min="1"
          value={numRecommendations}
          onChange={(e) => setNumRecommendations(Number(e.target.value))}
          className="ml-3 p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>
      <button
        onClick={getVideoRecommendations}
        disabled={loading || !theme}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Getting Video Recommendations...' : 'Get Video Recommendations'}
      </button>
      {recommendations && (
        Array.isArray(recommendations) ? (
          <YouTubeVideoRecommendationList recommendations={recommendations} prompt={prompt} />
        ) : (
          <pre className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg whitespace-pre-wrap">{recommendations}</pre>
        )
      )}
    </section>
  );
}

export default YouTubeVideoRecommender;
