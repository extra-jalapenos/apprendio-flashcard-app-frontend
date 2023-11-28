import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../App"

export default function Header () {
  const { user } = useContext(userContext)
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>✨ Flashy Flash Cards ✨</button>
        <button onClick={() => navigate("/select-language")}>Switch Languages</button>
        <button onClick={() => navigate("/login")}>{user ? "🐝 " + user : "Login"}</button>
      </nav>
    </header>
  )
}