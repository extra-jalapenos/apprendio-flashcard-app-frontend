import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateCategory from './components/CreateCategory'
import Practice from './components/Practice'
import CategorySelection from './components/CategorySelection'
import Login from './components/Login/Login'
import Header from './components/header/Header'
import "./Header.css"
import Footer from './components/footer/Footer'
import "./Footer.css"
import { baseURL } from './helpers/helpers'

const userContext = createContext()
const sessionContext = createContext()

const initSession = {
  "correct": 0,
  "wrong": 0
}

export default function App() {

  const syncSessionStorage = () => {
    console.log("running sync", new Date().toTimeString())
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user))
    }
  }

  const [user, setUser] = useState(null)

  const loadFromStorage = () => {
    const { user } = sessionStorage
    console.log("initial load", user)
    if (user) setUser(JSON.parse(user))
  }

  useEffect(loadFromStorage, [])

  const logoutUser = () => {
    sessionStorage.removeItem("user")
    setUser(null)
    setSessionStats(initSession)
    sessionStorage.setItem("sessionStats", JSON.stringify(initSession))
  }

  useEffect(syncSessionStorage, [user])

  const [sessionStats, setSessionStats] = useState(initSession)
  
  const updateUserStats = (type) => {
    console.log(!!user, "inside updateUserStats")
    if (!type || !user) return
    const endpoint = "/users/" + user.id
      const headers = {
        "content-type": "application/json"
      }

      const body = {
        statistics: {correct: user.statistics[type] + 1}
      }

      const options = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body)
      }

      fetch(baseURL + endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error, "error updating user"))
  }
  
  const logCorrect = () => {
    if (user) {
      updateUserStats("correct")
    } else {
      increaseSessionStats("correct")
    }
  }

  const logWrong = () => {
    if (user) {
      updateUserStats("wrong")
    } else {
      increaseSessionStats("wrong")
    }
  }
  
  const increaseSessionStats = (keyName) => {
    const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
    const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1} 
    sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
    setSessionStats(sessionStatsNew)
  }

  return (
    <>
      <userContext.Provider value={{user, setUser, logoutUser}}>
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
