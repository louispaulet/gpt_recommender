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

  return (
    <div className="space-y-6">
      <input
        type="file"
        accept="text/html"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700"
      />
      {results.length > 0 && (
        <ul className="list-disc pl-6">
          {results.map((r) => (
            <li key={r.url}>
              <a href={r.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HtmlSubscriptionImporter;
