import React from 'react';
import HtmlSubscriptionImporter from '../components/HtmlSubscriptionImporter.jsx';

const ImportSubscriptions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-secondary space-y-8">
      <h1 className="text-3xl sm:text-5xl font-extrabold font-primary text-center">Import Subscriptions from HTML</h1>
      <p className="text-center text-lg">Save your YouTube subscriptions page (Ctrl+S) and upload the file below.</p>
      <HtmlSubscriptionImporter />
    </div>
  );
};

export default ImportSubscriptions;
