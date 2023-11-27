import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateLanguage from './components/CreateLanguage'
import Practice from './components/Practice'
import LanguageSelection from './components/LanguageSelection'
import Header from './components/header/Header'
import "./Header.css"
import Footer from './components/footer/footer'
import "./Footer.css"

function App() {
  return (
    <>
      <Header />
      <body>
        <Routes>
          <Route path={"/"} element={<Start />}/>
          <Route path={"/:categoryId/new-entry"} element={<CreateEntry />}/>
          <Route path={"/new-language"} element={<CreateLanguage />}/>
          <Route path={"/select-language"} element={<LanguageSelection />}/>
          <Route path={"/practice/:categoryId/:cardId"} element={<Practice />}/>
        </Routes>
      </body>
      <Footer />
    </>
  )
}

export default App
