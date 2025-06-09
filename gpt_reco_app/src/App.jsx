import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const About = lazy(() => import('./pages/About.jsx'));
const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const YouTubePageExtraction = lazy(() => import('./pages/YouTubePageExtraction.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

import Navbar from './components/Navbar.jsx';
import Spinner from './components/Spinner.jsx';

import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 max-w-4xl mx-auto">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/extract-youtube" element={<YouTubePageExtraction />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
