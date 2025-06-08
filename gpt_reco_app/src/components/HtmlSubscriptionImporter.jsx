import React, { useState } from 'react';
import { FiCopy, FiUpload } from 'react-icons/fi';

// eslint-disable-next-line react-refresh/only-export-components
export function parseSubscriptions(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const channels = Array.from(doc.querySelectorAll('ytd-channel-renderer'));
  return channels
    .map((ch) => {
      const nameTag = ch.querySelector('ytd-channel-name yt-formatted-string#text');
      const handleTag = ch.querySelector('a.channel-link[href*="/@"]');
      if (nameTag && handleTag) {
        return {
          name: nameTag.textContent.trim(),
          url: `https://www.youtube.com${handleTag.getAttribute('href').trim()}`,
        };
      }
      return null;
    })
    .filter(Boolean);
}

const HtmlSubscriptionImporter = () => {
  const [results, setResults] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const html = ev.target.result;
      const parsed = parseSubscriptions(html);
      setResults(parsed);
    };
    reader.readAsText(file);
  };

  const csv = results
    .map((r) => `"${r.name.replace(/"/g, '""')}",${r.url}`)
    .join('\n');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <label
        htmlFor="subscription-file"
        className="block text-lg font-medium text-gray-700 flex items-center space-x-2"
      >
        <FiUpload className="text-primary-600" />
        <span>Upload subscriptions HTML file</span>
      </label>
      <input
        id="subscription-file"
        type="file"
        accept="text/html"
        onChange={handleFileChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {results.length} channels detected. Copy the CSV below:
          </p>
          <textarea
            readOnly
            value={csv}
            rows={Math.min(10, results.length + 1)}
            className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="w-full py-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 text-white font-semibold rounded-lg transition flex items-center justify-center space-x-2"
          >
            <FiCopy />
            <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HtmlSubscriptionImporter;
