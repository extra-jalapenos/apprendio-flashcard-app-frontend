import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateLanguage from './components/CreateLanguage'
import Practice from './components/Practice'
import LanguageSelection from './components/LanguageSelection'
import Card from './components/VocabCard'

function App() {
  return (
    <>
      <header>
        <h1>StudyPal</h1>
      </header>
        <Routes>
          <Route path={"/"} element={<Start />}/>
          <Route path={"/new-entry"} element={<CreateEntry />}/>
          <Route path={"/new-language"} element={<CreateLanguage />}/>
          <Route path={"/select-language"} element={<LanguageSelection />}/>
          <Route path={"/practice/:id"} element={<Practice />}/>
        </Routes>
      <footer>

      </footer>
    </>
  )
}

export default App
