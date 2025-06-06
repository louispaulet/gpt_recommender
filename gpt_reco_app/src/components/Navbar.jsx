import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white border-b border-brand-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2" aria-label="Logo">
              <span role="img" aria-label="thumbs up" className="text-3xl">👍</span>
              <span className="font-bold text-xl text-brand-dark">GPT Recommender</span>
            </Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-brand-dark hover:text-brand-accent font-semibold">
                Home
              </Link>
              <Link to="/about" className="text-brand-dark hover:text-brand-accent font-semibold">
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
