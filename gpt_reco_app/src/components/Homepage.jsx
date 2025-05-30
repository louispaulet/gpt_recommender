import React, { useState } from 'react';
import OpenAI from 'openai';

function HomepageComponent() {
  const [apiKey, setApiKey] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkApiKey = async () => {
    console.log("Starting API key check...");
    setLoading(true);
    setCheckResult(null);
    try {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      
      console.log("Client created, sending request...");
      // Make a simple request to check if the key is valid
      const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: "Say hello",
      });
      console.log("Response received:", response);
      if (response && response.output_text) {
        setCheckResult('API key is valid.');
      } else {
        setCheckResult('API key is invalid or request failed.');
      }
    } catch (error) {
      console.error("Error during API key check:", error);
      setCheckResult('API key is invalid or request failed.');
    } finally {
      setLoading(false);
      console.log("API key check finished.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Set up your OpenAI API key</h2>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={checkApiKey}
        disabled={loading || !apiKey}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check API Key'}
      </button>
      {checkResult && <p className="mt-4">{checkResult}</p>}
    </main>
  );
}

export default HomepageComponent;
