import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../App"
import { siteTitle } from "../../helpers/constants"

export default function Header () {
  const { user, logoutUser } = useContext(userContext)
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>{siteTitle}</button>
        <button onClick={() => navigate("/select-category")}>Switch Category</button>
        <button onClick={() => navigate("/login")}>{user ? "🐝 " + user : "Login"}</button>
        {user && <button onClick={() => logoutUser()}>⏻ Logout</button>}
      </nav>
    </header>
  )
}
