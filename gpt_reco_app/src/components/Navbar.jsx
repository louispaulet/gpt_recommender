import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4 max-w-4xl mx-auto">
        <li>
          <Link to="/" className="flex items-center space-x-1" aria-label="Home">
            <span role="img" aria-label="home" className="no-underline">🏠</span>
            <span className="hover:underline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center space-x-1">
            <span role="img" aria-label="about" className="no-underline">ℹ️</span>
            <span className="hover:underline">About</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
