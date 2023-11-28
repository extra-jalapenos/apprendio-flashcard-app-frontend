import { createContext, useState } from 'react'
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
        <Route path={"/:categoryId/create-entry"} element={<CreateEntry />}/>
        <Route path={"/create-category"} element={<CreateCategory />}/>
        <Route path={"/select-category"} element={<CategorySelection />}/>
        <Route path={"/practice/:categoryId/:cardId"} element={<Practice />}/>
      </Routes>
      <Footer />
      </userContext.Provider>
    </>
  )
}

export { App, userContext }
