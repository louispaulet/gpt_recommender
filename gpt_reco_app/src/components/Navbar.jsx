import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-dark-surface border-b border-gray-300 dark:border-dark-surface shadow-sm font-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 font-secondary" aria-label="Logo">
              <span role="img" aria-label="thumbs up" className="text-3xl">👍</span>
              <span className="font-bold text-xl text-gray-900 dark:text-dark-text">GPT Recommender</span>
            </Link>
            <div className="flex space-x-6 font-secondary">
              <Link to="/" className="text-gray-700 dark:text-dark-text hover:text-blue-600 font-semibold">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-dark-text hover:text-blue-600 font-semibold">
                About
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded focus:outline-none text-gray-700 dark:text-dark-text"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
