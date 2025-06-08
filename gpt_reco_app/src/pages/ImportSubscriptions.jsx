import React from 'react';
import HtmlSubscriptionImporter from '../components/HtmlSubscriptionImporter.jsx';

const ImportSubscriptions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-secondary space-y-8">
      <h1 className="text-3xl sm:text-5xl font-extrabold font-primary text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 drop-shadow-lg text-center">
        Import Your Subscriptions
      </h1>
      <section className="p-6 bg-primary-100 rounded-lg shadow-md text-primary-900 font-medium text-center text-lg">
        Save your YouTube subscriptions page (Ctrl+S) and upload the file below to generate a CSV of your channels.
      </section>
      <HtmlSubscriptionImporter />
    </div>
  );
};

export default ImportSubscriptions;
