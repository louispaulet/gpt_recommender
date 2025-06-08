import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import Cookies from 'js-cookie';
import Spinner from './Spinner.jsx';

function HomepageComponent() {
  const [apiKey, setApiKey] = useState('');
  const [cookieApiKeyLoaded, setCookieApiKeyLoaded] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // { message: string, status: 'success' | 'error' }
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Load API key from cookie on mount
    const savedKey = Cookies.get('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setCookieApiKeyLoaded(true);
    }
  }, []);

  const checkApiKey = async () => {
    setLoading(true);
    setCheckResult(null);
    setFadeOut(false);
    try {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      // Make a simple request to check if the key is valid
      const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: "Say hello",
      });
      if (response && response.output_text) {
        setCheckResult({ message: 'API key is valid.', status: 'success' });
        // Save valid API key to cookie for 30 days
        Cookies.set('openai_api_key', apiKey, { expires: 30, secure: true, sameSite: 'strict' });
        setCookieApiKeyLoaded(true);
      } else {
        setCheckResult({ message: 'API key is invalid or request failed.', status: 'error' });
        // Remove invalid key from cookie if any
        Cookies.remove('openai_api_key');
        setCookieApiKeyLoaded(false);
      }
      // Start fade away effect at 2.5 seconds, clear message at 3 seconds
      setTimeout(() => {
        setFadeOut(true);
      }, 2500);
      setTimeout(() => {
        setCheckResult(null);
        setFadeOut(false);
      }, 3000);
    } catch (error) {
      setCheckResult({ message: `API key is invalid or request failed: ${error.message}`, status: 'error' });
      // Remove invalid key from cookie if any
      Cookies.remove('openai_api_key');
      setCookieApiKeyLoaded(false);
      // Start fade away effect at 2.5 seconds, clear message at 3 seconds
      setTimeout(() => {
        setFadeOut(true);
      }, 2500);
      setTimeout(() => {
        setCheckResult(null);
        setFadeOut(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = () => {
    Cookies.remove('openai_api_key');
    setApiKey('');
    setCheckResult({ message: 'API key deleted.', status: 'success' });
    setCookieApiKeyLoaded(false);
    setFadeOut(false);
    // Start fade away effect at 2.5 seconds, clear message at 3 seconds
    setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    setTimeout(() => {
      setCheckResult(null);
      setFadeOut(false);
    }, 3000);
  };

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 font-secondary">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 font-primary">Set up your OpenAI API key</h2>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
      />
      <button
        onClick={checkApiKey}
        disabled={loading || !apiKey}
        className="w-full py-3 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
      >
        {loading ? (
          <>
            <Spinner />
            Checking...
          </>
        ) : (
          'Check and save API Key'
        )}
      </button>

      {apiKey && cookieApiKeyLoaded && (
      <div className="mt-6 flex justify-between items-center bg-green-100 border border-green-400 text-green-900 p-4 rounded-lg">
        <p className="text-lg font-medium">API key is loaded from cookie.</p>
        <button
          onClick={deleteApiKey}
          className="ml-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
        >
          Delete Key
        </button>
      </div>
      )}

      {checkResult && (
        <p
          className={`mt-6 p-4 rounded-lg flex items-center text-lg font-medium transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } ${
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
