import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"

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
          <Route path={"/practice/:id"} element={<Practice />}/>
        </Routes>
      <footer>

      </footer>
    </>
  )
}

export default App
