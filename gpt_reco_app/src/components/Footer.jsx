import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-brand-light py-4 mt-8">
      <div className="max-w-4xl mx-auto px-4 text-center text-sm text-brand-dark">
        &copy; {new Date().getFullYear()} GPT Recommender. All rights reserved.
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-brand-accent hover:underline mx-2">
            Privacy Policy
          </Link>
          |
          <Link to="/terms-of-service" className="text-brand-accent hover:underline mx-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
