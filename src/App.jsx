import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateCategory from './components/CreateCategory'
import Practice from './components/Practice'
import CategorySelection from './components/CategorySelection'
import Login from './components/Login/Login'
import Register from './components/Login/Login'
import Header from './components/header/Header'
import "./Header.css"
import Footer from './components/footer/footer'
import "./Footer.css"

const userContext = createContext()
const sessionContext = createContext()

const initSession = {
  "correct": (sessionStorage.getItem("correct") || 0),
  "wrong": (sessionStorage.getItem("wrong") || 0),
  "total": (sessionStorage.getItem("total") || 0)
}

export default function App() {

  const [user, setUser] = useState(null)
  const loginUser = () => sessionStorage.setItem("user", JSON.stringify(user))

  useEffect(loginUser, [user])

  const [sessionStats, setSessionStats] = useState(JSON.parse(sessionStorage.getItem("sessionStats")) || initSession)
  const logCorrect = () => increaseSessionStats("correct")
  const logWrong = () => increaseSessionStats("wrong")
  console.log(sessionStats, "in App")

  const increaseSessionStats = (keyName) => {
    const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
    const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1, total: sessionStatsOld.total + 1} 
    sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
    setSessionStats(sessionStatsNew)
    console.log(sessionStatsOld, sessionStorage.getItem("sessionStats"))
  }

  console.log(!!user ? user : "unknown")

  return (
    <>
      <userContext.Provider value={{user, setUser}}>
      <sessionContext.Provider value={{logWrong, logCorrect, sessionStats, setSessionStats}}>
        <Header />
      <Routes>
        <Route path={"/"} element={<Start />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/signup"} element={<Register />}/>
        <Route path={"/:categoryId/create-entry"} element={<CreateEntry />}/>
        <Route path={"/create-category"} element={<CreateCategory />}/>
        <Route path={"/select-category"} element={<CategorySelection />}/>
        <Route path={"/practice/:categoryId/"} element={<Practice />}/>
        <Route path={"/practice/:categoryId/:cardId"} element={<Practice />}/>
      </Routes>
        <Footer />
      </sessionContext.Provider>
      </userContext.Provider>
    </>
  )
}

export { App, userContext, sessionContext }
