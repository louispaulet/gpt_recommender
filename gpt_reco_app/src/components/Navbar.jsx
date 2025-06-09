import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300 shadow-sm font-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:h-16 items-start sm:items-center py-4 sm:py-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <Link to="/" className="flex items-center space-x-2 font-secondary" aria-label="Logo">
              <span role="img" aria-label="thumbs up" className="text-3xl">👍</span>
              <span className="font-bold text-xl text-gray-900">GPT Recommender</span>
            </Link>
            <div className="flex flex-col sm:flex-row font-secondary space-y-2 sm:space-y-0 sm:space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
                Home
              </Link>
              <Link to="/import-html" className="text-gray-700 hover:text-blue-600 font-semibold">
                Import HTML
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
