import React, { useState, useEffect } from 'react';

function YouTubeRecommendationList({ recommendations, prompt }) {
  // Remove duplicate recommendations by channel_url
  const uniqueRecommendations = [];
  const seenUrls = new Set();
  for (const rec of recommendations) {
    if (!seenUrls.has(rec.channel_url)) {
      uniqueRecommendations.push(rec);
      seenUrls.add(rec.channel_url);
    }
  }

  const [statuses, setStatuses] = useState({});
  const [showDuplicates, setShowDuplicates] = useState(false);

  useEffect(() => {
    async function checkUrlStatus(url) {
      const proxyUrl = 'https://head-checker.louispaulet13.workers.dev/?url=' + (url);
      try {
        const response = await fetch(proxyUrl, { method: 'GET' });
        const data = await response.json();
        return data.status;
      } catch (error) {
        return null; // network error or other
      }
    }

    async function checkAllStatuses() {
      // Update statuses incrementally as each fetch completes
      for (const rec of uniqueRecommendations) {
        const status = await checkUrlStatus(rec.channel_url);
        setStatuses(prevStatuses => ({
          ...prevStatuses,
          [rec.channel_url]: status,
        }));
      }
    }

    checkAllStatuses();
  }, [recommendations]);

function getStatusStyle(status) {
  if (status === 200) {
    return {
      liClass: 'p-3 border border-green-500 rounded bg-green-100 flex items-center justify-between',
      icon: (
        <div className="tooltip" data-tooltip="Link verified (HTTP 200)">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
    };
  } else if (status === 404) {
    return {
      liClass: 'p-3 border border-gray-400 rounded bg-gray-200 text-gray-500 flex items-center justify-between',
      icon: (
        <div className="tooltip" data-tooltip="Link incorrect (HTTP 404)">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      ),
    };
  } else if (status) {
    return {
      liClass: 'p-3 border border-green-300 rounded bg-green-50 text-orange-600 flex items-center justify-between',
      icon: (
        <div className="tooltip" data-tooltip={`Link status: HTTP ${status}`}>
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
    };
  } else {
    // status null or undefined, loading or error
    return {
      liClass: 'p-3 border border-gray-300 rounded bg-gray-50 flex items-center justify-between',
      icon: null,
    };
  }
}

  function isDuplicate(rec) {
    if (!prompt) return false;
    // Escape special regex characters in channel_name and channel_url
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const namePattern = new RegExp(`\\b${escapeRegex(rec.channel_name)}\\b`, 'i');
    const urlPattern = new RegExp(escapeRegex(rec.channel_url), 'i');
    return namePattern.test(prompt) || urlPattern.test(prompt);
  }

  function getDuplicateIcon() {
    return (
      <svg className="w-5 h-5 text-yellow-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" title="Duplicate">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    );
  }

  // Sort recommendations according to the criteria:
  // 1. Perfect ones (status 200)
  // 2. Then 404 fails (status 404)
  // 3. Then duplicates
  // 4. Then others
  const sortedRecommendations = [...uniqueRecommendations].sort((a, b) => {
    const statusA = statuses[a.channel_url];
    const statusB = statuses[b.channel_url];
    const duplicateA = isDuplicate(a);
    const duplicateB = isDuplicate(b);

    // Helper function to get rank for sorting
    function getRank(status, duplicate) {
      if (status === 200) return 1;
      if (status === 404) return 2;
      if (duplicate) return 3;
      return 4;
    }

    const rankA = getRank(statusA, duplicateA);
    const rankB = getRank(statusB, duplicateB);

    if (rankA !== rankB) {
      return rankA - rankB;
    }
    // If same rank, keep original order (stable sort)
    return 0;
  });

  // Filter duplicates if showDuplicates is false
  const filteredRecommendations = showDuplicates ? sortedRecommendations : sortedRecommendations.filter(rec => !isDuplicate(rec));


  return (
    <div className="bg-white">
      <label className="my-4 flex items-center cursor-pointer select-none">
        <span className="mr-3 text-gray-800 font-semibold">Show Duplicates</span>
        <input
          type="checkbox"
          checked={showDuplicates}
          onChange={() => setShowDuplicates(!showDuplicates)}
          className="sr-only"
          aria-label="Toggle display of duplicate recommendations"
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
            showDuplicates ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              showDuplicates ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
      <ul className="mt-6 space-y-3 relative">
  {filteredRecommendations.map((rec, index) => {
    const status = statuses[rec.channel_url];
    const { liClass, icon } = getStatusStyle(status);
    const duplicate = isDuplicate(rec);
    // Tooltip text for status
    let statusTooltipText = '';
    if (status === 200) statusTooltipText = 'Link verified (HTTP 200)';
    else if (status === 404) statusTooltipText = 'Link incorrect (HTTP 404)';
    else if (status) statusTooltipText = `Link status: HTTP ${status}`;
    return (
      <li
        key={index}
        className={`${liClass} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between`}
      >
        <a
          href={rec.channel_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 hover:text-indigo-900 font-semibold hover:underline"
        >
          {rec.channel_name}
        </a>
        <div className="flex items-center space-x-2 relative">
          {/* Status Icon with Tooltip */}
          {icon && (
            <div className="group relative cursor-pointer">
              {icon}
              <div
                className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700"
                style={{ bottom: '125%', left: '50%', transform: 'translateX(-50%)' }}
              >
                {statusTooltipText}
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          )}
          {/* Duplicate Icon with Tooltip */}
          {duplicate && (
            <div className="group relative cursor-pointer">
              {getDuplicateIcon()}
              <div
                className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700"
                style={{ bottom: '125%', left: '50%', transform: 'translateX(-50%)' }}
              >
                Duplicate
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          )}
        </div>
      </li>
    );
  })}
</ul>

    </div>
  );
}

export default YouTubeRecommendationList;
