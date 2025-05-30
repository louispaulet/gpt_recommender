import React, { useState } from 'react';
import OpenAI from 'openai';

function HomepageComponent() {
  const [apiKey, setApiKey] = useState('');
  const [checkResult, setCheckResult] = useState(null); // { message: string, status: 'success' | 'error' }
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
        setCheckResult({ message: 'API key is valid.', status: 'success' });
      } else {
        setCheckResult({ message: 'API key is invalid or request failed.', status: 'error' });
      }
    } catch (error) {
      console.error("Error during API key check:", error);
      setCheckResult({ message: 'API key is invalid or request failed.', status: 'error' });
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
      {checkResult && (
        <p
          className={`mt-4 p-3 rounded ${
            checkResult.status === 'success'
              ? 'bg-green-100 text-green-800 border border-green-400'
              : 'bg-red-100 text-red-800 border border-red-400'
          } flex items-center`}
          role="alert"
        >
          {checkResult.status === 'success' ? (
            <svg
              className="w-5 h-5 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M7.629 13.314l-3.292-3.292-1.414 1.414 4.706 4.706 9-9-1.414-1.414z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z" />
            </svg>
          )}
          {checkResult.message}
        </p>
      )}
    </main>
  );
}

export default HomepageComponent;
