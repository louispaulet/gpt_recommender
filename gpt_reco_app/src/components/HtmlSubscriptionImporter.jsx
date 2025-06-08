import React, { useState } from 'react';
import { FiCopy, FiUpload, FiDownload } from 'react-icons/fi';
import Spinner from './Spinner.jsx';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file) => {
    if (!file.type.includes('html')) {
      setError('Please upload a valid HTML file.');
      return;
    }
    setError('');
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const html = ev.target.result;
      const parsed = parseSubscriptions(html);
      setResults(parsed);
      if (parsed.length === 0) {
        setError('No channels found. Did you save the correct page?');
      }
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file.');
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) processFile(file);
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

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.csv';
    a.click();
    URL.revokeObjectURL(url);
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
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-3 border-2 border-dashed rounded-lg transition-colors ${dragActive ? 'bg-primary-50 border-primary-600' : 'border-gray-300'}`}
      >
        <input
          id="subscription-file"
          type="file"
          accept="text/html"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && (
        <div className="flex justify-center">
          <Spinner size={24} />
        </div>
      )}
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
          <button
            type="button"
            onClick={downloadCsv}
            className="w-full py-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 text-white font-semibold rounded-lg transition flex items-center justify-center space-x-2"
          >
            <FiDownload />
            <span>Download CSV</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HtmlSubscriptionImporter;
