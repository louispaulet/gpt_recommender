import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
        <meta name="description" content="This page could not be located." />
        <link rel="canonical" href="https://gpt-reco.thefrenchartist.dev/" />
      </Helmet>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center font-secondary space-y-6">
      <h1 className="text-4xl font-extrabold font-primary">Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Back Home
      </Link>
      </div>
    </>
  );
}

export default NotFound;
