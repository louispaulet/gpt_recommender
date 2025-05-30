import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import About from './pages/About.jsx';
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
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <div className="flex justify-center mt-8">
        <a href="https://vite.dev" target="_blank" className="transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]">
          <img src={viteLogo} className="h-24 p-6" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow">
          <img src={reactLogo} className="h-24 p-6" alt="React logo" />
        </a>
      </div>
      <h1 className="text-center">Vite + React</h1>
      <div className="p-8">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
