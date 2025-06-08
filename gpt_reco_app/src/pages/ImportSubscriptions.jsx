import React from 'react';
import HtmlSubscriptionImporter from '../components/HtmlSubscriptionImporter.jsx';

const ImportSubscriptions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-secondary space-y-8">
      <h1 className="text-3xl sm:text-5xl font-extrabold font-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 drop-shadow-lg text-center">
        Import Your Subscriptions
      </h1>
      <section className="p-6 bg-primary-100 rounded-lg shadow-md text-primary-900 font-medium text-lg">
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>
            <a
              href="https://www.youtube.com/feed/channels"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 underline"
            >
              Open your YouTube subscriptions page
            </a>
          </li>
          <li>Press <strong>Ctrl+S</strong> and save the page as <strong>HTML</strong>.</li>
          <li>Upload that file below to generate a CSV of your channels.</li>
        </ul>
      </section>
      <HtmlSubscriptionImporter />
    </div>
  );
};

export default ImportSubscriptions;
