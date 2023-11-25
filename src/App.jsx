import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import { mockData } from "../src/api/mockData"

function App() {
  const [count, setCount] = useState(0)
  console.log(mockData)
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
