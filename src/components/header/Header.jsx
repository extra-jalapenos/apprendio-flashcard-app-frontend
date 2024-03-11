import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../../context"
import { siteTitle } from "../../helpers/constants"

export default function Header () {
  const { user, logoutUser } = useContext(userContext)
  const navigate = useNavigate()

  if (user) {
    return (
      <header>
        <nav>
          <button onClick={() => navigate("/")}>{siteTitle}</button>
          <button onClick={() => navigate("/profile")}>{"🐭 " + user}</button>
          {user && <button onClick={() => logoutUser()}>⏻</button>}
        </nav>
      </header>
    )
  } else {
    return (
      <header>
        <nav>
          <button onClick={() => navigate("/")}>{siteTitle}</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </nav>
      </header>
    )
  }
}
