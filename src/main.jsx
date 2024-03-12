import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./components/header/header.css"
import "./components/footer/footer.css"
import { BrowserRouter } from 'react-router-dom'
import { alternateSiteTitle, siteTitle } from './helpers/constants'

// function to change title when focusing on tab
function oldTitle() {
  document.title = siteTitle;
}

// function to change title when un-focusing on tab
function newTitle() {
  document.title = alternateSiteTitle;
}

// bind functions to blur and focus events
window.onblur = newTitle;
window.onfocus = oldTitle;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
