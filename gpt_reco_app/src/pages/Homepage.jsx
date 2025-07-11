import React from 'react';
import HomepageComponent from '../components/Homepage.jsx';
import YouTubeRecommender from '../components/YouTubeRecommender.jsx';

function Homepage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-secondary">
      <h1 className="text-3xl sm:text-6xl font-extrabold font-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 drop-shadow-lg mb-12 text-center">
        GPT YouTube Channel Recommender
      </h1>
      <section className="mb-10 p-6 bg-primary-100 rounded-lg shadow-md text-primary-900 font-medium text-center text-lg font-accent">
        Input your current YouTube subscriptions, and get a curated recommendation list!
      </section>
      <HomepageComponent />
      <div className="mt-12">
        <YouTubeRecommender />
      </div>
    </div>
  );
}

export default Homepage;
