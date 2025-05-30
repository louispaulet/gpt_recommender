import React from 'react';
import HomepageComponent from '../components/Homepage.jsx';

function Homepage() {
  return (
    <>
      <section className="info-section p-4 bg-gray-100 text-gray-800">
        <p>Please input the OpenAI API key in the text field below.</p>
      </section>
      <HomepageComponent />
    </>
  );
}

export default Homepage;
