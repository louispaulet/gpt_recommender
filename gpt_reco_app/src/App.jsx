import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import About from './pages/About.jsx';
import Homepage from './pages/Homepage.jsx';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4 max-w-4xl mx-auto">
          <li>
            <Link to="/" className="hover:underline" aria-label="Home">
              🏠
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mx-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
