import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">About GPT YouTube Channel Recommender</h1>
      <section className="mb-8">
      <h2 className="text-2xl font-extrabold mb-3 text-black tracking-wide uppercase border-b-2 border-indigo-400 pb-1">What is this?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          This application leverages the power of <strong>OpenAI's GPT-4.1-nano</strong> model to provide personalized YouTube channel recommendations based on your current subscriptions. By analyzing your existing channels, it suggests new content creators tailored to your interests.
        </p>
      </section>
      <section className="mb-8">
      <h2 className="text-2xl font-extrabold mb-3 text-black tracking-wide uppercase border-b-2 border-indigo-400 pb-1">How does it work?</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
          <li>Input your <strong>OpenAI API key</strong> securely on the homepage.</li>
          <li>Paste your current YouTube channel subscriptions (names and URLs).</li>
          <li>Specify the number of recommendations you want to receive.</li>
          <li>The app sends a prompt to the OpenAI API, requesting new channel suggestions.</li>
          <li>Recommendations are parsed and displayed with live URL status checks to ensure validity.</li>
        </ul>
      </section>
      <section className="mb-8">
      <h2 className="text-2xl font-extrabold mb-3 text-black tracking-wide uppercase border-b-2 border-indigo-400 pb-1">Why use this app?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover fresh and relevant YouTube channels effortlessly without manually searching. This tool helps you expand your content horizon with AI-powered recommendations.
        </p>
      </section>
      <section>
      <h2 className="text-2xl font-extrabold mb-3 text-black tracking-wide uppercase border-b-2 border-indigo-400 pb-1">Future Plans 🚀</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We plan to extend the app's capabilities to recommend individual YouTube videos and other content types, enhancing your personalized discovery experience.
        </p>
      </section>
    </div>
  );
};

export default About;
