import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white py-4 mt-8">
      <div className="max-w-4xl mx-auto px-4 text-center text-sm font-accent text-gray-600 flex flex-wrap items-center justify-center space-x-2">
        <span>&copy; {new Date().getFullYear()} GPT Recommender. All rights reserved.</span>
        <span className="font-secondary flex items-center space-x-2">
          <Link to="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/terms-of-service" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
