import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateCategory from './components/CreateCategory'
import Practice from './components/Practice/Practice'
import CategorySelection from './components/CategorySelection'
import Login from './components/Login/Login'
import Header from './components/header/Header'
import "./Header.css"
import Footer from './components/footer/Footer'
import "./Footer.css"

const userContext = createContext()
const sessionContext = createContext()

const initSession = {
  "correct": 0,
  "wrong": 0
}

export default function App() {

  const syncSessionStorage = () => {
    // console.log("running sync", new Date().toTimeString())
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user))
    }
  }

  const [user, setUser] = useState(null)

  const loadFromStorage = () => {
    const { user } = sessionStorage
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

  return (
    <>
      <userContext.Provider value={{user, setUser, logoutUser}}>
      <sessionContext.Provider value={{sessionStats, setSessionStats}}>
        <Header />
      <main>
      <Routes>
        <Route path={"/"} element={<Start />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/create-category"} element={<CreateCategory />}/>
        <Route path={"/select-category"} element={<CategorySelection />}/>
        <Route path={"/new-entry"} element={<CreateEntry />}/>
        <Route path={"/practice/:categoryId/"} element={<Practice />}/>
        <Route path={"/practice/:categoryId/:cardId"} element={<Practice />}/>
      </Routes>
      </main>
        <Footer />
      </sessionContext.Provider>
      </userContext.Provider>
    </>
  )
}

export { App, userContext, sessionContext }
