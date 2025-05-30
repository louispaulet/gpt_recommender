import React from 'react';

function YouTubeRecommendationList({ recommendations }) {
  return (
    <ul className="mt-4 space-y-2">
      {recommendations.map((rec, index) => (
        <li key={index} className="p-3 border border-gray-300 rounded bg-gray-50">
          <a
            href={rec.channel_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {rec.channel_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default YouTubeRecommendationList;
