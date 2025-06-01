import React from 'react';

function YouTubeVideoRecommendationList({ recommendations, prompt }) {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Video Recommendations</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition">
            <a
              href={rec.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              {rec.video_name}
            </a>
          </li>
        ))}
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
