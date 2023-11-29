import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../App"

export default function Header () {
  const { user, logoutUser } = useContext(userContext)
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>✨ Flashy Flash Cards ✨</button>
        <button onClick={() => navigate("/select-category")}>Switch Category</button>
        <button onClick={() => navigate("/login")}>{user ? "🐝 " + user.displayname : "Login"}</button>
        {user && <button onClick={() => logoutUser()}>⏻ Logout</button>}
      </nav>
    </header>
  )
}