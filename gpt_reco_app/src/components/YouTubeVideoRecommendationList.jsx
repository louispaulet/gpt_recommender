import React from 'react';

function YouTubeVideoRecommendationList({ recommendations, prompt }) {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Video Recommendations</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => {
          return (
            <li
              key={index}
              className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 cursor-pointer flex items-center space-x-4"
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
