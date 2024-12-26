import { useEffect, useState } from 'react'
import { initSession, sessionContext, userContext, practiceContext } from './context'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ProtectedRoute } from './helpers/ProtectedRoute'
import Start from "./components/Start"
import Home from './components/home/home'
import CreateEntry from './components/creatingentries/CreateEntry'
import CreateCategory from './components/categories/CreateCategory'
import { LoadPractice } from './components/loadpractice/LoadPractice'
import CategorySelection from './components/categories/CategorySelection'
import Login from './components/login/Login'
import Register from './components/login/Register'
import Lookup from './components/lookup/Lookup'
import Analytics from './components/analytics/Analytics'
import About from './components/about/About'
import Imprint from './components/imprint/Imprint'
import BatchImport from './components/creatingentries/BatchImport'
import Statistics from './components/statistics/Statistics'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import NotFound from './components/notfound/NotFound'
import EditCard from './components/practice/Edit'
import Profile from './components/profile/Profile'

export default function App() {
  const navigate = useNavigate()
  const [sessionStats, setSessionStats] = useState(null)
  const token = sessionStorage.getItem("token")

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
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("sessionStats")
    setUser(null)
    setSessionStats(initSession)
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
            <Route index path={"/"} element={<Home />}/>
            <Route path={"/start"} element={
                <ProtectedRoute>
                  <Start />
                </ProtectedRoute>}
              />
            <Route path={"/profile"} element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>}
              />
            <Route path={"/login"} element={<Login />}/>
            <Route path={"/register"} element={<Register />}/>
              <Route path={"/create-category"} element={
                <ProtectedRoute>
                  <CreateCategory />
                </ProtectedRoute>}
              />
              <Route path={"/select-category"} element={
                <ProtectedRoute>
                  <CategorySelection />
                </ProtectedRoute>}
              />
              <Route path={"/new-entry"} element={
                <ProtectedRoute>
                  <CreateEntry />
                </ProtectedRoute>}
              />
              <Route path={"/edit/:id"} element={
                <ProtectedRoute>
                  <EditCard />
                </ProtectedRoute>}
              />
              <Route path={"/import"} element={
                <ProtectedRoute>
                  <BatchImport />
                </ProtectedRoute>}
              />
              <Route path={"/lookup/"} element={
                <ProtectedRoute>
                  <Lookup />
                </ProtectedRoute>}
              />
              <Route path={"/analytics/"} element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>}
              />
              <Route path={"/statistics/"} element={
                <ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>}
              />
              <Route path={"/practice/:categoryId"} element={
                <ProtectedRoute>
                  <LoadPractice />
                </ProtectedRoute>}
              />
            <Route path={"/about"} element={<About />}/>
            <Route path={"/imprint"} element={<Imprint />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </practiceContext.Provider>
      </sessionContext.Provider>
      </userContext.Provider>
    </>
  )
}
