import React, { useState } from 'react';

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
    <div className="space-y-6">
      <input
        type="file"
        accept="text/html"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700"
      />
      {results.length > 0 && (
        <div className="space-y-4">
          <textarea
            readOnly
            value={csv}
            rows={Math.min(10, results.length + 1)}
            className="w-full border border-gray-300 p-2 font-mono text-sm"
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HtmlSubscriptionImporter;
