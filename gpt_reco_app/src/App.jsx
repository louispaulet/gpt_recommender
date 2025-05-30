import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vite.dev" target="_blank" className="transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]">
          <img src={viteLogo} className="h-24 p-6" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow">
          <img src={reactLogo} className="h-24 p-6" alt="React logo" />
        </a>
      </div>
      <h1 className="text-center">Vite + React</h1>
      <div className="p-8">
<button
          onClick={() => setCount((count) => count + 1)}
          className="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-250 hover:border-indigo-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
