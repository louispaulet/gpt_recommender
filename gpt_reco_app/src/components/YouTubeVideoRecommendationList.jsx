import React, { useState, useEffect } from 'react';
import { checkUrlStatus, getStatusStyle } from '../utils/urlStatusChecker.js';

function YouTubeVideoRecommendationList({ recommendations, prompt }) {
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    async function checkAllStatuses() {
      for (const rec of recommendations) {
        const status = await checkUrlStatus(rec.video_url);
        setStatuses(prevStatuses => ({
          ...prevStatuses,
          [rec.video_url]: status,
        }));
      }
    }
    checkAllStatuses();
  }, [recommendations]);

  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Video Recommendations</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => {
          const status = statuses[rec.video_url];
          const { liClass, icon } = getStatusStyle(status);
          // Tooltip text for status
          let statusTooltipText = '';
          if (status === 200) statusTooltipText = 'Verified Link (HTTP 200)';
          else if (status === 404) statusTooltipText = 'Incorrect Link (HTTP 404)';
          else if (status) statusTooltipText = `Link Status: HTTP ${status}`;
          return (
            <li
              key={index}
              className={`${liClass} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 cursor-pointer flex items-center space-x-4`}
              role="link"
              tabIndex={0}
              onClick={() => window.open(rec.video_url, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open(rec.video_url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <a
                href={rec.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium hover:underline flex-grow"
                onClick={(e) => e.preventDefault()}
              >
                {rec.video_name}
              </a>
              {icon && (
                <div className="group relative cursor-pointer">
                  {icon}
                  <div
                    className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 inline-block px-4 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700 whitespace-nowrap max-w-[20rem] overflow-hidden text-ellipsis"
                    style={{ bottom: '125%', left: '50%', transform: 'translateX(-50%)' }}
                  >
                    {statusTooltipText}
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {prompt && (
        <details className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
          <summary>Prompt used for recommendations</summary>
          <pre>{prompt}</pre>
        </details>
      )}
    </section>
  );
}

export default YouTubeVideoRecommendationList;
