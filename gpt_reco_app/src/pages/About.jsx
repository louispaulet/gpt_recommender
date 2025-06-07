import React from 'react';

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <section className="mb-10 p-6 bg-primary-100 rounded-lg shadow-md text-primary-900 font-medium text-center text-lg">
        <h1 className="text-4xl font-extrabold mb-6">About GPT YouTube Channel Recommender</h1>
        <h2 className="text-2xl font-extrabold mb-3 tracking-wide uppercase border-b-2 border-primary-400 pb-1">
          What is this?
        </h2>
        <p className="text-lg leading-relaxed text-left">
          This application leverages the power of <strong>OpenAI's GPT-4.1-nano</strong> model to provide personalized YouTube channel recommendations based on your current subscriptions.<br />By analyzing your existing channels, it suggests new content creators tailored to your interests.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-3 tracking-wide uppercase border-b-2 border-primary-400 pb-1">
          How does it work?
        </h2>
        <ul className="list-disc list-inside text-primary-900 text-base leading-relaxed space-y-2">
          <li>Input your <strong>OpenAI API key</strong> securely on the homepage.</li>
          <li>Paste your current YouTube channel subscriptions (names and URLs).</li>
          <li>Specify the number of recommendations you want to receive.</li>
          <li>The app sends a prompt to the OpenAI API, requesting new channel suggestions.</li>
          <li>Recommendations are parsed and displayed with live URL status checks to ensure validity.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-3 tracking-wide uppercase border-b-2 border-primary-400 pb-1">
          Why use this app?
        </h2>
        <p className="text-lg leading-relaxed">
          Discover fresh and relevant YouTube channels effortlessly without manually searching. This tool helps you expand your content horizon with AI-powered recommendations.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold mb-3 tracking-wide uppercase border-b-2 border-primary-400 pb-1">
          Future Plans 🚀
        </h2>
        <p className="text-lg leading-relaxed">
          We plan to extend the app's capabilities to recommend individual YouTube videos and other content types, enhancing your personalized discovery experience.
        </p>
      </section>
    </div>
  );
};

export default About;
