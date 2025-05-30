import React, { useState, useEffect } from 'react';

function YouTubeRecommendationList({ recommendations }) {
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    async function checkUrlStatus(url) {
      const proxyUrl = 'https://corsproxy.io/?url=' + (url);
      try {
        const response = await fetch(proxyUrl, { method: 'GET' });
        return response.status;
      } catch (error) {
        return null; // network error or other
      }
    }

    async function checkAllStatuses() {
      const newStatuses = {};
      await Promise.all(recommendations.map(async (rec) => {
        const status = await checkUrlStatus(rec.channel_url);
        newStatuses[rec.channel_url] = status;
      }));
      setStatuses(newStatuses);
    }

    checkAllStatuses();
  }, [recommendations]);

  function getStatusStyle(status) {
    if (status === 200) {
      return {
        liClass: 'p-3 border border-green-500 rounded bg-green-100 flex items-center justify-between',
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ),
      };
    } else if (status === 404) {
      return {
        liClass: 'p-3 border border-gray-400 rounded bg-gray-200 text-gray-500 flex items-center justify-between',
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
      };
    } else if (status) {
      return {
        liClass: 'p-3 border border-green-300 rounded bg-green-50 text-orange-600 flex items-center justify-between',
        icon: (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
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

  return (
    <ul className="mt-4 space-y-2">
      {recommendations.map((rec, index) => {
        const status = statuses[rec.channel_url];
        const { liClass, icon } = getStatusStyle(status);
        return (
          <li key={index} className={liClass}>
            <a
              href={rec.channel_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {rec.channel_name}
            </a>
            {icon}
          </li>
        );
      })}
    </ul>
  );
}

export default YouTubeRecommendationList;
