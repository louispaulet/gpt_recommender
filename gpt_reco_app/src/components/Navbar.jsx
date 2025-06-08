import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300 shadow-sm font-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 font-accent" aria-label="Logo">
              <span role="img" aria-label="thumbs up" className="text-3xl">👍</span>
              <span className="font-bold text-xl text-gray-900">GPT Recommender</span>
            </Link>
            <div className="flex space-x-6 font-secondary">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold">
                About
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
