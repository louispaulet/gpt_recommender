import React from 'react';
import YouTubeVideoRecommender from '../components/YouTubeVideoRecommender.jsx';

function YouTubeVideoRecommendations() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 drop-shadow-lg mb-12 text-center">
        GPT YouTube Video Recommender
      </h1>
      <YouTubeVideoRecommender />
    </div>
  );
}

export default YouTubeVideoRecommendations;
