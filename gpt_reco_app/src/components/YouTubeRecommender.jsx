import React, { useState } from 'react';
import OpenAI from 'openai';

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

      const prompt = `Based on the following list of YouTube recommendations, please suggest new YouTube channels to watch. The input list is:\n\n${inputText}\n\nPlease provide channel names and URLs if available.`;

      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that recommends YouTube channels.' },
          { role: 'user', content: prompt },
        ],
      });

      if (response && response.choices && response.choices.length > 0) {
        setRecommendations(response.choices[0].message.content.trim());
      } else {
        setRecommendations('No recommendations received.');
      }
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
        <pre className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded whitespace-pre-wrap">{recommendations}</pre>
      )}
    </section>
  );
}

export default YouTubeRecommender;
