import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light overflow-x-hidden">
        <App />
      </div>
    </HashRouter>
  </StrictMode>,
)
