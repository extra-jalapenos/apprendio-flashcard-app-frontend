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
  "correct": 0,
  "wrong": 0
}

export default function App() {

  const [user, setUser] = useState(null)
  
  const loginUser = (user) => {
    setUser(user)
    sessionStorage.setItem("user", JSON.stringify(user))
    sessionStorage.setItem("sessionStats", JSON.stringify(user.statistics))
  }

  const logoutUser = () => {
    sessionStorage.removeItem("user")
    setUser(null)
    sessionStorage.setItem("sessionStats", JSON.stringify(initSession))
  }

  const [sessionStats, setSessionStats] = useState(JSON.parse(sessionStorage.getItem("sessionStats")) || initSession)
  const logCorrect = () => {
    if (user) {
      const endpoint = "/users/" + user.id
      const headers = {
        "content-type": "application/json"
      }
      const options = {
        method: "PATCH"
      }
      const body = {
        statistics: {...statistics, correct: user.statistics.correct + 1}
      }
      console.log(body)
    }

    increaseSessionStats("correct")
  }

  const logWrong = () => increaseSessionStats("wrong")

  const increaseSessionStats = (keyName) => {
    const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
    const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1} 
    sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
    setSessionStats(sessionStatsNew)
    console.log(sessionStatsOld, sessionStorage.getItem("sessionStats"))
  }

  return (
    <>
      <userContext.Provider value={{user, loginUser, logoutUser}}>
      <sessionContext.Provider value={{logWrong, logCorrect, sessionStats, setSessionStats}}>
        <Header />
      <Routes>
        <Route path={"/"} element={<Start />}/>
        <Route path={"/login"} element={<Login />}/>
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
