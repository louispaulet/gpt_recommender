import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 overflow-x-hidden">
        <App />
      </div>
    </HashRouter>
  </StrictMode>,
)
