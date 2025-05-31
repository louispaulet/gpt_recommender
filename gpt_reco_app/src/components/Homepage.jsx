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
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Set up your OpenAI API key</h2>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <button
        onClick={checkApiKey}
        disabled={loading || !apiKey}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Checking...' : 'Check API Key'}
      </button>
      {checkResult && (
        <p
          className={`mt-6 p-4 rounded-lg flex items-center text-lg font-medium ${
            checkResult.status === 'success'
              ? 'bg-green-100 text-green-900 border border-green-400'
              : 'bg-red-100 text-red-900 border border-red-400'
          }`}
          role="alert"
        >
          {checkResult.status === 'success' ? (
            <svg
              className="w-6 h-6 mr-3 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.629 13.314l-3.292-3.292-1.414 1.414 4.706 4.706 9-9-1.414-1.414z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 mr-3 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
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
