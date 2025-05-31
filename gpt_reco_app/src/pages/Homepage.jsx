import React from 'react';
import HomepageComponent from '../components/Homepage.jsx';
import YouTubeRecommender from '../components/YouTubeRecommender.jsx';

function Homepage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <section className="mb-10 p-6 bg-indigo-100 rounded-lg shadow-md text-indigo-900 font-medium text-center text-lg">
        Please input the OpenAI API key in the text field below.
      </section>
      <HomepageComponent />
      <div className="mt-12">
        <YouTubeRecommender />
      </div>
    </div>
  );
}

export default Homepage;
