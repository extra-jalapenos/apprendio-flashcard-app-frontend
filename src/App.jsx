import { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from "./components/Start"
import CreateEntry from './components/CreateEntry'
import CreateLanguage from './components/CreateLanguage'
import Practice from './components/Practice'
import LanguageSelection from './components/LanguageSelection'
import Login from './components/Login/Login'
import Register from './components/Login/Login'
import Header from './components/header/Header'
import "./Header.css"
import Footer from './components/footer/footer'
import "./Footer.css"

const userContext = createContext()

export default function App() {

  const [user, setUser] = useState(null)
  console.log(!!user ? user : "unknown")
  return (
    <>
      <userContext.Provider value={{user, setUser}}>
        <Header />
      <Routes>
        <Route path={"/"} element={<Start />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/signup"} element={<Register />}/>
        <Route path={"/:categoryId/new-entry"} element={<CreateEntry />}/>
        <Route path={"/new-language"} element={<CreateLanguage />}/>
        <Route path={"/select-language"} element={<LanguageSelection />}/>
        <Route path={"/practice/:categoryId/:cardId"} element={<Practice />}/>
      </Routes>
      <Footer />
      </userContext.Provider>
    </>
  )
}

export { App, userContext }
