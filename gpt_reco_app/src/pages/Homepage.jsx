import React from 'react';
import HomepageComponent from '../components/Homepage.jsx';
import YouTubeRecommender from '../components/YouTubeRecommender.jsx';

function Homepage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-gray-900 mb-12 text-center">
        GPT YouTube Channel Recommender
      </h1>
      <section className="mb-10 p-6 bg-indigo-100 rounded-lg shadow-sm text-indigo-900 font-medium text-center text-lg">
        Input your current YouTube subscriptions, and get a curated new channel recommendation list!
      </section>
      <HomepageComponent />
      <div className="mt-12">
        <YouTubeRecommender />
      </div>
    </div>
  );
}

export default Homepage;
