import React from 'react';

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="text-lg text-gray-700 mb-4">
        This project uses GPT 4.1 to recommend content such as YouTube channels based on the channels you are already subscribed to.
      </p>
      <p className="text-lg text-gray-700">
        In the future, we will also be recommending YouTube videos, but this feature is not available yet.
      </p>
    </div>
  );
};

export default About;
