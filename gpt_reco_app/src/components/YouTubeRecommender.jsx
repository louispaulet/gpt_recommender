import React, { useState } from 'react';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import YouTubeRecommendationList from './YouTubeRecommendationList';
import YouTubeCriticizer from './YouTubeCriticizer';
import Spinner from './Spinner.jsx';
import useRotatingMessages from '../utils/useRotatingMessages.js';
import useDebounce from '../utils/useDebounce.js';
import { RecommendationsResponse, getOpenAIApiKey } from '../utils/openaiHelpers.js';

// eslint-disable-next-line react-refresh/only-export-components
export function parseSubscriptions(text) {
  return text
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// eslint-disable-next-line react-refresh/only-export-components
export function parseHtmlSubscriptions(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const channels = Array.from(doc.querySelectorAll('ytd-channel-renderer'));
  return channels
    .map((ch) => {
      const handleTag = ch.querySelector('a.channel-link[href*="/@"]');
      if (handleTag) {
        const href = handleTag.getAttribute('href').trim();
        return href.startsWith('http')
          ? href
          : `https://www.youtube.com${href}`;
      }
      return null;
    })
    .filter(Boolean);
}
function YouTubeRecommender() {
  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText, 500);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numRecommendations, setNumRecommendations] = useState(10);
  const [prompt, setPrompt] = useState('');
  const [topics, setTopics] = useState('');
  const debouncedTopics = useDebounce(topics, 500);
  const [useSubscriptions, setUseSubscriptions] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [requestError, setRequestError] = useState('');

  const buttonLabel = useRotatingMessages(
    loading,
    'Get Recommendations'
  );

  const handleToggleSubscriptions = (checked) => {
    setUseSubscriptions(checked);
    if (!checked) {
      setInputText('');
      setShowImporter(false);
      setError('');
      setRequestError('');
    }
  };

  const handleFile = (file) => {
    if (!file.type.includes('html')) {
      setError('Please upload a valid HTML file.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const html = ev.target.result;
      const urls = parseHtmlSubscriptions(html);
      if (urls.length === 0) {
        setError('No channels found. Did you save the correct page?');
      }
      setInputText(urls.join('\n'));
    };
    reader.onerror = () => setError('Failed to read file.');
    reader.readAsText(file);
  };

  // Helper function to parse subscriptions from inputText
  // Defined outside the component for easier testing

  const getRecommendations = async () => {
    const currentApiKey = getOpenAIApiKey();
    if (!currentApiKey) {
      setRecommendations('API key not found. Please set your OpenAI API key in the homepage.');
      setRequestError('');
      return;
    }
    if (useSubscriptions && !inputText.trim()) {
      setRequestError('Please upload or paste your subscriptions or disable the checkbox.');
      setRecommendations(null);
      return;
    }
    if (numRecommendations < 1) {
      setRequestError('Number of recommendations must be at least 1.');
      setRecommendations(null);
      return;
    }
    setRequestError('');
    setLoading(true);
    setRecommendations(null);
    try {
      const client = new OpenAI({
        apiKey: currentApiKey,
        dangerouslyAllowBrowser: true,
      });

      const topicLine = debouncedTopics.trim()
        ? `Consider these preferred topics or keywords when making recommendations: ${debouncedTopics}.`
        : '';

      const subsPrompt =
        useSubscriptions && debouncedInputText.trim()
          ? `The input list of subscribed channels:\n\n${debouncedInputText}\n\nDo NOT recommend a channel that is already present in the input list.`
          : '';

      const basePrompt = `Please suggest ${numRecommendations} new YouTube channels to watch.`;

      const newPrompt = [basePrompt, topicLine, subsPrompt]
        .filter((s) => s)
        .join('\n');

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
      const networkRegex = /Network|Failed to fetch/i;
      if (error && networkRegex.test(error.message)) {
        setRequestError('Network error while fetching recommendations. Please try again.');
      } else {
        setRequestError(`Failed to get recommendations: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg font-secondary">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 font-primary">YouTube Channel Recommender</h2>
      <label className="block mb-4 text-gray-700 font-medium">
        <input
          type="checkbox"
          checked={useSubscriptions}
          onChange={(e) => handleToggleSubscriptions(e.target.checked)}
          className="mr-2"
        />
        Use my subscription list
      </label>
      {useSubscriptions && (
        <div className="mb-6 space-y-4">
          <button
            type="button"
            onClick={() => setShowImporter((v) => !v)}
            className="text-primary-700 underline"
          >
            {showImporter ? 'Hide subscription importer' : 'Upload subscriptions HTML file'}
          </button>
          {showImporter && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              className={`p-4 border-2 border-dashed rounded-lg ${dragActive ? 'bg-primary-50 border-primary-600' : 'border-gray-300'}`}
            >
              <input
                type="file"
                accept="text/html"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) handleFile(f);
                }}
                className="w-full"
              />
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <textarea
            rows={5}
            placeholder="Your subscriptions will appear here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          />
        </div>
      )}
      <label className="block mb-4 text-gray-700 font-medium">
        Number of recommendations to make:
        <input
          type="number"
          min="1"
          value={numRecommendations}
          onChange={(e) => setNumRecommendations(Number(e.target.value))}
          className="ml-3 p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
        />
      </label>
      <label className="block mb-4 text-gray-700 font-medium">
        Preferred topics or keywords:
        <input
          type="text"
          placeholder="e.g. technology, cooking"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
        />
      </label>
      <button
        onClick={getRecommendations}
        disabled={loading}
        className="w-full py-3 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
      >
        {loading ? (
          <>
            <Spinner />
            {buttonLabel}
          </>
        ) : (
          buttonLabel
        )}
      </button>
      {requestError && (
        <p className="mt-4 text-sm text-red-600" role="alert">{requestError}</p>
      )}
      {recommendations && (
        Array.isArray(recommendations) ? (
          <>
            <YouTubeRecommendationList recommendations={recommendations} prompt={prompt} />
            <YouTubeCriticizer
              subscriptions={parseSubscriptions(debouncedInputText)}
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
