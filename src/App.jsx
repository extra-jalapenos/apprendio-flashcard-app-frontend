import { createContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreatingEntries/CreateEntry'
import CreateCategory from './components/CreateCategory'
import LoadPractice from './components/Practice/LoadCategory'
import Practice from './components/Practice/Practice'
import CategorySelection from './components/CategorySelection'
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Lookup from './components/Analytics/Lookup'
import Analytics from './components/Analytics/Analytics'
import BatchImport from './components/CreatingEntries/BatchImport'
import { getTodaysStats } from './helpers/functions'

const userContext = createContext()
const sessionContext = createContext()
const practiceContext = createContext()

const initSession = {
  "correct": 0,
  "wrong": 0
}

export default function App() {

  const navigate = useNavigate()
  const [sessionStats, setSessionStats] = useState(initSession)
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    setSessionStats(initSession)
    sessionStorage.setItem("sessionStats", JSON.stringify(initSession))
  }, [])

  const syncSessionStorage = () => {
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
    navigate("/login")
  }

  useEffect(syncSessionStorage, [user])

  const [cards, setCards] = useState(null)
  let currentIndex = null
  const currentCard = () => {
    if (currentIndex && cards && currentIndex < cards.length) {
      return cards[currentIndex]
    }
    return null
  }

  return (
    <>
      <userContext.Provider value={{user, setUser, logoutUser}}>
      <sessionContext.Provider value={{token, sessionStats, setSessionStats}}>
      <practiceContext.Provider value={{cards, setCards, currentIndex, currentCard}}>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Start />}/>
          <Route path={"/login"} element={<Login />}/>
          <Route path={"/register"} element={<Register />}/>
          <Route path={"/create-category"} element={<CreateCategory />}/>
          <Route path={"/select-category"} element={<CategorySelection />}/>
          <Route path={"/new-entry"} element={<CreateEntry />}/>
          <Route path={"/import"} element={<BatchImport />}/>
          <Route path={"/lookup/"} element={<Lookup />}/>
          <Route path={"/analytics/"} element={<Analytics />}/>
          <Route path={"/practice/:categoryId"} element={<LoadPractice />}/>
          {/* <Route path={"/practice/:categoryId/:cardId"} element={<Practice card={card}/>}/> */}
        </Routes>
      </main>
      <Footer />
      </practiceContext.Provider>
      </sessionContext.Provider>
      </userContext.Provider>
    </>
  )
}

export { App, userContext, sessionContext, practiceContext }
